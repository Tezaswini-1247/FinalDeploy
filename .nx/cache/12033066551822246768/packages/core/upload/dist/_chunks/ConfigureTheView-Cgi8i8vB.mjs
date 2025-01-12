import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useTracking, useNotification, Layouts, Page, ConfirmDialog } from "@strapi/admin/strapi-admin";
import { Box, Grid, Field, SingleSelect, SingleSelectOption, Link, Button, Dialog } from "@strapi/design-system";
import { ArrowLeft, Check } from "@strapi/icons";
import isEqual from "lodash/isEqual";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { g as getTrad, C as pageSizes, D as sortOptions, p as pluginId, z as useConfig } from "./index-BEfr-en9.mjs";
import "byte-size";
import "date-fns";
import "qs";
import { produce } from "immer";
import get from "lodash/get";
import set from "lodash/set";
const Settings = ({ sort = "", pageSize = 10, onChange: onChange2 }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "tableShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, children: [
        /* @__PURE__ */ jsx(Grid.Item, { s: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
          Field.Root,
          {
            hint: formatMessage({
              id: getTrad("config.entries.note"),
              defaultMessage: "Number of assets displayed by default in the Media Library"
            }),
            name: "pageSize",
            children: [
              /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                id: getTrad("config.entries.title"),
                defaultMessage: "Entries per page"
              }) }),
              /* @__PURE__ */ jsx(
                SingleSelect,
                {
                  onChange: (value) => onChange2({ target: { name: "pageSize", value } }),
                  value: pageSize,
                  children: pageSizes.map((pageSize2) => /* @__PURE__ */ jsx(SingleSelectOption, { value: pageSize2, children: pageSize2 }, pageSize2))
                }
              ),
              /* @__PURE__ */ jsx(Field.Hint, {})
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Grid.Item, { s: 12, col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
          Field.Root,
          {
            hint: formatMessage({
              id: getTrad("config.note"),
              defaultMessage: "Note: You can override this value in the media library."
            }),
            name: "sort",
            children: [
              /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                id: getTrad("config.sort.title"),
                defaultMessage: "Default sort order"
              }) }),
              /* @__PURE__ */ jsx(
                SingleSelect,
                {
                  onChange: (value) => onChange2({ target: { name: "sort", value } }),
                  value: sort,
                  "test-sort": sort,
                  "data-testid": "sort-select",
                  children: sortOptions.map((filter) => /* @__PURE__ */ jsx(
                    SingleSelectOption,
                    {
                      "data-testid": `sort-option-${filter.value}`,
                      value: filter.value,
                      children: formatMessage({ id: getTrad(filter.key), defaultMessage: `${filter.value}` })
                    },
                    filter.key
                  ))
                }
              ),
              /* @__PURE__ */ jsx(Field.Hint, {})
            ]
          }
        ) })
      ] })
    }
  );
};
const ON_CHANGE = `${pluginId}/ON_CHANGE`;
const SET_LOADED = `${pluginId}/SET_LOADED`;
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
  produce(state, (draftState) => {
    switch (action.type) {
      case ON_CHANGE: {
        if ("keys" in action && "value" in action && action.keys) {
          set(draftState, ["modifiedData", ...action.keys.split(".")], action.value);
        }
        break;
      }
      case SET_LOADED: {
        const reInitialise = init(get(draftState, ["modifiedData"], {}));
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
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { mutateConfig } = useConfig();
  const { isLoading: isSubmittingForm } = mutateConfig;
  const [showWarningSubmit, setWarningSubmit] = React.useState(false);
  const toggleWarningSubmit = () => setWarningSubmit((prevState) => !prevState);
  const [reducerState, dispatch] = React.useReducer(
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
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsx(Page.Main, { "aria-busy": isSubmittingForm, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        navigationAction: /* @__PURE__ */ jsx(
          Link,
          {
            tag: NavLink,
            startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}),
            to: `/plugins/${pluginId}`,
            id: "go-back",
            children: formatMessage({ id: getTrad("config.back"), defaultMessage: "Back" })
          }
        ),
        primaryAction: /* @__PURE__ */ jsx(
          Button,
          {
            size: "S",
            startIcon: /* @__PURE__ */ jsx(Check, {}),
            disabled: isEqual(modifiedData, initialData),
            type: "submit",
            children: formatMessage({ id: "global.save", defaultMessage: "Save" })
          }
        ),
        subtitle: formatMessage({
          id: getTrad("config.subtitle"),
          defaultMessage: "Define the view settings of the media library."
        }),
        title: formatMessage({
          id: getTrad("config.title"),
          defaultMessage: "Configure the view - Media Library"
        })
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(
      Settings,
      {
        "data-testid": "settings",
        pageSize: modifiedData.pageSize || "",
        sort: modifiedData.sort || "",
        onChange: handleChange
      }
    ) }),
    "x",
    /* @__PURE__ */ jsx(Dialog.Root, { open: showWarningSubmit, onOpenChange: toggleWarningSubmit, children: /* @__PURE__ */ jsx(ConfirmDialog, { onConfirm: handleConfirm, variant: "default", children: formatMessage({
      id: getTrad("config.popUpWarning.warning.updateAllSettings"),
      defaultMessage: "This will modify all your settings"
    }) }) })
  ] }) }) });
};
export {
  ConfigureTheView
};
//# sourceMappingURL=ConfigureTheView-Cgi8i8vB.mjs.map
