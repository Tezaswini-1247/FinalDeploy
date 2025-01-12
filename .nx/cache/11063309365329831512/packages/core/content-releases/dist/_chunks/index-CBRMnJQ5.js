"use strict";
const icons = require("@strapi/icons");
const jsxRuntime = require("react/jsx-runtime");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const formik = require("formik");
const reactIntl = require("react-intl");
const strapiAdmin$1 = require("@strapi/content-manager/strapi-admin");
const symbols = require("@strapi/icons/symbols");
const reactRouterDom = require("react-router-dom");
const yup = require("yup");
const styledComponents = require("styled-components");
const React = require("react");
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
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PERMISSIONS = {
  main: [
    {
      action: "plugin::content-releases.read",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  create: [
    {
      action: "plugin::content-releases.create",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  update: [
    {
      action: "plugin::content-releases.update",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  delete: [
    {
      action: "plugin::content-releases.delete",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  createAction: [
    {
      action: "plugin::content-releases.create-action",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  deleteAction: [
    {
      action: "plugin::content-releases.delete-action",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  publish: [
    {
      action: "plugin::content-releases.publish",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ]
};
const extendInvalidatesTags = (endpoint, extraTags) => {
  if (!endpoint) {
    return;
  }
  const originalInvalidatesTags = endpoint.invalidatesTags;
  const newInvalidatesTags = (result, err, args, meta) => {
    const originalTags = typeof originalInvalidatesTags === "function" ? originalInvalidatesTags(result, err, args, meta) : originalInvalidatesTags;
    return [...originalTags ?? [], ...extraTags];
  };
  Object.assign(endpoint, { invalidatesTags: newInvalidatesTags });
};
const releaseApi = strapiAdmin.adminApi.enhanceEndpoints({
  addTagTypes: ["Release", "ReleaseAction", "EntriesInRelease", "ReleaseSettings", "Document"],
  endpoints: {
    updateDocument(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    deleteDocument(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    deleteManyDocuments(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    discardDocument(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    createWorkflow(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    updateWorkflow(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    deleteWorkflow(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    }
  }
}).injectEndpoints({
  endpoints: (build) => {
    return {
      getReleasesForEntry: build.query({
        query(params) {
          return {
            url: "/content-releases/getByDocumentAttached",
            method: "GET",
            config: {
              params
            }
          };
        },
        providesTags: (result) => result ? [
          ...result.data.map(({ id }) => ({ type: "Release", id })),
          { type: "Release", id: "LIST" }
        ] : []
      }),
      getReleases: build.query({
        query({ page, pageSize, filters } = {
          page: 1,
          pageSize: 16,
          filters: {
            releasedAt: {
              $notNull: false
            }
          }
        }) {
          return {
            url: "/content-releases",
            method: "GET",
            config: {
              params: {
                page: page || 1,
                pageSize: pageSize || 16,
                filters: filters || {
                  releasedAt: {
                    $notNull: false
                  }
                }
              }
            }
          };
        },
        transformResponse(response, meta, arg) {
          const releasedAtValue = arg?.filters?.releasedAt?.$notNull;
          const isActiveDoneTab = releasedAtValue === "true";
          const newResponse = {
            ...response,
            meta: {
              ...response.meta,
              activeTab: isActiveDoneTab ? "done" : "pending"
            }
          };
          return newResponse;
        },
        providesTags: (result) => result ? [
          ...result.data.map(({ id }) => ({ type: "Release", id })),
          { type: "Release", id: "LIST" }
        ] : [{ type: "Release", id: "LIST" }]
      }),
      getRelease: build.query({
        query({ id }) {
          return {
            url: `/content-releases/${id}`,
            method: "GET"
          };
        },
        providesTags: (result, error, arg) => [
          { type: "Release", id: "LIST" },
          { type: "Release", id: arg.id }
        ]
      }),
      getReleaseActions: build.query({
        query({ releaseId, ...params }) {
          return {
            url: `/content-releases/${releaseId}/actions`,
            method: "GET",
            config: {
              params
            }
          };
        },
        providesTags: [{ type: "ReleaseAction", id: "LIST" }]
      }),
      createRelease: build.mutation({
        query(data) {
          return {
            url: "/content-releases",
            method: "POST",
            data
          };
        },
        invalidatesTags: [{ type: "Release", id: "LIST" }]
      }),
      updateRelease: build.mutation({
        query({ id, ...data }) {
          return {
            url: `/content-releases/${id}`,
            method: "PUT",
            data
          };
        },
        invalidatesTags: (result, error, arg) => [{ type: "Release", id: arg.id }]
      }),
      createReleaseAction: build.mutation({
        query({ body, params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions`,
            method: "POST",
            data: body
          };
        },
        invalidatesTags: [
          { type: "Release", id: "LIST" },
          { type: "ReleaseAction", id: "LIST" }
        ]
      }),
      createManyReleaseActions: build.mutation({
        query({ body, params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions/bulk`,
            method: "POST",
            data: body
          };
        },
        invalidatesTags: [
          { type: "Release", id: "LIST" },
          { type: "ReleaseAction", id: "LIST" },
          { type: "EntriesInRelease" }
        ]
      }),
      updateReleaseAction: build.mutation({
        query({ body, params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions/${params.actionId}`,
            method: "PUT",
            data: body
          };
        },
        invalidatesTags: (res, error, arg) => [
          { type: "ReleaseAction", id: "LIST" },
          { type: "Release", id: "LIST" },
          { type: "Release", id: arg.params.releaseId }
        ],
        async onQueryStarted({ body, params, query, actionPath }, { dispatch, queryFulfilled }) {
          const paramsWithoutActionId = {
            releaseId: params.releaseId,
            ...query
          };
          const patchResult = dispatch(
            releaseApi.util.updateQueryData(
              "getReleaseActions",
              paramsWithoutActionId,
              (draft) => {
                const [key, index] = actionPath;
                const action = draft.data[key][index];
                if (action) {
                  action.type = body.type;
                }
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        }
      }),
      deleteReleaseAction: build.mutation({
        query({ params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions/${params.actionId}`,
            method: "DELETE"
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Release", id: "LIST" },
          { type: "Release", id: arg.params.releaseId },
          { type: "ReleaseAction", id: "LIST" },
          { type: "EntriesInRelease" }
        ]
      }),
      publishRelease: build.mutation({
        query({ id }) {
          return {
            url: `/content-releases/${id}/publish`,
            method: "POST"
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Release", id: arg.id },
          { type: "Document", id: `ALL_LIST` }
        ]
      }),
      deleteRelease: build.mutation({
        query({ id }) {
          return {
            url: `/content-releases/${id}`,
            method: "DELETE"
          };
        },
        invalidatesTags: () => [{ type: "Release", id: "LIST" }, { type: "EntriesInRelease" }]
      }),
      getMappedEntriesInReleases: build.query({
        query(params) {
          return {
            url: "/content-releases/mapEntriesToReleases",
            method: "GET",
            config: {
              params
            }
          };
        },
        transformResponse(response) {
          return response.data;
        },
        providesTags: [{ type: "EntriesInRelease" }]
      }),
      getReleaseSettings: build.query({
        query: () => "/content-releases/settings",
        providesTags: [{ type: "ReleaseSettings" }]
      }),
      updateReleaseSettings: build.mutation({
        query(data) {
          return {
            url: "/content-releases/settings",
            method: "PUT",
            data
          };
        },
        invalidatesTags: [{ type: "ReleaseSettings" }]
      })
    };
  }
});
const {
  useGetReleasesQuery,
  useGetReleasesForEntryQuery,
  useGetReleaseQuery,
  useGetReleaseActionsQuery,
  useCreateReleaseMutation,
  useCreateReleaseActionMutation,
  useCreateManyReleaseActionsMutation,
  useUpdateReleaseMutation,
  useUpdateReleaseActionMutation,
  usePublishReleaseMutation,
  useDeleteReleaseActionMutation,
  useDeleteReleaseMutation,
  useGetMappedEntriesInReleasesQuery,
  useGetReleaseSettingsQuery,
  useUpdateReleaseSettingsMutation
} = releaseApi;
const getBorderLeftRadiusValue = (actionType) => {
  return actionType === "publish" ? 1 : 0;
};
const getBorderRightRadiusValue = (actionType) => {
  return actionType === "publish" ? 0 : 1;
};
const FieldWrapper = styledComponents.styled(designSystem.Field.Root)`
  border-top-left-radius: ${({ $actionType, theme }) => theme.spaces[getBorderLeftRadiusValue($actionType)]};
  border-bottom-left-radius: ${({ $actionType, theme }) => theme.spaces[getBorderLeftRadiusValue($actionType)]};
  border-top-right-radius: ${({ $actionType, theme }) => theme.spaces[getBorderRightRadiusValue($actionType)]};
  border-bottom-right-radius: ${({ $actionType, theme }) => theme.spaces[getBorderRightRadiusValue($actionType)]};

  > label {
    color: inherit;
    padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
    text-align: center;
    vertical-align: middle;
    text-transform: capitalize;
  }

  &[data-checked='true'] {
    color: ${({ theme, $actionType }) => $actionType === "publish" ? theme.colors.primary700 : theme.colors.danger600};
    background-color: ${({ theme, $actionType }) => $actionType === "publish" ? theme.colors.primary100 : theme.colors.danger100};
    border-color: ${({ theme, $actionType }) => $actionType === "publish" ? theme.colors.primary700 : theme.colors.danger600};
  }

  &[data-checked='false'] {
    border-left: ${({ $actionType }) => $actionType === "unpublish" && "none"};
    border-right: ${({ $actionType }) => $actionType === "publish" && "none"};
  }

  &[data-checked='false'][data-disabled='false']:hover {
    color: ${({ theme }) => theme.colors.neutral700};
    background-color: ${({ theme }) => theme.colors.neutral100};
    border-color: ${({ theme }) => theme.colors.neutral200};

    & > label {
      cursor: pointer;
    }
  }

  &[data-disabled='true'] {
    color: ${({ theme }) => theme.colors.neutral600};
    background-color: ${({ theme }) => theme.colors.neutral150};
    border-color: ${({ theme }) => theme.colors.neutral300};
  }
`;
const ActionOption = ({
  selected,
  actionType,
  handleChange,
  name,
  disabled = false
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    FieldWrapper,
    {
      $actionType: actionType,
      background: "primary0",
      borderColor: "neutral200",
      color: selected === actionType ? "primary600" : "neutral600",
      position: "relative",
      cursor: "pointer",
      "data-checked": selected === actionType,
      "data-disabled": disabled && selected !== actionType,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Label, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Field.Input,
          {
            type: "radio",
            name,
            checked: selected === actionType,
            onChange: handleChange,
            value: actionType,
            disabled
          }
        ) }),
        actionType
      ] })
    }
  );
};
const ReleaseActionOptions = ({
  selected,
  handleChange,
  name,
  disabled = false
}) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      ActionOption,
      {
        actionType: "publish",
        selected,
        handleChange,
        name,
        disabled
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ActionOption,
      {
        actionType: "unpublish",
        selected,
        handleChange,
        name,
        disabled
      }
    )
  ] });
};
const RELEASE_ACTION_FORM_SCHEMA = yup__namespace.object().shape({
  type: yup__namespace.string().oneOf(["publish", "unpublish"]).required(),
  releaseId: yup__namespace.string().required()
});
const INITIAL_VALUES = {
  type: "publish",
  releaseId: ""
};
const NoReleases = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.EmptyStateLayout,
    {
      icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem" }),
      content: formatMessage({
        id: "content-releases.content-manager-edit-view.add-to-release.no-releases-message",
        defaultMessage: "No available releases. Open the list of releases and create a new one from there."
      }),
      action: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.LinkButton,
        {
          to: {
            pathname: "/plugins/content-releases"
          },
          tag: reactRouterDom.Link,
          variant: "secondary",
          children: formatMessage({
            id: "content-releases.content-manager-edit-view.add-to-release.redirect-button",
            defaultMessage: "Open the list of releases"
          })
        }
      ),
      shadow: "none"
    }
  );
};
const AddActionToReleaseModal = ({
  contentType,
  documentId,
  onInputChange,
  values
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [{ query }] = strapiAdmin.useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const response = useGetReleasesForEntryQuery({
    contentType,
    entryDocumentId: documentId,
    hasEntryAttached: false,
    locale
  });
  const releases = response.data?.data;
  if (releases?.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(NoReleases, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { required: true, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
        id: "content-releases.content-manager-edit-view.add-to-release.select-label",
        defaultMessage: "Select a release"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.SingleSelect,
        {
          required: true,
          placeholder: formatMessage({
            id: "content-releases.content-manager-edit-view.add-to-release.select-placeholder",
            defaultMessage: "Select"
          }),
          name: "releaseId",
          onChange: (value) => onInputChange("releaseId", value),
          value: values.releaseId,
          children: releases?.map((release) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: release.id, children: release.name }, release.id))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
      id: "content-releases.content-manager-edit-view.add-to-release.action-type-label",
      defaultMessage: "What do you want to do with this entry?"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ReleaseActionOptions,
      {
        selected: values.type,
        handleChange: (e) => onInputChange("type", e.target.value),
        name: "type"
      }
    )
  ] });
};
const ReleaseActionModalForm = ({
  documentId,
  document,
  model,
  collectionType
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { allowedActions } = strapiAdmin.useRBAC(PERMISSIONS);
  const { canCreateAction } = allowedActions;
  const [createReleaseAction, { isLoading }] = useCreateReleaseActionMutation();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const [{ query }] = strapiAdmin.useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const handleSubmit = async (e, onClose) => {
    try {
      await formik$1.handleSubmit(e);
      onClose();
    } catch (error) {
      if (strapiAdmin.isFetchError(error)) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      } else {
        toggleNotification({
          type: "danger",
          message: formatMessage({
            id: "notification.error",
            defaultMessage: "An error occurred"
          })
        });
      }
    }
  };
  const formik$1 = formik.useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: RELEASE_ACTION_FORM_SCHEMA,
    onSubmit: async (values) => {
      if (collectionType === "collection-types" && !documentId) {
        throw new Error("Document id is required");
      }
      const response = await createReleaseAction({
        body: {
          type: values.type,
          contentType: model,
          entryDocumentId: documentId,
          locale
        },
        params: { releaseId: values.releaseId }
      });
      if ("data" in response) {
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: "content-releases.content-manager-edit-view.add-to-release.notification.success",
            defaultMessage: "Entry added to release"
          })
        });
        return;
      }
      if ("error" in response) {
        throw response.error;
      }
    }
  });
  const {
    edit: { options }
  } = strapiAdmin$1.unstable_useDocumentLayout(model);
  if (!window.strapi.isEE || !options?.draftAndPublish || !canCreateAction) {
    return null;
  }
  if (collectionType === "collection-types" && (!documentId || documentId === "create")) {
    return null;
  }
  return {
    label: formatMessage({
      id: "content-releases.content-manager-edit-view.add-to-release",
      defaultMessage: "Add to release"
    }),
    icon: /* @__PURE__ */ jsxRuntime.jsx(icons.PaperPlane, {}),
    // Entry is creating so we don't want to allow adding it to a release
    disabled: !document,
    position: ["panel", "table-row"],
    dialog: {
      type: "modal",
      title: formatMessage({
        id: "content-releases.content-manager-edit-view.add-to-release",
        defaultMessage: "Add to release"
      }),
      content: /* @__PURE__ */ jsxRuntime.jsx(
        AddActionToReleaseModal,
        {
          contentType: model,
          documentId,
          onInputChange: formik$1.setFieldValue,
          values: formik$1.values
        }
      ),
      footer: ({ onClose }) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", name: "cancel", children: formatMessage({
          id: "content-releases.content-manager-edit-view.add-to-release.cancel-button",
          defaultMessage: "Cancel"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            type: "submit",
            onClick: (e) => handleSubmit(e, onClose),
            disabled: !formik$1.values.releaseId,
            loading: isLoading,
            children: formatMessage({
              id: "content-releases.content-manager-edit-view.add-to-release.continue-button",
              defaultMessage: "Continue"
            })
          }
        )
      ] })
    }
  };
};
const getContentPermissions = (subject) => {
  const permissions = {
    publish: [
      {
        action: "plugin::content-manager.explorer.publish",
        subject,
        id: "",
        actionParameters: {},
        properties: {},
        conditions: []
      }
    ]
  };
  return permissions;
};
const ReleaseAction = ({ documents, model }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const [{ query }] = strapiAdmin.useQueryParams();
  const contentPermissions = getContentPermissions(model);
  const {
    allowedActions: { canPublish }
  } = strapiAdmin.useRBAC(contentPermissions);
  const {
    allowedActions: { canCreate }
  } = strapiAdmin.useRBAC(PERMISSIONS);
  const response = useGetReleasesQuery();
  const releases = response.data?.data;
  const [createManyReleaseActions, { isLoading }] = useCreateManyReleaseActionsMutation();
  const documentIds = documents.map((doc) => doc.documentId);
  const handleSubmit = async (values) => {
    const locale = query.plugins?.i18n?.locale;
    const releaseActionEntries = documentIds.map(
      (entryDocumentId) => ({
        type: values.type,
        contentType: model,
        entryDocumentId,
        locale
      })
    );
    const response2 = await createManyReleaseActions({
      body: releaseActionEntries,
      params: { releaseId: values.releaseId }
    });
    if ("data" in response2) {
      const notificationMessage = formatMessage(
        {
          id: "content-releases.content-manager-list-view.add-to-release.notification.success.message",
          defaultMessage: "{entriesAlreadyInRelease} out of {totalEntries} entries were already in the release."
        },
        {
          entriesAlreadyInRelease: response2.data.meta.entriesAlreadyInRelease,
          totalEntries: response2.data.meta.totalEntries
        }
      );
      const notification = {
        type: "success",
        title: formatMessage(
          {
            id: "content-releases.content-manager-list-view.add-to-release.notification.success.title",
            defaultMessage: "Successfully added to release."
          },
          {
            entriesAlreadyInRelease: response2.data.meta.entriesAlreadyInRelease,
            totalEntries: response2.data.meta.totalEntries
          }
        ),
        message: response2.data.meta.entriesAlreadyInRelease ? notificationMessage : ""
      };
      toggleNotification(notification);
      return true;
    }
    if ("error" in response2) {
      if (strapiAdmin.isFetchError(response2.error)) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(response2.error)
        });
      } else {
        toggleNotification({
          type: "warning",
          message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
        });
      }
    }
  };
  if (!canCreate || !canPublish) return null;
  return {
    actionType: "release",
    variant: "tertiary",
    label: formatMessage({
      id: "content-manager-list-view.add-to-release",
      defaultMessage: "Add to Release"
    }),
    dialog: {
      type: "modal",
      title: formatMessage({
        id: "content-manager-list-view.add-to-release",
        defaultMessage: "Add to Release"
      }),
      content: ({ onClose }) => {
        return /* @__PURE__ */ jsxRuntime.jsx(
          formik.Formik,
          {
            onSubmit: async (values) => {
              const data = await handleSubmit(values);
              if (data) {
                return onClose();
              }
            },
            validationSchema: RELEASE_ACTION_FORM_SCHEMA,
            initialValues: INITIAL_VALUES,
            children: ({ values, setFieldValue }) => /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { children: [
              releases?.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(NoReleases, {}) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { required: true, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                    id: "content-releases.content-manager-list-view.add-to-release.select-label",
                    defaultMessage: "Select a release"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.SingleSelect,
                    {
                      placeholder: formatMessage({
                        id: "content-releases.content-manager-list-view.add-to-release.select-placeholder",
                        defaultMessage: "Select"
                      }),
                      onChange: (value) => setFieldValue("releaseId", value),
                      value: values.releaseId,
                      children: releases?.map((release) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: release.id, children: release.name }, release.id))
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: "content-releases.content-manager-list-view.add-to-release.action-type-label",
                  defaultMessage: "What do you want to do with these entries?"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  ReleaseActionOptions,
                  {
                    selected: values.type,
                    handleChange: (e) => setFieldValue("type", e.target.value),
                    name: "type"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", name: "cancel", children: formatMessage({
                  id: "content-releases.content-manager-list-view.add-to-release.cancel-button",
                  defaultMessage: "Cancel"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", disabled: !values.releaseId, loading: isLoading, children: formatMessage({
                  id: "content-releases.content-manager-list-view.add-to-release.continue-button",
                  defaultMessage: "Continue"
                }) })
              ] })
            ] })
          }
        );
      }
    }
  };
};
const useReleasesList = (contentTypeUid, documentId) => {
  const listViewData = strapiAdmin.useTable("ListView", (state) => state.rows);
  const documentIds = listViewData.map((entry) => entry.documentId);
  const [{ query }] = strapiAdmin.useQueryParams();
  const locale = query?.plugins?.i18n?.locale || void 0;
  const response = useGetMappedEntriesInReleasesQuery(
    { contentTypeUid, documentIds, locale },
    { skip: !documentIds || !contentTypeUid || documentIds.length === 0 }
  );
  const mappedEntriesInReleases = response.data || {};
  return mappedEntriesInReleases?.[documentId] || [];
};
const addColumnToTableHook = ({ displayedHeaders, layout }) => {
  const { options } = layout;
  if (!options?.draftAndPublish) {
    return { displayedHeaders, layout };
  }
  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        searchable: false,
        sortable: false,
        name: "releases",
        label: {
          id: "content-releases.content-manager.list-view.releases.header",
          defaultMessage: "To be released in"
        },
        cellFormatter: (props, _, { model }) => /* @__PURE__ */ jsxRuntime.jsx(ReleaseListCell, { ...props, model })
      }
    ],
    layout
  };
};
const ReleaseListCell = ({ documentId, model }) => {
  const releases = useReleasesList(model, documentId);
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        variant: "ghost",
        onClick: (e) => e.stopPropagation(),
        endIcon: releases.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, { width: "1.2rem", height: "1.2rem" }) : null,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Typography,
          {
            style: { maxWidth: "252px", cursor: "pointer" },
            textColor: "neutral800",
            fontWeight: "regular",
            children: releases.length > 0 ? formatMessage(
              {
                id: "content-releases.content-manager.list-view.releases-number",
                defaultMessage: "{number} {number, plural, one {release} other {releases}}"
              },
              {
                number: releases.length
              }
            ) : "-"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { children: /* @__PURE__ */ jsxRuntime.jsx("ul", { children: releases.map(({ id, name }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 3, tag: "li", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Link, { href: `/admin/plugins/content-releases/${id}`, isExternal: false, children: name }) }, id)) }) })
  ] });
};
const getTimezoneOffset = (timezone, date) => {
  try {
    const offsetPart = new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      timeZoneName: "longOffset"
    }).formatToParts(date).find((part) => part.type === "timeZoneName");
    const offset = offsetPart ? offsetPart.value : "";
    let utcOffset = offset.replace("GMT", "UTC");
    if (!utcOffset.includes("+") && !utcOffset.includes("-")) {
      utcOffset = `${utcOffset}+00:00`;
    }
    return utcOffset;
  } catch (error) {
    return "";
  }
};
const getTimezones = (selectedDate) => {
  const timezoneList = Intl.supportedValuesOf("timeZone").map((timezone) => {
    const utcOffset = getTimezoneOffset(timezone, selectedDate);
    return { offset: utcOffset, value: `${utcOffset}&${timezone}` };
  });
  const systemTimezone = timezoneList.find(
    (timezone) => timezone.value.split("&")[1] === Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return { timezoneList, systemTimezone };
};
const StyledMenuItem = styledComponents.styled(designSystem.Menu.Item)`
  &:hover {
    background: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}100`]};

    svg {
      fill: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}600`]};
    }

    a {
      color: ${({ theme }) => theme.colors.neutral800};
    }
  }

  svg {
    color: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}500`]};
  }

  span {
    color: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}800`]};
  }

  span,
  a {
    width: 100%;
  }
`;
const DeleteReleaseActionItem = ({ releaseId, actionId }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const [deleteReleaseAction] = useDeleteReleaseActionMutation();
  const {
    allowedActions: { canDeleteAction }
  } = strapiAdmin.useRBAC(PERMISSIONS);
  const handleDeleteAction = async () => {
    const response = await deleteReleaseAction({
      params: { releaseId, actionId }
    });
    if ("data" in response) {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: "content-releases.content-manager-edit-view.remove-from-release.notification.success",
          defaultMessage: "Entry removed from release"
        })
      });
      return;
    }
    if ("error" in response) {
      if (strapiAdmin.isFetchError(response.error)) {
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
    }
  };
  if (!canDeleteAction) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(StyledMenuItem, { $variant: "danger", onSelect: handleDeleteAction, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, { width: "1.6rem", height: "1.6rem" }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "danger600", variant: "omega", children: formatMessage({
      id: "content-releases.content-manager-edit-view.remove-from-release",
      defaultMessage: "Remove from release"
    }) })
  ] }) });
};
const ReleaseActionEntryLinkItem = ({
  contentTypeUid,
  documentId,
  locale
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const userPermissions = strapiAdmin.useAuth("ReleaseActionEntryLinkItem", (state) => state.permissions);
  const canUpdateEntryForLocale = React__namespace.useMemo(() => {
    const updatePermissions = userPermissions.find(
      (permission) => permission.subject === contentTypeUid && permission.action === "plugin::content-manager.explorer.update"
    );
    if (!updatePermissions) {
      return false;
    }
    return Boolean(!locale || updatePermissions.properties?.locales?.includes(locale));
  }, [contentTypeUid, locale, userPermissions]);
  const {
    allowedActions: { canUpdate: canUpdateContentType }
  } = strapiAdmin.useRBAC({
    updateContentType: [
      {
        action: "plugin::content-manager.explorer.update",
        subject: contentTypeUid
      }
    ]
  });
  if (!canUpdateContentType || !canUpdateEntryForLocale) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledMenuItem,
    {
      tag: reactRouterDom.NavLink,
      isLink: true,
      to: {
        pathname: `/content-manager/collection-types/${contentTypeUid}/${documentId}`,
        search: locale && `?plugins[i18n][locale]=${locale}`
      },
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, { width: "1.6rem", height: "1.6rem" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: formatMessage({
          id: "content-releases.content-manager-edit-view.edit-entry",
          defaultMessage: "Edit entry"
        }) })
      ] })
    }
  );
};
const EditReleaseItem = ({ releaseId }) => {
  const { formatMessage } = reactIntl.useIntl();
  return (
    /* @ts-expect-error inference isn't working in DS */
    /* @__PURE__ */ jsxRuntime.jsx(StyledMenuItem, { tag: reactRouterDom.NavLink, isLink: true, to: `/plugins/content-releases/${releaseId}`, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, { width: "1.6rem", height: "1.6rem" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", variant: "omega", children: formatMessage({
        id: "content-releases.content-manager-edit-view.edit-release",
        defaultMessage: "Edit release"
      }) })
    ] }) })
  );
};
const Root = ({ children }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { allowedActions } = strapiAdmin.useRBAC(PERMISSIONS);
  return (
    // A user can access the dropdown if they have permissions to delete a release-action OR update a release
    allowedActions.canDeleteAction || allowedActions.canUpdate ? /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(StyledMoreButton, { variant: "tertiary", endIcon: null, paddingLeft: "7px", paddingRight: "7px", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.AccessibleIcon,
        {
          label: formatMessage({
            id: "content-releases.content-manager-edit-view.release-action-menu",
            defaultMessage: "Release action options"
          }),
          children: /* @__PURE__ */ jsxRuntime.jsx(icons.More, {})
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Content, { top: 1, popoverPlacement: "bottom-end", children })
    ] }) : null
  );
};
const StyledMoreButton = styledComponents.styled(designSystem.Menu.Trigger)`
  & > span {
    display: flex;
  }
`;
const ReleaseActionMenu = {
  Root,
  EditReleaseItem,
  DeleteReleaseActionItem,
  ReleaseActionEntryLinkItem
};
const Panel = ({
  model,
  document,
  documentId,
  collectionType
}) => {
  const [{ query }] = strapiAdmin.useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const {
    edit: { options }
  } = strapiAdmin$1.unstable_useDocumentLayout(model);
  const { formatMessage, formatDate, formatTime } = reactIntl.useIntl();
  const { allowedActions } = strapiAdmin.useRBAC(PERMISSIONS);
  const { canRead, canDeleteAction } = allowedActions;
  const response = useGetReleasesForEntryQuery(
    {
      contentType: model,
      entryDocumentId: documentId,
      locale,
      hasEntryAttached: true
    },
    {
      skip: !document
    }
  );
  const releases = response.data?.data;
  const getReleaseColorVariant = (actionType, shade) => {
    if (actionType === "unpublish") {
      return `secondary${shade}`;
    }
    return `success${shade}`;
  };
  if (!window.strapi.isEE || !options?.draftAndPublish || !canRead) {
    return null;
  }
  if (collectionType === "collection-types" && (!documentId || documentId === "create")) {
    return null;
  }
  if (!releases || releases.length === 0) {
    return null;
  }
  return {
    title: formatMessage({
      id: "content-releases.plugin.name",
      defaultMessage: "Releases"
    }),
    content: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 3, width: "100%", children: releases?.map((release) => /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        direction: "column",
        alignItems: "start",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: getReleaseColorVariant(release.actions[0].type, "200"),
        overflow: "hidden",
        hasRadius: true,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Box,
            {
              paddingTop: 3,
              paddingBottom: 3,
              paddingLeft: 4,
              paddingRight: 4,
              background: getReleaseColorVariant(release.actions[0].type, "100"),
              width: "100%",
              children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Typography,
                {
                  fontSize: 1,
                  variant: "pi",
                  textColor: getReleaseColorVariant(release.actions[0].type, "600"),
                  children: formatMessage(
                    {
                      id: "content-releases.content-manager-edit-view.list-releases.title",
                      defaultMessage: "{isPublish, select, true {Will be published in} other {Will be unpublished in}}"
                    },
                    { isPublish: release.actions[0].type === "publish" }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { padding: 4, direction: "column", gap: 2, width: "100%", alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontSize: 2, fontWeight: "bold", variant: "omega", textColor: "neutral700", children: release.name }),
            release.scheduledAt && release.timezone && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "content-releases.content-manager-edit-view.scheduled.date",
                defaultMessage: "{date} at {time} ({offset})"
              },
              {
                date: formatDate(new Date(release.scheduledAt), {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: release.timezone
                }),
                time: formatTime(new Date(release.scheduledAt), {
                  hourCycle: "h23",
                  timeZone: release.timezone
                }),
                offset: getTimezoneOffset(release.timezone, new Date(release.scheduledAt))
              }
            ) }),
            canDeleteAction ? /* @__PURE__ */ jsxRuntime.jsxs(ReleaseActionMenu.Root, { hasTriggerBorder: true, children: [
              /* @__PURE__ */ jsxRuntime.jsx(ReleaseActionMenu.EditReleaseItem, { releaseId: release.id }),
              /* @__PURE__ */ jsxRuntime.jsx(
                ReleaseActionMenu.DeleteReleaseActionItem,
                {
                  releaseId: release.id,
                  actionId: release.actions[0].id
                }
              )
            ] }) : null
          ] })
        ]
      },
      release.id
    )) })
  };
};
const pluginId = "content-releases";
const prefixPluginTranslations = (trad, pluginId2) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
};
const admin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(app) {
    app.createHook("ContentReleases/pages/ReleaseDetails/add-locale-in-releases");
    if (window.strapi.features.isEnabled("cms-content-releases")) {
      app.addMenuLink({
        to: `plugins/${pluginId}`,
        icon: icons.PaperPlane,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: "Releases"
        },
        Component: () => Promise.resolve().then(() => require("./App-BogHVHwI.js")).then((mod) => ({ default: mod.App })),
        permissions: PERMISSIONS.main,
        position: 2
      });
      const contentManagerPluginApis = app.getPlugin("content-manager").apis;
      if ("addEditViewSidePanel" in contentManagerPluginApis && typeof contentManagerPluginApis.addEditViewSidePanel === "function") {
        contentManagerPluginApis.addEditViewSidePanel([Panel]);
      }
      if ("addDocumentAction" in contentManagerPluginApis && typeof contentManagerPluginApis.addDocumentAction === "function") {
        contentManagerPluginApis.addDocumentAction((actions) => {
          const indexOfDeleteAction = actions.findIndex((action) => action.type === "unpublish");
          actions.splice(indexOfDeleteAction, 0, ReleaseActionModalForm);
          return actions;
        });
      }
      app.addSettingsLink("global", {
        id: pluginId,
        to: "releases",
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: "Releases"
        },
        permissions: [],
        async Component() {
          const { ProtectedReleasesSettingsPage } = await Promise.resolve().then(() => require("./ReleasesSettingsPage-DhhwsfOv.js"));
          return { default: ProtectedReleasesSettingsPage };
        }
      });
      if ("addBulkAction" in contentManagerPluginApis && typeof contentManagerPluginApis.addBulkAction === "function") {
        contentManagerPluginApis.addBulkAction((actions) => {
          const deleteActionIndex = actions.findIndex((action) => action.type === "delete");
          actions.splice(deleteActionIndex, 0, ReleaseAction);
          return actions;
        });
      }
      app.registerHook("Admin/CM/pages/ListView/inject-column-in-table", addColumnToTableHook);
    } else if (!window.strapi.features.isEnabled("cms-content-releases") && window.strapi?.flags?.promoteEE) {
      app.addSettingsLink("global", {
        id: pluginId,
        to: "/plugins/purchase-content-releases",
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: "Releases"
        },
        permissions: [],
        async Component() {
          const { PurchaseContentReleases } = await Promise.resolve().then(() => require("./PurchaseContentReleases-Be3acS2L.js"));
          return { default: PurchaseContentReleases };
        },
        licenseOnly: true
      });
    }
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-BWPPsSH-.js")) }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, "content-releases"),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
exports.PERMISSIONS = PERMISSIONS;
exports.ReleaseActionMenu = ReleaseActionMenu;
exports.ReleaseActionOptions = ReleaseActionOptions;
exports.admin = admin;
exports.getTimezoneOffset = getTimezoneOffset;
exports.getTimezones = getTimezones;
exports.pluginId = pluginId;
exports.releaseApi = releaseApi;
exports.useCreateReleaseMutation = useCreateReleaseMutation;
exports.useDeleteReleaseMutation = useDeleteReleaseMutation;
exports.useGetReleaseActionsQuery = useGetReleaseActionsQuery;
exports.useGetReleaseQuery = useGetReleaseQuery;
exports.useGetReleaseSettingsQuery = useGetReleaseSettingsQuery;
exports.useGetReleasesQuery = useGetReleasesQuery;
exports.usePublishReleaseMutation = usePublishReleaseMutation;
exports.useUpdateReleaseActionMutation = useUpdateReleaseActionMutation;
exports.useUpdateReleaseMutation = useUpdateReleaseMutation;
exports.useUpdateReleaseSettingsMutation = useUpdateReleaseSettingsMutation;
//# sourceMappingURL=index-CBRMnJQ5.js.map
