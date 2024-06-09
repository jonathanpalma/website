import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useFetcher, useFetchers } from "@remix-run/react";
import { z } from "zod";
import { useHints } from "~/utils/client-hints";
import { invariantResponse } from "~/utils/invariant.server";
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

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
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
      <SunIcon>
        <span className="sr-only">Light</span>
      </SunIcon>
    ),
    dark: (
      <MoonIcon>
        <span className="sr-only">Dark</span>
      </MoonIcon>
    ),
    system: (
      <ComputerDesktopIcon>
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
        <button
          type="submit"
          className="flex h-8 w-8 cursor-pointer items-center justify-center"
        >
          {modeLabel[mode]}
        </button>
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
