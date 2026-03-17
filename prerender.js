import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { createServer } from "http";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple static file server with base path support
function startServer(distPath, port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      // Strip the /singapore/singapore base path for file lookup
      let urlPath = req.url.replace(/^\/singapore\/digital-marketing-agency-singapore\//, "") || "/";
      let filePath = path.join(distPath, urlPath === "/" ? "/index.html" : urlPath);

      // Handle SPA routing - serve index.html for unknown paths
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distPath, "index.html");
      }

      const ext = path.extname(filePath);
      const mimeTypes = {
        ".html": "text/html",
        ".js":   "application/javascript",
        ".css":  "text/css",
        ".json": "application/json",
        ".png":  "image/png",
        ".jpg":  "image/jpeg",
        ".svg":  "image/svg+xml",
        ".ico":  "image/x-icon",
        ".woff": "font/woff",
        ".woff2":"font/woff2",
      };

      res.setHeader("Content-Type", mimeTypes[ext] || "text/plain");
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => resolve(server));
  });
}

const routes = [
  "/",
];

const PORT = 3034;
const distPath = path.join(__dirname, "dist");

console.log("Starting server...");
const server = await startServer(distPath, PORT);
console.log(`Server running at http://localhost:${PORT}`);

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

for (const route of routes) {
  try {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 3000)); // wait for animations

    const html = await page.content();

    // Save to dist/singapore/index.html
    const outDir = path.join(distPath, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
    console.log("✅ Prerendered:", route);

    await page.close();
  } catch (err) {
    console.error(`Failed to prerender ${route}:`, err.message);
  }
}

await browser.close();
server.close();
console.log("All done!");
