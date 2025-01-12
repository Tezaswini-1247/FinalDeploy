const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const name$1 = "@strapi/plugin-sentry";
const version = "5.4.2";
const description = "Send Strapi error events to Sentry";
const repository = {
  type: "git",
  url: "https://github.com/strapi/strapi.git",
  directory: "packages/plugins/sentry"
};
const license = "SEE LICENSE IN LICENSE";
const author = {
  name: "Strapi Solutions SAS",
  email: "hi@strapi.io",
  url: "https://strapi.io"
};
const maintainers = [
  {
    name: "Strapi Solutions SAS",
    email: "hi@strapi.io",
    url: "https://strapi.io"
  }
];
const exports = {
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    types: "./dist/server/src/index.d.ts",
    source: "./server/src/index.ts",
    "import": "./dist/server/index.mjs",
    require: "./dist/server/index.js",
    "default": "./dist/server/index.js"
  },
  "./package.json": "./package.json"
};
const files = [
  "./dist",
  "strapi-server.js"
];
const scripts = {
  build: "strapi-plugin build",
  clean: "run -T rimraf dist",
  lint: "run -T eslint .",
  "test:unit": "run -T jest",
  "test:unit:watch": "run -T jest --watch",
  watch: "strapi-plugin watch"
};
const dependencies = {
  "@sentry/node": "7.112.2",
  "@strapi/design-system": "2.0.0-rc.14",
  "@strapi/icons": "2.0.0-rc.14"
};
const devDependencies = {
  "@strapi/pack-up": "5.0.2",
  "@strapi/sdk-plugin": "^5.2.0",
  "@strapi/strapi": "5.4.2",
  react: "18.3.1",
  "react-dom": "18.3.1",
  "react-router-dom": "6.22.3",
  "styled-components": "6.1.8"
};
const peerDependencies = {
  "@strapi/strapi": "^5.0.0",
  react: "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "react-router-dom": "^6.0.0",
  "styled-components": "^6.0.0"
};
const engines = {
  node: ">=18.0.0 <=22.x.x",
  npm: ">=6.0.0"
};
const strapi = {
  name: "sentry",
  displayName: "Sentry",
  description: "Send Strapi error events to Sentry.",
  kind: "plugin"
};
const gitHead = "7d785703f52464577d077c4618cbe68b44f8a9cd";
const pluginPkg = {
  name: name$1,
  version,
  description,
  repository,
  license,
  author,
  maintainers,
  exports,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi,
  gitHead
};
const pluginId = "sentry";
const prefixPluginTranslations = (trad, pluginId2) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
};
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name
    });
  },
  bootstrap() {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/dk.json": () => import("../_chunks/dk-D9TLFbt6.mjs"), "./translations/en.json": () => import("../_chunks/en-CegwVP3M.mjs"), "./translations/es.json": () => import("../_chunks/es-DxC1UwjP.mjs"), "./translations/fr.json": () => import("../_chunks/fr-BRlwHIG8.mjs"), "./translations/ko.json": () => import("../_chunks/ko-C_MXyOM9.mjs"), "./translations/pl.json": () => import("../_chunks/pl-6hJT3Sda.mjs"), "./translations/ru.json": () => import("../_chunks/ru-DnVqFddA.mjs"), "./translations/sv.json": () => import("../_chunks/sv-DjL9wmwK.mjs"), "./translations/tr.json": () => import("../_chunks/tr-BKL2AN-d.mjs"), "./translations/vi.json": () => import("../_chunks/vi-DLBe31mD.mjs"), "./translations/zh.json": () => import("../_chunks/zh-5kkOa7U5.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
export {
  index as default
};
