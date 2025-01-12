"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const reactRedux = require("react-redux");
const index = require("./index-CBRMnJQ5.js");
const schemas = require("./schemas-DBYv9gK8.js");
const useTypedSelector = reactRedux.useSelector;
const ReleasesSettingsPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { data, isLoading: isLoadingSettings } = index.useGetReleaseSettingsQuery();
  const [updateReleaseSettings, { isLoading: isSubmittingForm }] = index.useUpdateReleaseSettingsMutation();
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions["settings"]?.["releases"]
  );
  const {
    allowedActions: { canUpdate }
  } = strapiAdmin.useRBAC(permissions);
  const { timezoneList } = index.getTimezones(/* @__PURE__ */ new Date());
  const handleSubmit = async (body) => {
    const { defaultTimezone } = body;
    const isBodyTimezoneValid = timezoneList.some((timezone) => timezone.value === defaultTimezone);
    const newBody = !defaultTimezone || !isBodyTimezoneValid ? { defaultTimezone: null } : { ...body };
    try {
      const response = await updateReleaseSettings(newBody);
      if ("data" in response) {
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: "content-releases.pages.Settings.releases.setting.default-timezone-notification-success",
            defaultMessage: "Default timezone updated."
          })
        });
      } else if (strapiAdmin.isFetchError(response.error)) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(response.error)
        });
      } else {
        toggleNotification({
          type: "danger",
          message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
        });
      }
    } catch (error) {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  if (isLoadingSettings) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Releases"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Main, { "aria-busy": isLoadingSettings, tabIndex: -1, children: /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Form,
      {
        method: "PUT",
        initialValues: {
          defaultTimezone: data?.data.defaultTimezone
        },
        onSubmit: handleSubmit,
        validationSchema: schemas.SETTINGS_SCHEMA,
        children: ({ modified, isSubmitting }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              strapiAdmin.Layouts.Header,
              {
                primaryAction: canUpdate ? /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Button,
                  {
                    disabled: !modified || isSubmittingForm,
                    loading: isSubmitting,
                    startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                    type: "submit",
                    children: formatMessage({
                      id: "global.save",
                      defaultMessage: "Save"
                    })
                  }
                ) : null,
                title: formatMessage({
                  id: "content-releases.pages.Settings.releases.title",
                  defaultMessage: "Releases"
                }),
                subtitle: formatMessage({
                  id: "content-releases.pages.Settings.releases.description",
                  defaultMessage: "Create and manage content updates"
                })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.Flex,
              {
                direction: "column",
                background: "neutral0",
                alignItems: "stretch",
                padding: 6,
                gap: 6,
                shadow: "filterShadow",
                hasRadius: true,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
                    id: "content-releases.pages.Settings.releases.preferences.title",
                    defaultMessage: "Preferences"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(TimezoneDropdown, {}) }) })
                ]
              }
            ) })
          ] });
        }
      }
    ) })
  ] });
};
const TimezoneDropdown = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions["settings"]?.["releases"]
  );
  const {
    allowedActions: { canUpdate }
  } = strapiAdmin.useRBAC(permissions);
  const { formatMessage } = reactIntl.useIntl();
  const { timezoneList } = index.getTimezones(/* @__PURE__ */ new Date());
  const field = strapiAdmin.useField("defaultTimezone");
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      name: "defaultTimezone",
      hint: formatMessage({
        id: "content-releases.pages.Settings.releases.timezone.hint",
        defaultMessage: "The timezone of every release can still be changed individually. "
      }),
      error: field.error,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
          id: "content-releases.pages.Settings.releases.timezone.label",
          defaultMessage: "Default timezone"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Combobox,
          {
            autocomplete: { type: "list", filter: "contains" },
            onChange: (value) => field.onChange("defaultTimezone", value),
            onTextValueChange: (value) => field.onChange("defaultTimezone", value),
            onClear: () => field.onChange("defaultTimezone", ""),
            value: field.value,
            disabled: !canUpdate,
            children: timezoneList.map((timezone) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: timezone.value, children: timezone.value.replace(/&/, " ") }, timezone.value))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ]
    }
  );
};
const ProtectedReleasesSettingsPage = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions["settings"]?.["releases"]?.read
  );
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ReleasesSettingsPage, {}) });
};
exports.ProtectedReleasesSettingsPage = ProtectedReleasesSettingsPage;
//# sourceMappingURL=ReleasesSettingsPage-DhhwsfOv.js.map
