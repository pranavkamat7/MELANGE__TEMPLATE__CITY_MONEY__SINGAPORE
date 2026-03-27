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
      let urlPath = req.url.replace(/^\/singapore\/digital-marketing-agency-singapore\//, "") || "/";
      let filePath = path.join(distPath, urlPath === "/" ? "/index.html" : urlPath);

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

    // Emulate a mobile viewport to catch mobile-specific issues during prerender
    await page.setViewport({ width: 375, height: 812, isMobile: true });

    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Wait just enough for first contentful paint — not full animation run
    await new Promise((r) => setTimeout(r, 500));

    // Clean up animation/transition state before capturing
    await page.evaluate(() => {
      // Remove will-change to avoid expensive GPU layers on mobile
      document.querySelectorAll("*").forEach((el) => {
        el.style.willChange = "auto";
      });

      // Remove any inline animation styles that got baked in during the wait
      document.querySelectorAll("[style]").forEach((el) => {
        const style = el.getAttribute("style");
        if (style) {
          const cleaned = style
            .split(";")
            .filter((rule) => {
              const prop = rule.split(":")[0].trim().toLowerCase();
              // Strip animation/transition inline styles that conflict with CSS
              return ![
                "animation",
                "animation-name",
                "animation-duration",
                "animation-delay",
                "animation-play-state",
                "animation-fill-mode",
                "transition",
                "transform",
                "opacity",
              ].includes(prop);
            })
            .join(";");
          if (cleaned.trim()) {
            el.setAttribute("style", cleaned);
          } else {
            el.removeAttribute("style");
          }
        }
      });
    });

    // Inject a freeze style tag so mobile browser doesn't run animations
    // before JS hydration is complete — your app should remove this tag on boot
    await page.evaluate(() => {
      const freezeStyle = document.createElement("style");
      freezeStyle.setAttribute("data-prerender-freeze", "true");
      freezeStyle.textContent = `
        *, *::before, *::after {
          animation-play-state: paused !important;
          animation-delay: -0.0001ms !important;
          transition-duration: 0ms !important;
          transition-delay: 0ms !important;
        }
      `;
      document.head.insertBefore(freezeStyle, document.head.firstChild);
    });

    let html = await page.content();

    // Strip any leftover Puppeteer/Chrome injected scripts
    html = html.replace(/<script[^>]*data-puppeteer[^>]*>[\s\S]*?<\/script>/gi, "");

    // Save to dist/<route>/index.html
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