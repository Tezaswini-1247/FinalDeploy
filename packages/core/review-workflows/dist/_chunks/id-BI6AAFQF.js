"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const ee = require("@strapi/admin/strapi-admin/ee");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const fractionalIndexing = require("fractional-indexing");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const yup = require("yup");
const index = require("./index-Nf1qO5tM.js");
const Layout = require("./Layout-DcZnQxp9.js");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
const styledComponents = require("styled-components");
const reactDnd = require("react-dnd");
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
const adminApi = index.reviewWorkflowsApi.injectEndpoints({
  endpoints(builder) {
    return {
      getAdminRoles: builder.query({
        query: () => ({
          url: `/admin/roles`,
          method: "GET"
        }),
        transformResponse: (res) => {
          return res.data;
        }
      })
    };
  }
});
const { useGetAdminRolesQuery } = adminApi;
const useKeyboardDragAndDrop = (active, index2, { onCancel, onDropItem, onGrabItem, onMoveItem }) => {
  const [isSelected, setIsSelected] = React__namespace.useState(false);
  const handleMove = (movement) => {
    if (!isSelected) {
      return;
    }
    if (typeof index2 === "number" && onMoveItem) {
      if (movement === "UP") {
        onMoveItem(index2 - 1, index2);
      } else if (movement === "DOWN") {
        onMoveItem(index2 + 1, index2);
      }
    }
  };
  const handleDragClick = () => {
    if (isSelected) {
      if (onDropItem) {
        onDropItem(index2);
      }
      setIsSelected(false);
    } else {
      if (onGrabItem) {
        onGrabItem(index2);
      }
      setIsSelected(true);
    }
  };
  const handleCancel = () => {
    if (isSelected) {
      setIsSelected(false);
      if (onCancel) {
        onCancel(index2);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (!active) {
      return;
    }
    if (e.key === "Tab" && !isSelected) {
      return;
    }
    e.preventDefault();
    switch (e.key) {
      case " ":
      case "Enter":
        handleDragClick();
        break;
      case "Escape":
        handleCancel();
        break;
      case "ArrowDown":
      case "ArrowRight":
        handleMove("DOWN");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        handleMove("UP");
        break;
    }
  };
  return handleKeyDown;
};
const DIRECTIONS = {
  UPWARD: "upward",
  DOWNWARD: "downward"
};
const DROP_SENSITIVITY = {
  REGULAR: "regular",
  IMMEDIATE: "immediate"
};
const useDragAndDrop = (active, {
  type = "STRAPI_DND",
  index: index2,
  item,
  onStart,
  onEnd,
  onGrabItem,
  onDropItem,
  onCancel,
  onMoveItem,
  dropSensitivity = DROP_SENSITIVITY.REGULAR
}) => {
  const objectRef = React__namespace.useRef(null);
  const [{ handlerId, isOver }, dropRef] = reactDnd.useDrop({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver({ shallow: true })
      };
    },
    drop(item2) {
      const draggedIndex = item2.index;
      const newIndex = index2;
      if (isOver && onDropItem) {
        onDropItem(draggedIndex, newIndex);
      }
    },
    hover(item2, monitor) {
      if (!objectRef.current || !onMoveItem) {
        return;
      }
      const dragIndex = item2.index;
      const newIndex = index2;
      const hoverBoundingRect = objectRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (typeof dragIndex === "number" && typeof newIndex === "number") {
        if (dragIndex === newIndex) {
          return;
        }
        if (dropSensitivity === DROP_SENSITIVITY.REGULAR) {
          if (dragIndex < newIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > newIndex && hoverClientY > hoverMiddleY) {
            return;
          }
        }
        onMoveItem(newIndex, dragIndex);
        item2.index = newIndex;
      } else {
        if (Array.isArray(dragIndex) && Array.isArray(newIndex)) {
          const minLength = Math.min(dragIndex.length, newIndex.length);
          let areEqual = true;
          let isLessThan = false;
          let isGreaterThan = false;
          for (let i = 0; i < minLength; i++) {
            if (dragIndex[i] < newIndex[i]) {
              isLessThan = true;
              areEqual = false;
              break;
            } else if (dragIndex[i] > newIndex[i]) {
              isGreaterThan = true;
              areEqual = false;
              break;
            }
          }
          if (areEqual && dragIndex.length === newIndex.length) {
            return;
          }
          if (dropSensitivity === DROP_SENSITIVITY.REGULAR) {
            if (isLessThan && !isGreaterThan && hoverClientY < hoverMiddleY) {
              return;
            }
            if (isGreaterThan && !isLessThan && hoverClientY > hoverMiddleY) {
              return;
            }
          }
        }
        onMoveItem(newIndex, dragIndex);
        item2.index = newIndex;
      }
    }
  });
  const getDragDirection = (monitor) => {
    if (monitor && monitor.isDragging() && !monitor.didDrop() && monitor.getInitialClientOffset() && monitor.getClientOffset()) {
      const deltaY = monitor.getInitialClientOffset().y - monitor.getClientOffset().y;
      if (deltaY > 0) return DIRECTIONS.UPWARD;
      if (deltaY < 0) return DIRECTIONS.DOWNWARD;
      return null;
    }
    return null;
  };
  const [{ isDragging, direction }, dragRef, dragPreviewRef] = reactDnd.useDrag({
    type,
    item() {
      if (onStart) {
        onStart();
      }
      const { width } = objectRef.current?.getBoundingClientRect() ?? {};
      return { index: index2, width, ...item };
    },
    end() {
      if (onEnd) {
        onEnd();
      }
    },
    canDrag: active,
    /**
     * This is useful when the item is in a virtualized list.
     * However, if we don't have an ID then we want the libraries
     * defaults to take care of this.
     */
    isDragging: item?.id ? (monitor) => {
      return item.id === monitor.getItem().id;
    } : void 0,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      initialOffset: monitor.getInitialClientOffset(),
      currentOffset: monitor.getClientOffset(),
      direction: getDragDirection(monitor)
    })
  });
  const handleKeyDown = useKeyboardDragAndDrop(active, index2, {
    onGrabItem,
    onDropItem,
    onCancel,
    onMoveItem
  });
  return [
    { handlerId, isDragging, handleKeyDown, isOverDropTarget: isOver, direction },
    objectRef,
    dropRef,
    dragRef,
    dragPreviewRef
  ];
};
const AddStage = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledButton,
    {
      tag: "button",
      background: "neutral0",
      borderColor: "neutral150",
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 3,
      shadow: "filterShadow",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { tag: "span", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(icons.PlusCircle, { width: "2.4rem", height: "2.4rem", "aria-hidden": true }),
        children
      ] }) })
    }
  );
};
const StyledButton = styledComponents.styled(designSystem.Box)`
  border-radius: 26px;
  color: ${({ theme }) => theme.colors.neutral500};

  &:hover {
    color: ${({ theme }) => theme.colors.primary600};
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary600};
  }
`;
const Stages = ({ canDelete = true, canUpdate = true, isCreating }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const addFieldRow = strapiAdmin.useForm("Stages", (state) => state.addFieldRow);
  const { value: stages = [] } = strapiAdmin.useField("stages");
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 6, width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "relative", width: "100%", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Background,
        {
          background: "neutral200",
          height: "100%",
          left: "50%",
          position: "absolute",
          top: "0",
          width: 2
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, position: "relative", tag: "ol", children: stages.map((stage, index2) => {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { tag: "li", children: /* @__PURE__ */ jsxRuntime.jsx(
          Stage,
          {
            index: index2,
            canDelete: stages.length > 1 && canDelete,
            canReorder: stages.length > 1,
            canUpdate,
            stagesCount: stages.length,
            defaultOpen: !stage.id,
            ...stage
          }
        ) }, stage.__temp_key__);
      }) })
    ] }),
    canUpdate && /* @__PURE__ */ jsxRuntime.jsx(
      AddStage,
      {
        type: "button",
        onClick: () => {
          addFieldRow("stages", { name: "" });
          trackUsage("willCreateStage");
        },
        children: formatMessage({
          id: "Settings.review-workflows.stage.add",
          defaultMessage: "Add new stage"
        })
      }
    )
  ] });
};
const Background = styledComponents.styled(designSystem.Box)`
  transform: translateX(-50%);
`;
const Stage = ({
  index: index2,
  canDelete = false,
  canReorder = false,
  canUpdate = false,
  stagesCount,
  name,
  permissions,
  color,
  defaultOpen
}) => {
  const [liveText, setLiveText] = React__namespace.useState();
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const stageErrors = strapiAdmin.useForm("Stages", (state) => state.errors.stages);
  const error = stageErrors?.[index2];
  const addFieldRow = strapiAdmin.useForm("Stage", (state) => state.addFieldRow);
  const moveFieldRow = strapiAdmin.useForm("Stage", (state) => state.moveFieldRow);
  const removeFieldRow = strapiAdmin.useForm("Stage", (state) => state.removeFieldRow);
  const getItemPos = (index22) => `${index22 + 1} of ${stagesCount}`;
  const handleGrabStage = (index22) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.grab-item",
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: name,
          position: getItemPos(index22)
        }
      )
    );
  };
  const handleDropStage = (index22) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.drop-item",
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: name,
          position: getItemPos(index22)
        }
      )
    );
  };
  const handleCancelDragStage = () => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.cancel-item",
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: name
        }
      )
    );
  };
  const handleMoveStage = (newIndex, oldIndex) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.reorder",
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: name,
          position: getItemPos(newIndex)
        }
      )
    );
    moveFieldRow("stages", oldIndex, newIndex);
  };
  const [{ handlerId, isDragging, handleKeyDown }, stageRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(canReorder, {
    index: index2,
    item: {
      index: index2,
      name
    },
    onGrabItem: handleGrabStage,
    onDropItem: handleDropStage,
    onMoveItem: handleMoveStage,
    onCancel: handleCancelDragStage,
    type: Layout.DRAG_DROP_TYPES.STAGE
  });
  const composedRef = designSystem.useComposedRefs(stageRef, dropRef);
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index2]);
  const handleCloneClick = () => {
    addFieldRow("stages", { name, color, permissions });
  };
  const id = React__namespace.useId();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { ref: composedRef, shadow: "tableShadow", children: [
    liveText && /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
    isDragging ? /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        background: "primary100",
        borderStyle: "dashed",
        borderColor: "primary600",
        borderWidth: "1px",
        display: "block",
        hasRadius: true,
        padding: 6
      }
    ) : /* @__PURE__ */ jsxRuntime.jsx(
      AccordionRoot,
      {
        onValueChange: (value) => {
          if (value) {
            trackUsage("willEditStage");
          }
        },
        defaultValue: defaultOpen ? id : void 0,
        $error: Object.values(error ?? {}).length > 0,
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { value: id, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Header, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Trigger, { children: name }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Actions, { children: canDelete || canUpdate ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
                /* @__PURE__ */ jsxRuntime.jsxs(ContextMenuTrigger, { size: "S", endIcon: null, paddingLeft: 2, paddingRight: 2, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(icons.More, { "aria-hidden": true, focusable: false }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { tag: "span", children: formatMessage({
                    id: "[tbdb].components.DynamicZone.more-actions",
                    defaultMessage: "More actions"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Content, { popoverPlacement: "bottom-end", zIndex: 2, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.SubRoot, { children: [
                  canUpdate && /* @__PURE__ */ jsxRuntime.jsx(designSystem.MenuItem, { onClick: handleCloneClick, children: formatMessage({
                    id: "Settings.review-workflows.stage.delete",
                    defaultMessage: "Duplicate stage"
                  }) }),
                  canDelete && /* @__PURE__ */ jsxRuntime.jsx(DeleteMenuItem, { onClick: () => removeFieldRow("stages", index2), children: formatMessage({
                    id: "Settings.review-workflows.stage.delete",
                    defaultMessage: "Delete"
                  }) })
                ] }) })
              ] }),
              canUpdate && /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  background: "transparent",
                  hasRadius: true,
                  variant: "ghost",
                  "data-handler-id": handlerId,
                  ref: dragRef,
                  label: formatMessage({
                    id: "Settings.review-workflows.stage.drag",
                    defaultMessage: "Drag"
                  }),
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: handleKeyDown,
                  children: /* @__PURE__ */ jsxRuntime.jsx(icons.Drag, {})
                }
              )
            ] }) : null })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, padding: 6, children: [
            {
              disabled: !canUpdate,
              label: formatMessage({
                id: "Settings.review-workflows.stage.name.label",
                defaultMessage: "Stage name"
              }),
              name: `stages.${index2}.name`,
              required: true,
              size: 6,
              type: "string"
            },
            {
              disabled: !canUpdate,
              label: formatMessage({
                id: "content-manager.reviewWorkflows.stage.color",
                defaultMessage: "Color"
              }),
              name: `stages.${index2}.color`,
              required: true,
              size: 6,
              type: "color"
            },
            {
              disabled: !canUpdate,
              label: formatMessage({
                id: "Settings.review-workflows.stage.permissions.label",
                defaultMessage: "Roles that can change this stage"
              }),
              name: `stages.${index2}.permissions`,
              placeholder: formatMessage({
                id: "Settings.review-workflows.stage.permissions.placeholder",
                defaultMessage: "Select a role"
              }),
              required: true,
              size: 6,
              type: "permissions"
            }
          ].map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(InputRenderer, { ...field }) }, field.name)) }) })
        ] })
      }
    )
  ] });
};
const AccordionRoot = styledComponents.styled(designSystem.Accordion.Root)`
  border: 1px solid
    ${({ theme, $error }) => $error ? theme.colors.danger600 : theme.colors.neutral200};
`;
const DeleteMenuItem = styledComponents.styled(designSystem.MenuItem)`
  color: ${({ theme }) => theme.colors.danger600};
`;
const ContextMenuTrigger = styledComponents.styled(designSystem.Menu.Trigger)`
  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }

  > span {
    font-size: 0;
  }
`;
const InputRenderer = (props) => {
  switch (props.type) {
    case "color":
      return /* @__PURE__ */ jsxRuntime.jsx(ColorSelector, { ...props });
    case "permissions":
      return /* @__PURE__ */ jsxRuntime.jsx(PermissionsField, { ...props });
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.InputRenderer, { ...props });
  }
};
const ColorSelector = ({ disabled, label, name, required }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { value, error, onChange } = strapiAdmin.useField(name);
  const colorOptions = index.AVAILABLE_COLORS.map(({ hex, name: name2 }) => ({
    value: hex,
    label: formatMessage(
      {
        id: "Settings.review-workflows.stage.color.name",
        defaultMessage: "{name}"
      },
      { name: name2 }
    ),
    color: hex
  }));
  const { themeColorName } = index.getStageColorByHex(value) ?? {};
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error, name, required, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SingleSelect,
      {
        disabled,
        onChange: (v) => {
          onChange(name, v.toString());
        },
        value: value?.toUpperCase(),
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Flex,
          {
            tag: "span",
            height: 2,
            background: value,
            borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
            hasRadius: true,
            shrink: 0,
            width: 2
          }
        ),
        children: colorOptions.map(({ value: value2, label: label2, color }) => {
          const { themeColorName: themeColorName2 } = index.getStageColorByHex(color) || {};
          return /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.SingleSelectOption,
            {
              value: value2,
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Flex,
                {
                  tag: "span",
                  height: 2,
                  background: color,
                  borderColor: themeColorName2 === "neutral0" ? "neutral150" : "transparent",
                  hasRadius: true,
                  shrink: 0,
                  width: 2
                }
              ),
              children: label2
            },
            value2
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
  ] });
};
const PermissionsField = ({ disabled, name, placeholder, required }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const [isApplyAllConfirmationOpen, setIsApplyAllConfirmationOpen] = React__namespace.useState(false);
  const { value = [], error, onChange } = strapiAdmin.useField(name);
  const allStages = strapiAdmin.useForm("PermissionsField", (state) => state.values.stages);
  const onFormValueChange = strapiAdmin.useForm("PermissionsField", (state) => state.onChange);
  const rolesErrorCount = React__namespace.useRef(0);
  const { data: roles = [], isLoading, error: getRolesError } = useGetAdminRolesQuery();
  const filteredRoles = roles?.filter((role) => role.code !== "strapi-super-admin") ?? [];
  React__namespace.useEffect(() => {
    if (!isLoading && getRolesError && "status" in getRolesError && getRolesError.status == 403 && rolesErrorCount.current === 0) {
      rolesErrorCount.current = 1;
      toggleNotification({
        blockTransition: true,
        type: "danger",
        message: formatMessage({
          id: "review-workflows.stage.permissions.noPermissions.description",
          defaultMessage: "You don’t have the permission to see roles. Contact your administrator."
        })
      });
    }
  }, [formatMessage, isLoading, roles, toggleNotification, getRolesError]);
  if (!isLoading && filteredRoles.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Field.Root,
      {
        name,
        hint: formatMessage({
          id: "Settings.review-workflows.stage.permissions.noPermissions.description",
          defaultMessage: "You don’t have the permission to see roles"
        }),
        required,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "Settings.review-workflows.stage.permissions.label",
            defaultMessage: "Roles that can change this stage"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.TextInput,
            {
              disabled: true,
              placeholder: formatMessage({
                id: "components.NotAllowedInput.text",
                defaultMessage: "No permissions to see this field"
              }),
              startAction: /* @__PURE__ */ jsxRuntime.jsx(icons.EyeStriked, { fill: "neutral600" }),
              type: "text",
              value: ""
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-end", gap: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PermissionWrapper, { grow: 1, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error, name, required: true, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
        id: "Settings.review-workflows.stage.permissions.label",
        defaultMessage: "Roles that can change this stage"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.MultiSelect,
        {
          disabled,
          onChange: (values) => {
            const permissions = values.map((value2) => ({
              role: parseInt(value2, 10),
              action: "admin::review-workflows.stage.transition"
            }));
            onChange(name, permissions);
          },
          placeholder,
          value: value.map((permission) => `${permission.role}`),
          withTags: true,
          children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.MultiSelectGroup,
            {
              label: formatMessage({
                id: "Settings.review-workflows.stage.permissions.allRoles.label",
                defaultMessage: "All roles"
              }),
              values: filteredRoles.map((r) => `${r.id}`),
              children: filteredRoles.map((role) => {
                return /* @__PURE__ */ jsxRuntime.jsx(NestedOption$1, { value: `${role.id}`, children: role.name }, role.id);
              })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Root, { open: isApplyAllConfirmationOpen, onOpenChange: setIsApplyAllConfirmationOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          disabled,
          label: formatMessage({
            id: "Settings.review-workflows.stage.permissions.apply.label",
            defaultMessage: "Apply to all stages"
          }),
          size: "L",
          children: /* @__PURE__ */ jsxRuntime.jsx(icons.Duplicate, {})
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        strapiAdmin.ConfirmDialog,
        {
          onConfirm: () => {
            onFormValueChange(
              "stages",
              allStages.map((stage) => ({
                ...stage,
                permissions: value
              }))
            );
            setIsApplyAllConfirmationOpen(false);
            toggleNotification({
              type: "success",
              message: formatMessage({
                id: "Settings.review-workflows.page.edit.confirm.stages.permissions.copy.success",
                defaultMessage: "Applied roles to all other stages of the workflow"
              })
            });
          },
          variant: "default",
          children: formatMessage({
            id: "Settings.review-workflows.page.edit.confirm.stages.permissions.copy",
            defaultMessage: "Roles that can change that stage will be applied to all the other stages."
          })
        }
      )
    ] })
  ] }) });
};
const NestedOption$1 = styledComponents.styled(designSystem.MultiSelectOption)`
  padding-left: ${({ theme }) => theme.spaces[7]};
`;
const PermissionWrapper = styledComponents.styled(designSystem.Flex)`
  > * {
    flex-grow: 1;
  }
`;
const WorkflowAttributes = ({ canUpdate = true }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { background: "neutral0", hasRadius: true, gap: 4, padding: 6, shadow: "tableShadow", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.InputRenderer,
      {
        disabled: !canUpdate,
        label: formatMessage({
          id: "Settings.review-workflows.workflow.name.label",
          defaultMessage: "Workflow Name"
        }),
        name: "name",
        required: true,
        type: "string"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(ContentTypesSelector, { disabled: !canUpdate }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(StageSelector, { disabled: !canUpdate }) })
  ] });
};
const ContentTypesSelector = ({ disabled }) => {
  const { formatMessage, locale } = reactIntl.useIntl();
  const { data: contentTypes, isLoading } = index.useGetContentTypesQuery();
  const { workflows } = Layout.useReviewWorkflows();
  const currentWorkflow = strapiAdmin.useForm("ContentTypesSelector", (state) => state.values);
  const { error, value, onChange } = strapiAdmin.useField("contentTypes");
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const isDisabled = disabled || isLoading || !contentTypes || contentTypes.collectionType.length === 0 && contentTypes.singleType.length === 0;
  const collectionTypes = (contentTypes?.collectionType ?? []).toSorted((a, b) => formatter.compare(a.info.displayName, b.info.displayName)).map((contentType) => ({
    label: contentType.info.displayName,
    value: contentType.uid
  }));
  const singleTypes = (contentTypes?.singleType ?? []).map((contentType) => ({
    label: contentType.info.displayName,
    value: contentType.uid
  }));
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error, name: "contentTypes", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
      id: "Settings.review-workflows.workflow.contentTypes.label",
      defaultMessage: "Associated to"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.MultiSelect,
      {
        customizeContent: (value2) => formatMessage(
          {
            id: "Settings.review-workflows.workflow.contentTypes.displayValue",
            defaultMessage: "{count} {count, plural, one {content type} other {content types}} selected"
          },
          { count: value2?.length }
        ),
        disabled: isDisabled,
        onChange: (values) => {
          onChange("contentTypes", values);
        },
        value,
        placeholder: formatMessage({
          id: "Settings.review-workflows.workflow.contentTypes.placeholder",
          defaultMessage: "Select"
        }),
        children: [
          ...collectionTypes.length > 0 ? [
            {
              label: formatMessage({
                id: "Settings.review-workflows.workflow.contentTypes.collectionTypes.label",
                defaultMessage: "Collection Types"
              }),
              children: collectionTypes
            }
          ] : [],
          ...singleTypes.length > 0 ? [
            {
              label: formatMessage({
                id: "Settings.review-workflows.workflow.contentTypes.singleTypes.label",
                defaultMessage: "Single Types"
              }),
              children: singleTypes
            }
          ] : []
        ].map((opt) => {
          return /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.MultiSelectGroup,
            {
              label: opt.label,
              values: opt.children.map((child) => child.value.toString()),
              children: opt.children.map((child) => {
                const { name: assignedWorkflowName } = workflows?.find(
                  (workflow) => (currentWorkflow && workflow.id !== currentWorkflow.id || !currentWorkflow) && workflow.contentTypes.includes(child.value)
                ) ?? {};
                return /* @__PURE__ */ jsxRuntime.jsx(NestedOption, { value: child.value, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, {
                  // @ts-expect-error - formatMessage options doesn't expect to be a React component but that's what we need actually for the <i> and <em> components
                  children: formatMessage(
                    {
                      id: "Settings.review-workflows.workflow.contentTypes.assigned.notice",
                      defaultMessage: "{label} {name, select, undefined {} other {<i>(assigned to <em>{name}</em> workflow)</i>}}"
                    },
                    {
                      label: child.label,
                      name: assignedWorkflowName,
                      em: (...children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "em", fontWeight: "bold", children }),
                      i: (...children) => /* @__PURE__ */ jsxRuntime.jsx(ContentTypeTakeNotice, { children })
                    }
                  )
                }) }, child.value);
              })
            },
            opt.label
          );
        })
      }
    )
  ] });
};
const NestedOption = styledComponents.styled(designSystem.MultiSelectOption)`
  padding-left: ${({ theme }) => theme.spaces[7]};
`;
const ContentTypeTakeNotice = styledComponents.styled(designSystem.Typography)`
  font-style: italic;
`;
const StageSelector = ({ disabled }) => {
  const { value: stages = [] } = strapiAdmin.useField("stages");
  const { formatMessage } = reactIntl.useIntl();
  const { error, value, onChange } = strapiAdmin.useField("stageRequiredToPublish");
  const validStages = stages.filter((stage) => stage.name);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      error,
      name: "stageRequiredToPublish",
      hint: formatMessage({
        id: "settings.review-workflows.workflow.stageRequiredToPublish.hint",
        defaultMessage: "Prevents entries from being published if they are not at the required stage."
      }),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
          id: "settings.review-workflows.workflow.stageRequiredToPublish.label",
          defaultMessage: "Required stage for publishing"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            disabled,
            onChange: (value2) => {
              onChange("stageRequiredToPublish", value2);
            },
            value,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "", children: formatMessage({
                id: "settings.review-workflows.workflow.stageRequiredToPublish.any",
                defaultMessage: "Any stage"
              }) }),
              validStages.map((stage, i) => /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.SingleSelectOption,
                {
                  value: stage.id?.toString() || stage.__temp_key__,
                  children: stage.name
                },
                `requiredToPublishStage-${stage.id || stage.__temp_key__}`
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ]
    }
  );
};
const WORKFLOW_SCHEMA = yup__namespace.object({
  contentTypes: yup__namespace.array().of(yup__namespace.string()),
  name: yup__namespace.string().max(255, {
    id: "review-workflows.validation.name.max-length",
    defaultMessage: "Name can not be longer than 255 characters"
  }).required().nullable(),
  stages: yup__namespace.array().of(
    yup__namespace.object().shape({
      name: yup__namespace.string().nullable().required({
        id: "review-workflows.validation.stage.name",
        defaultMessage: "Name is required"
      }).max(255, {
        id: "review-workflows.validation.stage.max-length",
        defaultMessage: "Name can not be longer than 255 characters"
      }).test(
        "unique-name",
        {
          id: "review-workflows.validation.stage.duplicate",
          defaultMessage: "Stage name must be unique"
        },
        (stageName, context) => {
          const { stages } = context.from[1].value;
          return stages.filter((stage) => stage.name === stageName).length === 1;
        }
      ),
      color: yup__namespace.string().nullable().required({
        id: "review-workflows.validation.stage.color",
        defaultMessage: "Color is required"
      }).matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/i),
      permissions: yup__namespace.array(
        yup__namespace.object({
          role: yup__namespace.number().strict().typeError({
            id: "review-workflows.validation.stage.permissions.role.number",
            defaultMessage: "Role must be of type number"
          }).required(),
          action: yup__namespace.string().required({
            id: "review-workflows.validation.stage.permissions.action.required",
            defaultMessage: "Action is a required argument"
          })
        })
      ).strict()
    })
  ).min(1),
  stageRequiredToPublish: yup__namespace.string().nullable()
});
const EditPage = () => {
  const { id = "" } = reactRouterDom.useParams();
  const isCreatingWorkflow = id === "create";
  const { formatMessage } = reactIntl.useIntl();
  const { _unstableFormatValidationErrors: formatValidationErrors } = strapiAdmin.useAPIErrorHandler();
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = strapiAdmin.useNotification();
  const {
    isLoading: isLoadingWorkflow,
    meta,
    workflows,
    error,
    update,
    create
  } = Layout.useReviewWorkflows();
  const permissions = index.useTypedSelector(
    (state) => state.admin_app.permissions["settings"]?.["review-workflows"]
  );
  const {
    allowedActions: { canDelete, canUpdate, canCreate }
  } = strapiAdmin.useRBAC(permissions);
  const [savePrompts, setSavePrompts] = React__namespace.useState({});
  const { getFeature, isLoading: isLicenseLoading } = ee.useLicenseLimits();
  const [showLimitModal, setShowLimitModal] = React__namespace.useState(null);
  const currentWorkflow = workflows?.find((workflow) => workflow.id === parseInt(id, 10));
  const contentTypesFromOtherWorkflows = workflows?.filter((workflow) => workflow.id !== parseInt(id, 10)).flatMap((workflow) => workflow.contentTypes);
  const limits = getFeature("review-workflows");
  const numberOfWorkflows = limits?.[index.CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME];
  const stagesPerWorkflow = limits?.[index.CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME];
  const submitForm = async (data, helpers) => {
    try {
      const { stageRequiredToPublish, ...rest } = data;
      const stageRequiredToPublishName = stageRequiredToPublish === "" ? null : rest.stages.find(
        (stage) => stage.id === Number(stageRequiredToPublish) || stage.__temp_key__ === stageRequiredToPublish
      )?.name;
      if (!isCreatingWorkflow) {
        const res = await update(id, {
          ...rest,
          // compare permissions of stages and only submit them if at least one has
          // changed; this enables partial updates e.g. for users who don't have
          // permissions to see roles
          stages: rest.stages.map((stage) => {
            let hasUpdatedPermissions = true;
            const serverStage = currentWorkflow?.stages?.find(
              (serverStage2) => serverStage2.id === stage?.id
            );
            if (serverStage) {
              hasUpdatedPermissions = serverStage.permissions?.length !== stage.permissions?.length || !serverStage.permissions?.every(
                (serverPermission) => !!stage.permissions?.find(
                  (permission) => permission.role === serverPermission.role
                )
              );
            }
            return {
              ...stage,
              permissions: hasUpdatedPermissions ? stage.permissions : void 0
            };
          }),
          stageRequiredToPublishName
        });
        if ("error" in res && index.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          helpers.setErrors(formatValidationErrors(res.error));
        }
      } else {
        const res = await create({
          ...rest,
          stageRequiredToPublishName
        });
        if ("error" in res && index.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          helpers.setErrors(formatValidationErrors(res.error));
        } else if ("data" in res) {
          navigate(`../${res.data.id}`, { replace: true });
        }
      }
    } catch (error2) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    }
    setSavePrompts({});
  };
  const handleConfirmDeleteDialog = (data, helpers) => async () => {
    await submitForm(data, helpers);
  };
  const handleConfirmClose = () => {
    setSavePrompts({});
  };
  const handleSubmit = async (data, helpers) => {
    const isContentTypeReassignment = data.contentTypes.some(
      (contentType) => contentTypesFromOtherWorkflows?.includes(contentType)
    );
    const hasDeletedServerStages = !isCreatingWorkflow && !currentWorkflow?.stages.every(
      (stage) => data.stages.some((newStage) => newStage.id === stage.id)
    );
    if (meta && numberOfWorkflows && meta?.workflowCount > parseInt(numberOfWorkflows, 10)) {
      setShowLimitModal("workflow");
    } else if (data.stages && stagesPerWorkflow && data.stages.length > parseInt(stagesPerWorkflow, 10)) {
      setShowLimitModal("stage");
    } else if (hasDeletedServerStages || isContentTypeReassignment) {
      if (hasDeletedServerStages) {
        setSavePrompts((prev) => ({ ...prev, hasDeletedServerStages: true }));
      }
      if (isContentTypeReassignment) {
        setSavePrompts((prev) => ({ ...prev, hasReassignedContentTypes: true }));
      }
    } else {
      await submitForm(data, helpers);
    }
  };
  React__namespace.useEffect(() => {
    if (!isLoadingWorkflow && !isLicenseLoading) {
      if (meta && numberOfWorkflows && meta?.workflowCount > parseInt(numberOfWorkflows, 10)) {
        setShowLimitModal("workflow");
      } else if (currentWorkflow && currentWorkflow.stages && stagesPerWorkflow && currentWorkflow.stages.length > parseInt(stagesPerWorkflow, 10)) {
        setShowLimitModal("stage");
      }
    }
  }, [
    currentWorkflow,
    isLicenseLoading,
    isLoadingWorkflow,
    limits,
    meta,
    numberOfWorkflows,
    stagesPerWorkflow
  ]);
  const initialValues = React__namespace.useMemo(() => {
    if (isCreatingWorkflow || !currentWorkflow) {
      return {
        name: "",
        stages: [],
        contentTypes: [],
        stageRequiredToPublish: ""
      };
    } else {
      return {
        name: currentWorkflow.name,
        stages: addTmpKeysToStages(currentWorkflow.stages),
        contentTypes: currentWorkflow.contentTypes,
        stageRequiredToPublish: currentWorkflow.stageRequiredToPublish?.id.toString() ?? ""
      };
    }
  }, [currentWorkflow, isCreatingWorkflow]);
  if (isLoadingWorkflow) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Layout.DragLayerRendered, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Form,
      {
        method: isCreatingWorkflow ? "POST" : "PUT",
        initialValues,
        validationSchema: WORKFLOW_SCHEMA,
        onSubmit: handleSubmit,
        children: ({ modified, isSubmitting, values, setErrors }) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Layout.Header,
            {
              navigationAction: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.BackButton, { fallback: ".." }),
              primaryAction: canUpdate || canCreate ? /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  type: "submit",
                  disabled: !modified || isSubmitting || values.stages.length === 0,
                  loading: !Boolean(Object.keys(savePrompts).length > 0) && isSubmitting,
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              ) : null,
              subtitle: formatMessage(
                {
                  id: "review-workflows.page.subtitle",
                  defaultMessage: "{count, plural, one {# stage} other {# stages}}"
                },
                { count: currentWorkflow?.stages?.length ?? 0 }
              ),
              title: currentWorkflow?.name || formatMessage({
                id: "Settings.review-workflows.create.page.title",
                defaultMessage: "Create Review Workflow"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(Layout.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", direction: "column", gap: 7, children: [
            /* @__PURE__ */ jsxRuntime.jsx(WorkflowAttributes, { canUpdate: canUpdate || canCreate }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Stages,
              {
                canDelete,
                canUpdate: canUpdate || canCreate,
                isCreating: isCreatingWorkflow
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Dialog.Root,
            {
              open: Object.keys(savePrompts).length > 0,
              onOpenChange: handleConfirmClose,
              children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.ConfirmDialog, { onConfirm: handleConfirmDeleteDialog(values, { setErrors }), children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 5, children: [
                savePrompts.hasDeletedServerStages && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textAlign: "center", variant: "omega", children: formatMessage({
                  id: "review-workflows.page.delete.confirm.stages.body",
                  defaultMessage: "All entries assigned to deleted stages will be moved to the previous stage."
                }) }),
                savePrompts.hasReassignedContentTypes && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textAlign: "center", variant: "omega", children: formatMessage(
                  {
                    id: "review-workflows.page.delete.confirm.contentType.body",
                    defaultMessage: "{count} {count, plural, one {content-type} other {content-types}} {count, plural, one {is} other {are}} already mapped to {count, plural, one {another workflow} other {other workflows}}. If you save changes, {count, plural, one {this} other {these}} {count, plural, one {content-type} other {{count} content-types}} will no more be mapped to the {count, plural, one {another workflow} other {other workflows}} and all corresponding information will be removed."
                  },
                  {
                    count: contentTypesFromOtherWorkflows?.filter(
                      (contentType) => values.contentTypes.includes(contentType)
                    ).length ?? 0
                  }
                ) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textAlign: "center", variant: "omega", children: formatMessage({
                  id: "review-workflows.page.delete.confirm.confirm",
                  defaultMessage: "Are you sure you want to save?"
                }) })
              ] }) })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      index.LimitsModal.Root,
      {
        open: showLimitModal === "workflow",
        onOpenChange: () => setShowLimitModal(null),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(index.LimitsModal.Title, { children: formatMessage({
            id: "review-workflows.edit.page.workflows.limit.title",
            defaultMessage: "You’ve reached the limit of workflows in your plan"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(index.LimitsModal.Body, { children: formatMessage({
            id: "review-workflows.edit.page.workflows.limit.body",
            defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      index.LimitsModal.Root,
      {
        open: showLimitModal === "stage",
        onOpenChange: () => setShowLimitModal(null),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(index.LimitsModal.Title, { children: formatMessage({
            id: "review-workflows.edit.page.stages.limit.title",
            defaultMessage: "You have reached the limit of stages for this workflow in your plan"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(index.LimitsModal.Body, { children: formatMessage({
            id: "review-workflows.edit.page.stages.limit.body",
            defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
          }) })
        ]
      }
    )
  ] });
};
const addTmpKeysToStages = (data) => {
  const keys = fractionalIndexing.generateNKeysBetween(void 0, void 0, data.length);
  return data.map((datum, index2) => ({
    ...datum,
    __temp_key__: keys[index2]
  }));
};
const ProtectedEditPage = () => {
  const permissions = index.useTypedSelector((state) => {
    const {
      create = [],
      update = [],
      read = []
    } = state.admin_app.permissions.settings?.["review-workflows"] ?? {};
    return [...create, ...update, ...read];
  });
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(EditPage, {}) });
};
exports.ProtectedEditPage = ProtectedEditPage;
//# sourceMappingURL=id-BI6AAFQF.js.map
