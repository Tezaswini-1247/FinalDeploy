"use strict";
const icons = require("@strapi/icons");
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const styledComponents = require("styled-components");
const reactQuery = require("react-query");
const qs = require("qs");
const byteSize = require("byte-size");
const dateFns = require("date-fns");
const yup = require("yup");
const formik = require("formik");
const isEqual = require("lodash/isEqual");
const ReactSelect = require("react-select");
const Cropper = require("cropperjs");
require("cropperjs/dist/cropper.css");
const isEmpty = require("lodash/isEmpty");
const reactDnd = require("react-dnd");
const reactRouterDom = require("react-router-dom");
const symbols = require("@strapi/icons/symbols");
const parseISO = require("date-fns/parseISO");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const byteSize__default = /* @__PURE__ */ _interopDefault(byteSize);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const isEqual__default = /* @__PURE__ */ _interopDefault(isEqual);
const ReactSelect__default = /* @__PURE__ */ _interopDefault(ReactSelect);
const Cropper__default = /* @__PURE__ */ _interopDefault(Cropper);
const isEmpty__default = /* @__PURE__ */ _interopDefault(isEmpty);
const parseISO__default = /* @__PURE__ */ _interopDefault(parseISO);
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
const name$1 = "@strapi/upload";
const version = "5.4.2";
const description = "Makes it easy to upload images and files to your Strapi Application.";
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
const exports$1 = {
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./_internal/shared": {
    types: "./dist/shared/index.d.ts",
    source: "./shared/index.ts",
    "import": "./dist/shared/index.mjs",
    require: "./dist/shared/index.js",
    "default": "./dist/shared/index.js"
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
  "dist/",
  "strapi-server.js"
];
const scripts = {
  build: "pack-up build",
  clean: "run -T rimraf dist",
  lint: "run -T eslint .",
  "test:front": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js",
  "test:unit": "run -T jest",
  "test:ts:back": "run -T tsc --noEmit -p server/tsconfig.json",
  "test:ts:front": "run -T tsc -p admin/tsconfig.json",
  "test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watch",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@strapi/design-system": "2.0.0-rc.14",
  "@strapi/icons": "2.0.0-rc.14",
  "@strapi/provider-upload-local": "workspace:*",
  "@strapi/utils": "workspace:*",
  "byte-size": "8.1.1",
  cropperjs: "1.6.1",
  "date-fns": "2.30.0",
  formik: "2.4.5",
  "fs-extra": "11.2.0",
  immer: "9.0.21",
  "koa-range": "0.3.0",
  "koa-static": "5.0.0",
  lodash: "4.17.21",
  "mime-types": "2.1.35",
  "prop-types": "^15.8.1",
  qs: "6.11.1",
  "react-dnd": "16.0.1",
  "react-intl": "6.6.2",
  "react-query": "3.39.3",
  "react-redux": "8.1.3",
  "react-select": "5.8.0",
  sharp: "0.32.6",
  yup: "0.32.9"
};
const devDependencies = {
  "@strapi/admin": "workspace:*",
  "@strapi/pack-up": "5.0.2",
  "@strapi/types": "workspace:*",
  "@testing-library/dom": "10.1.0",
  "@testing-library/react": "15.0.7",
  "@testing-library/user-event": "14.5.2",
  "@types/byte-size": "8.1.2",
  "@types/fs-extra": "11.0.4",
  "@types/koa": "2.13.4",
  "@types/koa-range": "0.3.5",
  "@types/koa-static": "4.0.2",
  formidable: "3.5.1",
  koa: "2.15.2",
  "koa-body": "6.0.1",
  msw: "1.3.0",
  react: "18.3.1",
  "react-dom": "18.3.1",
  "react-router-dom": "6.22.3",
  "styled-components": "6.1.8"
};
const peerDependencies = {
  "@strapi/admin": "^5.0.0",
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
  displayName: "Media Library",
  name: "upload",
  description: "Media file management.",
  required: true,
  kind: "plugin"
};
const gitHead = "7d785703f52464577d077c4618cbe68b44f8a9cd";
const pluginPkg = {
  name: name$1,
  version,
  description,
  license,
  author,
  maintainers,
  exports: exports$1,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi,
  gitHead
};
const pluginId = pluginPkg.name.replace(/^@strapi\//i, "");
const useAssets = ({ skipWhen = false, query = {} } = {}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { notifyStatus } = designSystem.useNotifyAT();
  const { get } = strapiAdmin.useFetchClient();
  const { folderPath, _q, ...paramsExceptFolderAndQ } = query;
  let params;
  if (_q) {
    params = {
      ...paramsExceptFolderAndQ,
      _q: encodeURIComponent(_q)
    };
  } else {
    params = {
      ...paramsExceptFolderAndQ,
      filters: {
        $and: [
          ...paramsExceptFolderAndQ?.filters?.$and ?? [],
          {
            folderPath: { $eq: folderPath ?? "/" }
          }
        ]
      }
    };
  }
  const { data, error, isLoading } = reactQuery.useQuery(
    [pluginId, "assets", params],
    async () => {
      const { data: data2 } = await get("/upload/files", { params });
      return data2;
    },
    {
      enabled: !skipWhen,
      staleTime: 0,
      cacheTime: 0,
      select(data2) {
        if (data2?.results && Array.isArray(data2.results)) {
          return {
            ...data2,
            results: data2.results.filter((asset) => asset.name).map((asset) => ({
              ...asset,
              /**
               * Mime and ext cannot be null in the front-end because
               * we expect them to be strings and use the `includes` method.
               */
              mime: asset.mime ?? "",
              ext: asset.ext ?? ""
            }))
          };
        }
        return data2;
      }
    }
  );
  React__namespace.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: "list.asset.at.finished",
          defaultMessage: "The assets have finished loading."
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error" })
      });
    }
  }, [error, formatMessage, toggleNotification]);
  return { data, error, isLoading };
};
const useFolders = ({ enabled = true, query = {} } = {}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { notifyStatus } = designSystem.useNotifyAT();
  const { folder, _q, ...paramsExceptFolderAndQ } = query;
  const { get } = strapiAdmin.useFetchClient();
  let params;
  if (_q) {
    params = {
      ...paramsExceptFolderAndQ,
      pagination: {
        pageSize: -1
      },
      _q
    };
  } else {
    params = {
      ...paramsExceptFolderAndQ,
      pagination: {
        pageSize: -1
      },
      filters: {
        $and: [
          ...paramsExceptFolderAndQ?.filters?.$and ?? [],
          {
            parent: {
              id: folder ?? {
                $null: true
              }
            }
          }
        ]
      }
    };
  }
  const { data, error, isLoading } = reactQuery.useQuery(
    [pluginId, "folders", qs.stringify(params)],
    async () => {
      const {
        data: { data: data2 }
      } = await get("/upload/folders", { params });
      return data2;
    },
    {
      enabled,
      staleTime: 0,
      cacheTime: 0,
      onError() {
        toggleNotification({
          type: "danger",
          message: formatMessage({ id: "notification.error" })
        });
      }
    }
  );
  React__namespace.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: "list.asset.at.finished",
          defaultMessage: "The folders have finished loading."
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  return { data, error, isLoading };
};
const appendSearchParamsToUrl = ({ url, params }) => {
  if (url === void 0 || typeof params !== "object") {
    return url;
  }
  const urlObj = new URL(url, window.strapi.backendURL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== void 0 && value !== null) {
      urlObj.searchParams.append(key, value);
    }
  });
  return urlObj.toString();
};
const containsMimeTypeFilter = (query) => {
  const filters = query?.filters?.$and;
  if (!filters) {
    return false;
  }
  const result = filters.find((filter) => {
    return Object.keys(filter).includes("mime");
  });
  return !!result;
};
const containsAssetFilter = (query) => {
  return containsMimeTypeFilter(query);
};
const prefixFileUrlWithBackendUrl = (fileURL) => {
  return !!fileURL && fileURL.startsWith("/") ? `${window.strapi.backendURL}${fileURL}` : fileURL;
};
const createAssetUrl = (asset, forThumbnail = true) => {
  if (asset.isLocal) {
    return asset.url;
  }
  const assetUrl = forThumbnail ? asset?.formats?.thumbnail?.url || asset.url : asset.url;
  return prefixFileUrlWithBackendUrl(assetUrl);
};
const displayedFilters = [
  {
    name: "createdAt",
    fieldSchema: {
      type: "date"
    },
    metadatas: { label: "createdAt" }
  },
  {
    name: "updatedAt",
    fieldSchema: {
      type: "date"
    },
    metadatas: { label: "updatedAt" }
  },
  {
    name: "mime",
    fieldSchema: {
      type: "enumeration",
      options: [
        { label: "audio", value: "audio" },
        { label: "file", value: "file" },
        { label: "image", value: "image" },
        { label: "video", value: "video" }
      ]
    },
    metadatas: { label: "type" }
  }
];
const downloadFile = async (url, fileName) => {
  const fileBlob = await fetch(url).then((res) => res.blob());
  const urlDownload = window.URL.createObjectURL(fileBlob);
  const link = document.createElement("a");
  link.href = urlDownload;
  link.setAttribute("download", fileName);
  link.click();
};
function findRecursiveFolderByValue(data, value) {
  let result;
  function iter(a) {
    if (a.value === value) {
      result = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  }
  data.some(iter);
  return result;
}
function formatBytes(receivedBytes, decimals = 0) {
  const realBytes = typeof receivedBytes === "string" ? Number(receivedBytes) : receivedBytes;
  const { value, unit } = byteSize__default.default(realBytes * 1e3, { precision: decimals });
  if (!unit) {
    return "0B";
  }
  return `${value}${unit.toUpperCase()}`;
}
const zeroPad = (num) => String(num).padStart(2, "0");
const formatDuration = (durationInSecond) => {
  const duration = dateFns.intervalToDuration({ start: 0, end: durationInSecond * 1e3 });
  return `${zeroPad(duration.hours)}:${zeroPad(duration.minutes)}:${zeroPad(duration.seconds)}`;
};
const toSingularTypes = (types) => {
  if (!types) {
    return [];
  }
  return types.map((type) => type.substring(0, type.length - 1));
};
const getAllowedFiles = (pluralTypes, files2) => {
  const singularTypes = toSingularTypes(pluralTypes);
  const allowedFiles = files2.filter((file) => {
    const fileType = file?.mime?.split("/")[0];
    if (!fileType) {
      return false;
    }
    if (singularTypes.includes("file") && !["video", "image", "audio"].includes(fileType)) {
      return true;
    }
    return singularTypes.includes(fileType);
  });
  return allowedFiles;
};
function getPrefixedId(message, callback) {
  const prefixedMessage = `apiError.${message}`;
  if (typeof callback === "function") {
    return callback(prefixedMessage);
  }
  return prefixedMessage;
}
function normalizeError(error, { name: name2, intlMessagePrefixCallback }) {
  const { message } = error;
  const normalizedError = {
    id: getPrefixedId(message, intlMessagePrefixCallback),
    defaultMessage: message,
    name: error.name ?? name2,
    values: {}
  };
  if ("path" in error) {
    normalizedError.values = { path: error.path.join(".") };
  }
  return normalizedError;
}
const validateErrorIsYupValidationError = (err) => typeof err.details === "object" && err.details !== null && "errors" in err.details;
function normalizeAPIError(apiError, intlMessagePrefixCallback) {
  const error = apiError.response?.data.error;
  if (error) {
    if (validateErrorIsYupValidationError(error)) {
      return {
        name: error.name,
        message: error?.message || null,
        errors: error.details.errors.map(
          (err) => normalizeError(err, { name: error.name, intlMessagePrefixCallback })
        )
      };
    }
    return normalizeError(error, { intlMessagePrefixCallback });
  }
  return null;
}
function getAPIInnerErrors(error, { getTrad: getTrad2 }) {
  const normalizedError = normalizeAPIError(error, getTrad2);
  if (normalizedError && "errors" in normalizedError) {
    return normalizedError.errors.reduce((acc, error2) => {
      if ("path" in error2.values) {
        acc[error2.values.path] = {
          id: error2.id,
          defaultMessage: error2.defaultMessage
        };
      }
      return acc;
    }, {});
  }
  return normalizedError?.defaultMessage;
}
const getTrad = (id) => `${pluginId}.${id}`;
const getBreadcrumbDataCM = (folder) => {
  const data = [
    {
      id: null,
      label: { id: getTrad("plugin.name"), defaultMessage: "Media Library" }
    }
  ];
  if (folder?.parent?.parent) {
    data.push([]);
  }
  if (folder?.parent) {
    data.push({
      id: folder.parent.id,
      label: folder.parent.name,
      path: folder.parent.path
    });
  }
  if (folder) {
    data.push({
      id: folder.id,
      label: folder.name,
      path: folder.path
    });
  }
  return data;
};
const getFolderURL = (pathname, currentQuery, { folder, folderPath } = {}) => {
  const { _q, ...queryParamsWithoutQ } = currentQuery;
  const queryParamsString = qs.stringify(
    {
      ...queryParamsWithoutQ,
      folder,
      folderPath
    },
    { encode: false }
  );
  return `${pathname}${queryParamsString ? `?${queryParamsString}` : ""}`;
};
const getFileExtension = (ext) => ext && ext[0] === "." ? ext.substring(1) : ext;
function flattenTree(tree, parent = null, depth = 0) {
  return tree.flatMap(
    (item) => item.children ? [{ ...item, parent: parent?.value, depth }, ...flattenTree(item.children, item, depth + 1)] : { ...item, depth, parent: parent?.value }
  );
}
const getFolderParents = (folders, currentFolderId) => {
  const parents = [];
  const flatFolders = flattenTree(folders);
  const currentFolder = flatFolders.find((folder) => folder.value === currentFolderId);
  if (!currentFolder) {
    return [];
  }
  let { parent } = currentFolder;
  while (parent !== void 0) {
    const parentToStore = flatFolders.find(({ value }) => value === parent);
    parents.push({ id: parentToStore?.value, label: parentToStore?.label });
    parent = parentToStore?.parent;
  }
  return parents.reverse();
};
const move = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
};
const moveElement = (array, index, offset) => {
  const newIndex = index + offset;
  return move(array, index, newIndex);
};
const prefixPluginTranslations = (trad, pluginId2) => {
  if (!pluginId2) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
};
const typeFromMime = (mime) => {
  if (mime.includes(AssetType.Image)) {
    return AssetType.Image;
  }
  if (mime.includes(AssetType.Video)) {
    return AssetType.Video;
  }
  if (mime.includes(AssetType.Audio)) {
    return AssetType.Audio;
  }
  return AssetType.Document;
};
const rawFileToAsset = (rawFile, assetSource) => {
  return {
    size: rawFile.size / 1e3,
    createdAt: new Date(rawFile.lastModified).toISOString(),
    name: rawFile.name,
    source: assetSource,
    type: typeFromMime(rawFile.type),
    url: URL.createObjectURL(rawFile),
    ext: rawFile.name.split(".").pop(),
    mime: rawFile.type,
    rawFile,
    isLocal: true
  };
};
function getFilenameFromURL(url) {
  return new URL(url).pathname.split("/").pop();
}
const urlsToAssets = async (urls) => {
  const assetPromises = urls.map(
    (url) => fetch(url).then(async (res) => {
      const blob = await res.blob();
      const loadedFile = new File([blob], getFilenameFromURL(res.url), {
        type: res.headers.get("content-type") || void 0
      });
      return {
        name: loadedFile.name,
        url: res.url,
        mime: res.headers.get("content-type"),
        rawFile: loadedFile
      };
    })
  );
  const assetsResults = await Promise.all(assetPromises);
  const assets = assetsResults.map((fullFilledAsset) => ({
    source: AssetSource.Url,
    name: fullFilledAsset.name,
    type: typeFromMime(fullFilledAsset.mime),
    url: fullFilledAsset.url,
    ext: fullFilledAsset.url.split(".").pop(),
    mime: fullFilledAsset.mime ? fullFilledAsset.mime : void 0,
    rawFile: fullFilledAsset.rawFile
  }));
  return assets;
};
const urlSchema = yup__namespace.object().shape({
  urls: yup__namespace.string().test({
    name: "isUrlValid",
    // eslint-disable-next-line no-template-curly-in-string
    message: "${path}",
    test(values = "") {
      const urls = values.split(/\r?\n/);
      if (urls.length === 0) {
        return this.createError({
          path: this.path,
          message: strapiAdmin.translatedErrors.min.id
        });
      }
      if (urls.length > 20) {
        return this.createError({
          path: this.path,
          message: strapiAdmin.translatedErrors.max.id
        });
      }
      const filtered = urls.filter((val) => {
        try {
          new URL(val);
          return false;
        } catch (err) {
          return true;
        }
      });
      const filteredLength = filtered.length;
      if (filteredLength === 0) {
        return true;
      }
      const errorMessage = filteredLength > 1 ? "form.upload-url.error.url.invalids" : "form.upload-url.error.url.invalid";
      return this.createError({
        path: this.path,
        message: getTrad(errorMessage),
        params: { number: filtered.length }
      });
    }
  })
});
var AssetType = /* @__PURE__ */ ((AssetType2) => {
  AssetType2["Video"] = "video";
  AssetType2["Image"] = "image";
  AssetType2["Document"] = "doc";
  AssetType2["Audio"] = "audio";
  return AssetType2;
})(AssetType || {});
var AssetSource = /* @__PURE__ */ ((AssetSource2) => {
  AssetSource2["Url"] = "url";
  AssetSource2["Computer"] = "computer";
  return AssetSource2;
})(AssetSource || {});
const PERMISSIONS = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  main: [
    { action: "plugin::upload.read", subject: null },
    {
      action: "plugin::upload.assets.create",
      subject: null
    },
    {
      action: "plugin::upload.assets.update",
      subject: null
    }
  ],
  copyLink: [
    {
      action: "plugin::upload.assets.copy-link",
      subject: null
    }
  ],
  create: [
    {
      action: "plugin::upload.assets.create",
      subject: null
    }
  ],
  download: [
    {
      action: "plugin::upload.assets.download",
      subject: null
    }
  ],
  read: [{ action: "plugin::upload.read", subject: null }],
  configureView: [{ action: "plugin::upload.configure-view", subject: null }],
  settings: [{ action: "plugin::upload.settings.read", subject: null }],
  update: [{ action: "plugin::upload.assets.update", subject: null, fields: null }]
};
const tableHeaders = [
  {
    name: "preview",
    key: "preview",
    metadatas: {
      label: { id: getTrad("list.table.header.preview"), defaultMessage: "preview" },
      isSortable: false
    },
    type: "image"
  },
  {
    name: "name",
    key: "name",
    metadatas: {
      label: { id: getTrad("list.table.header.name"), defaultMessage: "name" },
      isSortable: true
    },
    type: "text"
  },
  {
    name: "ext",
    key: "extension",
    metadatas: {
      label: { id: getTrad("list.table.header.ext"), defaultMessage: "extension" },
      isSortable: false
    },
    type: "ext"
  },
  {
    name: "size",
    key: "size",
    metadatas: {
      label: { id: getTrad("list.table.header.size"), defaultMessage: "size" },
      isSortable: false
    },
    type: "size"
  },
  {
    name: "createdAt",
    key: "createdAt",
    metadatas: {
      label: { id: getTrad("list.table.header.createdAt"), defaultMessage: "created" },
      isSortable: true
    },
    type: "date"
  },
  {
    name: "updatedAt",
    key: "updatedAt",
    metadatas: {
      label: { id: getTrad("list.table.header.updatedAt"), defaultMessage: "last update" },
      isSortable: true
    },
    type: "date"
  }
];
const sortOptions = [
  { key: "sort.created_at_desc", value: "createdAt:DESC" },
  { key: "sort.created_at_asc", value: "createdAt:ASC" },
  { key: "sort.name_asc", value: "name:ASC" },
  { key: "sort.name_desc", value: "name:DESC" },
  { key: "sort.updated_at_desc", value: "updatedAt:DESC" },
  { key: "sort.updated_at_asc", value: "updatedAt:ASC" }
];
const pageSizes = [10, 20, 50, 100];
const localStorageKeys = {
  modalView: `STRAPI_UPLOAD_MODAL_VIEW`,
  view: `STRAPI_UPLOAD_LIBRARY_VIEW`
};
const viewOptions = {
  GRID: 0,
  LIST: 1
};
const { main: _main, ...restPermissions } = PERMISSIONS;
const useMediaLibraryPermissions = () => {
  const { allowedActions, isLoading } = strapiAdmin.useRBAC(restPermissions);
  return { ...allowedActions, isLoading };
};
const endpoint$1 = `/${pluginId}/configuration`;
const queryKey = [pluginId, "configuration"];
const useConfig = () => {
  const { trackUsage } = strapiAdmin.useTracking();
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { get, put } = strapiAdmin.useFetchClient();
  const config = reactQuery.useQuery(
    queryKey,
    async () => {
      const res = await get(endpoint$1);
      return res.data.data;
    },
    {
      onError() {
        return toggleNotification({
          type: "danger",
          message: formatMessage({ id: "notification.error" })
        });
      },
      /**
       * We're cementing that we always expect an object to be returned.
       */
      select: (data) => data || {}
    }
  );
  const putMutation = reactQuery.useMutation(
    async (body) => {
      await put(endpoint$1, body);
    },
    {
      onSuccess() {
        trackUsage("didEditMediaLibraryConfig");
        config.refetch();
      },
      onError() {
        return toggleNotification({
          type: "danger",
          message: formatMessage({ id: "notification.error" })
        });
      }
    }
  );
  return {
    config,
    mutateConfig: putMutation
  };
};
const useModalQueryParams = (initialState) => {
  const { trackUsage } = strapiAdmin.useTracking();
  const {
    config: { data: config }
  } = useConfig();
  const [queryObject, setQueryObject] = React__namespace.useState({
    page: 1,
    sort: "updatedAt:DESC",
    pageSize: 10,
    filters: {
      $and: []
    },
    ...initialState
  });
  React__namespace.useEffect(() => {
    if (config && "sort" in config && "pageSize" in config) {
      setQueryObject((prevQuery) => ({
        ...prevQuery,
        sort: config.sort,
        pageSize: config.pageSize
      }));
    }
  }, [config]);
  const handleChangeFilters = (nextFilters) => {
    if (nextFilters) {
      trackUsage("didFilterMediaLibraryElements", {
        location: "content-manager",
        filter: Object.keys(nextFilters[nextFilters.length - 1])[0]
      });
      setQueryObject((prev) => ({ ...prev, page: 1, filters: { $and: nextFilters } }));
    }
  };
  const handleChangePageSize = (pageSize) => {
    setQueryObject((prev) => ({
      ...prev,
      pageSize: typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize,
      page: 1
    }));
  };
  const handeChangePage = (page) => {
    setQueryObject((prev) => ({ ...prev, page }));
  };
  const handleChangeSort = (sort) => {
    if (sort) {
      trackUsage("didSortMediaLibraryElements", {
        location: "content-manager",
        sort
      });
      setQueryObject((prev) => ({ ...prev, sort }));
    }
  };
  const handleChangeSearch = (_q) => {
    if (_q) {
      setQueryObject((prev) => ({ ...prev, _q, page: 1 }));
    } else {
      const newState = { page: 1 };
      Object.keys(queryObject).forEach((key) => {
        if (!["page", "_q"].includes(key)) {
          newState[key] = queryObject[key];
        }
      });
      setQueryObject(newState);
    }
  };
  const handleChangeFolder = (folder, folderPath) => {
    setQueryObject((prev) => ({ ...prev, folder: folder ?? null, folderPath }));
  };
  return [
    { queryObject, rawQuery: qs.stringify(queryObject, { encode: false }) },
    {
      onChangeFilters: handleChangeFilters,
      onChangeFolder: handleChangeFolder,
      onChangePage: handeChangePage,
      onChangePageSize: handleChangePageSize,
      onChangeSort: handleChangeSort,
      onChangeSearch: handleChangeSearch
    }
  ];
};
const useSelectionState = (keys, initialValue) => {
  const [selections, setSelections] = React__namespace.useState(initialValue);
  const selectOne = (selection) => {
    const index = selections.findIndex(
      (currentSelection) => keys.every((key) => currentSelection[key] === selection[key])
    );
    if (index > -1) {
      setSelections((prevSelected) => [
        ...prevSelected.slice(0, index),
        ...prevSelected.slice(index + 1)
      ]);
    } else {
      setSelections((prevSelected) => [...prevSelected, selection]);
    }
  };
  const selectAll = (nextSelections) => {
    if (selections.length > 0) {
      setSelections([]);
    } else {
      setSelections(nextSelections);
    }
  };
  const selectOnly = (nextSelection) => {
    const index = selections.findIndex(
      (currentSelection) => keys.every((key) => currentSelection[key] === nextSelection[key])
    );
    if (index > -1) {
      setSelections([]);
    } else {
      setSelections([nextSelection]);
    }
  };
  const selectMultiple = (nextSelections) => {
    setSelections((currSelections) => [
      // already selected items
      ...currSelections,
      // filter out already selected items from nextSelections
      ...nextSelections.filter(
        (nextSelection) => currSelections.findIndex(
          (currentSelection) => keys.every((key) => currentSelection[key] === nextSelection[key])
        ) === -1
      )
    ]);
  };
  const deselectMultiple = (nextSelections) => {
    setSelections((currSelections) => [
      // filter out items in currSelections that are in nextSelections
      ...currSelections.filter(
        (currentSelection) => nextSelections.findIndex(
          (nextSelection) => keys.every((key) => currentSelection[key] === nextSelection[key])
        ) === -1
      )
    ]);
  };
  return [
    selections,
    { selectOne, selectAll, selectOnly, selectMultiple, deselectMultiple, setSelections }
  ];
};
const editAssetRequest = (asset, file, signal, onProgress, post) => {
  const endpoint2 = `/${pluginId}?id=${asset.id}`;
  const formData = new FormData();
  if (file) {
    formData.append("files", file);
  }
  formData.append(
    "fileInfo",
    JSON.stringify({
      alternativeText: asset.alternativeText,
      caption: asset.caption,
      folder: asset.folder,
      name: asset.name
    })
  );
  return post(endpoint2, formData, {
    signal
  }).then((res) => res.data);
};
const useEditAsset = () => {
  const [progress, setProgress] = React__namespace.useState(0);
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const queryClient = reactQuery.useQueryClient();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { post } = strapiAdmin.useFetchClient();
  const mutation = reactQuery.useMutation(({ asset, file }) => editAssetRequest(asset, file, signal, setProgress, post), {
    onSuccess() {
      queryClient.refetchQueries([pluginId, "assets"], { active: true });
      queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      queryClient.refetchQueries([pluginId, "folders"], { active: true });
    },
    onError(reason) {
      if (reason?.response?.status === 403) {
        toggleNotification({
          type: "info",
          message: formatMessage({ id: getTrad("permissions.not-allowed.update") })
        });
      } else {
        toggleNotification({ type: "danger", message: reason?.message });
      }
    }
  });
  const editAsset = (asset, file) => mutation.mutateAsync({ asset, file });
  const cancel = () => abortController.abort();
  return { ...mutation, cancel, editAsset, progress, status: mutation.status };
};
const recursiveRenameKeys = (obj, fn) => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => {
    const getValue = (v) => typeof v === "object" && v !== null ? recursiveRenameKeys(v, fn) : v;
    return [fn(key), Array.isArray(value) ? value.map((val) => getValue(val)) : getValue(value)];
  })
);
const FIELD_MAPPING = {
  name: "label",
  id: "value"
};
const useFolderStructure = ({ enabled = true } = {}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { get } = strapiAdmin.useFetchClient();
  const fetchFolderStructure = async () => {
    const {
      data: { data: data2 }
    } = await get("/upload/folder-structure");
    const children = data2.map(
      (f) => recursiveRenameKeys(f, (key) => FIELD_MAPPING?.[key] ?? key)
    );
    return [
      {
        value: null,
        label: formatMessage({
          id: getTrad("form.input.label.folder-location-default-label"),
          defaultMessage: "Media Library"
        }),
        children
      }
    ];
  };
  const { data, error, isLoading } = reactQuery.useQuery(
    [pluginId, "folder", "structure"],
    fetchFolderStructure,
    {
      enabled,
      staleTime: 0,
      cacheTime: 0
    }
  );
  return { data, error, isLoading };
};
const ContextInfo = ({ blocks }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      hasRadius: true,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 4,
      paddingBottom: 4,
      background: "neutral100",
      children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: blocks.map(({ label, value }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: label }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral700", children: value })
      ] }) }, label)) })
    }
  );
};
const ToggleButton = styledComponents.styled(designSystem.Flex)`
  align-self: flex-end;
  height: 2.2rem;
  width: 2.8rem;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.primary200};
  }
`;
const Option = ({ children, data, selectProps, ...props }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { depth, value, children: options } = data;
  const { maxDisplayDepth, openValues, onOptionToggle } = selectProps;
  const isOpen = openValues.includes(value);
  const Icon = isOpen ? icons.ChevronUp : icons.ChevronDown;
  return /* @__PURE__ */ jsxRuntime.jsx(ReactSelect.components.Option, { data, selectProps, ...props, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "start", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsxRuntime.jsx("span", { style: { paddingLeft: `${Math.min(depth, maxDisplayDepth) * 14}px` }, children }) }),
    options && options?.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
      ToggleButton,
      {
        "aria-label": formatMessage({
          id: "app.utils.toggle",
          defaultMessage: "Toggle"
        }),
        tag: "button",
        alignItems: "center",
        hasRadius: true,
        justifyContent: "center",
        marginLeft: "auto",
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          onOptionToggle(value);
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { width: "1.4rem", fill: "neutral500" })
      }
    )
  ] }) });
};
function getOpenValues(options, defaultValue = {}) {
  const values = [];
  const { value } = defaultValue;
  const option = options.find((option2) => option2.value === value);
  if (!option) {
    return values;
  }
  values.push(option.value);
  let { parent } = option;
  while (parent !== void 0) {
    const option2 = options.find(({ value: value2 }) => value2 === parent);
    if (!option2) {
      break;
    }
    values.push(option2.value);
    parent = option2.parent;
  }
  return values.reverse();
}
function getValuesToClose(options, value) {
  const optionForValue = options.find((option) => option.value === value);
  if (!optionForValue) {
    return [];
  }
  return options.filter((option) => option.depth >= optionForValue.depth).map((option) => option.value);
}
const hasParent = (option) => !option.parent;
const SelectTree = ({
  options: defaultOptions,
  maxDisplayDepth = 5,
  defaultValue,
  ...props
}) => {
  const flatDefaultOptions = React__namespace.useMemo(() => flattenTree(defaultOptions), [defaultOptions]);
  const optionsFiltered = React__namespace.useMemo(
    () => flatDefaultOptions.filter(hasParent),
    [flatDefaultOptions]
  );
  const [options, setOptions] = React__namespace.useState(optionsFiltered);
  const [openValues, setOpenValues] = React__namespace.useState(
    getOpenValues(flatDefaultOptions, defaultValue)
  );
  React__namespace.useEffect(() => {
    if (openValues.length === 0) {
      setOptions(flatDefaultOptions.filter((option) => option.parent === void 0));
    } else {
      const allOpenValues = openValues.reduce((acc, value) => {
        const options2 = flatDefaultOptions.filter(
          (option) => option.value === value || option.parent === value
        );
        options2.forEach((option) => {
          const values = getOpenValues(flatDefaultOptions, option);
          acc = [...acc, ...values];
        });
        return acc;
      }, []);
      const nextOptions = flatDefaultOptions.filter(
        (option) => allOpenValues.includes(option.value)
      );
      setOptions(nextOptions);
    }
  }, [openValues, flatDefaultOptions, optionsFiltered]);
  const handleToggle = (value) => {
    if (openValues.includes(value)) {
      const valuesToClose = getValuesToClose(flatDefaultOptions, value);
      setOpenValues((prev) => prev.filter((prevData) => !valuesToClose.includes(prevData)));
    } else {
      setOpenValues((prev) => [...prev, value]);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    Select,
    {
      components: { Option },
      options,
      defaultValue,
      isSearchable: false,
      maxDisplayDepth,
      openValues,
      onOptionToggle: handleToggle,
      ...props
    }
  );
};
const Select = ({
  components: components2 = {},
  styles = {},
  error,
  ariaErrorMessage,
  ...props
}) => {
  const theme = styledComponents.useTheme();
  const customStyles = getSelectStyles(theme, error);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ReactSelect__default.default,
    {
      menuPosition: "fixed",
      components: {
        ...components2,
        ClearIndicator,
        DropdownIndicator,
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null
      },
      "aria-errormessage": error && ariaErrorMessage,
      "aria-invalid": !!error,
      styles: { ...customStyles, ...styles },
      ...props
    }
  );
};
const IconBox = styledComponents.styled(designSystem.Box)`
  background: transparent;
  border: none;
  position: relative;
  z-index: 1;

  svg {
    height: 1.1rem;
    width: 1.1rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const ClearIndicator = (props) => {
  const Component = ReactSelect.components.ClearIndicator;
  return /* @__PURE__ */ jsxRuntime.jsx(Component, { ...props, children: /* @__PURE__ */ jsxRuntime.jsx(IconBox, { tag: "button", type: "button", children: /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, {}) }) });
};
const CarretBox = styledComponents.styled(IconBox)`
  display: flex;
  background: none;
  border: none;

  svg {
    width: 0.9rem;
  }
