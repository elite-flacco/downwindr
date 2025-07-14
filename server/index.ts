import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// Configure CORS for Replit environment
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // List of allowed origins
      const allowedOrigins = [
        /^https?:\/\/localhost/,
        /\.repl\.co$/,
        /\.replit\.dev$/,
        /\.replit\.app$/,
        /^https?:\/\/[a-zA-Z0-9-]+\.repl\.co$/,
        /^https:\/\/[a-zA-Z0-9-]+--[a-zA-Z0-9-]+\.repl\.co$/,
      ];

      // Check if the origin is allowed
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === "string") {
          return allowedOrigin === origin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`Origin ${origin} not allowed by CORS`);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Add CORS headers for all responses
app.use((req, res, next) => {
  // Add headers to help with Replit webview and cross-origin issues
  res.header("X-Content-Type-Options", "nosniff");
  res.header(
    "Content-Security-Policy",
    "frame-ancestors 'self' *.replit.com *.repl.co *.replit.dev *.replit.app",
  );
  res.header("X-Frame-Options", "ALLOWALL");
  // Allow content to be embedded in iframe
  res.removeHeader("Cross-Origin-Embedder-Policy");
  res.removeHeader("Cross-Origin-Opener-Policy");

  // Expose additional headers for the client
  res.header(
    "Access-Control-Expose-Headers",
    "Content-Length, Content-Type, Authorization",
  );

  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // In production, serve static files
  if (app.get("env") === "production") {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on http://localhost:${port}`);
    },
  );
})();
