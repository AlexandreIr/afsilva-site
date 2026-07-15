import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

export function getProjectRoot() {
  return projectRoot;
}

export function prepareSitesEnvironment(extraEnv = {}) {
  const runtimeRoot = process.env.SITES_RUNTIME_ROOT || path.join(projectRoot, ".sites-runtime");
  const home = path.join(runtimeRoot, "home");
  const npmCache = path.join(runtimeRoot, "npm-cache");
  const xdgConfig = path.join(runtimeRoot, "xdg-config");
  const tmp = path.join(runtimeRoot, "tmp");
  const wranglerLogDir = path.join(runtimeRoot, "wrangler", "logs");
  const wranglerRegistryPath = path.join(runtimeRoot, "wrangler", "registry");

  for (const directory of [home, npmCache, xdgConfig, tmp, wranglerLogDir, wranglerRegistryPath]) {
    mkdirSync(directory, { recursive: true });
  }

  const env = {
    ...process.env,
    SITES_ENV_READY: "1",
    SITES_PROJECT_ROOT: projectRoot,
    HOME: home,
    XDG_CONFIG_HOME: xdgConfig,
    TMPDIR: tmp,
    WRANGLER_WRITE_LOGS: "false",
    WRANGLER_LOG_PATH: wranglerLogDir,
    MINIFLARE_REGISTRY_PATH: wranglerRegistryPath,
    npm_config_cache: npmCache,
    npm_config_audit: "false",
    npm_config_fund: "false",
    npm_config_update_notifier: "false",
    ...extraEnv,
  };

  delete env.NPM_CONFIG_CACHE;
  delete env.npm_config_proxy;
  delete env.npm_config_http_proxy;
  delete env.npm_config_https_proxy;
  delete env.NPM_CONFIG_PROXY;
  delete env.NPM_CONFIG_HTTP_PROXY;
  delete env.NPM_CONFIG_HTTPS_PROXY;

  return { env, projectRoot, runtimeRoot };
}

export function resolveLocalBinary(binaryName) {
  const windowsMappings = {
    vite: path.join(projectRoot, "node_modules", "vite", "bin", "vite.js"),
    eslint: path.join(projectRoot, "node_modules", "eslint", "bin", "eslint.js"),
    "drizzle-kit": path.join(projectRoot, "node_modules", "drizzle-kit", "bin", "drizzle-kit.js"),
    vinext: path.join(projectRoot, "node_modules", "vinext", "dist", "cli.js"),
  };

  if (process.platform === "win32" && windowsMappings[binaryName]) {
    return existsSync(windowsMappings[binaryName]) ? windowsMappings[binaryName] : binaryName;
  }

  const targetName = process.platform === "win32" ? `${binaryName}.cmd` : binaryName;
  const fullPath = path.join(projectRoot, "node_modules", ".bin", targetName);
  return existsSync(fullPath) ? fullPath : binaryName;
}

export function shellQuote(command) {
  if (process.platform !== "win32") {
    return command;
  }

  return /\s/.test(command) ? `"${command.replace(/"/g, '\\"')}"` : command;
}

export function runCommand(command, args = [], options = {}) {
  const { env } = prepareSitesEnvironment(options.extraEnv || {});
  const result = spawnCommand(command, args, {
    cwd: options.cwd || projectRoot,
    env: { ...env, ...(options.env || {}) },
    stdio: options.stdio || "inherit",
    windowsHide: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (typeof result.status === "number") {
    process.exit(result.status);
  }

  process.exit(1);
}

export function spawnCommand(command, args = [], options = {}) {
  const { env } = prepareSitesEnvironment(options.extraEnv || {});

  if (process.platform !== "win32") {
    return spawnSync(command, args, {
      cwd: options.cwd || projectRoot,
      env: { ...env, ...(options.env || {}) },
      stdio: options.stdio || "inherit",
      windowsHide: false,
    });
  }

  const normalizedCommand = command.endsWith(".js") ? process.execPath : command;
  return spawnSync(normalizedCommand, [command, ...args].filter(Boolean), {
    cwd: options.cwd || projectRoot,
    env: { ...env, ...(options.env || {}) },
    stdio: options.stdio || "inherit",
    windowsHide: false,
  });
}