`;
const DropdownIndicator = ({ innerProps }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(CarretBox, { paddingRight: 3, ...innerProps, children: /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {}) });
};
const getSelectStyles = (theme, error) => {
  return {
    clearIndicator: (base) => ({ ...base, padding: 0, paddingRight: theme.spaces[3] }),
    container: (base) => ({
      ...base,
      background: theme.colors.neutral0,
      lineHeight: "normal"
    }),
    control(base, state) {
      let borderColor = theme.colors.neutral200;
      let boxShadowColor = void 0;
      let backgroundColor = void 0;
      if (state.isFocused) {
        borderColor = theme.colors.primary600;
        boxShadowColor = theme.colors.primary600;
      } else if (error) {
        borderColor = theme.colors.danger600;
      }
      if (state.isDisabled) {
        backgroundColor = `${theme.colors.neutral150} !important`;
      }
      return {
        ...base,
        fontSize: theme.fontSizes[2],
        height: 40,
        border: `1px solid ${borderColor} !important`,
        outline: 0,
        backgroundColor,
        borderRadius: theme.borderRadius,
        boxShadow: boxShadowColor ? `${boxShadowColor} 0px 0px 0px 2px` : ""
      };
    },
    indicatorsContainer: (base) => ({ ...base, padding: 0, paddingRight: theme.spaces[3] }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: theme.colors.neutral800,
      gridTemplateColumns: "0 100%"
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: theme.zIndices.dialog,
      pointerEvents: "auto"
    }),
    menu(base) {
      return {
        ...base,
        width: "100%",
        marginTop: theme.spaces[1],
        backgroundColor: theme.colors.neutral0,
        color: theme.colors.neutral800,
        borderRadius: theme.borderRadius,
        border: `1px solid ${theme.colors.neutral200}`,
        boxShadow: theme.shadows.tableShadow,
        fontSize: theme.fontSizes[2],
        zIndex: 2
      };
    },
    menuList: (base) => ({
      ...base,
      paddingLeft: theme.spaces[1],
      paddingTop: theme.spaces[1],
      paddingRight: theme.spaces[1],
      paddingBottom: theme.spaces[1]
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option(base, state) {
      let backgroundColor = base?.backgroundColor;
      if (state.isFocused || state.isSelected) {
        backgroundColor = theme.colors.primary100;
      }
      return {
        ...base,
        color: theme.colors.neutral800,
        lineHeight: theme.spaces[5],
        backgroundColor,
        borderRadius: theme.borderRadius,
        "&:active": {
          backgroundColor: theme.colors.primary100
        }
      };
    },
    placeholder: (base) => ({
      ...base,
      color: theme.colors.neutral600,
      marginLeft: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "80%"
    }),
    singleValue(base, state) {
      let color = theme.colors.neutral800;
      if (state.isDisabled) {
        color = theme.colors.neutral600;
      }
      return { ...base, marginLeft: 0, color };
    },
    valueContainer: (base) => ({
      ...base,
      cursor: "pointer",
      padding: 0,
      paddingLeft: theme.spaces[4],
      marginLeft: 0,
      marginRight: 0
    })
  };
};
const DialogHeader = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({ id: "global.details", defaultMessage: "Details" }) }) });
};
const QUALITY = 1;
const useCropImg = () => {
  const cropperRef = React__namespace.useRef();
  const [isCropping, setIsCropping] = React__namespace.useState(false);
  const [size, setSize] = React__namespace.useState({ width: void 0, height: void 0 });
  React__namespace.useEffect(() => {
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, []);
  const handleResize = ({ detail: { height, width } }) => {
    const roundedDataWidth = Math.round(width);
    const roundedDataHeight = Math.round(height);
    setSize({ width: roundedDataWidth, height: roundedDataHeight });
  };
  const crop = (image) => {
    if (!cropperRef.current) {
      cropperRef.current = new Cropper__default.default(image, {
        modal: true,
        initialAspectRatio: 16 / 9,
        movable: true,
        zoomable: false,
        cropBoxResizable: true,
        background: false,
        checkCrossOrigin: false,
        crop: handleResize
      });
      setIsCropping(true);
    }
  };
  const stopCropping = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = void 0;
      setIsCropping(false);
    }
  };
  const produceFile = (name2, mimeType, lastModifiedDate) => new Promise((resolve, reject) => {
    if (!cropperRef.current) {
      reject(
        new Error(
          "The cropper has not been instantiated: make sure to call the crop() function before calling produceFile()."
        )
      );
    } else {
      const canvas = cropperRef.current.getCroppedCanvas();
      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob], name2, {
              type: mimeType,
              lastModified: new Date(lastModifiedDate).getTime()
            })
          );
        },
        mimeType,
        QUALITY
      );
    }
  });
  return {
    crop,
    produceFile,
    stopCropping,
    isCropping,
    isCropperReady: Boolean(cropperRef.current),
    ...size
  };
};
const endpoint = `/${pluginId}`;
const uploadAsset = (asset, folderId, signal, onProgress, post) => {
  const { rawFile, caption, name: name2, alternativeText } = asset;
  const formData = new FormData();
  formData.append("files", rawFile);
  formData.append(
    "fileInfo",
    JSON.stringify({
      name: name2,
      caption,
      alternativeText,
      folder: folderId
    })
  );
  return post(endpoint, formData, {
    signal
  }).then((res) => res.data);
};
const useUpload = () => {
  const [progress, setProgress] = React__namespace.useState(0);
  const queryClient = reactQuery.useQueryClient();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { post } = strapiAdmin.useFetchClient();
  const mutation = reactQuery.useMutation(
    ({ asset, folderId }) => {
      return uploadAsset(asset, folderId, signal, setProgress, post);
    },
    {
      onSuccess() {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      }
    }
  );
  const upload = (asset, folderId) => mutation.mutateAsync({ asset, folderId });
  const cancel = () => abortController.abort();
  return {
    upload,
    isLoading: mutation.isLoading,
    cancel,
    error: mutation.error,
    progress,
    status: mutation.status
  };
};
const CopyLinkButton = ({ url }) => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { copy } = strapiAdmin.useClipboard();
  const handleClick = async () => {
    const didCopy = await copy(url);
    if (didCopy) {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: "notification.link-copied",
          defaultMessage: "Link copied into the clipboard"
        })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.IconButton,
    {
      label: formatMessage({
        id: getTrad("control-card.copy-link"),
        defaultMessage: "Copy link"
      }),
      onClick: handleClick,
      children: /* @__PURE__ */ jsxRuntime.jsx(icons.Link, {})
    }
  );
};
const BoxWrapper = styledComponents.styled(designSystem.Flex)`
  border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
  width: 100%;
  height: 100%;

  svg {
    path {
      fill: ${({ theme, error }) => error ? theme.colors.danger600 : void 0};
    }
  }
`;
const CancelButton = styledComponents.styled.button`
  border: none;
  background: none;
  width: min-content;
  color: ${({ theme }) => theme.colors.neutral600};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.neutral700};
  }

  svg {
    height: 10px;
    width: 10px;

    path {
      fill: currentColor;
    }
  }
