import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareSitesEnvironment, resolveLocalBinary, spawnCommand } from "./sites-runtime.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const { env } = prepareSitesEnvironment();
const command = resolveLocalBinary("vite");

const result = spawnCommand(command, ["--host", "0.0.0.0"], {
  cwd: projectRoot,
  env,
  stdio: "inherit",
  windowsHide: false,
});

if (result.error) {
  throw result.error;
}

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
