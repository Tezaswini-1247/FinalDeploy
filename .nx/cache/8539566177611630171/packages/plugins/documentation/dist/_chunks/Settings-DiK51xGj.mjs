import { jsx, jsxs } from "react/jsx-runtime";
import { Field, Button, Box, Flex, Typography, Grid, Toggle, TextInput, Main } from "@strapi/design-system";
import { translatedErrors, useRBAC, Layouts, useNotification, useAPIErrorHandler, Page } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import * as React from "react";
import { Check, Eye, EyeStriked } from "@strapi/icons";
import { Formik, Form } from "formik";
import { styled } from "styled-components";
import * as yup from "yup";
import { P as PERMISSIONS } from "./index-YnqsO7ap.mjs";
import { g as getTrad, u as useGetInfoQuery, c as useUpdateSettingsMutation } from "./getTrad-BCVqzyys.mjs";
const isBaseQueryError = (error) => {
  return error.name !== void 0;
};
const schema = yup.object().shape({
  restrictedAccess: yup.boolean(),
  password: yup.string().when("restrictedAccess", (value, initSchema) => {
    return value ? initSchema.required(translatedErrors.required.id).min(8).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number") : initSchema;
  })
});
const FieldActionWrapper = styled(Field.Action)`
  svg {
    height: 1.6rem;
    width: 1.6rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
const SettingsForm = ({ data, onSubmit }) => {
  const { formatMessage } = useIntl();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const { allowedActions } = useRBAC(PERMISSIONS);
  return /* @__PURE__ */ jsx(
    Formik,
    {
      enableReinitialize: true,
      initialValues: {
        restrictedAccess: data?.documentationAccess.restrictedAccess || false,
        password: ""
      },
      onSubmit,
      validationSchema: schema,
      children: ({
        handleSubmit,
        values,
        handleChange,
        errors,
        setFieldTouched,
        setFieldValue,
        setFieldError,
        dirty
      }) => {
        return /* @__PURE__ */ jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(
            Layouts.Header,
            {
              title: formatMessage({
                id: getTrad("plugin.name"),
                defaultMessage: "Documentation"
              }),
              subtitle: formatMessage({
                id: getTrad("pages.SettingsPage.header.description"),
                defaultMessage: "Configure the documentation plugin"
              }),
              primaryAction: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  startIcon: /* @__PURE__ */ jsx(Check, {}),
                  disabled: !dirty && allowedActions.canUpdate,
                  children: formatMessage({
                    id: getTrad("pages.SettingsPage.Button.save"),
                    defaultMessage: "Save"
                  })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(
            Box,
            {
              background: "neutral0",
              hasRadius: true,
              shadow: "filterShadow",
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 7,
              paddingRight: 7,
              children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h2", children: formatMessage({
                  id: "global.settings",
                  defaultMessage: "Settings"
                }) }),
                /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, children: [
                  /* @__PURE__ */ jsx(Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
                    Field.Root,
                    {
                      name: "restrictedAccess",
                      hint: formatMessage({
                        id: getTrad("pages.SettingsPage.toggle.hint"),
                        defaultMessage: "Make the documentation endpoint private"
                      }),
                      children: [
                        /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                          id: getTrad("pages.SettingsPage.toggle.label"),
                          defaultMessage: "Restricted Access"
                        }) }),
                        /* @__PURE__ */ jsx(
                          Toggle,
                          {
                            checked: values.restrictedAccess,
                            onChange: () => {
                              if (values.restrictedAccess === true) {
                                setFieldValue("password", "", false);
                                setFieldTouched("password", false, false);
                                setFieldError("password", void 0);
                              }
                              setFieldValue("restrictedAccess", !values.restrictedAccess, false);
                            },
                            onLabel: "On",
                            offLabel: "Off"
                          }
                        ),
                        /* @__PURE__ */ jsx(Field.Hint, {})
                      ]
                    }
                  ) }),
                  values.restrictedAccess && /* @__PURE__ */ jsx(Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
                    Field.Root,
                    {
                      name: "password",
                      error: errors.password ? formatMessage({
                        id: errors.password,
                        defaultMessage: errors.password
                      }) : void 0,
                      children: [
                        /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                          id: "global.password",
                          defaultMessage: "Password"
                        }) }),
                        /* @__PURE__ */ jsx(
                          TextInput,
                          {
                            placeholder: "**********",
                            type: passwordShown ? "text" : "password",
                            value: values.password,
                            onChange: handleChange,
                            endAction: /* @__PURE__ */ jsx(
                              FieldActionWrapper,
                              {
                                onClick: (e) => {
                                  e.stopPropagation();
                                  setPasswordShown((prev) => !prev);
                                },
                                label: formatMessage(
                                  passwordShown ? {
                                    id: "Auth.form.password.show-password",
                                    defaultMessage: "Show password"
                                  } : {
                                    id: "Auth.form.password.hide-password",
                                    defaultMessage: "Hide password"
                                  }
                                ),
                                children: passwordShown ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeStriked, {})
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(Field.Error, {})
                      ]
                    }
                  ) })
                ] })
              ] })
            }
          ) })
        ] });
      }
    }
  );
};
const SettingsPage = () => {
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = useAPIErrorHandler();
  const { data, isError, isLoading, isFetching } = useGetInfoQuery();
  const [updateSettings] = useUpdateSettingsMutation();
  const onUpdateSettings = async (body, formik) => {
    return updateSettings({ body }).unwrap().then(() => {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("notification.update.success"),
          defaultMessage: "Successfully updated settings"
        })
      });
    }).catch((err) => {
      if (isBaseQueryError(err) && err.name === "ValidationError") {
        toggleNotification({
          type: "danger",
          message: formatAPIError(err)
        });
      }
    });
  };
  if (isLoading || isFetching) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (isError) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsx(SettingsForm, { data, onSubmit: onUpdateSettings }) });
};
export {
  SettingsPage
};
