"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-BN1pPa5v.js");
const hooks = require("./hooks-BAaaKPS_.js");
const objects = require("./objects-BcXOv6_9.js");
const Icons = require("@strapi/icons");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
const styledComponents = require("styled-components");
const CardDragPreview = require("./CardDragPreview-C0QyJgRA.js");
const useDragAndDrop = require("./useDragAndDrop-BMtgCYzL.js");
const yup = require("yup");
const FieldTypeIcon = require("./FieldTypeIcon-Dnwq_IRF.js");
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
const Header = ({ name }) => {
  const { formatMessage } = reactIntl.useIntl();
  const params = reactRouterDom.useParams();
  const modified = strapiAdmin.useForm("Header", (state) => state.modified);
  const isSubmitting = strapiAdmin.useForm("Header", (state) => state.isSubmitting);
  return /* @__PURE__ */ jsxRuntime.jsx(
    strapiAdmin.Layouts.Header,
    {
      navigationAction: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.BackButton, { fallback: `../${index.COLLECTION_TYPES}/${params.slug}` }),
      primaryAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { size: "S", disabled: !modified, type: "submit", loading: isSubmitting, children: formatMessage({ id: "global.save", defaultMessage: "Save" }) }),
      subtitle: formatMessage({
        id: index.getTranslation("components.SettingsViewWrapper.pluginHeader.description.list-settings"),
        defaultMessage: "Define the settings of the list view."
      }),
      title: formatMessage(
        {
          id: index.getTranslation("components.SettingsViewWrapper.pluginHeader.title"),
          defaultMessage: "Configure the view - {name}"
        },
        { name: index.capitalise(name) }
      )
    }
  );
};
const EXCLUDED_SORT_ATTRIBUTE_TYPES = [
  "media",
  "richtext",
  "dynamiczone",
  "relation",
  "component",
  "json",
  "blocks"
];
const Settings = () => {
  const { formatMessage, locale } = reactIntl.useIntl();
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const { schema } = index.useDoc();
  const layout = strapiAdmin.useForm("Settings", (state) => state.values.layout ?? []);
  const currentSortBy = strapiAdmin.useForm(
    "Settings",
    (state) => state.values.settings.defaultSortBy
  );
  const onChange = strapiAdmin.useForm("Settings", (state) => state.onChange);
  const sortOptions = React__namespace.useMemo(
    () => Object.values(layout).reduce((acc, field) => {
      if (schema && !EXCLUDED_SORT_ATTRIBUTE_TYPES.includes(schema.attributes[field.name].type)) {
        acc.push({
          value: field.name,
          label: typeof field.label !== "string" ? formatMessage(field.label) : field.label
        });
      }
      return acc;
    }, []),
    [formatMessage, layout, schema]
  );
  const sortOptionsSorted = sortOptions.sort((a, b) => formatter.compare(a.label, b.label));
  React__namespace.useEffect(() => {
    if (sortOptionsSorted.findIndex((opt) => opt.value === currentSortBy) === -1) {
      onChange("settings.defaultSortBy", sortOptionsSorted[0]?.value);
    }
  }, [currentSortBy, onChange, sortOptionsSorted]);
  const formLayout = React__namespace.useMemo(
    () => SETTINGS_FORM_LAYOUT.map(
      (row) => row.map((field) => {
        if (field.type === "enumeration") {
          return {
            ...field,
            hint: field.hint ? formatMessage(field.hint) : void 0,
            label: formatMessage(field.label),
            options: field.name === "settings.defaultSortBy" ? sortOptionsSorted : field.options
          };
        } else {
          return {
            ...field,
            hint: field.hint ? formatMessage(field.hint) : void 0,
            label: formatMessage(field.label)
          };
        }
      })
    ),
    [formatMessage, sortOptionsSorted]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
      id: index.getTranslation("containers.SettingPage.settings"),
      defaultMessage: "Settings"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: formLayout.map(
      (row) => row.map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { s: 12, col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.InputRenderer, { ...field }) }, field.name))
    ) }, "bottom")
  ] });
};
const SETTINGS_FORM_LAYOUT = [
  [
    {
      label: {
        id: index.getTranslation("form.Input.search"),
        defaultMessage: "Enable search"
      },
      name: "settings.searchable",
      size: 4,
      type: "boolean"
    },
    {
      label: {
        id: index.getTranslation("form.Input.filters"),
        defaultMessage: "Enable filters"
      },
      name: "settings.filterable",
      size: 4,
      type: "boolean"
    },
    {
      label: {
        id: index.getTranslation("form.Input.bulkActions"),
        defaultMessage: "Enable bulk actions"
      },
      name: "settings.bulkable",
      size: 4,
      type: "boolean"
    }
  ],
  [
    {
      hint: {
        id: index.getTranslation("form.Input.pageEntries.inputDescription"),
        defaultMessage: "Note: You can override this value in the Collection Type settings page."
      },
      label: {
        id: index.getTranslation("form.Input.pageEntries"),
        defaultMessage: "Entries per page"
      },
      name: "settings.pageSize",
      options: ["10", "20", "50", "100"].map((value) => ({ value, label: value })),
      size: 6,
      type: "enumeration"
    },
    {
      label: {
        id: index.getTranslation("form.Input.defaultSort"),
        defaultMessage: "Default sort attribute"
      },
      name: "settings.defaultSortBy",
      options: [],
      size: 3,
      type: "enumeration"
    },
    {
      label: {
        id: index.getTranslation("form.Input.sort.order"),
        defaultMessage: "Default sort order"
      },
      name: "settings.defaultSortOrder",
      options: ["ASC", "DESC"].map((value) => ({ value, label: value })),
      size: 3,
      type: "enumeration"
    }
  ]
];
const FIELD_SCHEMA = yup__namespace.object().shape({
  label: yup__namespace.string().required(),
  sortable: yup__namespace.boolean()
});
const EditFieldForm = ({ attribute, name, onClose }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { value, onChange } = strapiAdmin.useField(name);
  if (!value) {
    console.error(
      "You've opened a field to edit without it being part of the form, this is likely a bug with Strapi. Please open an issue."
    );
    toggleNotification({
      message: formatMessage({
        id: "content-manager.containers.list-settings.modal-form.error",
        defaultMessage: "An error occurred while trying to open the form."
      }),
      type: "danger"
    });
    return null;
  }
  let shouldDisplaySortToggle = !["media", "relation"].includes(attribute.type);
  if ("relation" in attribute && ["oneWay", "oneToOne", "manyToOne"].includes(attribute.relation)) {
    shouldDisplaySortToggle = true;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    strapiAdmin.Form,
    {
      method: "PUT",
      initialValues: value,
      validationSchema: FIELD_SCHEMA,
      onSubmit: (data) => {
        onChange(name, data);
        onClose();
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(HeaderContainer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(FieldTypeIcon.FieldTypeIcon, { type: attribute.type }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage(
            {
              id: index.getTranslation("containers.list-settings.modal-form.label"),
              defaultMessage: "Edit {fieldName}"
            },
            { fieldName: index.capitalise(value.label) }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: [
          {
            name: "label",
            label: formatMessage({
              id: index.getTranslation("form.Input.label"),
              defaultMessage: "Label"
            }),
            hint: formatMessage({
              id: index.getTranslation("form.Input.label.inputDescription"),
              defaultMessage: "This value overrides the label displayed in the table's head"
            }),
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: index.getTranslation("form.Input.sort.field"),
              defaultMessage: "Enable sort on this field"
            }),
            name: "sortable",
            size: 6,
            type: "boolean"
          }
        ].filter(
          (field) => field.name !== "sortable" || field.name === "sortable" && shouldDisplaySortToggle
        ).map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Grid.Item,
          {
            s: 12,
            col: size,
            direction: "column",
            alignItems: "stretch",
            children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.InputRenderer, { ...field })
          },
          field.name
        )) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", children: formatMessage({ id: "global.finish", defaultMessage: "Finish" }) })
        ] })
      ]
    }
  ) });
};
const HeaderContainer = styledComponents.styled(designSystem.Flex)`
  svg {
    width: 3.2rem;
    margin-right: ${({ theme }) => theme.spaces[3]};
  }
`;
const DraggableCard = ({
  attribute,
  index: index$1,
  isDraggingSibling,
  label,
  name,
  onMoveField,
  onRemoveField,
  setIsDraggingSibling
}) => {
  const [isModalOpen, setIsModalOpen] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const [, forceRerenderAfterDnd] = React__namespace.useState(false);
  const [{ isDragging }, objectRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop.useDragAndDrop(true, {
    type: useDragAndDrop.ItemTypes.FIELD,
    item: { index: index$1, label, name },
    index: index$1,
    onMoveItem: onMoveField,
    onEnd: () => setIsDraggingSibling(false)
  });
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef]);
  React__namespace.useEffect(() => {
    if (isDragging) {
      setIsDraggingSibling(true);
    }
  }, [isDragging, setIsDraggingSibling]);
  React__namespace.useEffect(() => {
    if (!isDraggingSibling) {
      forceRerenderAfterDnd((prev) => !prev);
    }
  }, [isDraggingSibling]);
  const composedRefs = designSystem.useComposedRefs(
    dropRef,
    objectRef
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(FieldWrapper, { ref: composedRefs, children: [
    isDragging && /* @__PURE__ */ jsxRuntime.jsx(CardDragPreview.CardDragPreview, { label }),
    !isDragging && isDraggingSibling && /* @__PURE__ */ jsxRuntime.jsx(CardDragPreview.CardDragPreview, { isSibling: true, label }),
    !isDragging && !isDraggingSibling && /* @__PURE__ */ jsxRuntime.jsxs(
      FieldContainer,
      {
        borderColor: "neutral150",
        background: "neutral100",
        hasRadius: true,
        justifyContent: "space-between",
        onClick: () => setIsModalOpen(true),
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              DragButton,
              {
                ref: dragRef,
                "aria-label": formatMessage(
                  {
                    id: index.getTranslation("components.DraggableCard.move.field"),
                    defaultMessage: "Move {item}"
                  },
                  { item: label }
                ),
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children: label })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { paddingLeft: 3, onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Root, { open: isModalOpen, onOpenChange: setIsModalOpen, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
                ActionButton,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                  },
                  "aria-label": formatMessage(
                    {
                      id: index.getTranslation("components.DraggableCard.edit.field"),
                      defaultMessage: "Edit {item}"
                    },
                    { item: label }
                  ),
                  type: "button",
                  children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Pencil, { width: "1.2rem", height: "1.2rem" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                EditFieldForm,
                {
                  attribute,
                  name: `layout.${index$1}`,
                  onClose: () => {
                    setIsModalOpen(false);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              ActionButton,
              {
                onClick: onRemoveField,
                "data-testid": `delete-${name}`,
                "aria-label": formatMessage(
                  {
                    id: index.getTranslation("components.DraggableCard.delete.field"),
                    defaultMessage: "Delete {item}"
                  },
                  { item: label }
                ),
                type: "button",
                children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cross, { width: "1.2rem", height: "1.2rem" })
              }
            )
          ] })
        ]
      }
    )
  ] });
};
const ActionButton = styledComponents.styled.button`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.spaces[7]};
  color: ${({ theme }) => theme.colors.neutral600};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral700};
  }

  &:last-child {
    padding: 0 ${({ theme }) => theme.spaces[3]};
  }
`;
const DragButton = styledComponents.styled(ActionButton)`
  padding: 0 ${({ theme }) => theme.spaces[3]};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
  cursor: all-scroll;
`;
const FieldContainer = styledComponents.styled(designSystem.Flex)`
  max-height: 3.2rem;
  cursor: pointer;
`;
const FieldWrapper = styledComponents.styled(designSystem.Box)`
  &:last-child {
    padding-right: ${({ theme }) => theme.spaces[3]};
  }
`;
const SortDisplayedFields = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { model, schema } = index.useDoc();
  const [isDraggingSibling, setIsDraggingSibling] = React__namespace.useState(false);
  const [lastAction, setLastAction] = React__namespace.useState(null);
  const scrollableContainerRef = React__namespace.useRef(null);
  const values = strapiAdmin.useForm(
    "SortDisplayedFields",
    (state) => state.values.layout ?? []
  );
  const addFieldRow = strapiAdmin.useForm("SortDisplayedFields", (state) => state.addFieldRow);
  const removeFieldRow = strapiAdmin.useForm("SortDisplayedFields", (state) => state.removeFieldRow);
  const moveFieldRow = strapiAdmin.useForm("SortDisplayedFields", (state) => state.moveFieldRow);
  const { metadata: allMetadata } = index.useGetContentTypeConfigurationQuery(model, {
    selectFromResult: ({ data }) => ({ metadata: data?.contentType.metadatas ?? {} })
  });
  const nonDisplayedFields = React__namespace.useMemo(() => {
    if (!schema) {
      return [];
    }
    const displayedFieldNames = values.map((field) => field.name);
    return Object.entries(schema.attributes).reduce(
      (acc, [name, attribute]) => {
        if (!displayedFieldNames.includes(name) && index.checkIfAttributeIsDisplayable(attribute)) {
          const { list: metadata } = allMetadata[name];
          acc.push({
            name,
            label: metadata.label || name,
            sortable: metadata.sortable
          });
        }
        return acc;
      },
      []
    );
  }, [allMetadata, values, schema]);
  const handleAddField = (field) => {
    setLastAction("add");
    addFieldRow("layout", field);
  };
  const handleRemoveField = (index2) => {
    setLastAction("remove");
    removeFieldRow("layout", index2);
  };
  const handleMoveField = (dragIndex, hoverIndex) => {
    moveFieldRow("layout", dragIndex, hoverIndex);
  };
  React__namespace.useEffect(() => {
    if (lastAction === "add" && scrollableContainerRef?.current) {
      scrollableContainerRef.current.scrollLeft = scrollableContainerRef.current.scrollWidth;
    }
  }, [lastAction]);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", direction: "column", gap: 4, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
      id: index.getTranslation("containers.SettingPage.view"),
      defaultMessage: "View"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { padding: 4, borderColor: "neutral300", borderStyle: "dashed", borderWidth: "1px", hasRadius: true, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { flex: "1", overflow: "auto hidden", ref: scrollableContainerRef, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 3, children: values.map((field, index2) => /* @__PURE__ */ jsxRuntime.jsx(
        DraggableCard,
        {
          index: index2,
          isDraggingSibling,
          onMoveField: handleMoveField,
          onRemoveField: () => handleRemoveField(index2),
          setIsDraggingSibling,
          ...field,
          attribute: schema.attributes[field.name],
          label: typeof field.label === "object" ? formatMessage(field.label) : field.label
        },
        field.name
      )) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Menu.Trigger,
          {
            paddingLeft: 2,
            paddingRight: 2,
            justifyContent: "center",
            endIcon: null,
            disabled: nonDisplayedFields.length === 0,
            variant: "tertiary",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { tag: "span", children: formatMessage({
                id: index.getTranslation("components.FieldSelect.label"),
                defaultMessage: "Add a field"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, { "aria-hidden": true, focusable: false, style: { position: "relative", top: 2 } })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Content, { children: nonDisplayedFields.map((field) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { onSelect: () => handleAddField(field), children: typeof field.label === "object" ? formatMessage(field.label) : field.label }, field.name)) })
      ] })
    ] })
  ] });
};
const ListConfiguration = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const { model, collectionType } = index.useDoc();
  const { isLoading: isLoadingLayout, list, edit } = index.useDocLayout();
  const [updateContentTypeConfiguration] = index.useUpdateContentTypeConfigurationMutation();
  const handleSubmit = async (data) => {
    try {
      trackUsage("willSaveContentTypeLayout");
      const layoutData = data.layout ?? [];
      const meta = Object.entries(edit.metadatas).reduce((acc, [name, editMeta]) => {
        const { mainField: _mainField, ...listMeta } = list.metadatas[name];
        const { label, sortable } = layoutData.find((field) => field.name === name) ?? {};
        acc[name] = {
          edit: editMeta,
          list: {
            ...listMeta,
            label: label || listMeta.label,
            sortable: sortable || listMeta.sortable
          }
        };
        return acc;
      }, {});
      const res = await updateContentTypeConfiguration({
        layouts: {
          edit: edit.layout.flatMap(
            (panel) => panel.map((row) => row.map(({ name, size }) => ({ name, size })))
          ),
          list: layoutData.map((field) => field.name)
        },
        settings: objects.setIn(data.settings, "displayName", void 0),
        metadatas: meta,
        uid: model
      });
      if ("data" in res) {
        trackUsage("didEditListSettings");
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "notification.success.saved", defaultMessage: "Saved" })
        });
      } else {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
      }
    } catch (err) {
      console.error(err);
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  const initialValues = React__namespace.useMemo(() => {
    return {
      layout: list.layout.map(({ label, sortable, name }) => ({
        label: typeof label === "string" ? label : formatMessage(label),
        sortable,
        name
      })),
      settings: list.settings
    };
  }, [formatMessage, list.layout, list.settings]);
  if (collectionType === index.SINGLE_TYPES) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: `/single-types/${model}` });
  }
  if (isLoadingLayout) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: `Configure ${list.settings.displayName} List View` }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Form, { initialValues, onSubmit: handleSubmit, method: "PUT", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Header,
        {
          collectionType,
          model,
          name: list.settings.displayName ?? ""
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          alignItems: "stretch",
          background: "neutral0",
          direction: "column",
          gap: 6,
          hasRadius: true,
          shadow: "tableShadow",
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 7,
          paddingRight: 7,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(Settings, {}),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
            /* @__PURE__ */ jsxRuntime.jsx(SortDisplayedFields, {})
          ]
        }
      ) })
    ] }) })
  ] });
};
const ProtectedListConfiguration = () => {
  const permissions = hooks.useTypedSelector(
    (state) => state.admin_app.permissions.contentManager?.collectionTypesConfigurations
  );
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ListConfiguration, {}) });
};
exports.ListConfiguration = ListConfiguration;
exports.ProtectedListConfiguration = ProtectedListConfiguration;
//# sourceMappingURL=ListConfigurationPage-7LeytuFD.js.map
