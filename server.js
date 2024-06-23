import { createRequestHandler } from "@remix-run/express";
import compression from "compression";
import express from "express";
import rateLimit from 'express-rate-limit';
import morgan from "morgan";

const viteDevServer = process.env.NODE_ENV === "production"
  ? undefined
  : await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js"),
});

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use(morgan("tiny"));

// Rate limiting
const limitMultiple = process.env.NODE_ENV === "test" ? 10000 : 1;
const rateLimitDefault = {
  windowMs: 60 * 1000, // 1 minute
  limit: 1000 * limitMultiple, // limit each IP to 1000 * limitMultiple requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
}

const strongestRateLimit = rateLimit({
  ...rateLimitDefault,
  limit: 10 * limitMultiple,
})

const strongRateLimit = rateLimit({
  ...rateLimitDefault,
  limit: 100 * limitMultiple,
})

const generalRateLimit = rateLimit(rateLimitDefault)

app.use((req, res, next) => {
  const strongPaths = ['/contact']
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (strongPaths.some(p => req.path.includes(p))) {
      return strongestRateLimit(req, res, next)
    }
    return strongRateLimit(req, res, next)
  }

  return generalRateLimit(req, res, next)
});

// handle SSR requests
app.all("*", remixHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);