`;
const UploadProgress = ({ onCancel, progress = 0, error }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(BoxWrapper, { alignItems: "center", background: error ? "danger100" : "neutral150", error, children: error ? /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, { "aria-label": error?.message }) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "center", gap: 2, width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ProgressBar, { value: progress }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: `${progress}/100%` }),
    /* @__PURE__ */ jsxRuntime.jsx(CancelButton, { type: "button", onClick: onCancel, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", tag: "span", textColor: "inherit", children: formatMessage({
        id: "app.components.Button.cancel",
        defaultMessage: "Cancel"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, { "aria-hidden": true })
    ] }) })
  ] }) });
};
const useRemoveAsset = (onSuccess) => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const queryClient = reactQuery.useQueryClient();
  const { del } = strapiAdmin.useFetchClient();
  const mutation = reactQuery.useMutation(
    (assetId) => del(`/upload/files/${assetId}`),
    {
      onSuccess() {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: "modal.remove.success-label",
            defaultMessage: "Elements have been successfully deleted."
          })
        });
        onSuccess();
      },
      onError(error) {
        toggleNotification({ type: "danger", message: error.message });
      }
    }
  );
  const removeAsset = async (assetId) => {
    await mutation.mutateAsync(assetId);
  };
  return { ...mutation, removeAsset };
};
const RemoveAssetDialog = ({ open, onClose, asset }) => {
  const { removeAsset } = useRemoveAsset(() => {
    onClose(null);
  });
  const handleConfirm = async (event) => {
    event?.preventDefault();
    await removeAsset(asset.id);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.ConfirmDialog, { onConfirm: handleConfirm }) });
};
const usePersistentState = (key, defaultValue) => {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      try {
        return JSON.parse(stickyValue);
      } catch {
        return stickyValue;
      }
    }
    return defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
const CardAsset$1 = styledComponents.styled(designSystem.Flex)`
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f9 121.48%);
`;
const AssetPreview = React__namespace.forwardRef(({ mime, url, name: name2, ...props }, ref) => {
  const [lang] = usePersistentState("strapi-admin-language", "en");
  if (mime.includes(AssetType.Image)) {
    return /* @__PURE__ */ jsxRuntime.jsx("img", { ref, src: url, alt: name2, ...props });
  }
  if (mime.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsxRuntime.jsx("video", { controls: true, src: url, ref, ...props, children: /* @__PURE__ */ jsxRuntime.jsx("track", { label: name2, default: true, kind: "captions", srcLang: lang, src: "" }) });
  }
  if (mime.includes(AssetType.Audio)) {
    return /* @__PURE__ */ jsxRuntime.jsx("audio", { controls: true, src: url, ref, ...props, children: name2 });
  }
  if (mime.includes("pdf")) {
    return /* @__PURE__ */ jsxRuntime.jsx(CardAsset$1, { justifyContent: "center", ...props, children: /* @__PURE__ */ jsxRuntime.jsx(icons.FilePdf, { "aria-label": name2 }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(CardAsset$1, { justifyContent: "center", ...props, children: /* @__PURE__ */ jsxRuntime.jsx(icons.File, { "aria-label": name2 }) });
});
AssetPreview.displayName = "AssetPreview";
const RelativeBox = styledComponents.styled(designSystem.Box)`
  position: relative;
`;
const Wrapper$1 = styledComponents.styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  background: repeating-conic-gradient(
      ${({ theme }) => theme.colors.neutral100} 0% 25%,
      transparent 0% 50%
    )
    50% / 20px 20px;

  svg {
    font-size: 4.8rem;
    height: 26.4rem;
  }

  img,
  video {
    margin: 0;
    padding: 0;
    max-height: 26.4rem;
    max-width: 100%;
  }
`;
const ActionRow = styledComponents.styled(designSystem.Flex)`
  height: 5.2rem;
  background-color: ${({ $blurry }) => $blurry ? `rgba(33, 33, 52, 0.4)` : void 0};
`;
const CroppingActionRow = styledComponents.styled(designSystem.Flex)`
  z-index: 1;
  height: 5.2rem;
  position: absolute;
  background-color: rgba(33, 33, 52, 0.4);
  width: 100%;
`;
const BadgeOverride = styledComponents.styled(designSystem.Badge)`
  span {
    color: inherit;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;
const UploadProgressWrapper$1 = styledComponents.styled.div`
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
`;
const CroppingActions = ({ onCancel, onValidate, onDuplicate }) => {
  const { formatMessage } = reactIntl.useIntl();
  const theme = styledComponents.useTheme();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.FocusTrap, { onEscape: onCancel, children: /* @__PURE__ */ jsxRuntime.jsx(CroppingActionRow, { justifyContent: "flex-end", paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        label: formatMessage({
          id: getTrad("control-card.stop-crop"),
          defaultMessage: "Stop cropping"
        }),
        onClick: onCancel,
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Trigger,
        {
          "aria-label": formatMessage({
            id: getTrad("control-card.crop"),
            defaultMessage: "Crop"
          }),
          variant: "tertiary",
          paddingLeft: 2,
          paddingRight: 2,
          endIcon: null,
          children: /* @__PURE__ */ jsxRuntime.jsx(
            icons.Check,
            {
              "aria-hidden": true,
              focusable: false,
              style: { position: "relative", top: 2 },
              fill: "#C0C0D0"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Content, { zIndex: theme.zIndices.dialog, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { onSelect: onValidate, children: formatMessage({
          id: getTrad("checkControl.crop-original"),
          defaultMessage: "Crop the original asset"
        }) }),
        onDuplicate && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { onSelect: onDuplicate, children: formatMessage({
          id: getTrad("checkControl.crop-duplicate"),
          defaultMessage: "Duplicate & crop the asset"
        }) })
      ] })
    ] })
  ] }) }) });
};
const Trigger = styledComponents.styled(designSystem.Menu.Trigger)`
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }

  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }

  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
      }
    }
  }
`;
const PreviewBox = ({
  asset,
  canUpdate,
  canCopyLink,
  canDownload,
  onDelete,
  onCropFinish,
  onCropStart,
  onCropCancel,
  replacementFile,
  trackedLocation
}) => {
  const { trackUsage } = strapiAdmin.useTracking();
  const previewRef = React__namespace.useRef(null);
  const [isCropImageReady, setIsCropImageReady] = React__namespace.useState(false);
  const [hasCropIntent, setHasCropIntent] = React__namespace.useState(null);
  const [assetUrl, setAssetUrl] = React__namespace.useState(createAssetUrl(asset, false));
  const [thumbnailUrl, setThumbnailUrl] = React__namespace.useState(createAssetUrl(asset, true));
  const { formatMessage } = reactIntl.useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React__namespace.useState(false);
  const { crop, produceFile, stopCropping, isCropping, isCropperReady, width, height } = useCropImg();
  const { editAsset, error, isLoading, progress, cancel } = useEditAsset();
  const {
    upload,
    isLoading: isLoadingUpload,
    cancel: cancelUpload,
    error: uploadError,
    progress: progressUpload
  } = useUpload();
  React__namespace.useEffect(() => {
    if (replacementFile) {
      const fileLocalUrl = URL.createObjectURL(replacementFile);
      if (asset.isLocal) {
        asset.url = fileLocalUrl;
      }
      setAssetUrl(fileLocalUrl);
      setThumbnailUrl(fileLocalUrl);
    }
  }, [replacementFile, asset]);
  React__namespace.useEffect(() => {
    if (hasCropIntent === false) {
      stopCropping();
      onCropCancel();
    }
  }, [hasCropIntent, stopCropping, onCropCancel, onCropFinish]);
  React__namespace.useEffect(() => {
    if (hasCropIntent && isCropImageReady) {
      crop(previewRef.current);
      onCropStart();
    }
  }, [isCropImageReady, hasCropIntent, onCropStart, crop]);
  const handleCropping = async () => {
    const nextAsset = { ...asset, width, height, folder: asset.folder?.id };
    const file = await produceFile(nextAsset.name, nextAsset.mime, nextAsset.updatedAt);
    let optimizedCachingImage;
    let optimizedCachingThumbnailImage;
    if (asset.isLocal) {
      optimizedCachingImage = URL.createObjectURL(file);
      optimizedCachingThumbnailImage = optimizedCachingImage;
      asset.url = optimizedCachingImage;
      asset.rawFile = file;
      trackUsage("didCropFile", { duplicatedFile: null, location: trackedLocation });
    } else {
      const updatedAsset = await editAsset(nextAsset, file);
      optimizedCachingImage = createAssetUrl(updatedAsset, false);
      optimizedCachingThumbnailImage = createAssetUrl(updatedAsset, true);
      trackUsage("didCropFile", { duplicatedFile: false, location: trackedLocation });
    }
    setAssetUrl(optimizedCachingImage);
    setThumbnailUrl(optimizedCachingThumbnailImage);
    setHasCropIntent(false);
  };
  const isInCroppingMode = isCropping && !isLoading;
  const handleDuplication = async () => {
    const nextAsset = { ...asset, width, height };
    const file = await produceFile(
      nextAsset.name,
      nextAsset.mime,
      nextAsset.updatedAt
    );
    await upload({ name: file.name, rawFile: file }, asset.folder?.id ? asset.folder.id : null);
    trackUsage("didCropFile", { duplicatedFile: true, location: trackedLocation });
    setHasCropIntent(false);
    onCropFinish();
  };
  const handleCropCancel = () => {
    setHasCropIntent(false);
  };
  const handleCropStart = () => {
    setHasCropIntent(true);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(RelativeBox, { hasRadius: true, background: "neutral150", borderColor: "neutral200", children: [
      isCropperReady && isInCroppingMode && /* @__PURE__ */ jsxRuntime.jsx(
        CroppingActions,
        {
          onValidate: handleCropping,
          onDuplicate: asset.isLocal ? void 0 : handleDuplication,
          onCancel: handleCropCancel
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(ActionRow, { paddingLeft: 3, paddingRight: 3, justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
        canUpdate && !asset.isLocal && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            label: formatMessage({
              id: "global.delete",
              defaultMessage: "Delete"
            }),
            onClick: () => setShowConfirmDialog(true),
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
          }
        ),
        canDownload && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            label: formatMessage({
              id: getTrad("control-card.download"),
              defaultMessage: "Download"
            }),
            onClick: () => downloadFile(assetUrl, asset.name),
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Download, {})
          }
        ),
        canCopyLink && /* @__PURE__ */ jsxRuntime.jsx(CopyLinkButton, { url: assetUrl }),
        canUpdate && asset.mime?.includes(AssetType.Image) && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            label: formatMessage({ id: getTrad("control-card.crop"), defaultMessage: "Crop" }),
            onClick: handleCropStart,
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Crop, {})
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(Wrapper$1, { children: [
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(UploadProgressWrapper$1, { children: /* @__PURE__ */ jsxRuntime.jsx(UploadProgress, { error, onCancel: cancel, progress }) }),
        isLoadingUpload && /* @__PURE__ */ jsxRuntime.jsx(UploadProgressWrapper$1, { children: /* @__PURE__ */ jsxRuntime.jsx(
          UploadProgress,
          {
            error: uploadError,
            onCancel: cancelUpload,
            progress: progressUpload
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          AssetPreview,
          {
            ref: previewRef,
            mime: asset.mime,
            name: asset.name,
            url: hasCropIntent ? assetUrl : thumbnailUrl,
            onLoad: () => {
              if (asset.isLocal || hasCropIntent) {
                setIsCropImageReady(true);
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        ActionRow,
        {
          paddingLeft: 2,
          paddingRight: 2,
          justifyContent: "flex-end",
          $blurry: isInCroppingMode,
          children: isInCroppingMode && width && height && /* @__PURE__ */ jsxRuntime.jsx(BadgeOverride, { background: "neutral900", color: "neutral0", children: width && height ? `${height}✕${width}` : "N/A" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      RemoveAssetDialog,
      {
        open: showConfirmDialog,
        onClose: () => {
          setShowConfirmDialog(false);
          onDelete(null);
        },
        asset
      }
    )
  ] });
};
const ReplaceMediaButton = ({
  onSelectMedia,
  acceptedMime,
  trackedLocation,
  ...props
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const inputRef = React__namespace.useRef(null);
  const { trackUsage } = strapiAdmin.useTracking();
  const handleClick = (e) => {
    e.preventDefault();
    if (trackedLocation) {
      trackUsage("didReplaceMedia", { location: trackedLocation });
    }
    inputRef.current?.click();
  };
  const handleChange = () => {
    const file = inputRef.current?.files?.[0];
    onSelectMedia(file);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "secondary", onClick: handleClick, ...props, children: formatMessage({
      id: getTrad("control-card.replace-media"),
      defaultMessage: "Replace media"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        accept: acceptedMime,
        type: "file",
        name: "file",
        "data-testid": "file-input",
        tabIndex: -1,
        ref: inputRef,
        onChange: handleChange,
        "aria-hidden": true
      }
    ) })
  ] });
};
const LoadingBody$1 = styledComponents.styled(designSystem.Flex)`
  /* 80px are coming from the Tabs component that is not included in the ModalBody */
  min-height: ${() => `calc(60vh + 8rem)`};
`;
const fileInfoSchema = yup__namespace.object({
  name: yup__namespace.string().required(),
  alternativeText: yup__namespace.string(),
  caption: yup__namespace.string(),
  folder: yup__namespace.number()
});
const EditAssetContent = ({
  onClose,
  asset,
  canUpdate = false,
  canCopyLink = false,
  canDownload = false,
  trackedLocation
}) => {
  const { formatMessage, formatDate } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const submitButtonRef = React__namespace.useRef(null);
  const [isCropping, setIsCropping] = React__namespace.useState(false);
  const [replacementFile, setReplacementFile] = React__namespace.useState();
  const { editAsset, isLoading } = useEditAsset();
  const { data: folderStructure, isLoading: folderStructureIsLoading } = useFolderStructure({
    enabled: true
  });
  const handleSubmit = async (values) => {
    const nextAsset = { ...asset, ...values, folder: values.parent?.value };
    if (asset?.isLocal) {
      onClose(nextAsset);
    } else {
      const editedAsset = await editAsset(nextAsset, replacementFile);
      const assetType = asset?.mime?.split("/")[0];
      const didChangeLocation = asset?.folder?.id ? asset.folder.id !== values.parent?.value : asset?.folder === null && !!values.parent?.value;
      trackUsage("didEditMediaLibraryElements", {
        location: trackedLocation,
        type: assetType,
        changeLocation: didChangeLocation
      });
      onClose(editedAsset);
    }
  };
  const handleStartCropping = () => {
    setIsCropping(true);
  };
  const handleCancelCropping = () => {
    setIsCropping(false);
  };
  const handleFinishCropping = () => {
    setIsCropping(false);
    onClose();
  };
  const formDisabled = !canUpdate || isCropping;
  const handleConfirmClose = () => {
    const confirm = window.confirm(
      formatMessage({
        id: "window.confirm.close-modal.file",
        defaultMessage: "Are you sure? Your changes will be lost."
      })
    );
    if (confirm) {
      onClose();
    }
  };
  const activeFolderId = asset?.folder?.id;
  const initialFormData = !folderStructureIsLoading && {
    name: asset?.name,
    alternativeText: asset?.alternativeText ?? void 0,
    caption: asset?.caption ?? void 0,
    parent: {
      value: activeFolderId ?? void 0,
      label: findRecursiveFolderByValue(folderStructure, activeFolderId)?.label ?? folderStructure[0].label
    }
  };
  const handleClose = (values) => {
    if (!isEqual__default.default(initialFormData, values)) {
      handleConfirmClose();
    } else {
      onClose();
    }
  };
  if (folderStructureIsLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(DialogHeader, {}),
      /* @__PURE__ */ jsxRuntime.jsx(LoadingBody$1, { minHeight: "60vh", justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
        id: getTrad("content.isLoading"),
        defaultMessage: "Content is loading."
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: () => handleClose(), variant: "tertiary", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    formik.Formik,
    {
      validationSchema: fileInfoSchema,
      validateOnChange: false,
      onSubmit: handleSubmit,
      initialValues: initialFormData,
      children: ({ values, errors, handleChange, setFieldValue }) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(DialogHeader, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            PreviewBox,
            {
              asset,
              canUpdate,
              canCopyLink,
              canDownload,
              onDelete: onClose,
              onCropFinish: handleFinishCropping,
              onCropStart: handleStartCropping,
              onCropCancel: handleCancelCropping,
              replacementFile,
              trackedLocation
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { noValidate: true, children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 3, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                ContextInfo,
                {
                  blocks: [
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.size"),
                        defaultMessage: "Size"
                      }),
                      value: formatBytes(asset?.size ? asset.size : 0)
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.dimensions"),
                        defaultMessage: "Dimensions"
                      }),
                      value: asset?.height && asset.width ? `${asset.width}✕${asset.height}` : null
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.date"),
                        defaultMessage: "Date"
                      }),
                      value: formatDate(new Date(asset?.createdAt ? asset.createdAt : ""))
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.extension"),
                        defaultMessage: "Extension"
                      }),
                      value: getFileExtension(asset?.ext)
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.id"),
                        defaultMessage: "Asset ID"
                      }),
                      value: asset?.id ? asset.id : null
                    }
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "name", error: errors.name, children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: getTrad("form.input.label.file-name"),
                  defaultMessage: "File name"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.TextInput,
                  {
                    value: values.name,
                    onChange: handleChange,
                    disabled: formDisabled
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                designSystem.Field.Root,
                {
                  name: "alternativeText",
                  hint: formatMessage({
                    id: getTrad("form.input.decription.file-alt"),
                    defaultMessage: "This text will be displayed if the asset can’t be shown."
                  }),
                  error: errors.alternativeText,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                      id: getTrad("form.input.label.file-alt"),
                      defaultMessage: "Alternative text"
                    }) }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.TextInput,
                      {
                        value: values.alternativeText,
                        onChange: handleChange,
                        disabled: formDisabled
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "caption", error: errors.caption, children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: getTrad("form.input.label.file-caption"),
                  defaultMessage: "Caption"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.TextInput,
                  {
                    value: values.caption,
                    onChange: handleChange,
                    disabled: formDisabled
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "parent", id: "asset-folder", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: getTrad("form.input.label.file-location"),
                  defaultMessage: "Location"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SelectTree,
                  {
                    name: "parent",
                    defaultValue: values.parent,
                    options: folderStructure,
                    onChange: (value) => {
                      setFieldValue("parent", value);
                    },
                    menuPortalTarget: document.querySelector("body"),
                    inputId: "asset-folder",
                    isDisabled: formDisabled,
                    error: errors?.parent,
                    ariaErrorMessage: "folder-parent-error"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "submit",
                tabIndex: -1,
                ref: submitButtonRef,
                disabled: formDisabled,
                children: formatMessage({ id: "submit", defaultMessage: "Submit" })
              }
            ) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: () => handleClose({ ...values }), variant: "tertiary", children: formatMessage({ id: "global.cancel", defaultMessage: "Cancel" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ReplaceMediaButton,
              {
                onSelectMedia: setReplacementFile,
                acceptedMime: asset?.mime ?? "",
                disabled: formDisabled,
                trackedLocation
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Button,
              {
                onClick: () => submitButtonRef.current?.click(),
                loading: isLoading,
                disabled: formDisabled,
                children: formatMessage({ id: "global.finish", defaultMessage: "Finish" })
              }
            )
          ] })
        ] })
      ] })
    }
  );
};
const EditAssetDialog = ({
  open,
  onClose,
  canUpdate = false,
  canCopyLink = false,
  canDownload = false,
  ...restProps
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
    EditAssetContent,
    {
      onClose,
      canUpdate,
      canCopyLink,
      canDownload,
      ...restProps
    }
  ) }) });
};
const useBulkRemove = () => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const queryClient = reactQuery.useQueryClient();
  const { post } = strapiAdmin.useFetchClient();
  const bulkRemoveQuery = (filesAndFolders) => {
    const payload = filesAndFolders.reduce((acc, selected) => {
      const { id, type } = selected;
      const key = type === "asset" ? "fileIds" : "folderIds";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(id);
      return acc;
    }, {});
    return post("/upload/actions/bulk-delete", payload);
  };
  const mutation = reactQuery.useMutation(bulkRemoveQuery, {
    onSuccess(res) {
      const {
        data: { data }
      } = res;
      if (data?.files?.length > 0) {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      }
      if (data?.folders?.length > 0) {
        queryClient.refetchQueries([pluginId, "folders"], { active: true });
      }
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("modal.remove.success-label"),
          defaultMessage: "Elements have been successfully deleted."
        })
      });
    },
    onError(error) {
      toggleNotification({ type: "danger", message: error?.message });
    }
  });
  const remove = (...args) => mutation.mutateAsync(...args);
  return { ...mutation, remove };
};
const editFolderRequest = (put, post, { attrs, id }) => {
  const isEditing = !!id;
  const method = isEditing ? put : post;
  return method(`/upload/folders/${id ?? ""}`, attrs).then((res) => res.data);
};
const useEditFolder = () => {
  const queryClient = reactQuery.useQueryClient();
  const { put, post } = strapiAdmin.useFetchClient();
  const mutation = reactQuery.useMutation((...args) => editFolderRequest(put, post, ...args), {
    async onSuccess() {
      await queryClient.refetchQueries([pluginId, "folders"], { active: true });
      await queryClient.refetchQueries([pluginId, "folder", "structure"], { active: true });
    }
  });
  const editFolder = (attrs, id) => mutation.mutateAsync({ attrs, id });
  return { ...mutation, editFolder, status: mutation.status };
};
const EditFolderModalHeader = ({ isEditing = false }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage(
    isEditing ? {
      id: getTrad("modal.folder.edit.title"),
      defaultMessage: "Edit folder"
    } : {
      id: getTrad("modal.folder.create.title"),
      defaultMessage: "Add new folder"
    }
  ) }) });
};
const RemoveFolderDialog = ({ onClose, onConfirm, open }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.ConfirmDialog, { onConfirm }) });
};
const folderSchema = yup__namespace.object({
  name: yup__namespace.string().required(),
  parent: yup__namespace.object({
    label: yup__namespace.string(),
    value: yup__namespace.number().nullable(true)
  }).nullable(true)
});
const EditFolderContent = ({
  onClose,
  folder,
  location,
  parentFolderId
}) => {
  const { data: folderStructure, isLoading: folderStructureIsLoading } = useFolderStructure({
    enabled: true
  });
  const { canCreate, isLoading: isLoadingPermissions, canUpdate } = useMediaLibraryPermissions();
  const [showConfirmDialog, setShowConfirmDialog] = React__namespace.useState(false);
  const { formatMessage, formatDate } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const { editFolder, isLoading: isEditFolderLoading } = useEditFolder();
  const { remove } = useBulkRemove();
  const { toggleNotification } = strapiAdmin.useNotification();
  const isLoading = isLoadingPermissions || folderStructureIsLoading;
  const isEditing = !!folder;
  const formDisabled = folder && !canUpdate || !folder && !canCreate;
  const initialFormData = !folderStructureIsLoading ? {
    name: folder?.name ?? "",
    parent: {
      /* ideally we would use folderStructure[0].value, but since it is null
      react complains about rendering null as field value */
      value: parentFolderId ? parseInt(parentFolderId.toString(), 10) : void 0,
      label: parentFolderId ? folderStructure && findRecursiveFolderByValue(folderStructure, parseInt(parentFolderId.toString(), 10))?.label : folderStructure?.[0].label
    }
  } : {
    name: "",
    parent: null
  };
  const handleSubmit = async (values, { setErrors }) => {
    try {
      await editFolder(
        {
          ...values,
          parent: values.parent?.value ?? null
        },
        folder?.id
      );
      toggleNotification({
        type: "success",
        message: isEditing ? formatMessage({
          id: getTrad("modal.folder-notification-edited-success"),
          defaultMessage: "Folder successfully edited"
        }) : formatMessage({
          id: getTrad("modal.folder-notification-created-success"),
          defaultMessage: "Folder successfully created"
        })
      });
      if (isEditing) {
        const didChangeLocation = parentFolderId ? parseInt(parentFolderId.toString(), 10) !== values.parent?.value : parentFolderId === null && !!values.parent?.value;
        trackUsage("didEditMediaLibraryElements", {
          location,
          type: "folder",
          changeLocation: didChangeLocation
        });
      } else {
        trackUsage("didAddMediaLibraryFolders", { location });
      }
      onClose({ created: true });
    } catch (err) {
      const errors = getAPIInnerErrors(err, { getTrad });
      const formikErrors = Object.entries(errors).reduce(
        (acc, [key, error]) => {
          acc[key] = error.defaultMessage;
          return acc;
        },
        {}
      );
      if (!isEmpty__default.default(formikErrors)) {
        setErrors(formikErrors);
      }
    }
  };
  const handleDelete = async () => {
    if (folder) {
      await remove([folder]);
    }
    setShowConfirmDialog(false);
    onClose();
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(EditFolderModalHeader, { isEditing }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
        id: getTrad("content.isLoading"),
        defaultMessage: "Content is loading."
      }) }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        validationSchema: folderSchema,
        validateOnChange: false,
        onSubmit: handleSubmit,
        initialValues: initialFormData,
        children: ({ values, errors, handleChange, setFieldValue }) => /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { noValidate: true, children: [
          /* @__PURE__ */ jsxRuntime.jsx(EditFolderModalHeader, { isEditing }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, children: [
            isEditing && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 12, col: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
              ContextInfo,
              {
                blocks: [
                  {
                    label: formatMessage({
                      id: getTrad("modal.folder.create.elements"),
                      defaultMessage: "Elements"
                    }),
                    value: formatMessage(
                      {
                        id: getTrad("modal.folder.elements.count"),
                        defaultMessage: "{folderCount} folders, {assetCount} assets"
                      },
                      {
                        assetCount: folder?.files?.count ?? 0,
                        folderCount: folder?.children?.count ?? 0
                      }
                    )
                  },
                  {
                    label: formatMessage({
                      id: getTrad("modal.folder.create.creation-date"),
                      defaultMessage: "Creation Date"
                    }),
                    value: formatDate(new Date(folder.createdAt))
                  }
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.Field.Root,
              {
                name: "name",
                error: typeof errors.name === "string" ? errors.name : void 0,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                    id: getTrad("form.input.label.folder-name"),
                    defaultMessage: "Name"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.TextInput,
                    {
                      value: values.name,
                      onChange: handleChange,
                      disabled: formDisabled
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { id: "folder-parent", children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                id: getTrad("form.input.label.folder-location"),
                defaultMessage: "Location"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                SelectTree,
                {
                  options: folderStructure,
                  onChange: (value) => {
                    setFieldValue("parent", value);
                  },
                  isDisabled: formDisabled,
                  defaultValue: values.parent,
                  name: "parent",
                  menuPortalTarget: document.querySelector("body"),
                  inputId: "folder-parent",
                  disabled: formDisabled,
                  error: typeof errors.parent === "string" ? errors.parent : void 0,
                  ariaErrorMessage: "folder-parent-error"
                }
              ),
              errors.parent && /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Typography,
                {
                  variant: "pi",
                  tag: "p",
                  id: "folder-parent-error",
                  textColor: "danger600",
                  children: typeof errors.parent === "string" ? errors.parent : void 0
                }
              )
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: () => onClose(), variant: "tertiary", name: "cancel", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
              isEditing && canUpdate && /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  type: "button",
                  variant: "danger-light",
                  onClick: () => setShowConfirmDialog(true),
                  name: "delete",
                  disabled: !canUpdate || isEditFolderLoading,
                  children: formatMessage({
                    id: getTrad("modal.folder.create.delete"),
                    defaultMessage: "Delete folder"
                  })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  name: "submit",
                  loading: isEditFolderLoading,
                  disabled: formDisabled,
                  type: "submit",
                  children: formatMessage(
                    isEditing ? { id: getTrad("modal.folder.edit.submit"), defaultMessage: "Save" } : { id: getTrad("modal.folder.create.submit"), defaultMessage: "Create" }
                  )
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      RemoveFolderDialog,
      {
        open: showConfirmDialog,
        onClose: () => setShowConfirmDialog(false),
        onConfirm: handleDelete
      }
    )
  ] });
};
const EditFolderDialog = ({ open, onClose, ...restProps }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(EditFolderContent, { ...restProps, onClose, open }) }) });
};
const useFolder = (id, { enabled = true } = {}) => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const { get } = strapiAdmin.useFetchClient();
  const { formatMessage } = reactIntl.useIntl();
  const { data, error, isLoading } = reactQuery.useQuery(
    [pluginId, "folder", id],
    async () => {
      const {
        data: { data: data2 }
      } = await get(`/upload/folders/${id}`, {
        params: {
          populate: {
            parent: {
              populate: {
                parent: "*"
              }
            }
          }
        }
      });
      return data2;
    },
    {
      retry: false,
      enabled,
      staleTime: 0,
      cacheTime: 0,
      onError() {
        toggleNotification({
          type: "danger",
          message: formatMessage({
            id: getTrad("notification.warning.404"),
            defaultMessage: "Not found"
          })
        });
      }
    }
  );
  return { data, error, isLoading };
};
const Extension$1 = styledComponents.styled.span`
  text-transform: uppercase;
