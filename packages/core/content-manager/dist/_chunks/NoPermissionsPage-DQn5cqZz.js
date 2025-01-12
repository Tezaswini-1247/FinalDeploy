"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const reactIntl = require("react-intl");
const index = require("./index-BN1pPa5v.js");
const NoPermissions = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Layouts.Header,
      {
        title: formatMessage({
          id: index.getTranslation("header.name"),
          defaultMessage: "Content"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.NoPermissions, {}) })
  ] });
};
exports.NoPermissions = NoPermissions;
//# sourceMappingURL=NoPermissionsPage-DQn5cqZz.js.map
