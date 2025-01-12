import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useNotification, useAPIErrorHandler, useAuth, Form, useForm, InputRenderer, useField, ConfirmDialog, useRBAC, Page, Layouts } from "@strapi/admin/strapi-admin";
import { Modal, Button, useId, Tabs, Flex, Typography, Divider, Box, Grid, Field, SingleSelect, SingleSelectOption, Dialog, IconButton, Table, Thead, Tr, Th, VisuallyHidden, Tbody, Td, EmptyStateLayout } from "@strapi/design-system";
import { EmptyDocuments } from "@strapi/icons/symbols";
import { useIntl } from "react-intl";
import { Plus, Check, Trash, Pencil } from "@strapi/icons";
import * as yup from "yup";
import { g as getTranslation, u as useCreateLocaleMutation, a as useGetDefaultLocalesQuery, b as useDeleteLocaleMutation, c as useUpdateLocaleMutation, d as useGetLocalesQuery, P as PERMISSIONS } from "./index-B0NijiBB.mjs";
const isBaseQueryError = (error) => {
  return error.name !== void 0;
};
const CreateLocale = ({ disabled, variant = "default" }) => {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = React.useState(false);
  return /* @__PURE__ */ jsxs(Modal.Root, { open: visible, onOpenChange: setVisible, children: [
    /* @__PURE__ */ jsx(Modal.Trigger, { children: /* @__PURE__ */ jsx(
      Button,
      {
        variant,
        disabled,
        startIcon: /* @__PURE__ */ jsx(Plus, {}),
        onClick: () => setVisible(true),
        size: "S",
        children: formatMessage({
          id: getTranslation("Settings.list.actions.add"),
          defaultMessage: "Add new locale"
        })
      }
    ) }),
    /* @__PURE__ */ jsx(CreateModal, { onClose: () => setVisible(false) })
  ] });
};
const LOCALE_SCHEMA = yup.object().shape({
  code: yup.string().nullable().required({
    id: "Settings.locales.modal.create.code.error",
    defaultMessage: "Please select a locale"
  }),
  name: yup.string().nullable().max(50, {
    id: "Settings.locales.modal.create.name.error.min",
    defaultMessage: "The locale display name can only be less than 50 characters."
  }).required({
    id: "Settings.locales.modal.create.name.error.required",
    defaultMessage: "Please give the locale a display name"
  }),
  isDefault: yup.boolean()
});
const initialFormValues = {
  code: "",
  name: "",
  isDefault: false
};
const CreateModal = ({ onClose }) => {
  const titleId = useId();
  const { toggleNotification } = useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = useAPIErrorHandler();
  const [createLocale] = useCreateLocaleMutation();
  const { formatMessage } = useIntl();
  const refetchPermissions = useAuth("CreateModal", (state) => state.refetchPermissions);
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
          id: getTranslation("Settings.locales.modal.create.success"),
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
  return /* @__PURE__ */ jsx(Modal.Content, { children: /* @__PURE__ */ jsxs(
    Form,
    {
      method: "POST",
      initialValues: initialFormValues,
      validationSchema: LOCALE_SCHEMA,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: formatMessage({
          id: getTranslation("Settings.list.actions.add"),
          defaultMessage: "Add new locale"
        }) }) }),
        /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Tabs.Root, { variant: "simple", defaultValue: "basic", children: [
          /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
            /* @__PURE__ */ jsx(Typography, { tag: "h2", variant: "beta", id: titleId, children: formatMessage({
              id: getTranslation("Settings.locales.modal.title"),
              defaultMessage: "Configuration"
            }) }),
            /* @__PURE__ */ jsxs(Tabs.List, { "aria-labelledby": titleId, children: [
              /* @__PURE__ */ jsx(Tabs.Trigger, { value: "basic", children: formatMessage({
                id: getTranslation("Settings.locales.modal.base"),
                defaultMessage: "Basic settings"
              }) }),
              /* @__PURE__ */ jsx(Tabs.Trigger, { value: "advanced", children: formatMessage({
                id: getTranslation("Settings.locales.modal.advanced"),
                defaultMessage: "Advanced settings"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsxs(Box, { paddingTop: 7, paddingBottom: 7, children: [
            /* @__PURE__ */ jsx(Tabs.Content, { value: "basic", children: /* @__PURE__ */ jsx(BaseForm, {}) }),
            /* @__PURE__ */ jsx(Tabs.Content, { value: "advanced", children: /* @__PURE__ */ jsx(AdvancedForm, {}) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Modal.Footer, { children: [
          /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }) }),
          /* @__PURE__ */ jsx(SubmitButton, {})
        ] })
      ]
    }
  ) });
};
const SubmitButton = () => {
  const { formatMessage } = useIntl();
  const isSubmitting = useForm("SubmitButton", (state) => state.isSubmitting);
  const modified = useForm("SubmitButton", (state) => state.modified);
  return /* @__PURE__ */ jsx(Button, { type: "submit", startIcon: /* @__PURE__ */ jsx(Check, {}), disabled: isSubmitting || !modified, children: formatMessage({ id: "global.save", defaultMessage: "Save" }) });
};
const BaseForm = ({ mode = "create" }) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const { data: defaultLocales, error } = useGetDefaultLocalesQuery();
  React.useEffect(() => {
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
        id: getTranslation("Settings.locales.modal.create.code.label"),
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
        id: getTranslation("Settings.locales.modal.create.name.label.description"),
        defaultMessage: "Locale will be displayed under that name in the administration panel"
      },
      label: {
        id: getTranslation("Settings.locales.modal.create.name.label"),
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
  return /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: translatedForm.map(({ size, ...field }) => /* @__PURE__ */ jsx(Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(FormRenderer, { ...field }) }, field.name)) });
};
const AdvancedForm = ({ isDefaultLocale }) => {
  const { formatMessage } = useIntl();
  const form = [
    {
      disabled: isDefaultLocale,
      hint: {
        id: getTranslation("Settings.locales.modal.advanced.setAsDefault.hint"),
        defaultMessage: "One default locale is required, change it by selecting another one"
      },
      label: {
        id: getTranslation("Settings.locales.modal.advanced.setAsDefault"),
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
  return /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: form.map(({ size, ...field }) => /* @__PURE__ */ jsx(Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(FormRenderer, { ...field }) }, field.name)) });
};
const FormRenderer = (field) => {
  switch (field.type) {
    case "enumeration":
      return /* @__PURE__ */ jsx(EnumerationInput, { ...field });
    default:
      return /* @__PURE__ */ jsx(InputRenderer, { ...field });
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
  const { value, error, onChange } = useField(name);
  const { data: defaultLocales = [] } = useGetDefaultLocalesQuery();
  const handleChange = (value2) => {
    if (Array.isArray(defaultLocales)) {
      const locale = defaultLocales.find((locale2) => locale2.code === value2);
      onChange(name, value2);
      onChange("name", locale.name);
    } else {
      onChange(name, value2);
    }
  };
  return /* @__PURE__ */ jsxs(Field.Root, { error, hint, name, required, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(
      SingleSelect,
      {
        disabled,
        onChange: handleChange,
        placeholder,
        value,
        children: options.map((option) => /* @__PURE__ */ jsx(SingleSelectOption, { value: option.value, children: option.label }, option.value))
      }
    ),
    /* @__PURE__ */ jsx(Field.Error, {}),
    /* @__PURE__ */ jsx(Field.Hint, {})
  ] });
};
const DeleteLocale = ({ id, name }) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const [visible, setVisible] = React.useState(false);
  const [deleteLocale] = useDeleteLocaleMutation();
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
          id: getTranslation("Settings.locales.modal.delete.success"),
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
  return /* @__PURE__ */ jsxs(Dialog.Root, { open: visible, onOpenChange: setVisible, children: [
    /* @__PURE__ */ jsx(Dialog.Trigger, { children: /* @__PURE__ */ jsx(
      IconButton,
      {
        onClick: () => setVisible(true),
        label: formatMessage(
          {
            id: getTranslation("Settings.list.actions.delete"),
            defaultMessage: "Delete {name} locale"
          },
          {
            name
          }
        ),
        variant: "ghost",
        children: /* @__PURE__ */ jsx(Trash, {})
      }
    ) }),
    /* @__PURE__ */ jsx(ConfirmDialog, { onConfirm: handleConfirm })
  ] });
};
const EditLocale = (props) => {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = React.useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        onClick: () => setVisible(true),
        label: formatMessage(
          {
            id: getTranslation("Settings.list.actions.edit"),
            defaultMessage: "Edit {name} locale"
          },
          {
            name: props.name
          }
        ),
        variant: "ghost",
        children: /* @__PURE__ */ jsx(Pencil, {})
      }
    ),
    /* @__PURE__ */ jsx(EditModal, { ...props, open: visible, onOpenChange: setVisible })
  ] });
};
const EditModal = ({ id, code, isDefault, name, open, onOpenChange }) => {
  const { toggleNotification } = useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = useAPIErrorHandler();
  const refetchPermissions = useAuth("EditModal", (state) => state.refetchPermissions);
  const { formatMessage } = useIntl();
  const titleId = useId();
  const [updateLocale] = useUpdateLocaleMutation();
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
          id: getTranslation("Settings.locales.modal.edit.success"),
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
  return /* @__PURE__ */ jsx(Modal.Root, { open, onOpenChange, children: /* @__PURE__ */ jsx(Modal.Content, { children: /* @__PURE__ */ jsxs(
    Form,
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
        /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: formatMessage(
          {
            id: getTranslation("Settings.list.actions.edit"),
            defaultMessage: "Edit a locale"
          },
          {
            name
          }
        ) }) }),
        /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Tabs.Root, { variant: "simple", defaultValue: "basic", children: [
          /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
            /* @__PURE__ */ jsx(Typography, { tag: "h2", variant: "beta", id: titleId, children: formatMessage({
              id: getTranslation("Settings.locales.modal.title"),
              defaultMessage: "Configuration"
            }) }),
            /* @__PURE__ */ jsxs(Tabs.List, { "aria-labelledby": titleId, children: [
              /* @__PURE__ */ jsx(Tabs.Trigger, { value: "basic", children: formatMessage({
                id: getTranslation("Settings.locales.modal.base"),
                defaultMessage: "Basic settings"
              }) }),
              /* @__PURE__ */ jsx(Tabs.Trigger, { value: "advanced", children: formatMessage({
                id: getTranslation("Settings.locales.modal.advanced"),
                defaultMessage: "Advanced settings"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsxs(Box, { paddingTop: 7, paddingBottom: 7, children: [
            /* @__PURE__ */ jsx(Tabs.Content, { value: "basic", children: /* @__PURE__ */ jsx(BaseForm, { mode: "edit" }) }),
            /* @__PURE__ */ jsx(Tabs.Content, { value: "advanced", children: /* @__PURE__ */ jsx(AdvancedForm, { isDefaultLocale: isDefault }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Modal.Footer, { children: [
          /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }) }),
          /* @__PURE__ */ jsx(SubmitButton, {})
        ] })
      ]
    }
  ) }) });
};
const LocaleTable = ({ locales = [], canDelete, canUpdate }) => {
  const [editLocaleId, setEditLocaleId] = React.useState();
  const { formatMessage } = useIntl();
  const handleClick = (localeId) => () => {
    if (canUpdate) {
      setEditLocaleId(localeId);
    }
  };
  return /* @__PURE__ */ jsxs(Table, { colCount: 4, rowCount: locales.length + 1, children: [
    /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: getTranslation("Settings.locales.row.id"),
        defaultMessage: "ID"
      }) }) }),
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: getTranslation("Settings.locales.row.displayName"),
        defaultMessage: "Display name"
      }) }) }),
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: getTranslation("Settings.locales.row.default-locale"),
        defaultMessage: "Default locale"
      }) }) }),
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: "Actions" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Tbody, { children: locales.map((locale) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs(
        Tr,
        {
          onClick: handleClick(locale.id),
          style: { cursor: canUpdate ? "pointer" : "default" },
          children: [
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: locale.id }) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: locale.name }) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: locale.isDefault ? formatMessage({
              id: getTranslation("Settings.locales.default"),
              defaultMessage: "Default"
            }) : null }) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, justifyContent: "flex-end", onClick: (e) => e.stopPropagation(), children: [
              canUpdate && /* @__PURE__ */ jsx(EditLocale, { ...locale }),
              canDelete && !locale.isDefault && /* @__PURE__ */ jsx(DeleteLocale, { ...locale })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
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
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const { data: locales, isLoading: isLoadingLocales, error } = useGetLocalesQuery();
  const {
    isLoading: isLoadingRBAC,
    allowedActions: { canUpdate, canCreate, canDelete }
  } = useRBAC(PERMISSIONS);
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const isLoading = isLoadingLocales || isLoadingRBAC;
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error || !Array.isArray(locales)) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsxs(Page.Main, { tabIndex: -1, children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        primaryAction: /* @__PURE__ */ jsx(CreateLocale, { disabled: !canCreate }),
        title: formatMessage({
          id: getTranslation("plugin.name"),
          defaultMessage: "Internationalization"
        }),
        subtitle: formatMessage({
          id: getTranslation("Settings.list.description"),
          defaultMessage: "Configure the settings"
        })
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: locales.length > 0 ? /* @__PURE__ */ jsx(LocaleTable, { locales, canDelete, canUpdate }) : /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: void 0, height: void 0 }),
        content: formatMessage({
          id: getTranslation("Settings.list.empty.title"),
          defaultMessage: "There are no locales"
        }),
        action: /* @__PURE__ */ jsx(CreateLocale, { disabled: !canCreate, variant: "secondary" })
      }
    ) })
  ] });
};
const ProtectedSettingsPage = () => {
  return /* @__PURE__ */ jsx(Page.Protect, { permissions: PERMISSIONS.read, children: /* @__PURE__ */ jsx(SettingsPage, {}) });
};
export {
  ProtectedSettingsPage,
  SettingsPage
};
//# sourceMappingURL=SettingsPage-BAx9nmep.mjs.map