`;
const CardActionsContainer = styledComponents.styled(designSystem.CardAction)`
  opacity: 0;

  &:focus-within {
    opacity: 1;
  }
`;
const CardContainer = styledComponents.styled(designSystem.Card)`
  cursor: pointer;

  &:hover {
    ${CardActionsContainer} {
      opacity: 1;
    }
  }
`;
const AssetCardBase = ({
  children,
  extension,
  isSelectable: isSelectable2 = true,
  name: name2,
  onSelect,
  onRemove,
  onEdit,
  selected = false,
  subtitle = "",
  variant = "Image"
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleClick = (e) => {
    if (onEdit) {
      onEdit(e);
    }
  };
  const handlePropagationClick = (e) => {
    e.stopPropagation();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(CardContainer, { role: "button", height: "100%", tabIndex: -1, onClick: handleClick, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardHeader, { children: [
      isSelectable2 && /* @__PURE__ */ jsxRuntime.jsx("div", { onClick: handlePropagationClick, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardCheckbox, { checked: selected, onCheckedChange: onSelect }) }),
      (onRemove || onEdit) && /* @__PURE__ */ jsxRuntime.jsxs(CardActionsContainer, { onClick: handlePropagationClick, position: "end", children: [
        onRemove && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            label: formatMessage({
              id: getTrad("control-card.remove-selection"),
              defaultMessage: "Remove from selection"
            }),
            onClick: onRemove,
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
          }
        ),
        onEdit && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            label: formatMessage({ id: getTrad("control-card.edit"), defaultMessage: "Edit" }),
            onClick: onEdit,
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
          }
        )
      ] }),
      children
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardBody, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardTitle, { tag: "span", children: name2 }) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardSubtitle, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(Extension$1, { children: extension }),
          subtitle
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingTop: 1, grow: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardBadge, { children: formatMessage({
        id: getTrad(`settings.section.${variant.toLowerCase()}.label`),
        defaultMessage: variant
      }) }) })
    ] })
  ] });
};
const AudioPreview = ({ url, alt }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx("audio", { controls: true, src: url, children: alt }) });
};
const AudioPreviewWrapper$1 = styledComponents.styled(designSystem.Box)`
  canvas,
  audio {
    display: block;
    max-width: 100%;
    max-height: ${({ size }) => size === "M" ? 16.4 : 8.8}rem;
  }
`;
const AudioAssetCard = ({
  name: name2,
  url,
  size = "M",
  selected = false,
  ...restProps
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(AssetCardBase, { name: name2, selected, ...restProps, variant: "Audio", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardAsset, { size, children: /* @__PURE__ */ jsxRuntime.jsx(AudioPreviewWrapper$1, { size, children: /* @__PURE__ */ jsxRuntime.jsx(AudioPreview, { url, alt: name2 }) }) }) });
};
const IconWrapper$1 = styledComponents.styled.span`
  svg {
    font-size: 4.8rem;
  }
`;
const CardAsset = styledComponents.styled(designSystem.Flex)`
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f9 121.48%);
`;
const DocAssetCard = ({
  name: name2,
  extension,
  size = "M",
  selected = false,
  ...restProps
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AssetCardBase,
    {
      name: name2,
      extension,
      selected,
      ...restProps,
      variant: "Doc",
      children: /* @__PURE__ */ jsxRuntime.jsx(CardAsset, { width: "100%", height: size === "S" ? `8.8rem` : `16.4rem`, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(IconWrapper$1, { children: extension === "pdf" ? /* @__PURE__ */ jsxRuntime.jsx(icons.FilePdf, { "aria-label": name2 }) : /* @__PURE__ */ jsxRuntime.jsx(icons.File, { "aria-label": name2 }) }) })
    }
  );
};
const ImageAssetCard = ({
  height,
  width,
  thumbnail,
  size = "M",
  alt,
  isUrlSigned,
  selected = false,
  ...props
}) => {
  const thumbnailUrl = isUrlSigned ? thumbnail : appendSearchParamsToUrl({
    url: thumbnail,
    params: { updatedAt: props.updatedAt }
  });
  const subtitle = height && width ? ` - ${width}✕${height}` : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(AssetCardBase, { ...props, selected, subtitle, variant: "Image", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardAsset, { src: thumbnailUrl, size, alt }) });
};
const HAVE_FUTURE_DATA = 3;
const VideoPreview = ({
  url,
  mime,
  onLoadDuration = () => {
  },
  alt,
  ...props
}) => {
  const handleTimeUpdate = (e) => {
    if (e.currentTarget.currentTime > 0) {
      const video = e.currentTarget;
      const canvas = document.createElement("canvas");
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.getContext("2d")?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.replaceWith(canvas);
      onLoadDuration && onLoadDuration(video.duration);
    }
  };
  const handleThumbnailVisibility = (e) => {
    const video = e.currentTarget;
    if (video.readyState < HAVE_FUTURE_DATA) return;
    video.play();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { tag: "figure", ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "video",
      {
        muted: true,
        onLoadedData: handleThumbnailVisibility,
        src: url,
        crossOrigin: "anonymous",
        onTimeUpdate: handleTimeUpdate,
        children: /* @__PURE__ */ jsxRuntime.jsx("source", { type: mime })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { tag: "figcaption", children: alt })
  ] }, url);
};
const VideoPreviewWrapper$2 = styledComponents.styled(designSystem.Box)`
  canvas,
  video {
    display: block;
    pointer-events: none;
    max-width: 100%;
    max-height: ${({ size }) => size === "M" ? 16.4 : 8.8}rem;
  }
`;
const VideoAssetCard = ({
  name: name2,
  url,
  mime,
  size = "M",
  selected = false,
  ...props
}) => {
  const [duration, setDuration] = React__namespace.useState();
  const formattedDuration = duration && formatDuration(duration);
  return /* @__PURE__ */ jsxRuntime.jsxs(AssetCardBase, { selected, name: name2, ...props, variant: "Video", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardAsset, { size, children: /* @__PURE__ */ jsxRuntime.jsx(VideoPreviewWrapper$2, { size, children: /* @__PURE__ */ jsxRuntime.jsx(VideoPreview, { url, mime, onLoadDuration: setDuration, alt: name2 }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardTimer, { children: formattedDuration || "..." })
  ] });
};
const AssetCard = ({
  asset,
  isSelected = false,
  onSelect,
  onEdit,
  onRemove,
  size = "M",
  local = false
}) => {
  const handleSelect = onSelect ? () => onSelect(asset) : void 0;
  const commonAssetCardProps = {
    id: asset.id,
    isSelectable: asset.isSelectable,
    extension: getFileExtension(asset.ext),
    name: asset.name,
    url: local ? asset.url : createAssetUrl(asset, true),
    mime: asset.mime,
    onEdit: onEdit ? () => onEdit(asset) : void 0,
    onSelect: handleSelect,
    onRemove: onRemove ? () => onRemove(asset) : void 0,
    selected: isSelected,
    size
  };
  if (asset.mime?.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsxRuntime.jsx(VideoAssetCard, { ...commonAssetCardProps });
  }
  if (asset.mime?.includes(AssetType.Image)) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ImageAssetCard,
      {
        alt: asset.alternativeText || asset.name,
        height: asset.height,
        thumbnail: prefixFileUrlWithBackendUrl(asset?.formats?.thumbnail?.url || asset.url),
        width: asset.width,
        updatedAt: asset.updatedAt,
        isUrlSigned: asset?.isUrlSigned || false,
        ...commonAssetCardProps
      }
    );
  }
  if (asset.mime?.includes(AssetType.Audio)) {
    return /* @__PURE__ */ jsxRuntime.jsx(AudioAssetCard, { ...commonAssetCardProps });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(DocAssetCard, { ...commonAssetCardProps });
};
const Draggable = ({ children, id, index, moveItem }) => {
  const ref = React__namespace.useRef(null);
  const [, drop] = reactDnd.useDrop({
    accept: "draggable",
    hover(hoveredOverItem) {
      if (!ref.current) {
        return;
      }
      if (hoveredOverItem.id !== id) {
        moveItem(hoveredOverItem.index, index);
        hoveredOverItem.index = index;
      }
    }
  });
  const [{ isDragging }, drag] = reactDnd.useDrag({
    type: "draggable",
    item() {
      return { index, id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.2 : 1;
  drag(drop(ref));
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: { opacity, cursor: "move" }, children });
};
const AssetGridList = ({
  allowedTypes = ["files", "images", "videos", "audios"],
  assets,
  onEditAsset,
  onSelectAsset,
  selectedAssets,
  size = "M",
  onReorderAsset,
  title = null
}) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.KeyboardNavigable, { tagName: "article", children: [
    title && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 2, paddingBottom: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", variant: "delta", fontWeight: "semiBold", children: title }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: assets.map((asset, index) => {
      const isSelected = !!selectedAssets.find((currentAsset) => currentAsset.id === asset.id);
      if (onReorderAsset) {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 3, height: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(Draggable, { index, moveItem: onReorderAsset, id: asset.id, children: /* @__PURE__ */ jsxRuntime.jsx(
          AssetCard,
          {
            allowedTypes,
            asset,
            isSelected,
            onEdit: onEditAsset ? () => onEditAsset(asset) : void 0,
            onSelect: () => onSelectAsset(asset),
            size
          }
        ) }) }, asset.id);
      }
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 3, height: "100%", direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
        AssetCard,
        {
          allowedTypes,
          asset,
          isSelected,
          onEdit: onEditAsset ? () => onEditAsset(asset) : void 0,
          onSelect: () => onSelectAsset(asset),
          size
        },
        asset.id
      ) }, asset.id);
    }) })
  ] });
};
const CrumbSimpleMenuAsync = ({
  parentsToOmit = [],
  currentFolderId,
  onChangeFolder
}) => {
  const [shouldFetch, setShouldFetch] = React__namespace.useState(false);
  const { data, isLoading } = useFolderStructure({ enabled: shouldFetch });
  const { pathname } = reactRouterDom.useLocation();
  const [{ query }] = strapiAdmin.useQueryParams();
  const { formatMessage } = reactIntl.useIntl();
  const allAscendants = data && getFolderParents(data, currentFolderId);
  const filteredAscendants = allAscendants && allAscendants.filter(
    (ascendant) => typeof ascendant.id === "number" && !parentsToOmit.includes(ascendant.id) && ascendant.id !== null
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.CrumbSimpleMenu,
    {
      onOpen: () => setShouldFetch(true),
      onClose: () => setShouldFetch(false),
      "aria-label": formatMessage({
        id: getTrad("header.breadcrumbs.menu.label"),
        defaultMessage: "Get more ascendants folders"
      }),
      label: "...",
      children: [
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(designSystem.MenuItem, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { small: true, children: formatMessage({
          id: getTrad("content.isLoading"),
          defaultMessage: "Content is loading."
        }) }) }),
        filteredAscendants && filteredAscendants.map((ascendant) => {
          if (onChangeFolder) {
            return /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.MenuItem,
              {
                tag: "button",
                type: "button",
                onClick: () => onChangeFolder(Number(ascendant.id), ascendant.path),
                children: ascendant.label
              },
              ascendant.id
            );
          }
          const url = getFolderURL(pathname, query, {
            folder: typeof ascendant?.id === "string" ? ascendant.id : void 0,
            folderPath: ascendant?.path
          });
          return /* @__PURE__ */ jsxRuntime.jsx(designSystem.MenuItem, { isLink: true, href: url, children: ascendant.label }, ascendant.id);
        })
      ]
    }
  );
};
const Breadcrumbs = ({
  breadcrumbs,
  onChangeFolder,
  currentFolderId,
  ...props
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Breadcrumbs, { ...props, children: breadcrumbs.map((crumb, index) => {
    if (Array.isArray(crumb)) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        CrumbSimpleMenuAsync,
        {
          parentsToOmit: [...breadcrumbs].splice(index + 1, breadcrumbs.length - 1).map((parent) => parent.id),
          currentFolderId,
          onChangeFolder
        },
        `breadcrumb-${crumb?.id ?? "menu"}`
      );
    }
    const isCurrentFolderMediaLibrary = crumb.id === null && currentFolderId === void 0;
    if (currentFolderId !== crumb.id && !isCurrentFolderMediaLibrary) {
      if (onChangeFolder) {
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.CrumbLink,
          {
            type: "button",
            onClick: () => onChangeFolder(crumb.id, crumb.path),
            children: typeof crumb.label !== "string" && crumb.label?.id ? formatMessage(crumb.label) : crumb.label
          },
          `breadcrumb-${crumb?.id ?? "root"}`
        );
      }
      return /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.CrumbLink,
        {
          to: crumb.href,
          tag: reactRouterDom.Link,
          children: typeof crumb.label !== "string" && crumb.label?.id ? formatMessage(crumb.label) : crumb.label
        },
        `breadcrumb-${crumb?.id ?? "root"}`
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Crumb,
      {
        isCurrent: index + 1 === breadcrumbs.length,
        children: typeof crumb.label !== "string" && crumb.label?.id ? formatMessage(crumb.label) : crumb.label
      },
      `breadcrumb-${crumb?.id ?? "root"}`
    );
  }) });
};
const EmptyAssetCard = styledComponents.styled(designSystem.Box)`
  background: linear-gradient(
    180deg,
    rgba(234, 234, 239, 0) 0%,
    ${({ theme }) => theme.colors.neutral200} 100%
  );
  opacity: 0.33;
