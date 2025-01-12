"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const index = require("./index-5-6-poLu.js");
require("lodash/isEmpty");
const yup = require("yup");
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
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const layout = [
  {
    label: {
      id: index.getTrad("EditForm.inputToggle.label.email"),
      defaultMessage: "One account per email address"
    },
    hint: {
      id: index.getTrad("EditForm.inputToggle.description.email"),
      defaultMessage: "Disallow the user to create multiple accounts using the same email address with different authentication providers."
    },
    name: "unique_email",
    type: "boolean",
    size: 12
  },
  {
    label: {
      id: index.getTrad("EditForm.inputToggle.label.sign-up"),
      defaultMessage: "Enable sign-ups"
    },
    hint: {
      id: index.getTrad("EditForm.inputToggle.description.sign-up"),
      defaultMessage: "When disabled (OFF), the registration process is forbidden. No one can subscribe anymore no matter the used provider."
    },
    name: "allow_register",
    type: "boolean",
    size: 12
  },
  {
    label: {
      id: index.getTrad("EditForm.inputToggle.label.email-reset-password"),
      defaultMessage: "Reset password page"
    },
    hint: {
      id: index.getTrad("EditForm.inputToggle.description.email-reset-password"),
      defaultMessage: "URL of your application's reset password page."
    },
    placeholder: {
      id: index.getTrad("EditForm.inputToggle.placeholder.email-reset-password"),
      defaultMessage: "ex: https://youtfrontend.com/reset-password"
    },
    name: "email_reset_password",
    type: "string",
    size: 12
  },
  {
    label: {
      id: index.getTrad("EditForm.inputToggle.label.email-confirmation"),
      defaultMessage: "Enable email confirmation"
    },
    hint: {
      id: index.getTrad("EditForm.inputToggle.description.email-confirmation"),
      defaultMessage: "When enabled (ON), new registered users receive a confirmation email."
    },
    name: "email_confirmation",
    type: "boolean",
    size: 12
  },
  {
    label: {
      id: index.getTrad("EditForm.inputToggle.label.email-confirmation-redirection"),
      defaultMessage: "Redirection url"
    },
    hint: {
      id: index.getTrad("EditForm.inputToggle.description.email-confirmation-redirection"),
      defaultMessage: "After you confirmed your email, choose where you will be redirected."
    },
    placeholder: {
      id: index.getTrad("EditForm.inputToggle.placeholder.email-confirmation-redirection"),
      defaultMessage: "ex: https://youtfrontend.com/email-confirmation"
    },
    name: "email_confirmation_redirection",
    type: "string",
    size: 12
  }
];
const URL_REGEX = new RegExp("(^$)|((.+:\\/\\/.*)(d*)\\/?(.*))");
const schema = yup__namespace.object().shape({
  email_confirmation_redirection: yup__namespace.mixed().when("email_confirmation", {
    is: true,
    then: yup__namespace.string().matches(URL_REGEX).required(),
    otherwise: yup__namespace.string().nullable()
  }),
  email_reset_password: yup__namespace.string(admin.translatedErrors.string).matches(URL_REGEX, {
    id: admin.translatedErrors.regex.id,
    defaultMessage: "This is not a valid URL"
  }).nullable()
});
const ProtectedAdvancedSettingsPage = () => /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Protect, { permissions: index.PERMISSIONS.readAdvancedSettings, children: /* @__PURE__ */ jsxRuntime.jsx(AdvancedSettingsPage, {}) });
const AdvancedSettingsPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = admin.useNotification();
  const { notifyStatus } = designSystem.useNotifyAT();
  const queryClient = reactQuery.useQueryClient();
  const { get, put } = admin.useFetchClient();
  const { formatAPIError } = admin.useAPIErrorHandler();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate }
  } = admin.useRBAC({ update: index.PERMISSIONS.updateAdvancedSettings });
  const { isLoading: isLoadingData, data } = reactQuery.useQuery(
    ["users-permissions", "advanced"],
    async () => {
      const { data: data2 } = await get("/users-permissions/advanced");
      return data2;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: index.getTrad("Form.advancedSettings.data.loaded"),
            defaultMessage: "Advanced settings data has been loaded"
          })
        );
      },
      onError() {
        toggleNotification({
          type: "danger",
          message: formatMessage({
            id: index.getTrad("notification.error"),
            defaultMessage: "An error occured"
          })
        });
      }
    }
  );
  const isLoading = isLoadingForPermissions || isLoadingData;
  const submitMutation = reactQuery.useMutation((body) => put("/users-permissions/advanced", body), {
    async onSuccess() {
      await queryClient.invalidateQueries(["users-permissions", "advanced"]);
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: index.getTrad("notification.success.saved"),
          defaultMessage: "Saved"
        })
      });
    },
    onError(error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    },
    refetchActive: true
  });
  const { isLoading: isSubmittingForm } = submitMutation;
  const handleSubmit = async (body) => {
    submitMutation.mutate({
      ...body,
      email_confirmation_redirection: body.email_confirmation ? body.email_confirmation_redirection : ""
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { "aria-busy": isSubmittingForm, children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: formatMessage({
          id: index.getTrad("HeaderNav.link.advancedSettings"),
          defaultMessage: "Advanced Settings"
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Form, { onSubmit: handleSubmit, initialValues: data.settings, validationSchema: schema, children: ({ values, isSubmitting, modified }) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          admin.Layouts.Header,
          {
            title: formatMessage({
              id: index.getTrad("HeaderNav.link.advancedSettings"),
              defaultMessage: "Advanced Settings"
            }),
            primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Button,
              {
                loading: isSubmitting,
                type: "submit",
                disabled: !modified || !canUpdate,
                startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                size: "S",
                children: formatMessage({ id: "global.save", defaultMessage: "Save" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            background: "neutral0",
            hasRadius: true,
            shadow: "filterShadow",
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 7,
            paddingRight: 7,
            children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
                id: "global.settings",
                defaultMessage: "Settings"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 6, children: [
                {
                  label: {
                    id: index.getTrad("EditForm.inputSelect.label.role"),
                    defaultMessage: "Default role for authenticated users"
                  },
                  hint: {
                    id: index.getTrad("EditForm.inputSelect.description.role"),
                    defaultMessage: "It will attach the new authenticated user to the selected role."
                  },
                  options: data.roles.map((role) => ({
                    label: role.name,
                    value: role.type
                  })),
                  name: "default_role",
                  size: 6,
                  type: "enumeration"
                },
                ...layout
              ].map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Grid.Item,
                {
                  col: size,
                  direction: "column",
                  alignItems: "stretch",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    admin.InputRenderer,
                    {
                      ...field,
                      disabled: field.name === "email_confirmation_redirection" && values.email_confirmation === false,
                      label: formatMessage(field.label),
                      hint: field.hint ? formatMessage(field.hint) : void 0,
                      placeholder: field.placeholder ? formatMessage(field.placeholder) : void 0
                    }
                  )
                },
                field.name
              )) })
            ] })
          }
        ) })
      ] });
    } })
  ] });
};
exports.AdvancedSettingsPage = AdvancedSettingsPage;
exports.ProtectedAdvancedSettingsPage = ProtectedAdvancedSettingsPage;
//# sourceMappingURL=index-Cl_7ja60.js.map
