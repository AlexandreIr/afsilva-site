import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareSitesEnvironment, resolveLocalBinary, spawnCommand } from "./sites-runtime.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const { env } = prepareSitesEnvironment();
const vinextCommand = resolveLocalBinary("vinext");
const buildResult = spawnCommand(vinextCommand, ["build"], {
  cwd: projectRoot,
  env,
  stdio: "inherit",
  windowsHide: false,
});

if (buildResult.error) {
  throw buildResult.error;
}

if (typeof buildResult.status === "number" && buildResult.status !== 0) {
  process.exit(buildResult.status);
}

const validateResult = spawnCommand(process.execPath, [path.join(projectRoot, "scripts", "windows-validate-artifact.mjs")], {
  cwd: projectRoot,
  env,
  stdio: "inherit",
  windowsHide: false,
});

if (validateResult.error) {
  throw validateResult.error;
}

if (typeof validateResult.status === "number") {
  process.exit(validateResult.status);
}

process.exit(1);
