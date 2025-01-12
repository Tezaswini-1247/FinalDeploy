"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const index1E5cXOO = require("./index-1E5cXO-o-lG3F5mWr.js");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const index = require("./index-Cr_zjDRa.js");
require("lodash/isEmpty");
const PropTypes = require("prop-types");
const yup = require("yup");
const icons = require("@strapi/icons");
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
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const schema = yup__namespace.object().shape({
  options: yup__namespace.object().shape({
    from: yup__namespace.object().shape({
      name: yup__namespace.string().required({
        id: admin.translatedErrors.required.id,
        defaultMessage: "This field is required"
      }),
      email: yup__namespace.string().email(admin.translatedErrors.email).required({
        id: admin.translatedErrors.required.id,
        defaultMessage: "This field is required"
      })
    }).required(),
    response_email: yup__namespace.string().email(admin.translatedErrors.email),
    object: yup__namespace.string().required({
      id: admin.translatedErrors.required.id,
      defaultMessage: "This field is required"
    }),
    message: yup__namespace.string().required({
      id: admin.translatedErrors.required.id,
      defaultMessage: "This field is required"
    })
  }).required(admin.translatedErrors.required.id)
});
const EmailForm = ({ template = {}, onToggle, open, onSubmit }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open, onOpenChange: onToggle, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Header, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Breadcrumbs,
        {
          label: `${formatMessage({
            id: index.getTrad("PopUpForm.header.edit.email-templates"),
            defaultMessage: "Edit email template"
          })}, ${template.display ? formatMessage({
            id: index.getTrad(template.display),
            defaultMessage: template.display
          }) : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Crumb, { children: formatMessage({
              id: index.getTrad("PopUpForm.header.edit.email-templates"),
              defaultMessage: "Edit email template"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Crumb, { isCurrent: true, children: template.display ? formatMessage({ id: index.getTrad(template.display), defaultMessage: template.display }) : "" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: `${formatMessage({
        id: index.getTrad("PopUpForm.header.edit.email-templates"),
        defaultMessage: "Edit email template"
      })}, ${template.display ? formatMessage({ id: index.getTrad(template.display), defaultMessage: template.display }) : ""}` }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Form, { onSubmit, initialValues: template, validationSchema: schema, children: ({ isSubmitting }) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 5, children: [
          {
            label: formatMessage({
              id: index.getTrad("PopUpForm.Email.options.from.name.label"),
              defaultMessage: "Shipper name"
            }),
            name: "options.from.name",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: index.getTrad("PopUpForm.Email.options.from.email.label"),
              defaultMessage: "Shipper email"
            }),
            name: "options.from.email",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: index.getTrad("PopUpForm.Email.options.response_email.label"),
              defaultMessage: "Response email"
            }),
            name: "options.response_email",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: index.getTrad("PopUpForm.Email.options.object.label"),
              defaultMessage: "Subject"
            }),
            name: "options.object",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: index.getTrad("PopUpForm.Email.options.message.label"),
              defaultMessage: "Message"
            }),
            name: "options.message",
            size: 12,
            type: "text"
          }
        ].map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Grid.Item,
          {
            col: size,
            direction: "column",
            alignItems: "stretch",
            children: /* @__PURE__ */ jsxRuntime.jsx(admin.InputRenderer, { ...field })
          },
          field.name
        )) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", children: "Cancel" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { loading: isSubmitting, type: "submit", children: "Finish" })
        ] })
      ] });
    } })
  ] }) });
};
EmailForm.defaultProps = {
  template: {}
};
EmailForm.propTypes = {
  template: PropTypes__default.default.shape({
    display: PropTypes__default.default.string,
    icon: PropTypes__default.default.string,
    options: PropTypes__default.default.shape({
      from: PropTypes__default.default.shape({
        name: PropTypes__default.default.string,
        email: PropTypes__default.default.string
      }),
      message: PropTypes__default.default.string,
      object: PropTypes__default.default.string,
      response_email: PropTypes__default.default.string
    })
  }),
  open: PropTypes__default.default.bool.isRequired,
  onSubmit: PropTypes__default.default.func.isRequired,
  onToggle: PropTypes__default.default.func.isRequired
};
const EmailTable = ({ canUpdate, onEditClick }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 3, rowCount: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "1%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
        id: index.getTrad("Email.template.table.icon.label"),
        defaultMessage: "icon"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: index.getTrad("Email.template.table.name.label"),
        defaultMessage: "name"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "1%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
        id: index.getTrad("Email.template.table.action.label"),
        defaultMessage: "action"
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tbody, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { onClick: () => onEditClick("reset_password"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "3.2rem", height: "3.2rem", padding: "0.8rem", children: /* @__PURE__ */ jsxRuntime.jsx(
          icons.ArrowClockwise,
          {
            "aria-label": formatMessage({
              id: "global.reset-password",
              defaultMessage: "Reset password"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
          id: "global.reset-password",
          defaultMessage: "Reset password"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            onClick: () => onEditClick("reset_password"),
            label: formatMessage({
              id: index.getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            variant: "ghost",
            disabled: !canUpdate,
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { onClick: () => onEditClick("email_confirmation"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "3.2rem", height: "3.2rem", padding: "0.8rem", children: /* @__PURE__ */ jsxRuntime.jsx(
          icons.Check,
          {
            "aria-label": formatMessage({
              id: index.getTrad("Email.template.email_confirmation"),
              defaultMessage: "Email address confirmation"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
          id: index.getTrad("Email.template.email_confirmation"),
          defaultMessage: "Email address confirmation"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            onClick: () => onEditClick("email_confirmation"),
            label: formatMessage({
              id: index.getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            variant: "ghost",
            disabled: !canUpdate,
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
          }
        ) })
      ] })
    ] })
  ] });
};
EmailTable.propTypes = {
  canUpdate: PropTypes__default.default.bool.isRequired,
  onEditClick: PropTypes__default.default.func.isRequired
};
const ProtectedEmailTemplatesPage = () => /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Protect, { permissions: index.PERMISSIONS.readEmailTemplates, children: /* @__PURE__ */ jsxRuntime.jsx(EmailTemplatesPage, {}) });
const EmailTemplatesPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = index1E5cXOO.useTracking();
  const { notifyStatus } = designSystem.useNotifyAT();
  const { toggleNotification } = admin.useNotification();
  const queryClient = reactQuery.useQueryClient();
  const { get, put } = admin.useFetchClient();
  const { formatAPIError } = admin.useAPIErrorHandler();
  const [isModalOpen, setIsModalOpen] = React__namespace.useState(false);
  const [templateToEdit, setTemplateToEdit] = React__namespace.useState(null);
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate }
  } = admin.useRBAC({ update: index.PERMISSIONS.updateEmailTemplates });
  const { isLoading: isLoadingData, data } = reactQuery.useQuery(
    ["users-permissions", "email-templates"],
    async () => {
      const { data: data2 } = await get("/users-permissions/email-templates");
      return data2;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: index.getTrad("Email.template.data.loaded"),
            defaultMessage: "Email templates has been loaded"
          })
        );
      },
      onError(error) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      }
    }
  );
  const isLoading = isLoadingForPermissions || isLoadingData;
  const handleToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleEditClick = (template) => {
    setTemplateToEdit(template);
    handleToggle();
  };
  const submitMutation = reactQuery.useMutation(
    (body) => put("/users-permissions/email-templates", { "email-templates": body }),
    {
      async onSuccess() {
        await queryClient.invalidateQueries(["users-permissions", "email-templates"]);
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "notification.success.saved", defaultMessage: "Saved" })
        });
        trackUsage("didEditEmailTemplates");
        handleToggle();
      },
      onError(error) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      },
      refetchActive: true
    }
  );
  const handleSubmit = (body) => {
    trackUsage("willEditEmailTemplates");
    const editedTemplates = { ...data, [templateToEdit]: body };
    submitMutation.mutate(editedTemplates);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { "aria-busy": submitMutation.isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: formatMessage({
          id: index.getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Header,
      {
        title: formatMessage({
          id: index.getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(EmailTable, { onEditClick: handleEditClick, canUpdate }),
      /* @__PURE__ */ jsxRuntime.jsx(
        EmailForm,
        {
          template: data[templateToEdit],
          onToggle: handleToggle,
          open: isModalOpen,
          onSubmit: handleSubmit
        }
      )
    ] })
  ] });
};
exports.EmailTemplatesPage = EmailTemplatesPage;
exports.ProtectedEmailTemplatesPage = ProtectedEmailTemplatesPage;
//# sourceMappingURL=index-Cd_lvUz1.js.map
