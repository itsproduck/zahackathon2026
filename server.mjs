import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import apiHandler from "./api/evaluate-assignment.mjs";
import interviewQuestionHandler from "./api/prepare-interview-questions.mjs";
import studentAgentsHandler from "./api/student-agents.mjs";
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml"
};

function loadEnvFile() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      return;
    }
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
    }
  });
}

function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);
  const studentRoutes = ["/", "/index.html", "/student", "/student/", "/student-portal", "/student-portal.html"];
  const taRoutes = ["/ta", "/ta/", "/ta-portal", "/ta-portal.html"];
  const requestedPath = studentRoutes.includes(pathname)
    ? path.join(rootDir, "student-portal.html")
    : taRoutes.includes(pathname)
      ? path.join(rootDir, "ta-portal.html")
      : path.normalize(path.join(rootDir, pathname));

  if (
    !requestedPath.startsWith(rootDir) ||
    requestedPath.includes(`${path.sep}.git${path.sep}`)
  ) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(requestedPath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const extension = path.extname(requestedPath);
    res.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}

loadEnvFile();

const server = http.createServer((req, res) => {
  if ((req.url || "").startsWith("/api/student-agents/")) {
    studentAgentsHandler(req, res);
    return;
  }
  if ((req.url || "").startsWith("/api/evaluate-assignment")) {
    apiHandler(req, res);
    return;
  }
  if ((req.url || "").startsWith("/api/prepare-interview-questions")) {
    interviewQuestionHandler(req, res);
    return;
  }
  serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Produck demo running at http://localhost:${port}`);
});
