import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useForm, useStrapiApp, InputRenderer, useField, Form, Layouts, useTracking, useNotification, useQueryParams, useRBAC, ConfirmDialog, createContext, Page } from "@strapi/admin/strapi-admin";
import { Alert, Link, Flex, Field, Box, Tooltip, Typography, Divider, Grid, Dialog, Button, Portal, FocusTrap, Main } from "@strapi/design-system";
import { stringify } from "qs";
import { useIntl } from "react-intl";
import { NavLink, useNavigate, useParams, Link as Link$1, Navigate } from "react-router-dom";
import { c as useDoc, f as useDocumentRBAC, o as useDocLayout, C as COLLECTION_TYPES, D as DocumentStatus, e as contentManagerApi, k as PERMISSIONS, t as getDisplayName, R as RelativeTime, l as DocumentRBAC, J as useDocument, h as useDocumentLayout, p as useGetContentTypeConfigurationQuery, d as buildValidParams } from "./index-ByPZ754U.mjs";
import pipe from "lodash/fp/pipe";
import { u as useTypedSelector } from "./hooks-E5u1mcgM.mjs";
import { a as useDynamicZone, u as useLazyComponents, b as useFieldHint, N as NotAllowedInput, d as MemoizedUIDInput, e as MemoizedWysiwyg, D as DynamicZone, f as MemoizedComponentInput, g as MemoizedBlocksInput, r as removeFieldsThatDontExistOnSchema, p as prepareTempKeys } from "./Field-CcppsFQR.mjs";
import { ArrowLeft, WarningCircle } from "@strapi/icons";
import { styled } from "styled-components";
import { g as getRelationLabel } from "./relations-CBc5HYHC.mjs";
const StyledAlert = styled(Alert).attrs({ closeLabel: "Close", onClose: () => {
}, shadow: "none" })`
  button {
    display: none;
  }
`;
const LinkEllipsis = styled(Link)`
  display: block;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
`;
const CustomRelationInput = (props) => {
  const { formatMessage } = useIntl();
  const field = useField(props.name);
  let formattedFieldValue;
  if (field) {
    formattedFieldValue = Array.isArray(field.value) ? { results: field.value, meta: { missingCount: 0 } } : field.value;
  }
  if (!formattedFieldValue || formattedFieldValue.results.length === 0 && formattedFieldValue.meta.missingCount === 0) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Field.Label, { action: props.labelAction, children: props.label }),
      /* @__PURE__ */ jsx(Box, { marginTop: 1, children: /* @__PURE__ */ jsx(StyledAlert, { variant: "default", children: formatMessage({
        id: "content-manager.history.content.no-relations",
        defaultMessage: "No relations."
      }) }) })
    ] });
  }
  const { results, meta } = formattedFieldValue;
  return /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsx(Field.Label, { children: props.label }),
    results.length > 0 && /* @__PURE__ */ jsx(Flex, { direction: "column", gap: 2, marginTop: 1, alignItems: "stretch", children: results.map((relationData) => {
      const { targetModel } = props.attribute;
      const href = `../${COLLECTION_TYPES}/${targetModel}/${relationData.documentId}`;
      const label = getRelationLabel(relationData, props.mainField);
      const isAdminUserRelation = targetModel === "admin::user";
      return /* @__PURE__ */ jsxs(
        Flex,
        {
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 4,
          paddingRight: 4,
          hasRadius: true,
          borderColor: "neutral200",
          background: "neutral150",
          justifyContent: "space-between",
          children: [
            /* @__PURE__ */ jsx(Box, { minWidth: 0, paddingTop: 1, paddingBottom: 1, paddingRight: 4, children: /* @__PURE__ */ jsx(Tooltip, { label, children: isAdminUserRelation ? /* @__PURE__ */ jsx(Typography, { children: label }) : /* @__PURE__ */ jsx(LinkEllipsis, { tag: NavLink, to: href, children: label }) }) }),
            /* @__PURE__ */ jsx(DocumentStatus, { status: relationData.status })
          ]
        },
        relationData.documentId ?? relationData.id
      );
    }) }),
    meta.missingCount > 0 && /* @ts-expect-error – we dont need closeLabel */
    /* @__PURE__ */ jsx(
      StyledAlert,
      {
        marginTop: 1,
        variant: "warning",
        title: formatMessage(
          {
            id: "content-manager.history.content.missing-relations.title",
            defaultMessage: "{number, plural, =1 {Missing relation} other {{number} missing relations}}"
          },
          { number: meta.missingCount }
        ),
        children: formatMessage(
          {
            id: "content-manager.history.content.missing-relations.message",
            defaultMessage: "{number, plural, =1 {It has} other {They have}} been deleted and can't be restored."
          },
          { number: meta.missingCount }
        )
      }
    )
  ] });
};
const CustomMediaInput = (props) => {
  const { value } = useField(props.name);
  const results = value ? value.results : [];
  const meta = value ? value.meta : { missingCount: 0 };
  const { formatMessage } = useIntl();
  const fields = useStrapiApp("CustomMediaInput", (state) => state.fields);
  const MediaLibrary = fields.media;
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "stretch", children: [
    /* @__PURE__ */ jsx(Form, { method: "PUT", disabled: true, initialValues: { [props.name]: results }, children: /* @__PURE__ */ jsx(MediaLibrary, { ...props, disabled: true, multiple: results.length > 1 }) }),
    meta.missingCount > 0 && /* @__PURE__ */ jsx(
      StyledAlert,
      {
        variant: "warning",
        closeLabel: "Close",
        onClose: () => {
        },
        title: formatMessage(
          {
            id: "content-manager.history.content.missing-assets.title",
            defaultMessage: "{number, plural, =1 {Missing asset} other {{number} missing assets}}"
          },
          { number: meta.missingCount }
        ),
        children: formatMessage(
          {
            id: "content-manager.history.content.missing-assets.message",
            defaultMessage: "{number, plural, =1 {It has} other {They have}} been deleted in the Media Library and can't be restored."
          },
          { number: meta.missingCount }
        )
      }
    )
  ] });
};
const getLabelAction = (labelAction) => {
  if (!React.isValidElement(labelAction)) {
    return labelAction;
  }
  const labelActionTitleId = labelAction.props.title.id;
  if (labelActionTitleId === "i18n.Field.localized") {
    return React.cloneElement(labelAction, {
      ...labelAction.props,
      title: {
        id: "history.content.localized",
        defaultMessage: "This value is specific to this locale. If you restore this version, the content will not be replaced for other locales."
      }
    });
  }
  if (labelActionTitleId === "i18n.Field.not-localized") {
    return React.cloneElement(labelAction, {
      ...labelAction.props,
      title: {
        id: "history.content.not-localized",
        defaultMessage: "This value is common to all locales. If you restore this version and save the changes, the content will be replaced for all locales."
      }
    });
  }
  return labelAction;
};
const VersionInputRenderer = ({
  visible,
  hint: providedHint,
  shouldIgnoreRBAC = false,
  labelAction,
  ...props
}) => {
  const customLabelAction = getLabelAction(labelAction);
  const { formatMessage } = useIntl();
  const version = useHistoryContext("VersionContent", (state) => state.selectedVersion);
  const configuration = useHistoryContext("VersionContent", (state) => state.configuration);
  const fieldSizes = useTypedSelector((state) => state["content-manager"].app.fieldSizes);
  const { id, components } = useDoc();
  const isFormDisabled = useForm("InputRenderer", (state) => state.disabled);
  const isInDynamicZone = useDynamicZone("isInDynamicZone", (state) => state.isInDynamicZone);
  const canCreateFields = useDocumentRBAC("InputRenderer", (rbac) => rbac.canCreateFields);
  const canReadFields = useDocumentRBAC("InputRenderer", (rbac) => rbac.canReadFields);
  const canUpdateFields = useDocumentRBAC("InputRenderer", (rbac) => rbac.canUpdateFields);
  const canUserAction = useDocumentRBAC("InputRenderer", (rbac) => rbac.canUserAction);
  const editableFields = id ? canUpdateFields : canCreateFields;
  const readableFields = id ? canReadFields : canCreateFields;
  const canUserReadField = canUserAction(props.name, readableFields, props.type);
  const canUserEditField = canUserAction(props.name, editableFields, props.type);
  const fields = useStrapiApp("InputRenderer", (app) => app.fields);
  const { lazyComponentStore } = useLazyComponents(
    attributeHasCustomFieldProperty(props.attribute) ? [props.attribute.customField] : void 0
  );
  const hint = useFieldHint(providedHint, props.attribute);
  const {
    edit: { components: componentsLayout }
  } = useDocLayout();
  if (!visible) {
    return null;
  }
  if (!shouldIgnoreRBAC && !canUserReadField && !isInDynamicZone) {
    return /* @__PURE__ */ jsx(NotAllowedInput, { hint, ...props });
  }
  const fieldIsDisabled = !canUserEditField && !isInDynamicZone || props.disabled || isFormDisabled;
  const addedAttributes = version.meta.unknownAttributes.added;
  if (Object.keys(addedAttributes).includes(props.name)) {
    return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "flex-start", gap: 1, children: [
      /* @__PURE__ */ jsx(Field.Label, { children: props.label }),
      /* @__PURE__ */ jsx(
        StyledAlert,
        {
          width: "100%",
          closeLabel: "Close",
          onClose: () => {
          },
          variant: "warning",
          title: formatMessage({
            id: "content-manager.history.content.new-field.title",
            defaultMessage: "New field"
          }),
          children: formatMessage({
            id: "content-manager.history.content.new-field.message",
            defaultMessage: "This field didn't exist when this version was saved. If you restore this version, it will be empty."
          })
        }
      )
    ] });
  }
  if (attributeHasCustomFieldProperty(props.attribute)) {
    const CustomInput = lazyComponentStore[props.attribute.customField];
    if (CustomInput) {
      return /* @__PURE__ */ jsx(
        CustomInput,
        {
          ...props,
          hint,
          labelAction: customLabelAction,
          disabled: fieldIsDisabled
        }
      );
    }
    return /* @__PURE__ */ jsx(
      InputRenderer,
      {
        ...props,
        hint,
        labelAction: customLabelAction,
        type: props.attribute.customField,
        disabled: fieldIsDisabled
      }
    );
  }
  if (props.type === "media") {
    return /* @__PURE__ */ jsx(CustomMediaInput, { ...props, labelAction: customLabelAction, disabled: fieldIsDisabled });
  }
  const addedInputTypes = Object.keys(fields);
  if (!attributeHasCustomFieldProperty(props.attribute) && addedInputTypes.includes(props.type)) {
    const CustomInput = fields[props.type];
    return /* @__PURE__ */ jsx(
      CustomInput,
      {
        ...props,
        hint,
        labelAction: customLabelAction,
        disabled: fieldIsDisabled
      }
    );
  }
  switch (props.type) {
    case "blocks":
      return /* @__PURE__ */ jsx(MemoizedBlocksInput, { ...props, hint, type: props.type, disabled: fieldIsDisabled });
    case "component":
      const { layout } = componentsLayout[props.attribute.component];
      const [remainingFieldsLayout] = getRemaingFieldsLayout({
        layout: [layout],
        metadatas: configuration.components[props.attribute.component].metadatas,
        fieldSizes,
        schemaAttributes: components[props.attribute.component].attributes
      });
      return /* @__PURE__ */ jsx(
        MemoizedComponentInput,
        {
          ...props,
          layout: [...layout, ...remainingFieldsLayout || []],
          hint,
          labelAction: customLabelAction,
          disabled: fieldIsDisabled,
          children: (inputProps) => /* @__PURE__ */ jsx(VersionInputRenderer, { ...inputProps, shouldIgnoreRBAC: true })
        }
      );
    case "dynamiczone":
      return /* @__PURE__ */ jsx(
        DynamicZone,
        {
          ...props,
          hint,
          labelAction: customLabelAction,
          disabled: fieldIsDisabled
        }
      );
    case "relation":
      return /* @__PURE__ */ jsx(
        CustomRelationInput,
        {
          ...props,
          hint,
          labelAction: customLabelAction,
          disabled: fieldIsDisabled
        }
      );
    case "richtext":
      return /* @__PURE__ */ jsx(
        MemoizedWysiwyg,
        {
          ...props,
          hint,
          type: props.type,
          labelAction: customLabelAction,
          disabled: fieldIsDisabled
        }
      );
    case "uid":
      return /* @__PURE__ */ jsx(
        MemoizedUIDInput,
        {
          ...props,
          hint,
          type: props.type,
          labelAction: customLabelAction,
          disabled: fieldIsDisabled
        }
      );
    case "enumeration":
      return /* @__PURE__ */ jsx(
        InputRenderer,
        {
          ...props,
          hint,
          labelAction: customLabelAction,
          options: props.attribute.enum.map((value) => ({ value })),
          type: props.customField ? "custom-field" : props.type,
          disabled: fieldIsDisabled
        }
      );
    default:
      const { unique: _unique, mainField: _mainField, ...restProps } = props;
      return /* @__PURE__ */ jsx(
        InputRenderer,
        {
          ...restProps,
          hint,
          labelAction: customLabelAction,
          type: props.customField ? "custom-field" : props.type,
          disabled: fieldIsDisabled
        }
      );
  }
};
const attributeHasCustomFieldProperty = (attribute) => "customField" in attribute && typeof attribute.customField === "string";
const createLayoutFromFields = (fields) => {
  return fields.reduce((rows, field) => {
    if (field.type === "dynamiczone") {
      rows.push([field]);
      return rows;
    }
    if (!rows[rows.length - 1]) {
      rows.push([]);
    }
    rows[rows.length - 1].push(field);
    return rows;
  }, []).map((row) => [row]);
};
function getRemaingFieldsLayout({
  layout,
  metadatas,
  schemaAttributes,
  fieldSizes
}) {
  const fieldsInLayout = layout.flatMap(
    (panel) => panel.flatMap((row) => row.flatMap((field) => field.name))
  );
  const remainingFields = Object.entries(metadatas).reduce(
    (currentRemainingFields, [name, field]) => {
      if (!fieldsInLayout.includes(name) && field.edit.visible === true) {
        const attribute = schemaAttributes[name];
        currentRemainingFields.push({
          attribute,
          type: attribute.type,
          visible: true,
          disabled: true,
          label: field.edit.label || name,
          name,
          size: fieldSizes[attribute.type].default ?? 12
        });
      }
      return currentRemainingFields;
    },
    []
  );
  return createLayoutFromFields(remainingFields);
}
const FormPanel = ({ panel }) => {
  if (panel.some((row) => row.some((field) => field.type === "dynamiczone"))) {
    const [row] = panel;
    const [field] = row;
    return /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: /* @__PURE__ */ jsx(Grid.Item, { col: 12, s: 12, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(VersionInputRenderer, { ...field }) }) }, field.name);
  }
  return /* @__PURE__ */ jsx(
    Box,
    {
      hasRadius: true,
      background: "neutral0",
      shadow: "tableShadow",
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6,
      paddingBottom: 6,
      borderColor: "neutral150",
      children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: panel.map((row, gridRowIndex) => /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: row.map(({ size, ...field }) => {
        return /* @__PURE__ */ jsx(
          Grid.Item,
          {
            col: size,
            s: 12,
            xs: 12,
            direction: "column",
            alignItems: "stretch",
            children: /* @__PURE__ */ jsx(VersionInputRenderer, { ...field })
          },
          field.name
        );
      }) }, gridRowIndex)) })
    }
  );
};
const VersionContent = () => {
  const { formatMessage } = useIntl();
  const { fieldSizes } = useTypedSelector((state) => state["content-manager"].app);
  const version = useHistoryContext("VersionContent", (state) => state.selectedVersion);
  const layout = useHistoryContext("VersionContent", (state) => state.layout);
  const configuration = useHistoryContext("VersionContent", (state) => state.configuration);
  const schema = useHistoryContext("VersionContent", (state) => state.schema);
  const removedAttributes = version.meta.unknownAttributes.removed;
  const removedAttributesAsFields = Object.entries(removedAttributes).map(
    ([attributeName, attribute]) => {
      const field = {
        attribute,
        shouldIgnoreRBAC: true,
        type: attribute.type,
        visible: true,
        disabled: true,
        label: attributeName,
        name: attributeName,
        size: fieldSizes[attribute.type].default ?? 12
      };
      return field;
    }
  );
  const unknownFieldsLayout = createLayoutFromFields(removedAttributesAsFields);
  const remainingFieldsLayout = getRemaingFieldsLayout({
    metadatas: configuration.contentType.metadatas,
    layout,
    schemaAttributes: schema.attributes,
    fieldSizes
  });
  const { components } = useDoc();
  const transformedData = React.useMemo(() => {
    const transform = (schemaAttributes, components2 = {}) => (document) => {
      const schema2 = { attributes: schemaAttributes };
      const transformations = pipe(
        removeFieldsThatDontExistOnSchema(schema2),
        prepareTempKeys(schema2, components2)
      );
      return transformations(document);
    };
    return transform(version.schema, components)(version.data);
  }, [components, version.data, version.schema]);
  return /* @__PURE__ */ jsxs(Layouts.Content, { children: [
    /* @__PURE__ */ jsx(Box, { paddingBottom: 8, children: /* @__PURE__ */ jsx(Form, { disabled: true, method: "PUT", initialValues: transformedData, children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, position: "relative", children: [...layout, ...remainingFieldsLayout].map((panel, index) => {
      return /* @__PURE__ */ jsx(FormPanel, { panel }, index);
    }) }) }) }),
    removedAttributesAsFields.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsxs(Box, { paddingTop: 8, children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "flex-start", paddingBottom: 6, gap: 1, children: [
          /* @__PURE__ */ jsx(Typography, { variant: "delta", children: formatMessage({
            id: "content-manager.history.content.unknown-fields.title",
            defaultMessage: "Unknown fields"
          }) }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", children: formatMessage(
            {
              id: "content-manager.history.content.unknown-fields.message",
              defaultMessage: "These fields have been deleted or renamed in the Content-Type Builder. <b>These fields will not be restored.</b>"
            },
            {
              b: (chunks) => /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", children: chunks })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Form, { disabled: true, method: "PUT", initialValues: version.data, children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, position: "relative", children: unknownFieldsLayout.map((panel, index) => {
          return /* @__PURE__ */ jsx(FormPanel, { panel }, index);
        }) }) })
      ] })
    ] })
  ] });
};
const historyVersionsApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getHistoryVersions: builder.query({
      query(params) {
        return {
          url: `/content-manager/history-versions`,
          method: "GET",
          config: {
            params
          }
        };
      },
      providesTags: ["HistoryVersion"]
    }),
    restoreVersion: builder.mutation({
      query({ params, body }) {
        return {
          url: `/content-manager/history-versions/${params.versionId}/restore`,
          method: "PUT",
          data: body
        };
      },
      invalidatesTags: (_res, _error, { documentId, collectionType, params }) => {
        return [
          "HistoryVersion",
          {
            type: "Document",
            id: collectionType === COLLECTION_TYPES ? `${params.contentType}_${documentId}` : params.contentType
          }
        ];
      }
    })
  })
});
const { useGetHistoryVersionsQuery, useRestoreVersionMutation } = historyVersionsApi;
const VersionHeader = ({ headerId }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const { formatMessage, formatDate } = useIntl();
  const { trackUsage } = useTracking();
  const { toggleNotification } = useNotification();
  const [{ query }] = useQueryParams();
  const { collectionType, slug } = useParams();
  const [restoreVersion, { isLoading }] = useRestoreVersionMutation();
  const { allowedActions } = useRBAC(PERMISSIONS.map((action) => ({ action, subject: slug })));
  const version = useHistoryContext("VersionHeader", (state) => state.selectedVersion);
  const mainField = useHistoryContext("VersionHeader", (state) => state.mainField);
  const schema = useHistoryContext("VersionHeader", (state) => state.schema);
  const isCurrentVersion = useHistoryContext(
    "VersionHeader",
    (state) => state.page === 1 && state.versions.data[0].id === state.selectedVersion.id
  );
  const mainFieldValue = version.data[mainField];
  const getNextNavigation = () => {
    const pluginsQueryParams = stringify({ plugins: query.plugins }, { encode: false });
    return {
      pathname: "..",
      search: pluginsQueryParams
    };
  };
  const handleRestore = async () => {
    try {
      const response = await restoreVersion({
        documentId: version.relatedDocumentId,
        collectionType,
        params: {
          versionId: version.id,
          contentType: version.contentType
        },
        body: { contentType: version.contentType }
      });
      if ("data" in response) {
        navigate(getNextNavigation(), { relative: "path" });
        toggleNotification({
          type: "success",
          title: formatMessage({
            id: "content-manager.restore.success.title",
            defaultMessage: "Version restored."
          }),
          message: formatMessage({
            id: "content-manager.restore.success.message",
            defaultMessage: "A past version of the content was restored."
          })
        });
        trackUsage("didRestoreHistoryVersion");
      }
      if ("error" in response) {
        toggleNotification({
          type: "danger",
          message: formatMessage({
            id: "content-manager.history.restore.error.message",
            defaultMessage: "Could not restore version."
          })
        });
      }
    } catch (error) {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  return /* @__PURE__ */ jsxs(Dialog.Root, { open: isConfirmDialogOpen, onOpenChange: setIsConfirmDialogOpen, children: [
    /* @__PURE__ */ jsx(
      Layouts.BaseHeader,
      {
        id: headerId,
        title: formatDate(new Date(version.createdAt), {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        }),
        subtitle: /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage(
          {
            id: "content-manager.history.version.subtitle",
            defaultMessage: "{hasLocale, select, true {{subtitle}, in {locale}} other {{subtitle}}}"
          },
          {
            hasLocale: Boolean(version.locale),
            subtitle: `${mainFieldValue || ""} (${schema.info.singularName})`.trim(),
            locale: version.locale?.name
          }
        ) }),
        navigationAction: /* @__PURE__ */ jsx(
          Link,
          {
            startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}),
            tag: NavLink,
            to: getNextNavigation(),
            relative: "path",
            isExternal: false,
            children: formatMessage({
              id: "global.back",
              defaultMessage: "Back"
            })
          }
        ),
        sticky: false,
        primaryAction: /* @__PURE__ */ jsx(Dialog.Trigger, { children: /* @__PURE__ */ jsx(
          Button,
          {
            disabled: !allowedActions.canUpdate || isCurrentVersion,
            onClick: () => {
              setIsConfirmDialogOpen(true);
            },
            children: formatMessage({
              id: "content-manager.history.restore.confirm.button",
              defaultMessage: "Restore"
            })
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        onConfirm: handleRestore,
        endAction: /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: handleRestore, loading: isLoading, children: formatMessage({
          id: "content-manager.history.restore.confirm.button",
          defaultMessage: "Restore"
        }) }),
        children: /* @__PURE__ */ jsxs(
          Flex,
          {
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            textAlign: "center",
            children: [
              /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(WarningCircle, { width: "24px", height: "24px", fill: "danger600" }) }),
              /* @__PURE__ */ jsx(Typography, { children: formatMessage({
                id: "content-manager.history.restore.confirm.title",
                defaultMessage: "Are you sure you want to restore this version?"
              }) }),
              /* @__PURE__ */ jsx(Typography, { children: formatMessage(
                {
                  id: "content-manager.history.restore.confirm.message",
                  defaultMessage: "{isDraft, select, true {The restored content will override your draft.} other {The restored content won't be published, it will override the draft and be saved as pending changes. You'll be able to publish the changes at anytime.}}"
                },
                {
                  isDraft: version.status === "draft"
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
};
const BlueText = (children) => /* @__PURE__ */ jsx(Typography, { textColor: "primary600", variant: "pi", children });
const VersionCard = ({ version, isCurrent }) => {
  const { formatDate, formatMessage } = useIntl();
  const [{ query }] = useQueryParams();
  const isActive = query.id === version.id.toString();
  const author = version.createdBy && getDisplayName(version.createdBy);
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      direction: "column",
      alignItems: "flex-start",
      gap: 3,
      hasRadius: true,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: isActive ? "primary600" : "neutral200",
      color: "neutral800",
      padding: 5,
      tag: Link$1,
      to: `?${stringify({ ...query, id: version.id })}`,
      style: { textDecoration: "none" },
      children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(Typography, { tag: "h3", fontWeight: "semiBold", children: formatDate(version.createdAt, {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }) }),
          /* @__PURE__ */ jsx(Typography, { tag: "p", variant: "pi", textColor: "neutral600", children: formatMessage(
            {
              id: "content-manager.history.sidebar.versionDescription",
              defaultMessage: "{distanceToNow}{isAnonymous, select, true {} other { by {author}}}{isCurrent, select, true { <b>(current)</b>} other {}}"
            },
            {
              distanceToNow: /* @__PURE__ */ jsx(RelativeTime, { timestamp: new Date(version.createdAt) }),
              author,
              isAnonymous: !Boolean(version.createdBy),
              isCurrent,
              b: BlueText
            }
          ) })
        ] }),
        version.status && /* @__PURE__ */ jsx(DocumentStatus, { status: version.status, size: "XS" })
      ]
    }
  );
};
const PaginationButton = ({ page, children }) => {
  const [{ query }] = useQueryParams();
  const { id: _id, ...queryRest } = query;
  return /* @__PURE__ */ jsx(Link$1, { to: { search: stringify({ ...queryRest, page }) }, style: { textDecoration: "none" }, children: /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "primary600", children }) });
};
const VersionsList = () => {
  const { formatMessage } = useIntl();
  const { versions, page } = useHistoryContext("VersionsList", (state) => ({
    versions: state.versions,
    page: state.page
  }));
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      shrink: 0,
      direction: "column",
      alignItems: "stretch",
      width: "320px",
      height: "100vh",
      background: "neutral0",
      borderColor: "neutral200",
      borderWidth: "0 0 0 1px",
      borderStyle: "solid",
      tag: "aside",
      children: [
        /* @__PURE__ */ jsxs(
          Flex,
          {
            direction: "row",
            justifyContent: "space-between",
            padding: 4,
            borderColor: "neutral200",
            borderWidth: "0 0 1px",
            borderStyle: "solid",
            tag: "header",
            children: [
              /* @__PURE__ */ jsx(Typography, { tag: "h2", variant: "omega", fontWeight: "semiBold", children: formatMessage({
                id: "content-manager.history.sidebar.title",
                defaultMessage: "Versions"
              }) }),
              /* @__PURE__ */ jsx(Box, { background: "neutral150", hasRadius: true, padding: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: versions.meta.pagination.total }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Box, { flex: 1, overflow: "auto", children: [
          versions.meta.pagination.page > 1 && /* @__PURE__ */ jsx(Box, { paddingTop: 4, textAlign: "center", children: /* @__PURE__ */ jsx(PaginationButton, { page: page - 1, children: formatMessage({
            id: "content-manager.history.sidebar.show-newer",
            defaultMessage: "Show newer versions"
          }) }) }),
          /* @__PURE__ */ jsx(Flex, { direction: "column", gap: 3, padding: 4, tag: "ul", alignItems: "stretch", children: versions.data.map((version, index) => /* @__PURE__ */ jsx(
            "li",
            {
              "aria-label": formatMessage({
                id: "content-manager.history.sidebar.title.version-card.aria-label",
                defaultMessage: "Version card"
              }),
              children: /* @__PURE__ */ jsx(VersionCard, { version, isCurrent: page === 1 && index === 0 })
            },
            version.id
          )) }),
          versions.meta.pagination.page < versions.meta.pagination.pageCount && /* @__PURE__ */ jsx(Box, { paddingBottom: 4, textAlign: "center", children: /* @__PURE__ */ jsx(PaginationButton, { page: page + 1, children: formatMessage({
            id: "content-manager.history.sidebar.show-older",
            defaultMessage: "Show older versions"
          }) }) })
        ] })
      ]
    }
  );
};
const [HistoryProvider, useHistoryContext] = createContext("HistoryPage");
const HistoryPage = () => {
  const headerId = React.useId();
  const { formatMessage } = useIntl();
  const {
    slug,
    id: documentId,
    collectionType
  } = useParams();
  const { isLoading: isLoadingDocument, schema } = useDocument({
    collectionType,
    model: slug
  });
  const {
    isLoading: isLoadingLayout,
    edit: {
      layout,
      settings: { displayName, mainField }
    }
  } = useDocumentLayout(slug);
  const { data: configuration, isLoading: isLoadingConfiguration } = useGetContentTypeConfigurationQuery(slug);
  const [{ query }] = useQueryParams();
  const { id: selectedVersionId, ...queryWithoutId } = query;
  const validQueryParamsWithoutId = buildValidParams(queryWithoutId);
  const page = validQueryParamsWithoutId.page ? Number(validQueryParamsWithoutId.page) : 1;
  const versionsResponse = useGetHistoryVersionsQuery(
    {
      contentType: slug,
      ...documentId ? { documentId } : {},
      // Omit id since it's not needed by the endpoint and caused extra refetches
      ...validQueryParamsWithoutId
    },
    { refetchOnMountOrArgChange: true }
  );
  const initialRequestId = React.useRef(versionsResponse.requestId);
  const isStaleRequest = versionsResponse.requestId === initialRequestId.current;
  if (!slug || collectionType === COLLECTION_TYPES && !documentId) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/content-manager" });
  }
  if (isLoadingDocument || isLoadingLayout || versionsResponse.isFetching || isStaleRequest || isLoadingConfiguration) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (!versionsResponse.isError && !versionsResponse.data?.data?.length) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
      Page.NoData,
      {
        action: /* @__PURE__ */ jsx(
          Link,
          {
            tag: NavLink,
            to: `/content-manager/${collectionType}/${slug}${documentId ? `/${documentId}` : ""}`,
            children: formatMessage({
              id: "global.back",
              defaultMessage: "Back"
            })
          }
        )
      }
    ) });
  }
  if (versionsResponse.data?.data?.length && !selectedVersionId) {
    return /* @__PURE__ */ jsx(
      Navigate,
      {
        to: { search: stringify({ ...query, id: versionsResponse.data.data[0].id }) },
        replace: true
      }
    );
  }
  const selectedVersion = versionsResponse.data?.data?.find(
    (version) => version.id.toString() === selectedVersionId
  );
  if (versionsResponse.isError || !layout || !schema || !selectedVersion || !configuration || // This should not happen as it's covered by versionsResponse.isError, but we need it for TS
  versionsResponse.data.error) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      {
        id: "content-manager.history.page-title",
        defaultMessage: "{contentType} history"
      },
      {
        contentType: displayName
      }
    ) }),
    /* @__PURE__ */ jsx(
      HistoryProvider,
      {
        contentType: slug,
        id: documentId,
        schema,
        layout,
        configuration,
        selectedVersion,
        versions: versionsResponse.data,
        page,
        mainField,
        children: /* @__PURE__ */ jsxs(Flex, { direction: "row", alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxs(
            Main,
            {
              grow: 1,
              height: "100vh",
              background: "neutral100",
              paddingBottom: 6,
              overflow: "auto",
              labelledBy: headerId,
              children: [
                /* @__PURE__ */ jsx(VersionHeader, { headerId }),
                /* @__PURE__ */ jsx(VersionContent, {})
              ]
            }
          ),
          /* @__PURE__ */ jsx(VersionsList, {})
        ] })
      }
    )
  ] });
};
const ProtectedHistoryPageImpl = () => {
  const { slug } = useParams();
  const {
    permissions = [],
    isLoading,
    error
  } = useRBAC(PERMISSIONS.map((action) => ({ action, subject: slug })));
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error || !slug) {
    return /* @__PURE__ */ jsx(
      Box,
      {
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2,
        background: "neutral0",
        children: /* @__PURE__ */ jsx(Page.Error, {})
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Box,
    {
      height: "100vh",
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 2,
      background: "neutral0",
      children: /* @__PURE__ */ jsx(Page.Protect, { permissions, children: ({ permissions: permissions2 }) => /* @__PURE__ */ jsx(DocumentRBAC, { permissions: permissions2, children: /* @__PURE__ */ jsx(HistoryPage, {}) }) })
    }
  );
};
const ProtectedHistoryPage = () => {
  return /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(FocusTrap, { children: /* @__PURE__ */ jsx(ProtectedHistoryPageImpl, {}) }) });
};
export {
  HistoryProvider,
  ProtectedHistoryPage,
  useHistoryContext
};
//# sourceMappingURL=History-tU567_hc.mjs.map
