"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const symbols = require("@strapi/icons/symbols");
const reactIntl = require("react-intl");
const icons = require("@strapi/icons");
const yup = require("yup");
const index = require("./index-3yyF237r.js");
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
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const isBaseQueryError = (error) => {
  return error.name !== void 0;
};
const CreateLocale = ({ disabled, variant = "default" }) => {
  const { formatMessage } = reactIntl.useIntl();
  const [visible, setVisible] = React__namespace.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Root, { open: visible, onOpenChange: setVisible, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        variant,
        disabled,
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
        onClick: () => setVisible(true),
        size: "S",
        children: formatMessage({
          id: index.getTranslation("Settings.list.actions.add"),
          defaultMessage: "Add new locale"
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(CreateModal, { onClose: () => setVisible(false) })
  ] });
};
const LOCALE_SCHEMA = yup__namespace.object().shape({
  code: yup__namespace.string().nullable().required({
    id: "Settings.locales.modal.create.code.error",
    defaultMessage: "Please select a locale"
  }),
  name: yup__namespace.string().nullable().max(50, {
    id: "Settings.locales.modal.create.name.error.min",
    defaultMessage: "The locale display name can only be less than 50 characters."
  }).required({
    id: "Settings.locales.modal.create.name.error.required",
    defaultMessage: "Please give the locale a display name"
  }),
  isDefault: yup__namespace.boolean()
});
const initialFormValues = {
  code: "",
  name: "",
  isDefault: false
};
const CreateModal = ({ onClose }) => {
  const titleId = designSystem.useId();
  const { toggleNotification } = strapiAdmin.useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = strapiAdmin.useAPIErrorHandler();
  const [createLocale] = index.useCreateLocaleMutation();
  const { formatMessage } = reactIntl.useIntl();
  const refetchPermissions = strapiAdmin.useAuth("CreateModal", (state) => state.refetchPermissions);
  const handleSubmit = async (values, helpers) => {
    try {
      const res = await createLocale(values);
      if ("error" in res) {
        if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          helpers.setErrors(formatValidationErrors(res.error));
        } else {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
        }
        return;
      }
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: index.getTranslation("Settings.locales.modal.create.success"),
          defaultMessage: "Created locale"
        })
      });
      refetchPermissions();
      onClose();
    } catch (err) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred, please try again"
        })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    strapiAdmin.Form,
    {
      method: "POST",
      initialValues: initialFormValues,
      validationSchema: LOCALE_SCHEMA,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
          id: index.getTranslation("Settings.list.actions.add"),
          defaultMessage: "Add new locale"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Root, { variant: "simple", defaultValue: "basic", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", variant: "beta", id: titleId, children: formatMessage({
              id: index.getTranslation("Settings.locales.modal.title"),
              defaultMessage: "Configuration"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.List, { "aria-labelledby": titleId, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "basic", children: formatMessage({
                id: index.getTranslation("Settings.locales.modal.base"),
                defaultMessage: "Basic settings"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "advanced", children: formatMessage({
                id: index.getTranslation("Settings.locales.modal.advanced"),
                defaultMessage: "Advanced settings"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingTop: 7, paddingBottom: 7, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "basic", children: /* @__PURE__ */ jsxRuntime.jsx(BaseForm, {}) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "advanced", children: /* @__PURE__ */ jsxRuntime.jsx(AdvancedForm, {}) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(SubmitButton, {})
        ] })
      ]
    }
  ) });
};
const SubmitButton = () => {
  const { formatMessage } = reactIntl.useIntl();
  const isSubmitting = strapiAdmin.useForm("SubmitButton", (state) => state.isSubmitting);
  const modified = strapiAdmin.useForm("SubmitButton", (state) => state.modified);
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}), disabled: isSubmitting || !modified, children: formatMessage({ id: "global.save", defaultMessage: "Save" }) });
};
const BaseForm = ({ mode = "create" }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const { data: defaultLocales, error } = index.useGetDefaultLocalesQuery();
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  if (!Array.isArray(defaultLocales)) {
    return null;
  }
  const options = defaultLocales.map((locale) => ({
    label: locale.name,
    value: locale.code
  }));
  const translatedForm = [
    {
      disabled: mode !== "create",
      label: {
        id: index.getTranslation("Settings.locales.modal.create.code.label"),
        defaultMessage: "Locales"
      },
      name: "code",
      options,
      placeholder: {
        id: "components.placeholder.select",
        defaultMessage: "Select"
      },
      required: true,
      size: 6,
      type: "enumeration"
    },
    {
      hint: {
        id: index.getTranslation("Settings.locales.modal.create.name.label.description"),
        defaultMessage: "Locale will be displayed under that name in the administration panel"
      },
      label: {
        id: index.getTranslation("Settings.locales.modal.create.name.label"),
        defaultMessage: "Locale display name"
      },
      name: "name",
      required: true,
      size: 6,
      type: "string"
    }
  ].map((field) => ({
    ...field,
    hint: field.hint ? formatMessage(field.hint) : void 0,
    label: formatMessage(field.label),
    placeholder: field.placeholder ? formatMessage(field.placeholder) : void 0
  }));
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: translatedForm.map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(FormRenderer, { ...field }) }, field.name)) });
};
const AdvancedForm = ({ isDefaultLocale }) => {
  const { formatMessage } = reactIntl.useIntl();
  const form = [
    {
      disabled: isDefaultLocale,
      hint: {
        id: index.getTranslation("Settings.locales.modal.advanced.setAsDefault.hint"),
        defaultMessage: "One default locale is required, change it by selecting another one"
      },
      label: {
        id: index.getTranslation("Settings.locales.modal.advanced.setAsDefault"),
        defaultMessage: "Set as default locale"
      },
      name: "isDefault",
      size: 6,
      type: "boolean"
    }
  ].map((field) => ({
    ...field,
    hint: field.hint ? formatMessage(field.hint) : void 0,
    label: formatMessage(field.label)
  }));
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: form.map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(FormRenderer, { ...field }) }, field.name)) });
};
const FormRenderer = (field) => {
  switch (field.type) {
    case "enumeration":
      return /* @__PURE__ */ jsxRuntime.jsx(EnumerationInput, { ...field });
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.InputRenderer, { ...field });
  }
};
const EnumerationInput = ({
  disabled,
  hint,
  label,
  name,
  options,
  placeholder,
  required
}) => {
  const { value, error, onChange } = strapiAdmin.useField(name);
  const { data: defaultLocales = [] } = index.useGetDefaultLocalesQuery();
  const handleChange = (value2) => {
    if (Array.isArray(defaultLocales)) {
      const locale = defaultLocales.find((locale2) => locale2.code === value2);
      onChange(name, value2);
      onChange("name", locale.name);
    } else {
      onChange(name, value2);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error, hint, name, required, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SingleSelect,
      {
        disabled,
        onChange: handleChange,
        placeholder,
        value,
        children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: option.value, children: option.label }, option.value))
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {}),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
  ] });
};
const DeleteLocale = ({ id, name }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const [visible, setVisible] = React__namespace.useState(false);
  const [deleteLocale] = index.useDeleteLocaleMutation();
  const handleConfirm = async () => {
    try {
      const res = await deleteLocale(id);
      if ("error" in res) {
        toggleNotification({ type: "danger", message: formatAPIError(res.error) });
        return;
      }
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: index.getTranslation("Settings.locales.modal.delete.success"),
          defaultMessage: "Deleted locale"
        })
      });
      setVisible(false);
    } catch (err) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred, please try again"
        })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Root, { open: visible, onOpenChange: setVisible, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        onClick: () => setVisible(true),
        label: formatMessage(
          {
            id: index.getTranslation("Settings.list.actions.delete"),
            defaultMessage: "Delete {name} locale"
          },
          {
            name
          }
        ),
        variant: "ghost",
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.ConfirmDialog, { onConfirm: handleConfirm })
  ] });
};
const EditLocale = (props) => {
  const { formatMessage } = reactIntl.useIntl();
  const [visible, setVisible] = React__namespace.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        onClick: () => setVisible(true),
        label: formatMessage(
          {
            id: index.getTranslation("Settings.list.actions.edit"),
            defaultMessage: "Edit {name} locale"
          },
          {
            name: props.name
          }
        ),
        variant: "ghost",
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(EditModal, { ...props, open: visible, onOpenChange: setVisible })
  ] });
};
const EditModal = ({ id, code, isDefault, name, open, onOpenChange }) => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = strapiAdmin.useAPIErrorHandler();
  const refetchPermissions = strapiAdmin.useAuth("EditModal", (state) => state.refetchPermissions);
  const { formatMessage } = reactIntl.useIntl();
  const titleId = designSystem.useId();
  const [updateLocale] = index.useUpdateLocaleMutation();
  const handleSubmit = async ({ code: _code, ...data }, helpers) => {
    try {
      const res = await updateLocale({
        id,
        ...data
      });
      if ("error" in res) {
        if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          helpers.setErrors(formatValidationErrors(res.error));
        } else {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
        }
        return;
      }
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: index.getTranslation("Settings.locales.modal.edit.success"),
          defaultMessage: "Updated locale"
        })
      });
      refetchPermissions();
      onOpenChange(false);
    } catch (err) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred, please try again"
        })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    strapiAdmin.Form,
    {
      method: "PUT",
      onSubmit: handleSubmit,
      initialValues: {
        code,
        name,
        isDefault
      },
      validationSchema: LOCALE_SCHEMA,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage(
          {
            id: index.getTranslation("Settings.list.actions.edit"),
            defaultMessage: "Edit a locale"
          },
          {
            name
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Root, { variant: "simple", defaultValue: "basic", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", variant: "beta", id: titleId, children: formatMessage({
              id: index.getTranslation("Settings.locales.modal.title"),
              defaultMessage: "Configuration"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.List, { "aria-labelledby": titleId, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "basic", children: formatMessage({
                id: index.getTranslation("Settings.locales.modal.base"),
                defaultMessage: "Basic settings"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "advanced", children: formatMessage({
                id: index.getTranslation("Settings.locales.modal.advanced"),
                defaultMessage: "Advanced settings"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingTop: 7, paddingBottom: 7, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "basic", children: /* @__PURE__ */ jsxRuntime.jsx(BaseForm, { mode: "edit" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "advanced", children: /* @__PURE__ */ jsxRuntime.jsx(AdvancedForm, { isDefaultLocale: isDefault }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(SubmitButton, {})
        ] })
      ]
    }
  ) }) });
};
const LocaleTable = ({ locales = [], canDelete, canUpdate }) => {
  const [editLocaleId, setEditLocaleId] = React__namespace.useState();
  const { formatMessage } = reactIntl.useIntl();
  const handleClick = (localeId) => () => {
    if (canUpdate) {
      setEditLocaleId(localeId);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 4, rowCount: locales.length + 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: index.getTranslation("Settings.locales.row.id"),
        defaultMessage: "ID"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: index.getTranslation("Settings.locales.row.displayName"),
        defaultMessage: "Display name"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: index.getTranslation("Settings.locales.row.default-locale"),
        defaultMessage: "Default locale"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: "Actions" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: locales.map((locale) => /* @__PURE__ */ jsxRuntime.jsxs(React__namespace.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Tr,
        {
          onClick: handleClick(locale.id),
          style: { cursor: canUpdate ? "pointer" : "default" },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: locale.id }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: locale.name }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: locale.isDefault ? formatMessage({
              id: index.getTranslation("Settings.locales.default"),
              defaultMessage: "Default"
            }) : null }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, justifyContent: "flex-end", onClick: (e) => e.stopPropagation(), children: [
              canUpdate && /* @__PURE__ */ jsxRuntime.jsx(EditLocale, { ...locale }),
              canDelete && !locale.isDefault && /* @__PURE__ */ jsxRuntime.jsx(DeleteLocale, { ...locale })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        EditModal,
        {
          ...locale,
          onOpenChange: () => setEditLocaleId(void 0),
          open: editLocaleId === locale.id
        }
      )
    ] }, locale.id)) })
  ] });
};
const SettingsPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const { data: locales, isLoading: isLoadingLocales, error } = index.useGetLocalesQuery();
  const {
    isLoading: isLoadingRBAC,
    allowedActions: { canUpdate, canCreate, canDelete }
  } = strapiAdmin.useRBAC(index.PERMISSIONS);
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const isLoading = isLoadingLocales || isLoadingRBAC;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (error || !Array.isArray(locales)) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Page.Main, { tabIndex: -1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Layouts.Header,
      {
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(CreateLocale, { disabled: !canCreate }),
        title: formatMessage({
          id: index.getTranslation("plugin.name"),
          defaultMessage: "Internationalization"
        }),
        subtitle: formatMessage({
          id: index.getTranslation("Settings.list.description"),
          defaultMessage: "Configure the settings"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: locales.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(LocaleTable, { locales, canDelete, canUpdate }) : /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: void 0, height: void 0 }),
        content: formatMessage({
          id: index.getTranslation("Settings.list.empty.title"),
          defaultMessage: "There are no locales"
        }),
        action: /* @__PURE__ */ jsxRuntime.jsx(CreateLocale, { disabled: !canCreate, variant: "secondary" })
      }
    ) })
  ] });
};
const ProtectedSettingsPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions: index.PERMISSIONS.read, children: /* @__PURE__ */ jsxRuntime.jsx(SettingsPage, {}) });
};
exports.ProtectedSettingsPage = ProtectedSettingsPage;
exports.SettingsPage = SettingsPage;
//# sourceMappingURL=SettingsPage-BTgjb2KS.js.map