`;
const PlaceholderSize = {
  S: 138,
  M: 234
};
const EmptyAssetGrid = ({ count, size }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Grid, { size, children: Array(count).fill(null).map((_, idx) => /* @__PURE__ */ jsxRuntime.jsx(
    EmptyAssetCard,
    {
      height: `${PlaceholderSize[size]}px`,
      hasRadius: true
    },
    `empty-asset-card-${idx}`
  )) });
};
const EmptyAssets = ({
  icon: Icon = symbols.EmptyDocuments,
  content,
  action,
  size = "M",
  count = 12
}) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "relative", children: [
    /* @__PURE__ */ jsxRuntime.jsx(EmptyAssetGrid, { size, count }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { position: "absolute", top: 11, width: "100%", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "center", gap: 4, textAlign: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "center", gap: 6, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Icon, { width: "160px", height: "88px" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "p", textColor: "neutral600", children: content })
      ] }),
      action
    ] }) })
  ] });
};
const FolderCardContext = React.createContext({});
function useFolderCard() {
  return React.useContext(FolderCardContext);
}
const FauxClickWrapper = styledComponents.styled.button`
  height: 100%;
  left: 0;
  position: absolute;
  opacity: 0;
  top: 0;
  width: 100%;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;
const StyledFolder = styledComponents.styled(icons.Folder)`
  path {
    fill: currentColor;
  }
`;
const CardActionDisplay = styledComponents.styled(designSystem.Box)`
  display: none;
`;
const Card = styledComponents.styled(designSystem.Box)`
  &:hover,
  &:focus-within {
    ${CardActionDisplay} {
      display: ${({ $isCardActions }) => $isCardActions ? "block" : ""};
    }
  }
`;
const FolderCard = React__namespace.forwardRef(
  ({
    children,
    startAction = null,
    cardActions = null,
    ariaLabel,
    onClick,
    to,
    ...props
  }, ref) => {
    const generatedId = React__namespace.useId();
    const fodlerCtxValue = React__namespace.useMemo(() => ({ id: generatedId }), [generatedId]);
    return /* @__PURE__ */ jsxRuntime.jsx(FolderCardContext.Provider, { value: fodlerCtxValue, children: /* @__PURE__ */ jsxRuntime.jsxs(Card, { position: "relative", tabIndex: 0, $isCardActions: !!cardActions, ref, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        FauxClickWrapper,
        {
          to: to || void 0,
          as: to ? reactRouterDom.NavLink : "button",
          type: to ? void 0 : "button",
          onClick,
          tabIndex: -1,
          "aria-label": ariaLabel,
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          hasRadius: true,
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "neutral150",
          background: "neutral0",
          shadow: "tableShadow",
          padding: 3,
          gap: 2,
          cursor: "pointer",
          children: [
            startAction,
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Box,
              {
                hasRadius: true,
                background: "secondary100",
                color: "secondary500",
                paddingBottom: 2,
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 2,
                children: /* @__PURE__ */ jsxRuntime.jsx(StyledFolder, { width: "2.4rem", height: "2.4rem" })
              }
            ),
            children,
            /* @__PURE__ */ jsxRuntime.jsx(CardActionDisplay, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardAction, { right: 4, position: "end", children: cardActions }) })
          ]
        }
      )
    ] }) });
  }
);
const StyledBox = styledComponents.styled(designSystem.Flex)`
  user-select: none;
`;
const FolderCardBody = (props) => {
  const { id } = useFolderCard();
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledBox,
    {
      ...props,
      id: `${id}-title`,
      "data-testid": `${id}-title`,
      alignItems: "flex-start",
      direction: "column",
      maxWidth: "100%",
      overflow: "hidden",
      position: "relative"
    }
  );
};
const BoxOutline = styledComponents.styled(designSystem.Box)`
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: -2px;
  }
`;
const BoxTextDecoration = styledComponents.styled(BoxOutline)`
  text-decoration: none;
`;
const FolderCardBodyAction = ({ to, ...props }) => {
  if (to) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      BoxTextDecoration,
      {
        padding: 1,
        tag: reactRouterDom.NavLink,
        maxWidth: "100%",
        to,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(BoxOutline, { padding: 1, tag: "button", type: "button", maxWidth: "100%", ...props });
};
const FolderGridList = ({ title = null, children }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.KeyboardNavigable, { tagName: "article", children: [
    title && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", variant: "delta", fontWeight: "semiBold", children: title }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children })
  ] });
};
const SortPicker = ({ onChangeSort, value }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.SingleSelect,
    {
      size: "S",
      value,
      onChange: (value2) => onChangeSort(value2.toString()),
      "aria-label": formatMessage({
        id: getTrad("sort.label"),
        defaultMessage: "Sort by"
      }),
      placeholder: formatMessage({
        id: getTrad("sort.label"),
        defaultMessage: "Sort by"
      }),
      children: sortOptions.map((filter) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: filter.value, children: formatMessage({ id: getTrad(filter.key), defaultMessage: `${filter.value}` }) }, filter.key))
    }
  );
};
const VideoPreviewWrapper$1 = styledComponents.styled(designSystem.Box)`
  figure {
    width: ${({ theme }) => theme.spaces[7]};
    height: ${({ theme }) => theme.spaces[7]};
  }

  canvas,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const PreviewCell = ({ type, content }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (type === "folder") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Flex,
      {
        justifyContent: "center",
        background: "secondary100",
        width: "3.2rem",
        height: "3.2rem",
        borderRadius: "50%",
        children: /* @__PURE__ */ jsxRuntime.jsx(
          icons.Folder,
          {
            "aria-label": formatMessage({
              id: getTrad("header.actions.add-assets.folder"),
              defaultMessage: "folder"
            }),
            fill: "secondary500",
            width: "1.6rem",
            height: "1.6rem"
          }
        )
      }
    );
  }
  const { alternativeText, ext, formats, mime, name: name2, url } = content;
  if (mime?.includes(AssetType.Image)) {
    const mediaURL = prefixFileUrlWithBackendUrl(formats?.thumbnail?.url) ?? prefixFileUrlWithBackendUrl(url);
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Avatar.Item,
      {
        src: mediaURL,
        alt: alternativeText || void 0,
        preview: true,
        fallback: alternativeText
      }
    );
  }
  if (mime?.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsxRuntime.jsx(VideoPreviewWrapper$1, { children: /* @__PURE__ */ jsxRuntime.jsx(
      VideoPreview,
      {
        url: createAssetUrl(content, true) || "",
        mime,
        alt: alternativeText ?? name2
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "secondary100", color: "secondary600", width: "3.2rem", height: "3.2rem", children: getFileExtension(ext) });
};
const CellContent = ({ cellType, contentType, content, name: name2 }) => {
  const { formatDate, formatMessage } = reactIntl.useIntl();
  const contentValue = content[name2];
  switch (cellType) {
    case "image":
      return /* @__PURE__ */ jsxRuntime.jsx(PreviewCell, { type: contentType, content });
    case "date":
      if (typeof contentValue === "string") {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatDate(parseISO__default.default(contentValue), { dateStyle: "full" }) });
      }
    case "size":
      if (contentType === "folder")
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Typography,
          {
            "aria-label": formatMessage({
              id: "list.table.content.empty-label",
              defaultMessage: "This field is empty"
            }),
            children: "-"
          }
        );
      if (typeof contentValue === "string" || typeof contentValue === "number") {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatBytes(contentValue) });
      }
    case "ext":
      if (contentType === "folder")
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Typography,
          {
            "aria-label": formatMessage({
              id: "list.table.content.empty-label",
              defaultMessage: "This field is empty"
            }),
            children: "-"
          }
        );
      if (typeof contentValue === "string") {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: getFileExtension(contentValue)?.toUpperCase() });
      }
    case "text":
      if (typeof contentValue === "string") {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: contentValue });
      }
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Typography,
        {
          "aria-label": formatMessage({
            id: "list.table.content.empty-label",
            defaultMessage: "This field is empty"
          }),
          children: "-"
        }
      );
  }
};
const TableRows = ({
  onChangeFolder = null,
  onEditAsset,
  onEditFolder,
  onSelectOne,
  rows = [],
  selected = []
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleRowClickFn = (element, id, path, elementType) => {
    if (elementType === "asset") {
      onEditAsset(element);
    } else {
      if (onChangeFolder) {
        onChangeFolder(id, path);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: rows.map((element) => {
    const { path, id, isSelectable: isSelectable2, name: name2, folderURL, type: contentType } = element;
    const isSelected = !!selected.find(
      (currentRow) => currentRow.id === id && currentRow.type === contentType
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Tr,
      {
        onClick: () => handleRowClickFn(element, id, path || void 0, contentType),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Checkbox,
            {
              "aria-label": formatMessage(
                {
                  id: contentType === "asset" ? "list-assets-select" : "list.folder.select",
                  defaultMessage: contentType === "asset" ? "Select {name} asset" : "Select {name} folder"
                },
                { name: name2 }
              ),
              disabled: !isSelectable2,
              onCheckedChange: () => onSelectOne(element),
              checked: isSelected
            }
          ) }),
          tableHeaders.map(({ name: name22, type: cellType }) => {
            return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(
              CellContent,
              {
                content: element,
                cellType,
                contentType,
                name: name22
              }
            ) }, name22);
          }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "flex-end", children: [
            contentType === "folder" && (folderURL ? /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                tag: reactRouterDom.Link,
                label: formatMessage({
                  id: getTrad("list.folders.link-label"),
                  defaultMessage: "Access folder"
                }),
                to: folderURL,
                variant: "ghost",
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {})
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                tag: "button",
                label: formatMessage({
                  id: getTrad("list.folders.link-label"),
                  defaultMessage: "Access folder"
                }),
                onClick: () => onChangeFolder && onChangeFolder(id),
                variant: "ghost",
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {})
              }
            )),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                label: formatMessage({
                  id: getTrad("control-card.edit"),
                  defaultMessage: "Edit"
                }),
                onClick: () => contentType === "asset" ? onEditAsset(element) : onEditFolder(element),
                variant: "ghost",
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
              }
            )
          ] }) })
        ]
      },
      id
    );
  }) });
};
const TableList = ({
  assetCount = 0,
  folderCount = 0,
  indeterminate = false,
  onChangeSort = null,
  onChangeFolder = null,
  onEditAsset = null,
  onEditFolder = null,
  onSelectAll,
  onSelectOne,
  rows = [],
  selected = [],
  shouldDisableBulkSelect = false,
  sortQuery = ""
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [sortBy, sortOrder] = sortQuery.split(":");
  const handleClickSort = (isSorted, name2) => {
    const nextSortOrder = isSorted && sortOrder === "ASC" ? "DESC" : "ASC";
    const nextSort = `${name2}:${nextSortOrder}`;
    onChangeSort && onChangeSort(nextSort);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: tableHeaders.length + 2, rowCount: assetCount + folderCount + 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Checkbox,
        {
          "aria-label": formatMessage({
            id: getTrad("bulk.select.label"),
            defaultMessage: "Select all folders & assets"
          }),
          disabled: shouldDisableBulkSelect,
          onCheckedChange: (checked) => onSelectAll(checked, rows),
          checked: indeterminate && !shouldDisableBulkSelect ? "indeterminate" : (assetCount > 0 || folderCount > 0) && selected.length === assetCount + folderCount
        }
      ) }),
      tableHeaders.map(({ metadatas: { label, isSortable }, name: name2, key }) => {
        const isSorted = sortBy === name2;
        const isUp = sortOrder === "ASC";
        const tableHeaderLabel = formatMessage(label);
        const sortLabel = formatMessage(
          { id: "list.table.header.sort", defaultMessage: "Sort on {label}" },
          { label: tableHeaderLabel }
        );
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Th,
          {
            action: isSorted && /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                label: sortLabel,
                onClick: () => handleClickSort(isSorted, name2),
                variant: "ghost",
                children: isUp ? /* @__PURE__ */ jsxRuntime.jsx(icons.CaretUp, {}) : /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {})
              }
            ),
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { label: isSortable ? sortLabel : tableHeaderLabel, children: isSortable ? /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Typography,
              {
                onClick: () => handleClickSort(isSorted, name2),
                tag: isSorted ? "span" : "button",
                textColor: "neutral600",
                variant: "sigma",
                children: tableHeaderLabel
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", variant: "sigma", children: tableHeaderLabel }) })
          },
          key
        );
      }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
        id: getTrad("list.table.header.actions"),
        defaultMessage: "actions"
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      TableRows,
      {
        onChangeFolder,
        onEditAsset,
        onEditFolder,
        rows,
        onSelectOne,
        selected
      }
    )
  ] });
};
const FilterTag = ({ attribute, filter, onClick, operator, value }) => {
  const { formatMessage, formatDate, formatTime } = reactIntl.useIntl();
  const handleClick = () => {
    onClick(filter);
  };
  const { fieldSchema } = attribute;
  const type = fieldSchema?.type;
  let formattedValue = value;
  if (type === "date") {
    formattedValue = formatDate(value, { dateStyle: "full" });
  }
  if (type === "datetime") {
    formattedValue = formatDate(value, { dateStyle: "full", timeStyle: "short" });
  }
  if (type === "time") {
    const [hour, minute] = value.split(":");
    const date = /* @__PURE__ */ new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
    formattedValue = formatTime(date, {
      hour: "numeric",
      minute: "numeric"
    });
  }
  const content = `${attribute.metadatas?.label} ${formatMessage({
    id: `components.FilterOptions.FILTER_TYPES.${operator}`,
    defaultMessage: operator
  })} ${formattedValue}`;
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tag, { onClick: handleClick, icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, {}), padding: 1, children: content });
};
const FilterList = ({ appliedFilters, filtersSchema, onRemoveFilter }) => {
  const handleClick = (filter) => {
    const nextFilters = appliedFilters.filter((prevFilter) => {
      const name2 = Object.keys(filter)[0];
      const filterName = filter[name2];
      if (filterName !== void 0) {
        const filterType = Object.keys(filterName)[0];
        const filterValue = filterName[filterType];
        if (typeof filterValue === "string") {
          const decodedValue = decodeURIComponent(filterValue);
          return prevFilter[name2]?.[filterType] !== decodedValue;
        }
      }
      return true;
    });
    onRemoveFilter(nextFilters);
  };
  return appliedFilters.map((filter, i) => {
    const attributeName = Object.keys(filter)[0];
    const attribute = filtersSchema.find(({ name: name2 }) => name2 === attributeName);
    if (!attribute) {
      return null;
    }
    const filterObj = filter[attributeName];
    const operator = Object.keys(filterObj)[0];
    let value = filterObj[operator];
    if (Array.isArray(value)) {
      value = value.join(", ");
    } else if (typeof value === "object") {
      value = Object.values(value).join(", ");
    } else {
      value = Array.isArray(value) || typeof value === "object" ? Object.values(value).join(", ") : decodeURIComponent(value);
    }
    let displayedOperator = operator;
    if (attribute?.name === "mime") {
      displayedOperator = operator === "$contains" ? "$eq" : "$ne";
      if (operator === "$not") {
        value = "file";
        displayedOperator = "$eq";
      }
      if (["image", "video"].includes(value[0]) && ["image", "video"].includes(value[1])) {
        value = "file";
        displayedOperator = "$ne";
      }
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      FilterTag,
      {
        attribute,
        filter,
        onClick: handleClick,
        operator: displayedOperator,
        value
      },
      `${attributeName}-${i}`
    );
  });
};
const FilterValueInput = ({
  label = "",
  onChange,
  options = [],
  type,
  value = ""
}) => {
  const { formatMessage } = reactIntl.useIntl();
  if (type === "date") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.DateTimePicker,
      {
        clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
        "aria-label": label,
        name: "datetimepicker",
        onChange: (date) => {
          const formattedDate = date ? new Date(date).toISOString() : "";
          onChange(formattedDate);
        },
        onClear: () => onChange(""),
        value: value ? new Date(value) : void 0
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.SingleSelect,
    {
      "aria-label": label,
      onChange: (value2) => onChange(value2.toString()),
      value,
      children: options?.map((option) => {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: option.value, children: option.label }, option.value);
      })
    }
  );
};
const getFilterList = ({
  fieldSchema: { type: fieldType, mainField }
}) => {
  const type = mainField?.schema.type ? mainField.schema.type : fieldType;
  switch (type) {
    case "enumeration": {
      return [
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$eq",
            defaultMessage: "is"
          },
          value: "$contains"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$ne",
            defaultMessage: "is not"
          },
          value: "$notContains"
        }
      ];
    }
    case "date": {
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gt",
            defaultMessage: "is greater than"
          },
          value: "$gt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gte",
            defaultMessage: "is greater than or equal to"
          },
          value: "$gte"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lt",
            defaultMessage: "is less than"
          },
          value: "$lt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lte",
            defaultMessage: "is less than or equal to"
          },
          value: "$lte"
        }
      ];
    }
    default:
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$eqi",
            defaultMessage: "is (case insensitive)"
          },
          value: "$eqi"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$null",
            defaultMessage: "is null"
          },
          value: "$null"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notNull",
            defaultMessage: "is not null"
          },
          value: "$notNull"
        }
      ];
  }
};
const FilterPopover = ({
  displayedFilters: displayedFilters2,
  filters,
  onSubmit,
  onToggle
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [modifiedData, setModifiedData] = React__namespace.useState({
    name: "createdAt",
    filter: "$eq",
    value: ""
  });
  const handleChangeFilterField = (value) => {
    const nextField = displayedFilters2.find((f) => f.name === value);
    if (!nextField) {
      return;
    }
    const {
      fieldSchema: { type, options }
    } = nextField;
    let filterValue = "";
    if (type === "enumeration") {
      filterValue = options?.[0].value || "";
    }
    const filter = getFilterList(nextField)[0].value;
    setModifiedData({ name: value.toString(), filter, value: filterValue });
  };
  const handleChangeOperator = (operator) => {
    if (modifiedData.name === "mime") {
      setModifiedData((prev) => ({ ...prev, filter: operator.toString(), value: "image" }));
    } else {
      setModifiedData((prev) => ({ ...prev, filter: operator.toString(), value: "" }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const encodedValue = encodeURIComponent(modifiedData.value);
    if (encodedValue) {
      if (modifiedData.name === "mime") {
        const alreadyAppliedFilters = filters.filter((filter) => {
          return Object.keys(filter)[0] === "mime";
        });
        if (modifiedData.value === "file") {
          const filtersWithoutMimeType = filters.filter((filter) => {
            return Object.keys(filter)[0] !== "mime";
          });
          let hasCurrentFilter = false;
          let filterToAdd2;
          if (modifiedData.filter === "$contains") {
            hasCurrentFilter = alreadyAppliedFilters.find((filter) => {
              if (typeof filter.mime?.$not !== "string" && !Array.isArray(filter.mime?.$not)) {
                return filter.mime?.$not?.$contains !== void 0;
              }
            }) !== void 0;
            filterToAdd2 = {
              mime: {
                $not: {
                  $contains: ["image", "video"]
                }
              }
            };
          } else {
            hasCurrentFilter = alreadyAppliedFilters.find((filter) => {
              return Array.isArray(filter.mime?.$contains);
            }) !== void 0;
            filterToAdd2 = {
              mime: {
                $contains: ["image", "video"]
              }
            };
          }
          if (hasCurrentFilter) {
            onToggle();
            return;
          }
          const nextFilters = [...filtersWithoutMimeType, filterToAdd2];
          onSubmit(nextFilters);
          onToggle();
          return;
        }
        const hasFilter2 = alreadyAppliedFilters.find((filter) => {
          const modifiedDataFilter = modifiedData.filter;
          return filter.mime && filter.mime[modifiedDataFilter] === modifiedData.value;
        }) !== void 0;
        if (hasFilter2) {
          onToggle();
          return;
        }
        const filtersWithoutFile = filters.filter((filter) => {
          const filterType = Object.keys(filter)[0];
          if (filterType !== "mime") {
            return true;
          }
          if (typeof filter.mime?.$not !== "string" && !Array.isArray(filter.mime?.$not) && filter.mime?.$not?.$contains !== void 0) {
            return false;
          }
          if (Array.isArray(filter?.mime?.$contains)) {
            return false;
          }
          return true;
        });
        const oppositeFilter = modifiedData.filter === "$contains" ? "$notContains" : "$contains";
        const oppositeFilterIndex = filtersWithoutFile.findIndex((filter) => {
          return filter.mime?.[oppositeFilter] === modifiedData.value;
        });
        const hasOppositeFilter = oppositeFilterIndex !== -1;
        const filterToAdd = { [modifiedData.name]: { [modifiedData.filter]: modifiedData.value } };
        if (!hasOppositeFilter) {
          const nextFilters = [...filtersWithoutFile, filterToAdd];
          onSubmit(nextFilters);
          onToggle();
          return;
        }
        if (hasOppositeFilter) {
          const nextFilters = filtersWithoutFile.slice();
          nextFilters.splice(oppositeFilterIndex, 1, filterToAdd);
          onSubmit(nextFilters);
          onToggle();
        }
        return;
      }
      const hasFilter = filters.find((filter) => {
        const modifiedDataName = modifiedData.name;
        return filter[modifiedDataName] && filter[modifiedDataName]?.[modifiedDataName] === encodedValue;
      }) !== void 0;
      if (!hasFilter) {
        const filterToAdd = { [modifiedData.name]: { [modifiedData.filter]: encodedValue } };
        const nextFilters = [...filters, filterToAdd];
        onSubmit(nextFilters);
      }
    }
    onToggle();
  };
  const appliedFilter = displayedFilters2.find((filter) => filter.name === modifiedData.name);
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { sideOffset: 4, children: /* @__PURE__ */ jsxRuntime.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { padding: 3, direction: "column", alignItems: "stretch", gap: 1, style: { minWidth: 184 }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SingleSelect,
      {
        "aria-label": formatMessage({
          id: "app.utils.select-field",
          defaultMessage: "Select field"
        }),
        name: "name",
        size: "M",
        onChange: handleChangeFilterField,
        value: modifiedData.name,
        children: displayedFilters2.map((filter) => {
          return /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: filter.name, children: filter.metadatas?.label }, filter.name);
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SingleSelect,
      {
        "aria-label": formatMessage({
          id: "app.utils.select-filter",
          defaultMessage: "Select filter"
        }),
        name: "filter",
        size: "M",
        value: modifiedData.filter,
        onChange: handleChangeOperator,
        children: getFilterList(appliedFilter).map((option) => {
          return /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: option.value, children: formatMessage(option.intlLabel) }, option.value);
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(
      FilterValueInput,
      {
        ...appliedFilter?.metadatas,
        ...appliedFilter?.fieldSchema,
        value: modifiedData.value,
        onChange: (value) => setModifiedData((prev) => ({ ...prev, value }))
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { size: "L", variant: "secondary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), type: "submit", fullWidth: true, children: formatMessage({ id: "app.utils.add-filter", defaultMessage: "Add filter" }) }) })
  ] }) }) });
};
const Filters = ({ appliedFilters, onChangeFilters }) => {
  const [open, setOpen] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Filter, {}), size: "S", children: formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      FilterPopover,
      {
        onToggle: () => setOpen((prev) => !prev),
        displayedFilters,
        filters: appliedFilters,
        onSubmit: onChangeFilters
      }
    ),
    appliedFilters && /* @__PURE__ */ jsxRuntime.jsx(
      FilterList,
      {
        appliedFilters,
        filtersSchema: displayedFilters,
        onRemoveFilter: onChangeFilters
      }
    )
  ] });
};
const PageSize = ({ onChangePageSize, pageSize }) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleChange = (value) => {
    onChangePageSize(Number(value));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.SingleSelect,
      {
        size: "S",
        "aria-label": formatMessage({
          id: "components.PageFooter.select",
          defaultMessage: "Entries per page"
        }),
        onChange: handleChange,
        value: pageSize.toString(),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "10", children: "10" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "20", children: "20" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "50", children: "50" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "100", children: "100" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", tag: "label", htmlFor: "page-size", children: formatMessage({
      id: "components.PageFooter.select",
      defaultMessage: "Entries per page"
    }) }) })
  ] });
};
const PaginationContext = React__namespace.createContext({ activePage: 1, pageCount: 1 });
const usePagination = () => React__namespace.useContext(PaginationContext);
const Pagination = ({
  children,
  activePage,
  pageCount,
  label = "pagination"
}) => {
  const paginationValue = React__namespace.useMemo(() => ({ activePage, pageCount }), [activePage, pageCount]);
  return /* @__PURE__ */ jsxRuntime.jsx(PaginationContext.Provider, { value: paginationValue, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { tag: "nav", "aria-label": label, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "ul", gap: 1, children }) }) });
};
const PaginationText = styledComponents.styled(designSystem.Typography)`
  line-height: revert;
