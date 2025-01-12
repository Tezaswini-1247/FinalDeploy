"use strict";
const icons = require("@strapi/icons");
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
const PERMISSIONS = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  main: [
    { action: "plugin::documentation.read", subject: null },
    { action: "plugin::documentation.settings.regenerate", subject: null },
    { action: "plugin::documentation.settings.update", subject: null }
  ],
  open: [
    { action: "plugin::documentation.read", subject: null },
    { action: "plugin::documentation.settings.regenerate", subject: null }
  ],
  regenerate: [{ action: "plugin::documentation.settings.regenerate", subject: null }],
  update: [{ action: "plugin::documentation.settings.update", subject: null }]
};
const pluginId = "documentation";
const prefixPluginTranslations = (trad, pluginId2) => {
  return Object.keys(trad).reduce(
    (acc, current) => {
      acc[`${pluginId2}.${current}`] = trad[current];
      return acc;
    },
    {}
  );
};
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: icons.Information,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Documentation"
      },
      permissions: PERMISSIONS.main,
      Component: async () => {
        const { App } = await Promise.resolve().then(() => require("./App-C51t4Zpc.js"));
        return App;
      },
      position: 9
    });
    app.registerPlugin({
      id: pluginId,
      name: pluginId
    });
  },
  bootstrap(app) {
    app.addSettingsLink("global", {
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Documentation"
      },
      id: "documentation",
      to: pluginId,
      Component: async () => {
        const { SettingsPage } = await Promise.resolve().then(() => require("./Settings-DfyHMjZj.js"));
        return SettingsPage;
      },
      permissions: PERMISSIONS.main
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-CkqTE6jh.js")), "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-BbyKo6Hc.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-CHwC0A85.js")), "./translations/dk.json": () => Promise.resolve().then(() => require("./dk-qlI2J6S0.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-DKizRVCY.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-DH1GVZe7.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-B1x-Nj5w.js")), "./translations/id.json": () => Promise.resolve().then(() => require("./id-D3yFE72d.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-WuNBIqG8.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-De5iYa_O.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-DQfa3FDx.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-BZHlqphk.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-DDl5i_mP.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-D24CJ0qp.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-4GQ8ermL.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-QwZYcU6K.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-DgAXilB1.js")), "./translations/sv.json": () => Promise.resolve().then(() => require("./sv-CCLcAo3U.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-BhgV1BbW.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-BysnAErC.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-CNlbntFx.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("./vi-_ib0GmNl.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-L_5U2KqC.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-aEZZdkOu.js")) }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
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
exports.PERMISSIONS = PERMISSIONS;
exports.index = index;
exports.pluginId = pluginId;
