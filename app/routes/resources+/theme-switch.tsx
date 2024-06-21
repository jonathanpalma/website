import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import MoonIcon from "@heroicons/react/24/solid/MoonIcon";
import SunIcon from "@heroicons/react/24/solid/SunIcon";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useFetcher, useFetchers } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/ui";
import { useHints } from "~/utils/client-hints";
import { invariantResponse } from "~/utils/invariant";
import { useRequestInfo } from "~/utils/request-info";
import { setTheme, type Theme } from "~/utils/theme.server";

const ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema,
  });

  invariantResponse(submission.status === "success", "Invalid theme received");

  const { theme } = submission.value;

  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  return json({ result: submission.reply() }, responseInit);
}

export type ThemeSwitchProps = {
  userPreference?: Theme | null;
};

export function ThemeSwitch({ userPreference }: ThemeSwitchProps) {
  const fetcher = useFetcher<typeof action>();

  const [form] = useForm({
    id: "theme-switch",
    lastResult: fetcher.data?.result,
  });

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? userPreference ?? "system";
  const nextMode =
    mode === "system" ? "light" : mode === "light" ? "dark" : "system";
  const modeLabel = {
    light: (
      <SunIcon className="h-6 w-6" aria-hidden="true">
        <span className="sr-only">Light</span>
      </SunIcon>
    ),
    dark: (
      <MoonIcon className="h-6 w-6" aria-hidden="true">
        <span className="sr-only">Dark</span>
      </MoonIcon>
    ),
    system: (
      <ComputerDesktopIcon className="h-6 w-6" aria-hidden="true">
        <span className="sr-only">System</span>
      </ComputerDesktopIcon>
    ),
  };

  return (
    <fetcher.Form
      method="post"
      {...getFormProps(form)}
      action="/resources/theme-switch"
    >
      <input type="hidden" name="theme" value={nextMode} />
      <div className="flex gap-2">
        <Button
          type="submit"
          className="flex items-center justify-center"
          variant="soft"
        >
          {modeLabel[mode]}
        </Button>
      </div>
    </fetcher.Form>
  );
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find(
    (f) => f.formAction === "/resources/theme-switch",
  );

  if (themeFetcher && themeFetcher.formData) {
    const submission = parseWithZod(themeFetcher.formData, {
      schema: ThemeFormSchema,
    });

    if (submission.status === "success") {
      return submission.value.theme;
    }
  }
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const optimisticMode = useOptimisticThemeMode();
  if (optimisticMode) {
    return optimisticMode === "system" ? hints.theme : optimisticMode;
  }
  return requestInfo.userPrefs.theme ?? hints.theme;
}