`;
const linkWrapperStyles = styledComponents.css`
  padding: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ $active, theme }) => $active ? theme.shadows.filterShadow : void 0};
  text-decoration: none;
  display: flex;
  position: relative;
  outline: none;

  &:after {
    transition-property: all;
    transition-duration: 0.2s;
    border-radius: 8px;
    content: '';
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: -4px;
    right: -4px;
    border: 2px solid transparent;
  }

  &:focus-visible {
    outline: none;

    &:after {
      border-radius: 8px;
      content: '';
      position: absolute;
      top: -5px;
      bottom: -5px;
      left: -5px;
      right: -5px;
      border: 2px solid ${(props) => props.theme.colors.primary600};
    }
  }
`;
const LinkWrapperButton = styledComponents.styled.button`
  ${linkWrapperStyles}
`;
const LinkWrapperDiv = styledComponents.styled.div`
  ${linkWrapperStyles}
`;
LinkWrapperButton.defaultProps = { type: "button" };
const PageLinkWrapper = styledComponents.styled(LinkWrapperButton)`
  color: ${({ theme, $active }) => $active ? theme.colors.primary700 : theme.colors.neutral800};
  background: ${({ theme, $active }) => $active ? theme.colors.neutral0 : void 0};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  }
`;
const ActionLinkWrapper = styledComponents.styled(LinkWrapperButton)`
  font-size: 1.1rem;
  svg path {
    fill: ${(p) => p["aria-disabled"] ? p.theme.colors.neutral300 : p.theme.colors.neutral600};
  }

  &:focus,
  &:hover {
    svg path {
      fill: ${(p) => p["aria-disabled"] ? p.theme.colors.neutral300 : p.theme.colors.neutral700};
    }
  }

  ${(p) => p["aria-disabled"] ? `
  pointer-events: none;
    ` : void 0}
`;
const DotsWrapper = styledComponents.styled(LinkWrapperDiv)`
  color: ${({ theme }) => theme.colors.neutral800};
`;
const PreviousLink = ({ children, ...props }) => {
  const { activePage } = usePagination();
  const disabled = activePage === 1;
  return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsxs(ActionLinkWrapper, { "aria-disabled": disabled, tabIndex: disabled ? -1 : void 0, ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children }),
    /* @__PURE__ */ jsxRuntime.jsx(icons.ChevronLeft, { "aria-hidden": true })
  ] }) });
};
const NextLink = ({ children, ...props }) => {
  const { activePage, pageCount } = usePagination();
  const disabled = activePage === pageCount;
  return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsxs(ActionLinkWrapper, { "aria-disabled": disabled, tabIndex: disabled ? -1 : void 0, ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children }),
    /* @__PURE__ */ jsxRuntime.jsx(icons.ChevronRight, { "aria-hidden": true })
  ] }) });
};
const PageLink = ({ number, children, ...props }) => {
  const { activePage } = usePagination();
  const isActive = activePage === number;
  return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsxs(PageLinkWrapper, { ...props, $active: isActive, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children }),
    /* @__PURE__ */ jsxRuntime.jsx(PaginationText, { "aria-hidden": true, variant: "pi", fontWeight: isActive ? "bold" : "", children: number })
  ] }) });
};
const Dots = ({ children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsxs(DotsWrapper, { ...props, as: "div", children: [
  /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children }),
  /* @__PURE__ */ jsxRuntime.jsx(PaginationText, { "aria-hidden": true, small: true, children: "…" })
] }) });
const PaginationFooter = ({
  activePage,
  onChangePage,
  pagination: { pageCount }
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const previousActivePage = activePage - 1;
  const nextActivePage = activePage + 1;
  const firstLinks = [
    /* @__PURE__ */ jsxRuntime.jsx(
      PageLink,
      {
        number: 1,
        onClick: () => {
          onChangePage(1);
        },
        children: formatMessage(
          { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
          { page: 1 }
        )
      },
      1
    )
  ];
  if (pageCount <= 4) {
    const links = Array.from({ length: pageCount }).map((_, i) => i + 1).map((number) => {
      return /* @__PURE__ */ jsxRuntime.jsx(PageLink, { number, onClick: () => onChangePage(number), children: formatMessage(
        { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
        { page: number }
      ) }, number);
    });
    return /* @__PURE__ */ jsxRuntime.jsxs(Pagination, { activePage, pageCount, children: [
      /* @__PURE__ */ jsxRuntime.jsx(PreviousLink, { onClick: () => onChangePage(previousActivePage), children: formatMessage({
        id: "components.pagination.go-to-previous",
        defaultMessage: "Go to previous page"
      }) }),
      links,
      /* @__PURE__ */ jsxRuntime.jsx(NextLink, { onClick: () => onChangePage(nextActivePage), children: formatMessage({
        id: "components.pagination.go-to-next",
        defaultMessage: "Go to next page"
      }) })
    ] });
  }
  let firstLinksToCreate = [];
  const lastLinks = [];
  let lastLinksToCreate = [];
  const middleLinks = [];
  if (pageCount > 1) {
    lastLinks.push(
      /* @__PURE__ */ jsxRuntime.jsx(PageLink, { number: pageCount, onClick: () => onChangePage(pageCount), children: formatMessage(
        { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
        { page: pageCount }
      ) }, pageCount)
    );
  }
  if (activePage === 1 && pageCount >= 3) {
    firstLinksToCreate = [2];
  }
  if (activePage === 2 && pageCount >= 3) {
    if (pageCount === 5) {
      firstLinksToCreate = [2, 3, 4];
    } else if (pageCount === 3) {
      firstLinksToCreate = [2];
    } else {
      firstLinksToCreate = [2, 3];
    }
  }
  if (activePage === 4 && pageCount >= 3) {
    firstLinksToCreate = [2];
  }
  if (activePage === pageCount && pageCount >= 3) {
    lastLinksToCreate = [pageCount - 1];
  }
  if (activePage === pageCount - 2 && pageCount > 3) {
    lastLinksToCreate = [activePage + 1, activePage, activePage - 1];
  }
  if (activePage === pageCount - 3 && pageCount > 3 && activePage > 5) {
    lastLinksToCreate = [activePage + 2, activePage + 1, activePage, activePage - 1];
  }
  if (activePage === pageCount - 1 && pageCount > 3) {
    lastLinksToCreate = [activePage, activePage - 1];
  }
  lastLinksToCreate.forEach((number) => {
    lastLinks.unshift(
      /* @__PURE__ */ jsxRuntime.jsxs(PageLink, { number, onClick: () => onChangePage(number), children: [
        "Go to page ",
        number
      ] }, number)
    );
  });
  firstLinksToCreate.forEach((number) => {
    firstLinks.push(
      /* @__PURE__ */ jsxRuntime.jsx(PageLink, { number, onClick: () => onChangePage(number), children: formatMessage(
        { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
        { page: number }
      ) }, number)
    );
  });
  if (![1, 2].includes(activePage) && activePage <= pageCount - 3 && firstLinks.length + lastLinks.length < 6) {
    const middleLinksToCreate = [activePage - 1, activePage, activePage + 1];
    middleLinksToCreate.forEach((number) => {
      middleLinks.push(
        /* @__PURE__ */ jsxRuntime.jsx(PageLink, { number, onClick: () => onChangePage(number), children: formatMessage(
          { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
          { page: number }
        ) }, number)
      );
    });
  }
  const shouldShowDotsAfterFirstLink = pageCount > 5 || pageCount === 5 && (activePage === 1 || activePage === 5);
  const shouldShowMiddleDots = middleLinks.length > 2 && activePage > 4 && pageCount > 5;
  const beforeDotsLinksLength = shouldShowMiddleDots ? pageCount - activePage - 1 : pageCount - firstLinks.length - lastLinks.length;
  const afterDotsLength = shouldShowMiddleDots ? pageCount - firstLinks.length - lastLinks.length : pageCount - activePage - 1;
  return /* @__PURE__ */ jsxRuntime.jsxs(Pagination, { activePage, pageCount, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PreviousLink, { onClick: () => onChangePage(previousActivePage), children: formatMessage({
      id: "components.pagination.go-to-previous",
      defaultMessage: "Go to previous page"
    }) }),
    firstLinks,
    shouldShowMiddleDots && /* @__PURE__ */ jsxRuntime.jsx(Dots, { children: formatMessage(
      {
        id: "components.pagination.remaining-links",
        defaultMessage: "And {number} other links"
      },
      { number: beforeDotsLinksLength }
    ) }),
    middleLinks,
    shouldShowDotsAfterFirstLink && /* @__PURE__ */ jsxRuntime.jsx(Dots, { children: formatMessage(
      {
        id: "components.pagination.remaining-links",
        defaultMessage: "And {number} other links"
      },
      { number: afterDotsLength }
    ) }),
    lastLinks,
    /* @__PURE__ */ jsxRuntime.jsx(NextLink, { onClick: () => onChangePage(nextActivePage), children: formatMessage({
      id: "components.pagination.go-to-next",
      defaultMessage: "Go to next page"
    }) })
  ] });
};
const SearchAsset = ({ onChangeSearch, queryValue = null }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const [isOpen, setIsOpen] = React__namespace.useState(!!queryValue);
  const [value, setValue] = React__namespace.useState(queryValue || "");
  const wrapperRef = React__namespace.useRef(null);
  React__namespace.useLayoutEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        wrapperRef.current?.querySelector("input")?.focus();
      }, 0);
    }
  }, [isOpen]);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClear = () => {
    handleToggle();
    onChangeSearch(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    trackUsage("didSearchMediaLibraryElements", { location: "content-manager" });
    onChangeSearch(value);
  };
  if (isOpen) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref: wrapperRef, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.SearchForm, { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Searchbar,
      {
        name: "search",
        onClear: handleClear,
        onChange: (e) => setValue(e.target.value),
        clearLabel: formatMessage({
          id: getTrad("search.clear.label"),
          defaultMessage: "Clear the search"
        }),
        "aria-label": "search",
        size: "S",
        value,
        placeholder: formatMessage({
          id: getTrad("search.placeholder"),
          defaultMessage: "e.g: the first dog on the moon"
        }),
        children: formatMessage({ id: getTrad("search.label"), defaultMessage: "Search for an asset" })
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { label: "Search", onClick: handleToggle, children: /* @__PURE__ */ jsxRuntime.jsx(icons.Search, {}) });
};
const isSelectable = (allowedTypes, mime = "") => {
  if (!mime) return false;
  const fileType = mime.split("/")[0];
  return allowedTypes.includes(fileType) || allowedTypes.includes("file") && !["video", "image", "audio"].includes(fileType);
};
const TypographyMaxWidth = styledComponents.styled(designSystem.Typography)`
  max-width: 100%;
