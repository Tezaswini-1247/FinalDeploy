"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const os = require("os");
const path = require("path");
const _ = require("lodash");
const fp = require("lodash/fp");
const dotenv = require("dotenv");
const urls = require("./urls.js");
const configLoader = require("./config-loader.js");
const getDirs = require("./get-dirs.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const os__default = /* @__PURE__ */ _interopDefault(os);
const path__default = /* @__PURE__ */ _interopDefault(path);
const ___default = /* @__PURE__ */ _interopDefault(_);
const dotenv__default = /* @__PURE__ */ _interopDefault(dotenv);
dotenv__default.default.config({ path: process.env.ENV_PATH });
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const { version: strapiVersion } = require(path__default.default.join(__dirname, "../../package.json"));
const defaultConfig = {
  server: {
    host: process.env.HOST || os__default.default.hostname() || "localhost",
    port: Number(process.env.PORT) || 1337,
    proxy: false,
    cron: { enabled: false },
    admin: { autoOpen: false },
    dirs: { public: "./public" },
    transfer: {
      remote: {
        enabled: true
      }
    },
    logger: {
      updates: {
        enabled: true
      },
      startup: {
        enabled: true
      }
    }
  },
  admin: {},
  api: {
    rest: {
      prefix: "/api"
    }
  }
};
const loadConfiguration = (opts) => {
  const { appDir, distDir, autoReload = false, serveAdminPanel = true } = opts;
  const pkgJSON = require(path__default.default.resolve(appDir, "package.json"));
  const configDir = path__default.default.resolve(distDir || process.cwd(), "config");
  const rootConfig = {
    launchedAt: Date.now(),
    autoReload,
    environment: process.env.NODE_ENV,
    uuid: ___default.default.get(pkgJSON, "strapi.uuid"),
    packageJsonStrapi: ___default.default.omit(___default.default.get(pkgJSON, "strapi", {}), "uuid"),
    info: {
      ...pkgJSON,
      strapi: strapiVersion
    },
    admin: {
      serveAdminPanel
    }
  };
  const baseConfig = fp.omit("plugins", configLoader(configDir));
  const envDir = path__default.default.resolve(configDir, "env", process.env.NODE_ENV);
  const envConfig = configLoader(envDir);
  const config = ___default.default.merge(rootConfig, defaultConfig, baseConfig, envConfig);
  const { serverUrl, adminUrl, adminPath } = urls.getConfigUrls(config);
  ___default.default.set(config, "server.url", serverUrl);
  ___default.default.set(config, "server.absoluteUrl", urls.getAbsoluteServerUrl(config));
  ___default.default.set(config, "admin.url", adminUrl);
  ___default.default.set(config, "admin.path", adminPath);
  ___default.default.set(config, "admin.absoluteUrl", urls.getAbsoluteAdminUrl(config));
  ___default.default.set(config, "dirs", getDirs.getDirs(opts, config));
  return config;
};
exports.loadConfiguration = loadConfiguration;
//# sourceMappingURL=index.js.map
