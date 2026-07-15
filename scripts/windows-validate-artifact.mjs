import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const worker = path.join(projectRoot, "dist", "server", "index.js");
const hosting = path.join(projectRoot, "dist", ".openai", "hosting.json");

await readFile(hosting, "utf8");
const workerUrl = pathToFileURL(worker);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const workerModule = await import(workerUrl.href);

if (!workerModule.default || typeof workerModule.default.fetch !== "function") {
  throw new Error("dist/server/index.js must have an ESM default export with fetch(request, env, ctx)");
}

console.log("Validated Sites artifact: ESM Worker default.fetch and hosting manifest are present.");
