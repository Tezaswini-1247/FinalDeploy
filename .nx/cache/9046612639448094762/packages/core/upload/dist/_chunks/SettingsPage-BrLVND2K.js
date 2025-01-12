"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const isEqual = require("lodash/isEqual");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const index = require("./index-D2Xgik1q.js");
require("byte-size");
require("date-fns");
require("qs");
const immer = require("immer");
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
const set__default = /* @__PURE__ */ _interopDefault(set);
const init = (initialState2) => {
  return initialState2;
};
const initialState = {
  initialData: {
    responsiveDimensions: true,
    sizeOptimization: true,
    autoOrientation: false,
    videoPreview: false
  },
  modifiedData: {
    responsiveDimensions: true,
    sizeOptimization: true,
    autoOrientation: false,
    videoPreview: false
  }
};
const reducer = (state, action) => immer.produce(state, (drafState) => {
  switch (action.type) {
    case "GET_DATA_SUCCEEDED": {
      drafState.initialData = action.data;
      drafState.modifiedData = action.data;
      break;
    }
    case "ON_CHANGE": {
      set__default.default(drafState, ["modifiedData", ...action.keys.split(".")], action.value);
      break;
    }
    default:
      return state;
  }
});
const SettingsPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { get, put } = strapiAdmin.useFetchClient();
  const [{ initialData, modifiedData }, dispatch] = React__namespace.useReducer(reducer, initialState, init);
  const { data, isLoading, refetch } = reactQuery.useQuery({
    queryKey: ["upload", "settings"],
    async queryFn() {
      const {
        data: { data: data2 }
      } = await get("/upload/settings");
      return data2;
    }
  });
  React__namespace.useEffect(() => {
    if (data) {
      dispatch({
        type: "GET_DATA_SUCCEEDED",
        data
      });
    }
  }, [data]);
  const isSaveButtonDisabled = isEqual__default.default(initialData, modifiedData);
  const { mutateAsync, isLoading: isSubmitting } = reactQuery.useMutation(
    async (body) => {
      const { data: data2 } = await put("/upload/settings", body);
      return data2;
    },
    {
      onSuccess() {
        refetch();
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "notification.form.success.fields" })
        });
      },
      onError(err) {
        console.error(err);
      }
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaveButtonDisabled) {
      return;
    }
    await mutateAsync(modifiedData);
  };
  const handleChange = ({
    target: { name, value }
  }) => {
    dispatch({
      type: "ON_CHANGE",
      keys: name,
      value
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Page.Main, { tabIndex: -1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: formatMessage({
      id: index.getTrad("page.title"),
      defaultMessage: "Settings - Media Libray"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        strapiAdmin.Layouts.Header,
        {
          title: formatMessage({
            id: index.getTrad("settings.header.label"),
            defaultMessage: "Media Library"
          }),
          primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              disabled: isSaveButtonDisabled,
              loading: isSubmitting,
              type: "submit",
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
              size: "S",
              children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              })
            }
          ),
          subtitle: formatMessage({
            id: index.getTrad("settings.sub-header.label"),
            defaultMessage: "Configure the settings for the Media Library"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 12, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
          id: index.getTrad("settings.blockTitle"),
          defaultMessage: "Asset management"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 6, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Field.Root,
            {
              hint: formatMessage({
                id: index.getTrad("settings.form.responsiveDimensions.description"),
                defaultMessage: "Enabling this option will generate multiple formats (small, medium and large) of the uploaded asset."
              }),
              name: "responsiveDimensions",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: index.getTrad("settings.form.responsiveDimensions.label"),
                  defaultMessage: "Responsive friendly upload"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Toggle,
                  {
                    checked: modifiedData?.responsiveDimensions,
                    offLabel: formatMessage({
                      id: "app.components.ToggleCheckbox.off-label",
                      defaultMessage: "Off"
                    }),
                    onLabel: formatMessage({
                      id: "app.components.ToggleCheckbox.on-label",
                      defaultMessage: "On"
                    }),
                    onChange: (e) => {
                      handleChange({
                        target: { name: "responsiveDimensions", value: e.target.checked }
                      });
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Field.Root,
            {
              hint: formatMessage({
                id: index.getTrad("settings.form.sizeOptimization.description"),
                defaultMessage: "Enabling this option will reduce the image size and slightly reduce its quality."
              }),
              name: "sizeOptimization",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: index.getTrad("settings.form.sizeOptimization.label"),
                  defaultMessage: "Size optimization"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Toggle,
                  {
                    checked: modifiedData?.sizeOptimization,
                    offLabel: formatMessage({
                      id: "app.components.ToggleCheckbox.off-label",
                      defaultMessage: "Off"
                    }),
                    onLabel: formatMessage({
                      id: "app.components.ToggleCheckbox.on-label",
                      defaultMessage: "On"
                    }),
                    onChange: (e) => {
                      handleChange({
                        target: { name: "sizeOptimization", value: e.target.checked }
                      });
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Field.Root,
            {
              hint: formatMessage({
                id: index.getTrad("settings.form.autoOrientation.description"),
                defaultMessage: "Enabling this option will automatically rotate the image according to EXIF orientation tag."
              }),
              name: "autoOrientation",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: index.getTrad("settings.form.autoOrientation.label"),
                  defaultMessage: "Auto orientation"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Toggle,
                  {
                    checked: modifiedData?.autoOrientation,
                    offLabel: formatMessage({
                      id: "app.components.ToggleCheckbox.off-label",
                      defaultMessage: "Off"
                    }),
                    onLabel: formatMessage({
                      id: "app.components.ToggleCheckbox.on-label",
                      defaultMessage: "On"
                    }),
                    onChange: (e) => {
                      handleChange({
                        target: { name: "autoOrientation", value: e.target.checked }
                      });
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
              ]
            }
          ) })
        ] })
      ] }) }) }) }) })
    ] })
  ] });
};
const ProtectedSettingsPage = () => /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions: index.PERMISSIONS.settings, children: /* @__PURE__ */ jsxRuntime.jsx(SettingsPage, {}) });
exports.ProtectedSettingsPage = ProtectedSettingsPage;
exports.SettingsPage = SettingsPage;
//# sourceMappingURL=SettingsPage-BrLVND2K.js.map