`;
const ActionContainer = styledComponents.styled(designSystem.Box)`
  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const BrowseStep = ({
  allowedTypes = [],
  assets: rawAssets,
  canCreate,
  canRead,
  folders = [],
  multiple = false,
  onAddAsset,
  onChangeFilters,
  onChangePage,
  onChangePageSize,
  onChangeSearch,
  onChangeSort,
  onChangeFolder,
  onEditAsset,
  onEditFolder,
  onSelectAllAsset,
  onSelectAsset,
  pagination,
  queryObject,
  selectedAssets
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [view, setView] = usePersistentState(localStorageKeys.modalView, viewOptions.GRID);
  const isGridView = view === viewOptions.GRID;
  const { data: currentFolder, isLoading: isCurrentFolderLoading } = useFolder(
    queryObject?.folder,
    {
      enabled: canRead && !!queryObject?.folder
    }
  );
  const singularTypes = toSingularTypes(allowedTypes);
  const assets = rawAssets.map((asset) => ({
    ...asset,
    isSelectable: isSelectable(singularTypes, asset?.mime),
    type: "asset"
  }));
  const breadcrumbs = !isCurrentFolderLoading ? getBreadcrumbDataCM(currentFolder) : void 0;
  const allAllowedAsset = getAllowedFiles(allowedTypes, assets);
  const areAllAssetSelected = allAllowedAsset.length > 0 && selectedAssets.length > 0 && allAllowedAsset.every(
    (asset) => selectedAssets.findIndex((currAsset) => currAsset.id === asset.id) !== -1
  );
  const hasSomeAssetSelected = allAllowedAsset.some(
    (asset) => selectedAssets.findIndex((currAsset) => currAsset.id === asset.id) !== -1
  );
  const isSearching = !!queryObject?._q;
  const isFiltering = !!queryObject?.filters?.$and?.length && queryObject.filters.$and.length > 0;
  const isSearchingOrFiltering = isSearching || isFiltering;
  const assetCount = assets.length;
  const folderCount = folders.length;
  const handleClickFolderCard = (...args) => {
    onChangeSearch("");
    onChangeFolder(...args);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
    onSelectAllAsset && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "flex-start", children: [
      (assetCount > 0 || folderCount > 0 || isFiltering) && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, wrap: "wrap", children: [
        multiple && isGridView && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Flex,
          {
            paddingLeft: 2,
            paddingRight: 2,
            background: "neutral0",
            hasRadius: true,
            borderColor: "neutral200",
            height: "3.2rem",
            children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Checkbox,
              {
                "aria-label": formatMessage({
                  id: getTrad("bulk.select.label"),
                  defaultMessage: "Select all assets"
                }),
                checked: !areAllAssetSelected && hasSomeAssetSelected ? "indeterminate" : areAllAssetSelected,
                onCheckedChange: onSelectAllAsset
              }
            )
          }
        ),
        isGridView && /* @__PURE__ */ jsxRuntime.jsx(SortPicker, { onChangeSort, value: queryObject?.sort }),
        /* @__PURE__ */ jsxRuntime.jsx(
          Filters,
          {
            appliedFilters: queryObject?.filters?.$and,
            onChangeFilters
          }
        )
      ] }),
      (assetCount > 0 || folderCount > 0 || isSearching) && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { marginLeft: "auto", shrink: 0, gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            label: isGridView ? formatMessage({
              id: "view-switch.list",
              defaultMessage: "List View"
            }) : formatMessage({
              id: "view-switch.grid",
              defaultMessage: "Grid View"
            }),
            onClick: () => setView(isGridView ? viewOptions.LIST : viewOptions.GRID),
            children: isGridView ? /* @__PURE__ */ jsxRuntime.jsx(icons.List, {}) : /* @__PURE__ */ jsxRuntime.jsx(icons.GridFour, {})
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(SearchAsset, { onChangeSearch, queryValue: queryObject._q || "" })
      ] })
    ] }) }),
    canRead && breadcrumbs?.length && breadcrumbs.length > 0 && currentFolder && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 3, children: /* @__PURE__ */ jsxRuntime.jsx(
      Breadcrumbs,
      {
        onChangeFolder,
        label: formatMessage({
          id: getTrad("header.breadcrumbs.nav.label"),
          defaultMessage: "Folders navigation"
        }),
        breadcrumbs,
        currentFolderId: queryObject?.folder
      }
    ) }),
    assetCount === 0 && folderCount === 0 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
      EmptyAssets,
      {
        size: "S",
        count: 6,
        action: canCreate && !isFiltering && !isSearching && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "secondary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: onAddAsset, children: formatMessage({
          id: getTrad("header.actions.add-assets"),
          defaultMessage: "Add new assets"
        }) }),
        content: (
          // eslint-disable-next-line no-nested-ternary
          isSearchingOrFiltering ? formatMessage({
            id: getTrad("list.assets-empty.title-withSearch"),
            defaultMessage: "There are no assets with the applied filters"
          }) : canCreate && !isSearching ? formatMessage({
            id: getTrad("list.assets.empty"),
            defaultMessage: "Upload your first assets..."
          }) : formatMessage({
            id: getTrad("list.assets.empty.no-permissions"),
            defaultMessage: "The asset list is empty"
          })
        )
      }
    ) }),
    !isGridView && (folderCount > 0 || assetCount > 0) && /* @__PURE__ */ jsxRuntime.jsx(
      TableList,
      {
        allowedTypes,
        assetCount,
        folderCount,
        indeterminate: !areAllAssetSelected && hasSomeAssetSelected,
        isFolderSelectionAllowed: false,
        onChangeSort,
        onChangeFolder: handleClickFolderCard,
        onEditAsset,
        onEditFolder,
        onSelectOne: onSelectAsset,
        onSelectAll: onSelectAllAsset,
        rows: [...folders.map((folder) => ({ ...folder, type: "folder" })), ...assets],
        selected: selectedAssets,
        shouldDisableBulkSelect: !multiple,
        sortQuery: queryObject?.sort ?? ""
      }
    ),
    isGridView && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      folderCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(
        FolderGridList,
        {
          title: (isSearchingOrFiltering && assetCount > 0 || !isSearchingOrFiltering) && formatMessage(
            {
              id: getTrad("list.folders.title"),
              defaultMessage: "Folders ({count})"
            },
            { count: folderCount }
          ) || "",
          children: folders.map((folder) => {
            return /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Grid.Item,
              {
                col: 3,
                direction: "column",
                alignItems: "stretch",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  FolderCard,
                  {
                    ariaLabel: folder.name,
                    id: `folder-${folder.id}`,
                    onClick: () => handleClickFolderCard(folder.id, folder.path),
                    cardActions: onEditFolder && /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.IconButton,
                      {
                        withTooltip: false,
                        label: formatMessage({
                          id: getTrad("list.folder.edit"),
                          defaultMessage: "Edit folder"
                        }),
                        onClick: () => onEditFolder(folder),
                        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                      }
                    ),
                    children: /* @__PURE__ */ jsxRuntime.jsx(FolderCardBody, { children: /* @__PURE__ */ jsxRuntime.jsx(
                      FolderCardBodyAction,
                      {
                        onClick: () => handleClickFolderCard(folder.id, folder.path),
                        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { tag: "h2", direction: "column", alignItems: "start", maxWidth: "100%", children: [
                          /* @__PURE__ */ jsxRuntime.jsxs(
                            TypographyMaxWidth,
                            {
                              fontWeight: "semiBold",
                              ellipsis: true,
                              textColor: "neutral800",
                              children: [
                                folder.name,
                                /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: "-" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntime.jsx(
                            TypographyMaxWidth,
                            {
                              tag: "span",
                              textColor: "neutral600",
                              variant: "pi",
                              ellipsis: true,
                              children: formatMessage(
                                {
                                  id: getTrad("list.folder.subtitle"),
                                  defaultMessage: "{folderCount, plural, =0 {# folder} one {# folder} other {# folders}}, {filesCount, plural, =0 {# asset} one {# asset} other {# assets}}"
                                },
                                {
                                  folderCount: folder.children?.count,
                                  filesCount: folder.files?.count
                                }
                              )
                            }
                          )
                        ] })
                      }
                    ) })
                  }
                )
              },
              `folder-${folder.id}`
            );
          })
        }
      ),
      assetCount > 0 && folderCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}) }),
      assetCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
        AssetGridList,
        {
          allowedTypes,
          size: "S",
          assets,
          onSelectAsset,
          selectedAssets,
          onEditAsset,
          title: (!isSearchingOrFiltering || isSearchingOrFiltering && folderCount > 0) && queryObject.page === 1 && formatMessage(
            {
              id: getTrad("list.assets.title"),
              defaultMessage: "Assets ({count})"
            },
            { count: assetCount }
          ) || ""
        }
      ) })
    ] }),
    pagination.pageCount > 0 && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", paddingTop: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        PageSize,
        {
          pageSize: queryObject.pageSize,
          onChangePageSize
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        PaginationFooter,
        {
          activePage: queryObject.page,
          onChangePage,
          pagination
        }
      )
    ] })
  ] });
};
const DialogFooter = ({ onClose, onValidate }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
    onValidate && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onValidate, children: formatMessage({ id: "global.finish", defaultMessage: "Finish" }) })
  ] });
};
const SelectedStep = ({
  selectedAssets,
  onSelectAsset,
  onReorderAsset
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 0, direction: "column", alignItems: "start", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: formatMessage(
        {
          id: getTrad("list.assets.to-upload"),
          defaultMessage: "{number, plural, =0 {No asset} one {1 asset} other {# assets}} ready to upload"
        },
        { number: selectedAssets.length }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
        id: getTrad("modal.upload-list.sub-header-subtitle"),
        defaultMessage: "Manage the assets before adding them to the Media Library"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      AssetGridList,
      {
        size: "S",
        assets: selectedAssets,
        onSelectAsset,
        selectedAssets,
        onReorderAsset
      }
    )
  ] });
};
const LoadingBody = styledComponents.styled(designSystem.Flex)`
  /* 80px are coming from the Tabs component that is not included in the ModalBody */
  min-height: ${() => `calc(60vh + 8rem)`};
`;
const AssetContent = ({
  allowedTypes = [],
  folderId = null,
  onClose,
  onAddAsset,
  onAddFolder,
  onChangeFolder,
  onValidate,
  multiple = false,
  initiallySelectedAssets = [],
  trackedLocation
}) => {
  const [assetToEdit, setAssetToEdit] = React__namespace.useState(void 0);
  const [folderToEdit, setFolderToEdit] = React__namespace.useState(void 0);
  const { formatMessage } = reactIntl.useIntl();
  const {
    canRead,
    canCreate,
    isLoading: isLoadingPermissions,
    canUpdate,
    canCopyLink,
    canDownload
  } = useMediaLibraryPermissions();
  const [
    { queryObject },
    {
      onChangeFilters,
      onChangePage,
      onChangePageSize,
      onChangeSort,
      onChangeSearch,
      onChangeFolder: onChangeFolderParam
    }
  ] = useModalQueryParams({ folder: folderId });
  const {
    data: { pagination, results: assets } = {},
    isLoading: isLoadingAssets,
    error: errorAssets
  } = useAssets({ skipWhen: !canRead, query: queryObject });
  const {
    data: folders,
    isLoading: isLoadingFolders,
    error: errorFolders
  } = useFolders({
    enabled: canRead && !containsAssetFilter(queryObject) && pagination?.page === 1,
    query: queryObject
  });
  const [
    selectedAssets,
    { selectOne, selectOnly, setSelections, selectMultiple, deselectMultiple }
  ] = useSelectionState(["id"], initiallySelectedAssets);
  const handleSelectAllAssets = () => {
    const allowedAssets = getAllowedFiles(allowedTypes, assets);
    if (!multiple) {
      return void 0;
    }
    const alreadySelected = allowedAssets.filter(
      (asset) => selectedAssets.findIndex((selectedAsset) => selectedAsset.id === asset.id) !== -1
    );
    if (alreadySelected.length > 0) {
      deselectMultiple(alreadySelected);
    } else {
      selectMultiple(allowedAssets);
    }
  };
  const handleSelectAsset = (asset) => {
    return multiple ? selectOne(asset) : selectOnly(asset);
  };
  const isLoading = isLoadingPermissions || isLoadingAssets || isLoadingFolders;
  const hasError = errorAssets || errorFolders;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(LoadingBody, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
        id: getTrad("content.isLoading"),
        defaultMessage: "Content is loading."
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(DialogFooter, { onClose })
    ] });
  }
  if (hasError) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {}),
      /* @__PURE__ */ jsxRuntime.jsx(DialogFooter, { onClose })
    ] });
  }
  if (!canRead) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.NoPermissions, {}),
      /* @__PURE__ */ jsxRuntime.jsx(DialogFooter, { onClose })
    ] });
  }
  if (assetToEdit) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      EditAssetContent,
      {
        onClose: () => setAssetToEdit(void 0),
        asset: assetToEdit,
        canUpdate,
        canCopyLink,
        canDownload,
        trackedLocation
      }
    );
  }
  if (folderToEdit) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      EditFolderContent,
      {
        folder: folderToEdit,
        onClose: () => setFolderToEdit(void 0),
        location: "content-manager",
        parentFolderId: queryObject?.folder
      }
    );
  }
  const handleMoveItem = (hoverIndex, destIndex) => {
    const offset = destIndex - hoverIndex;
    const orderedAssetsClone = selectedAssets.slice();
    const nextAssets = moveElement(orderedAssetsClone, hoverIndex, offset);
    setSelections(nextAssets);
  };
  const handleFolderChange = (folderId2, folderPath) => {
    onChangeFolder(folderId2);
    if (onChangeFolderParam) {
      onChangeFolderParam(folderId2, folderPath);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
      id: getTrad("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(TabsRoot, { variant: "simple", defaultValue: selectedAssets.length > 0 ? "selected" : "browse", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, justifyContent: "space-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.List, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "browse", children: formatMessage({
            id: getTrad("modal.nav.browse"),
            defaultMessage: "Browse"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Trigger, { value: "selected", children: [
            formatMessage({
              id: getTrad("modal.header.select-files"),
              defaultMessage: "Selected files"
            }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { marginLeft: 2, children: selectedAssets.length })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              variant: "secondary",
              onClick: () => onAddFolder({ folderId: queryObject?.folder }),
              children: formatMessage({
                id: getTrad("modal.upload-list.sub-header.add-folder"),
                defaultMessage: "Add folder"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: () => onAddAsset({ folderId: queryObject?.folder }), children: formatMessage({
            id: getTrad("modal.upload-list.sub-header.button"),
            defaultMessage: "Add more assets"
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Body, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "browse", children: /* @__PURE__ */ jsxRuntime.jsx(
          BrowseStep,
          {
            allowedTypes,
            assets,
            canCreate,
            canRead,
            folders,
            onSelectAsset: handleSelectAsset,
            selectedAssets,
            multiple,
            onSelectAllAsset: handleSelectAllAssets,
            onEditAsset: setAssetToEdit,
            onEditFolder: setFolderToEdit,
            pagination,
            queryObject,
            onAddAsset,
            onChangeFilters: (filters) => onChangeFilters(filters),
            onChangeFolder: handleFolderChange,
            onChangePage,
            onChangePageSize,
            onChangeSort: (sort) => onChangeSort(sort),
            onChangeSearch
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "selected", children: /* @__PURE__ */ jsxRuntime.jsx(
          SelectedStep,
          {
            selectedAssets,
            onSelectAsset: handleSelectAsset,
            onReorderAsset: handleMoveItem
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(DialogFooter, { onClose, onValidate: () => onValidate(selectedAssets) })
  ] });
};
const AssetDialog = ({ open = false, onClose, ...restProps }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(AssetContent, { onClose, ...restProps }) }) });
};
const TabsRoot = styledComponents.styled(designSystem.Tabs.Root)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Wrapper = styledComponents.styled(designSystem.Flex)`
  flex-direction: column;
`;
const IconWrapper = styledComponents.styled.div`
  font-size: 6rem;

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;
const MediaBox = styledComponents.styled(designSystem.Box)`
  border-style: dashed;
`;
const OpaqueBox = styledComponents.styled(designSystem.Box)`
  opacity: 0;
  cursor: pointer;
`;
const FromComputerForm = ({
  onClose,
  onAddAssets,
  trackedLocation
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [dragOver, setDragOver] = React__namespace.useState(false);
  const inputRef = React__namespace.useRef(null);
  const { trackUsage } = strapiAdmin.useTracking();
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  const handleChange = () => {
    const files2 = inputRef.current?.files;
    const assets = [];
    if (files2) {
      for (let i = 0; i < files2.length; i++) {
        const file = files2.item(i);
        if (file) {
          const asset = rawFileToAsset(file, AssetSource.Computer);
          assets.push(asset);
        }
      }
    }
    if (trackedLocation) {
      trackUsage("didSelectFile", { source: "computer", location: trackedLocation });
    }
    onAddAssets(assets);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files) {
      const files2 = e.dataTransfer.files;
      const assets = [];
      for (let i = 0; i < files2.length; i++) {
        const file = files2.item(i);
        if (file) {
          const asset = rawFileToAsset(file, AssetSource.Computer);
          assets.push(asset);
        }
      }
      onAddAssets(assets);
    }
    setDragOver(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("form", { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx("label", { children: /* @__PURE__ */ jsxRuntime.jsx(
      MediaBox,
      {
        paddingTop: 11,
        paddingBottom: 11,
        hasRadius: true,
        justifyContent: "center",
        borderColor: dragOver ? "primary500" : "neutral300",
        background: dragOver ? "primary100" : "neutral100",
        position: "relative",
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsxs(Wrapper, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(IconWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(icons.PlusCircle, { "aria-hidden": true, width: "3.2rem", height: "3.2rem" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 3, paddingBottom: 5, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral600", tag: "span", children: formatMessage({
            id: getTrad("input.label"),
            defaultMessage: "Drag & Drop here or"
          }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            OpaqueBox,
            {
              tag: "input",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              width: "100%",
              type: "file",
              multiple: true,
              name: "files",
              "aria-label": formatMessage({
                id: getTrad("input.label"),
                defaultMessage: "Drag & Drop here or"
              }),
              tabIndex: -1,
              ref: inputRef,
              zIndex: 1,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { position: "relative", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "button", onClick: handleClick, children: formatMessage({
            id: getTrad("input.button.label"),
            defaultMessage: "Browse files"
          }) }) })
        ] }) })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
      id: "app.components.Button.cancel",
      defaultMessage: "cancel"
    }) }) })
  ] });
};
const FromUrlForm = ({ onClose, onAddAsset, trackedLocation }) => {
  const [loading, setLoading] = React__namespace.useState(false);
  const [error, setError] = React__namespace.useState(void 0);
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const handleSubmit = async ({ urls }) => {
    setLoading(true);
    const urlArray = urls.split(/\r?\n/);
    try {
      const assets = await urlsToAssets(urlArray);
      if (trackedLocation) {
        trackUsage("didSelectFile", { source: "url", location: trackedLocation });
      }
      onAddAsset(assets);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    formik.Formik,
    {
      enableReinitialize: true,
      initialValues: {
        urls: ""
      },
      onSubmit: handleSubmit,
      validationSchema: urlSchema,
      validateOnChange: false,
      children: ({ values, errors, handleChange }) => /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { noValidate: true, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingBottom: 6, paddingTop: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Field.Root,
          {
            hint: formatMessage({
              id: getTrad("input.url.description"),
              defaultMessage: "Separate your URL links by a carriage return."
            }),
            error: error?.message || (errors.urls ? formatMessage({ id: errors.urls, defaultMessage: "An error occured" }) : void 0),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({ id: getTrad("input.url.label"), defaultMessage: "URL" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Textarea, { name: "urls", onChange: handleChange, value: values.urls }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "cancel" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", loading, children: formatMessage({
            id: getTrad("button.next"),
            defaultMessage: "Next"
          }) })
        ] })
      ] })
    }
  );
};
const AddAssetStep = ({ onClose, onAddAsset, trackedLocation }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
      id: getTrad("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Root, { variant: "simple", defaultValue: "computer", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Tabs.List,
          {
            "aria-label": formatMessage({
              id: getTrad("tabs.title"),
              defaultMessage: "How do you want to upload your assets?"
            }),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "computer", children: formatMessage({
                id: getTrad("modal.nav.computer"),
                defaultMessage: "From computer"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "url", children: formatMessage({
                id: getTrad("modal.nav.url"),
                defaultMessage: "From URL"
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {})
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "computer", children: /* @__PURE__ */ jsxRuntime.jsx(
        FromComputerForm,
        {
          onClose,
          onAddAssets: onAddAsset,
          trackedLocation
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "url", children: /* @__PURE__ */ jsxRuntime.jsx(
        FromUrlForm,
        {
          onClose,
          onAddAsset,
          trackedLocation
        }
      ) })
    ] })
  ] });
};
const UploadProgressWrapper = styledComponents.styled.div`
  height: 8.8rem;
  width: 100%;
`;
const Extension = styledComponents.styled.span`
  text-transform: uppercase;
`;
const UploadingAssetCard = ({
  asset,
  onCancel,
  onStatusChange,
  addUploadedFiles,
  folderId = null
}) => {
  const { upload, cancel, error, progress, status } = useUpload();
  const { formatMessage } = reactIntl.useIntl();
  let badgeContent = formatMessage({
    id: getTrad("settings.section.doc.label"),
    defaultMessage: "Doc"
  });
  if (asset.type === AssetType.Image) {
    badgeContent = formatMessage({
      id: getTrad("settings.section.image.label"),
      defaultMessage: "Image"
    });
  } else if (asset.type === AssetType.Video) {
    badgeContent = formatMessage({
      id: getTrad("settings.section.video.label"),
      defaultMessage: "Video"
    });
  } else if (asset.type === AssetType.Audio) {
    badgeContent = formatMessage({
      id: getTrad("settings.section.audio.label"),
      defaultMessage: "Audio"
    });
  }
  React__namespace.useEffect(() => {
    const uploadFile = async () => {
      const files2 = await upload(asset, folderId ? Number(folderId) : null);
      if (addUploadedFiles) {
        addUploadedFiles(files2);
      }
    };
    uploadFile();
  }, []);
  React__namespace.useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);
  const handleCancel = () => {
    cancel();
    onCancel(asset.rawFile);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Card, { borderColor: error ? "danger600" : "neutral150", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(UploadProgressWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(
        UploadProgress,
        {
          error: error || void 0,
          onCancel: handleCancel,
          progress
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardBody, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardTitle, { tag: "span", children: asset.name }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardSubtitle, { children: /* @__PURE__ */ jsxRuntime.jsx(Extension, { children: asset.ext }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingTop: 1, grow: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardBadge, { children: badgeContent }) })
      ] })
    ] }),
    error ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", textColor: "danger600", children: formatMessage(
      error?.message ? {
        id: getTrad(`apiError.${error.message}`),
        defaultMessage: error.message
        /* See issue: https://github.com/strapi/strapi/issues/13867
           A proxy might return an error, before the request reaches Strapi
           and therefore we need to handle errors gracefully.
        */
      } : {
        id: getTrad("upload.generic-error"),
        defaultMessage: "An error occured while uploading the file."
      }
    ) }) : void 0
  ] });
};
const Status = {
  Idle: "IDLE",
  Uploading: "UPLOADING",
  Intermediate: "INTERMEDIATE"
};
const PendingAssetStep = ({
  addUploadedFiles,
  folderId,
  onClose,
  onEditAsset,
  onRemoveAsset,
  assets,
  onClickAddAsset,
  onCancelUpload,
  onUploadSucceed,
  trackedLocation
}) => {
  const assetCountRef = React__namespace.useRef(0);
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const [uploadStatus, setUploadStatus] = React__namespace.useState(Status.Idle);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const assetsCountByType = assets.reduce(
      (acc, asset) => {
        const { type } = asset;
        if (type !== void 0 && !acc[type]) {
          acc[type] = 0;
        }
        if (type !== void 0) {
          const accType = acc[type];
          const currentCount = typeof accType === "string" ? accType : accType.toString();
          acc[type] = `${parseInt(currentCount, 10) + 1}`;
        }
        return acc;
      },
      {}
    );
    trackUsage("willAddMediaLibraryAssets", {
      location: trackedLocation,
      ...assetsCountByType
    });
    setUploadStatus(Status.Uploading);
  };
  const handleStatusChange = (status, file) => {
    if (status === "success" || status === "error") {
      assetCountRef.current++;
      if (assetCountRef.current === assets.length) {
        assetCountRef.current = 0;
        setUploadStatus(Status.Intermediate);
      }
    }
    if (status === "success") {
      onUploadSucceed(file);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
      id: getTrad("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 0, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: formatMessage(
            {
              id: getTrad("list.assets.to-upload"),
              defaultMessage: "{number, plural, =0 {No asset} one {1 asset} other {# assets}} ready to upload"
            },
            { number: assets.length }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
            id: getTrad("modal.upload-list.sub-header-subtitle"),
            defaultMessage: "Manage the assets before adding them to the Media Library"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { size: "S", onClick: onClickAddAsset, children: formatMessage({
          id: getTrad("header.actions.add-assets"),
          defaultMessage: "Add new assets"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.KeyboardNavigable, { tagName: "article", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: assets.map((asset) => {
        const assetKey = asset.url;
        if (uploadStatus === Status.Uploading || uploadStatus === Status.Intermediate) {
          return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 4, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            UploadingAssetCard,
            {
              addUploadedFiles,
              asset,
              id: assetKey,
              onCancel: onCancelUpload,
              onStatusChange: (status) => handleStatusChange(status, asset.rawFile),
              size: "S",
              folderId
            }
          ) }, assetKey);
        }
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 4, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
          AssetCard,
          {
            asset,
            size: "S",
            local: true,
            alt: asset.name,
            onEdit: onEditAsset,
            onRemove: onRemoveAsset
          },
          assetKey
        ) }, assetKey);
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSubmit, loading: uploadStatus === Status.Uploading, children: formatMessage(
        {
          id: getTrad("modal.upload-list.footer.button"),
          defaultMessage: "Upload {number, plural, one {# asset} other {# assets}} to the library"
        },
        { number: assets.length }
      ) })
    ] })
  ] });
};
const Steps = {
  AddAsset: "AddAsset",
  PendingAsset: "PendingAsset"
};
const UploadAssetDialog = ({
  initialAssetsToAdd,
  folderId = null,
  onClose = () => {
  },
  addUploadedFiles,
  trackedLocation,
  open,
  validateAssetsTypes = (_, cb) => cb()
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [step, setStep] = React__namespace.useState(initialAssetsToAdd ? Steps.PendingAsset : Steps.AddAsset);
  const [assets, setAssets] = React__namespace.useState(initialAssetsToAdd || []);
  const [assetToEdit, setAssetToEdit] = React__namespace.useState(void 0);
  const handleAddToPendingAssets = (nextAssets) => {
    validateAssetsTypes(nextAssets, () => {
      setAssets((prevAssets) => prevAssets.concat(nextAssets));
      setStep(Steps.PendingAsset);
    });
  };
  const moveToAddAsset = () => {
    setStep(Steps.AddAsset);
  };
  const handleCancelUpload = (file) => {
    const nextAssets = assets.filter((asset) => asset.rawFile !== file);
    setAssets(nextAssets);
    if (nextAssets.length === 0) {
      moveToAddAsset();
    }
  };
  const handleUploadSuccess = (file) => {
    const nextAssets = assets.filter((asset) => asset.rawFile !== file);
    setAssets(nextAssets);
    if (nextAssets.length === 0) {
      onClose();
    }
  };
  const handleAssetEditValidation = (nextAsset) => {
    if (nextAsset && typeof nextAsset !== "boolean") {
      const nextAssets = assets.map((asset) => asset === assetToEdit ? nextAsset : asset);
      setAssets(nextAssets);
    }
    setAssetToEdit(void 0);
  };
  const handleClose = () => {
    if (step === Steps.PendingAsset && assets.length > 0) {
      const confirm = window.confirm(
        formatMessage({
          id: "window.confirm.close-modal.files",
          defaultMessage: "Are you sure? You have some files that have not been uploaded yet."
        })
      );
      if (confirm) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  const handleRemoveAsset = (assetToRemove) => {
    const nextAssets = assets.filter((asset) => asset !== assetToRemove);
    setAssets(nextAssets);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Root, { open, onOpenChange: handleClose, children: [
    step === Steps.AddAsset && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      AddAssetStep,
      {
        onClose,
        onAddAsset: (assets2) => handleAddToPendingAssets(assets2),
        trackedLocation
      }
    ) }),
    step === Steps.PendingAsset && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      PendingAssetStep,
      {
        onClose: handleClose,
        assets,
        onEditAsset: setAssetToEdit,
        onRemoveAsset: handleRemoveAsset,
        onClickAddAsset: moveToAddAsset,
        onCancelUpload: handleCancelUpload,
        onUploadSucceed: handleUploadSuccess,
        initialAssetsToAdd,
        addUploadedFiles,
        folderId,
        trackedLocation
      }
    ) }),
    assetToEdit && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      EditAssetContent,
      {
        onClose: handleAssetEditValidation,
        asset: assetToEdit,
        canUpdate: true,
        canCopyLink: false,
        canDownload: false,
        trackedLocation
      }
    ) })
  ] });
};
const STEPS$1 = {
  AssetSelect: "SelectAsset",
  AssetUpload: "UploadAsset",
  FolderCreate: "FolderCreate"
};
const MediaLibraryDialog = ({
  onClose,
  onSelectAssets,
  allowedTypes = ["files", "images", "videos", "audios"]
}) => {
  const [step, setStep] = React__namespace.useState(STEPS$1.AssetSelect);
  const [folderId, setFolderId] = React__namespace.useState(null);
  switch (step) {
    case STEPS$1.AssetSelect:
      return /* @__PURE__ */ jsxRuntime.jsx(
        AssetDialog,
        {
          allowedTypes,
          folderId,
          open: true,
          onClose,
          onValidate: onSelectAssets,
          onAddAsset: () => setStep(STEPS$1.AssetUpload),
          onAddFolder: () => setStep(STEPS$1.FolderCreate),
          onChangeFolder: (folderId2) => setFolderId(folderId2),
          multiple: true
        }
      );
    case STEPS$1.FolderCreate:
      return /* @__PURE__ */ jsxRuntime.jsx(
        EditFolderDialog,
        {
          open: true,
          onClose: () => setStep(STEPS$1.AssetSelect),
          parentFolderId: folderId
        }
      );
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(UploadAssetDialog, { open: true, onClose: () => setStep(STEPS$1.AssetSelect), folderId });
  }
};
const DocAsset = styledComponents.styled(designSystem.Flex)`
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f9 121.48%);
`;
const VideoPreviewWrapper = styledComponents.styled(designSystem.Box)`
  canvas,
  video {
    max-width: 100%;
    height: 124px;
  }
`;
const AudioPreviewWrapper = styledComponents.styled(designSystem.Box)`
  canvas,
  audio {
    max-width: 100%;
  }
`;
const CarouselAsset = ({ asset }) => {
  if (asset.mime?.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsxRuntime.jsx(VideoPreviewWrapper, { height: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
      VideoPreview,
      {
        url: createAssetUrl(asset, true),
        mime: asset.mime,
        alt: asset.alternativeText || asset.name
      }
    ) });
  }
  if (asset.mime?.includes(AssetType.Audio)) {
    return /* @__PURE__ */ jsxRuntime.jsx(AudioPreviewWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(
      AudioPreview,
      {
        url: createAssetUrl(asset, true),
        alt: asset.alternativeText || asset.name
      }
    ) });
  }
  if (asset.mime?.includes(AssetType.Image)) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        tag: "img",
        maxHeight: "100%",
        maxWidth: "100%",
        src: createAssetUrl(asset, true),
        alt: asset.alternativeText || asset.name
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(DocAsset, { width: "100%", height: "100%", justifyContent: "center", hasRadius: true, children: asset.ext?.includes("pdf") ? /* @__PURE__ */ jsxRuntime.jsx(icons.FilePdf, { "aria-label": asset.alternativeText || asset.name, width: "24px", height: "32px" }) : /* @__PURE__ */ jsxRuntime.jsx(icons.File, { "aria-label": asset.alternativeText || asset.name, width: "24px", height: "32px" }) });
};
const CarouselAssetActions = ({
  asset,
  onDeleteAsset,
  onAddAsset,
  onEditAsset
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CarouselActions, { children: [
    onAddAsset && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        label: formatMessage({
          id: getTrad("control-card.add"),
          defaultMessage: "Add"
        }),
        onClick: () => onAddAsset(asset),
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(CopyLinkButton, { url: prefixFileUrlWithBackendUrl(asset.url) }),
    onDeleteAsset && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        label: formatMessage({
          id: "global.delete",
          defaultMessage: "Delete"
        }),
        onClick: () => onDeleteAsset(asset),
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
      }
    ),
    onEditAsset && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        label: formatMessage({
          id: getTrad("control-card.edit"),
          defaultMessage: "edit"
        }),
        onClick: onEditAsset,
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
      }
    )
  ] });
};
const TextAlignTypography = styledComponents.styled(designSystem.Typography)`
  align-items: center;
`;
const EmptyStateAsset = ({
  disabled = false,
  onClick,
  onDropAsset
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [dragOver, setDragOver] = React__namespace.useState(false);
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOver(false);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files) {
      const files2 = e.dataTransfer.files;
      const assets = [];
      for (let i = 0; i < files2.length; i++) {
        const file = files2.item(i);
        if (file) {
          const asset = rawFileToAsset(file, AssetSource.Computer);
          assets.push(asset);
        }
      }
      onDropAsset(assets);
    }
    setDragOver(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      borderStyle: dragOver ? "dashed" : void 0,
      borderWidth: dragOver ? "1px" : void 0,
      borderColor: dragOver ? "primary600" : void 0,
      direction: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      tag: "button",
      type: "button",
      disabled,
      onClick,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      gap: 3,
      style: { cursor: disabled ? "not-allowed" : "pointer" },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          icons.PlusCircle,
          {
            "aria-hidden": true,
            width: "3.2rem",
            height: "3.2rem",
            fill: disabled ? "neutral400" : "primary600"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          TextAlignTypography,
          {
            variant: "pi",
            fontWeight: "bold",
            textColor: "neutral600",
            style: { textAlign: "center" },
            tag: "span",
            children: formatMessage({
              id: getTrad("mediaLibraryInput.placeholder"),
              defaultMessage: "Click to add an asset or drag and drop one in this area"
            })
          }
        )
      ]
    }
  );
};
const CarouselAssets = React__namespace.forwardRef(
  ({
    assets,
    disabled = false,
    error,
    hint,
    label,
    labelAction,
    onAddAsset,
    onDeleteAsset,
    onDeleteAssetFromMediaLibrary,
    onDropAsset,
    onEditAsset,
    onNext,
    onPrevious,
    required = false,
    selectedAssetIndex,
    trackedLocation
  }, forwardedRef) => {
    const { formatMessage } = reactIntl.useIntl();
    const [isEditingAsset, setIsEditingAsset] = React__namespace.useState(false);
    const currentAsset = assets[selectedAssetIndex];
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.CarouselInput,
        {
          ref: forwardedRef,
          label,
          labelAction,
          secondaryLabel: currentAsset?.name,
          selectedSlide: selectedAssetIndex,
          previousLabel: formatMessage({
            id: getTrad("mediaLibraryInput.actions.previousSlide"),
            defaultMessage: "Previous slide"
          }),
          nextLabel: formatMessage({
            id: getTrad("mediaLibraryInput.actions.nextSlide"),
            defaultMessage: "Next slide"
          }),
          onNext,
          onPrevious,
          hint,
          error,
          required,
          actions: currentAsset ? /* @__PURE__ */ jsxRuntime.jsx(
            CarouselAssetActions,
            {
              asset: currentAsset,
              onDeleteAsset: disabled ? void 0 : onDeleteAsset,
              onAddAsset: disabled ? void 0 : onAddAsset,
              onEditAsset: onEditAsset ? () => setIsEditingAsset(true) : void 0
            }
          ) : void 0,
          children: assets.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.CarouselSlide,
            {
              label: formatMessage(
                {
                  id: getTrad("mediaLibraryInput.slideCount"),
                  defaultMessage: "{n} of {m} slides"
                },
                { n: 1, m: 1 }
              ),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                EmptyStateAsset,
                {
                  disabled,
                  onClick: onAddAsset,
                  onDropAsset
                }
              )
            }
          ) : assets.map((asset, index) => /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.CarouselSlide,
            {
              label: formatMessage(
                {
                  id: getTrad("mediaLibraryInput.slideCount"),
                  defaultMessage: "{n} of {m} slides"
                },
                { n: index + 1, m: assets.length }
              ),
              children: /* @__PURE__ */ jsxRuntime.jsx(CarouselAsset, { asset })
            },
            asset.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        EditAssetDialog,
        {
          open: isEditingAsset,
          onClose: (editedAsset) => {
            setIsEditingAsset(false);
            if (editedAsset === null) {
              onDeleteAssetFromMediaLibrary();
            }
            if (editedAsset && typeof editedAsset !== "boolean") {
              onEditAsset?.(editedAsset);
            }
          },
          asset: currentAsset,
          canUpdate: true,
          canCopyLink: true,
          canDownload: true,
          trackedLocation
        }
      )
    ] });
  }
);
const STEPS = {
  AssetSelect: "SelectAsset",
  AssetUpload: "UploadAsset",
  FolderCreate: "FolderCreate"
};
const MediaLibraryInput = React__namespace.forwardRef(
  ({
    attribute: { allowedTypes = ["videos", "files", "images", "audios"], multiple = false } = {},
    label,
    hint,
    disabled = false,
    labelAction = void 0,
    name: name2,
    required = false
  }, forwardedRef) => {
    const { formatMessage } = reactIntl.useIntl();
    const { onChange, value, error } = strapiAdmin.useField(name2);
    const fieldAllowedTypes = allowedTypes || ["files", "images", "videos", "audios"];
    const [uploadedFiles, setUploadedFiles] = React__namespace.useState([]);
    const [step, setStep] = React__namespace.useState(void 0);
    const [selectedIndex, setSelectedIndex] = React__namespace.useState(0);
    const [droppedAssets, setDroppedAssets] = React__namespace.useState();
    const [folderId, setFolderId] = React__namespace.useState(null);
    const { toggleNotification } = strapiAdmin.useNotification();
    React__namespace.useEffect(() => {
      if (step === void 0) {
        setUploadedFiles([]);
      }
    }, [step]);
    let selectedAssets = [];
    if (Array.isArray(value)) {
      selectedAssets = value;
    } else if (value) {
      selectedAssets = [value];
    }
    const handleValidation = (nextSelectedAssets) => {
      const value2 = multiple ? nextSelectedAssets : nextSelectedAssets[0];
      onChange(name2, value2);
      setStep(void 0);
    };
    const handleDeleteAssetFromMediaLibrary = () => {
      let nextValue;
      if (multiple) {
        const nextSelectedAssets = selectedAssets.filter(
          (_, assetIndex) => assetIndex !== selectedIndex
        );
        nextValue = nextSelectedAssets.length > 0 ? nextSelectedAssets : null;
      } else {
        nextValue = null;
      }
      const value2 = nextValue;
      onChange(name2, value2);
      setSelectedIndex(0);
    };
    const handleDeleteAsset = (asset) => {
      let nextValue;
      if (multiple) {
        const nextSelectedAssets = selectedAssets.filter((prevAsset) => prevAsset.id !== asset.id);
        nextValue = nextSelectedAssets.length > 0 ? nextSelectedAssets : null;
      } else {
        nextValue = null;
      }
      onChange(name2, nextValue);
      setSelectedIndex(0);
    };
    const handleAssetEdit = (asset) => {
      const nextSelectedAssets = selectedAssets.map(
        (prevAsset) => prevAsset.id === asset.id ? asset : prevAsset
      );
      onChange(name2, multiple ? nextSelectedAssets : nextSelectedAssets[0]);
    };
    const validateAssetsTypes = (assets, callback) => {
      const allowedAssets = getAllowedFiles(fieldAllowedTypes, assets);
      if (allowedAssets.length > 0) {
        callback(allowedAssets);
      } else {
        toggleNotification({
          type: "danger",
          timeout: 4e3,
          message: formatMessage(
            {
              id: getTrad("input.notification.not-supported"),
              defaultMessage: `You can't upload this type of file.`
            },
            {
              fileTypes: fieldAllowedTypes.join(",")
            }
          )
        });
      }
    };
    const handleAssetDrop = (assets) => {
      validateAssetsTypes(assets, (allowedAssets) => {
        setDroppedAssets(allowedAssets);
        setStep(STEPS.AssetUpload);
      });
    };
    if (multiple && selectedAssets.length > 0) {
      label = `${label} (${selectedIndex + 1} / ${selectedAssets.length})`;
    }
    const handleNext = () => {
      setSelectedIndex((current) => current < selectedAssets.length - 1 ? current + 1 : 0);
    };
    const handlePrevious = () => {
      setSelectedIndex((current) => current > 0 ? current - 1 : selectedAssets.length - 1);
    };
    const handleFilesUploadSucceeded = (uploadedFiles2) => {
      setUploadedFiles((prev) => [...prev, ...uploadedFiles2]);
    };
    let initiallySelectedAssets = selectedAssets;
    if (uploadedFiles.length > 0) {
      const allowedUploadedFiles = getAllowedFiles(
        fieldAllowedTypes,
        uploadedFiles
      );
      initiallySelectedAssets = multiple ? [...allowedUploadedFiles, ...selectedAssets] : [allowedUploadedFiles[0]];
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        CarouselAssets,
        {
          ref: forwardedRef,
          assets: selectedAssets,
          disabled,
          label,
          labelAction,
          onDeleteAsset: handleDeleteAsset,
          onDeleteAssetFromMediaLibrary: handleDeleteAssetFromMediaLibrary,
          onAddAsset: () => setStep(STEPS.AssetSelect),
          onDropAsset: handleAssetDrop,
          onEditAsset: handleAssetEdit,
          onNext: handleNext,
          onPrevious: handlePrevious,
          error,
          hint,
          required,
          selectedAssetIndex: selectedIndex,
          trackedLocation: "content-manager"
        }
      ),
      step === STEPS.AssetSelect && /* @__PURE__ */ jsxRuntime.jsx(
        AssetDialog,
        {
          allowedTypes: fieldAllowedTypes,
          initiallySelectedAssets,
          folderId,
          onClose: () => {
            setStep(void 0);
            setFolderId(null);
          },
          open: step === STEPS.AssetSelect,
          onValidate: handleValidation,
          multiple,
          onAddAsset: () => setStep(STEPS.AssetUpload),
          onAddFolder: () => setStep(STEPS.FolderCreate),
          onChangeFolder: (folder) => setFolderId(folder),
          trackedLocation: "content-manager"
        }
      ),
      step === STEPS.AssetUpload && /* @__PURE__ */ jsxRuntime.jsx(
        UploadAssetDialog,
        {
          open: step === STEPS.AssetUpload,
          onClose: () => setStep(STEPS.AssetSelect),
          initialAssetsToAdd: droppedAssets,
          addUploadedFiles: handleFilesUploadSucceeded,
          trackedLocation: "content-manager",
          folderId,
          validateAssetsTypes
        }
      ),
      step === STEPS.FolderCreate && /* @__PURE__ */ jsxRuntime.jsx(
        EditFolderDialog,
        {
          open: step === STEPS.FolderCreate,
          onClose: () => setStep(STEPS.AssetSelect),
          parentFolderId: folderId
        }
      )
    ] });
  }
);
const name = pluginPkg.strapi.name;
const admin = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: icons.Images,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Media Library"
      },
      permissions: PERMISSIONS.main,
      Component: () => Promise.resolve().then(() => require("./App-BS1gdte1.js")).then((mod) => ({ default: mod.Upload })),
      position: 4
    });
    app.addSettingsLink("global", {
      id: "media-library-settings",
      to: "media-library",
      intlLabel: {
        id: getTrad("plugin.name"),
        defaultMessage: "Media Library"
      },
      async Component() {
        const { ProtectedSettingsPage } = await Promise.resolve().then(() => require("./SettingsPage-BrLVND2K.js"));
        return { default: ProtectedSettingsPage };
      },
      permissions: PERMISSIONS.settings
    });
    app.addFields({
      type: "media",
      Component: MediaLibraryInput
    });
    app.addComponents([
      {
        name: "media-library",
        Component: MediaLibraryDialog
      }
    ]);
    app.registerPlugin({
      id: pluginId,
      name
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ca.json": () => Promise.resolve().then(() => require("./ca-BUpuZx8N.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-uGb_Pkq7.js")), "./translations/dk.json": () => Promise.resolve().then(() => require("./dk-Cd8oFO-O.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-BcOqhiNe.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-DWFtw_h4.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-D2bop66d.js")), "./translations/he.json": () => Promise.resolve().then(() => require("./he-BpxHjaZg.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-BKCWXl8t.js")), "./translations/ja.json": () => Promise.resolve().then(() => require("./ja-ajHzIJz6.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-Pzj-818C.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-h3gjldBy.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-esgZ7ltN.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-Cazr7Z5I.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-cbUnkHM5.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-H6MzFUxp.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-CZxC4dFY.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-C6unJZ8j.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-CY6AwX50.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-BniyNsD4.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-k_xAc6nm.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-CsZw0IpM.js")) }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
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
exports.AssetGridList = AssetGridList;
exports.Breadcrumbs = Breadcrumbs;
exports.EditAssetDialog = EditAssetDialog;
exports.EditFolderDialog = EditFolderDialog;
exports.EmptyAssets = EmptyAssets;
exports.FilterList = FilterList;
exports.FilterPopover = FilterPopover;
exports.FolderCard = FolderCard;
exports.FolderCardBody = FolderCardBody;
exports.FolderCardBodyAction = FolderCardBodyAction;
exports.FolderGridList = FolderGridList;
exports.PERMISSIONS = PERMISSIONS;
exports.SelectTree = SelectTree;
exports.SortPicker = SortPicker;
exports.TableList = TableList;
exports.UploadAssetDialog = UploadAssetDialog;
exports.admin = admin;
exports.containsAssetFilter = containsAssetFilter;
exports.displayedFilters = displayedFilters;
exports.getFolderURL = getFolderURL;
exports.getTrad = getTrad;
exports.localStorageKeys = localStorageKeys;
exports.normalizeAPIError = normalizeAPIError;
exports.pageSizes = pageSizes;
exports.pluginId = pluginId;
exports.sortOptions = sortOptions;
exports.useAssets = useAssets;
exports.useBulkRemove = useBulkRemove;
exports.useConfig = useConfig;
exports.useFolder = useFolder;
exports.useFolderCard = useFolderCard;
exports.useFolderStructure = useFolderStructure;
exports.useFolders = useFolders;
exports.useMediaLibraryPermissions = useMediaLibraryPermissions;
exports.usePersistentState = usePersistentState;
exports.useSelectionState = useSelectionState;
exports.viewOptions = viewOptions;
//# sourceMappingURL=index-D2Xgik1q.js.map
