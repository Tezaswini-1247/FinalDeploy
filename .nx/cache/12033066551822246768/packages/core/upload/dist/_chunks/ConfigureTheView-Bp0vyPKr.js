"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const isEqual = require("lodash/isEqual");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-D2Xgik1q.js");
require("byte-size");
require("date-fns");
require("qs");
const immer = require("immer");
const get = require("lodash/get");
const set = require("lodash/set");
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
const isEqual__default = /* @__PURE__ */ _interopDefault(isEqual);
const get__default = /* @__PURE__ */ _interopDefault(get);
const set__default = /* @__PURE__ */ _interopDefault(set);
const Settings = ({ sort = "", pageSize = 10, onChange: onChange2 }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "tableShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { s: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Field.Root,
          {
            hint: formatMessage({
              id: index.getTrad("config.entries.note"),
              defaultMessage: "Number of assets displayed by default in the Media Library"
            }),
            name: "pageSize",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                id: index.getTrad("config.entries.title"),
                defaultMessage: "Entries per page"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.SingleSelect,
                {
                  onChange: (value) => onChange2({ target: { name: "pageSize", value } }),
                  value: pageSize,
                  children: index.pageSizes.map((pageSize2) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: pageSize2, children: pageSize2 }, pageSize2))
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { s: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Field.Root,
          {
            hint: formatMessage({
              id: index.getTrad("config.note"),
              defaultMessage: "Note: You can override this value in the media library."
            }),
            name: "sort",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                id: index.getTrad("config.sort.title"),
                defaultMessage: "Default sort order"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.SingleSelect,
                {
                  onChange: (value) => onChange2({ target: { name: "sort", value } }),
                  value: sort,
                  "test-sort": sort,
                  "data-testid": "sort-select",
                  children: index.sortOptions.map((filter) => /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.SingleSelectOption,
                    {
                      "data-testid": `sort-option-${filter.value}`,
                      value: filter.value,
                      children: formatMessage({ id: index.getTrad(filter.key), defaultMessage: `${filter.value}` })
                    },
                    filter.key
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
            ]
          }
        ) })
      ] })
    }
  );
};
const ON_CHANGE = `${index.pluginId}/ON_CHANGE`;
const SET_LOADED = `${index.pluginId}/SET_LOADED`;
const onChange = ({
  name,
  value
}) => ({
  type: ON_CHANGE,
  keys: name,
  value
});
const setLoaded = () => ({
  type: SET_LOADED
});
const initialState = {
  initialData: {},
  modifiedData: {}
};
const init = (configData) => {
  return {
    ...initialState,
    initialData: configData,
    modifiedData: configData
  };
};
const reducer = (state = initialState, action = {
  type: ""
}) => (
  // eslint-disable-next-line consistent-return
  immer.produce(state, (draftState) => {
    switch (action.type) {
      case ON_CHANGE: {
        if ("keys" in action && "value" in action && action.keys) {
          set__default.default(draftState, ["modifiedData", ...action.keys.split(".")], action.value);
        }
        break;
      }
      case SET_LOADED: {
        const reInitialise = init(get__default.default(draftState, ["modifiedData"], {}));
        draftState.initialData = reInitialise.initialData;
        draftState.modifiedData = reInitialise.modifiedData;
        break;
      }
      default:
        return draftState;
    }
  })
);
const ConfigureTheView = ({ config }) => {
  const { trackUsage } = strapiAdmin.useTracking();
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { mutateConfig } = index.useConfig();
  const { isLoading: isSubmittingForm } = mutateConfig;
  const [showWarningSubmit, setWarningSubmit] = React__namespace.useState(false);
  const toggleWarningSubmit = () => setWarningSubmit((prevState) => !prevState);
  const [reducerState, dispatch] = React__namespace.useReducer(
    reducer,
    initialState,
    () => init(config)
  );
  const typedDispatch = dispatch;
  const { initialData, modifiedData } = reducerState;
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleWarningSubmit();
  };
  const handleConfirm = async () => {
    trackUsage("willEditMediaLibraryConfig");
    await mutateConfig.mutateAsync(modifiedData);
    setWarningSubmit(false);
    typedDispatch(setLoaded());
    toggleNotification({
      type: "success",
      message: formatMessage({
        id: "notification.form.success.fields",
        defaultMessage: "Changes saved"
      })
    });
  };
  const handleChange = ({
    target: { name, value }
  }) => {
    typedDispatch(onChange({ name, value }));
  };
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Main, { "aria-busy": isSubmittingForm, children: /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Layouts.Header,
      {
        navigationAction: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Link,
          {
            tag: reactRouterDom.NavLink,
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}),
            to: `/plugins/${index.pluginId}`,
            id: "go-back",
            children: formatMessage({ id: index.getTrad("config.back"), defaultMessage: "Back" })
          }
        ),
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            size: "S",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
            disabled: isEqual__default.default(modifiedData, initialData),
            type: "submit",
            children: formatMessage({ id: "global.save", defaultMessage: "Save" })
          }
        ),
        subtitle: formatMessage({
          id: index.getTrad("config.subtitle"),
          defaultMessage: "Define the view settings of the media library."
        }),
        title: formatMessage({
          id: index.getTrad("config.title"),
          defaultMessage: "Configure the view - Media Library"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      Settings,
      {
        "data-testid": "settings",
        pageSize: modifiedData.pageSize || "",
        sort: modifiedData.sort || "",
        onChange: handleChange
      }
    ) }),
    "x",
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: showWarningSubmit, onOpenChange: toggleWarningSubmit, children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.ConfirmDialog, { onConfirm: handleConfirm, variant: "default", children: formatMessage({
      id: index.getTrad("config.popUpWarning.warning.updateAllSettings"),
      defaultMessage: "This will modify all your settings"
    }) }) })
  ] }) }) });
};
exports.ConfigureTheView = ConfigureTheView;
//# sourceMappingURL=ConfigureTheView-Bp0vyPKr.js.map
