import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useQueryParams, useForm, useField, useNotification, useFocusInputField } from "@strapi/admin/strapi-admin";
import { Flex, TextButton, Field, Combobox, ComboboxOption, Typography, VisuallyHidden, Box, useComposedRefs, IconButton, Tooltip, Link } from "@strapi/design-system";
import { ArrowClockwise, Drag, Cross } from "@strapi/icons";
import { generateNKeysBetween } from "fractional-indexing";
import pipe from "lodash/fp/pipe";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { styled } from "styled-components";
import { c as useDoc, d as buildValidParams, C as COLLECTION_TYPES, g as getTranslation, D as DocumentStatus } from "./index-ByPZ754U.mjs";
import { u as useDragAndDrop, I as ItemTypes, D as DROP_SENSITIVITY } from "./useDragAndDrop-DJ6jqvZN.mjs";
import { u as useGetRelationsQuery, g as getRelationLabel, a as useLazySearchRelationsQuery } from "./relations-CBc5HYHC.mjs";
const [ComponentProvider, useComponent] = createContext("ComponentContext", {
  id: void 0,
  level: -1,
  uid: void 0,
  type: void 0
});
function useHandleDisconnect(fieldName, consumerName) {
  const field = useField(fieldName);
  const removeFieldRow = useForm(consumerName, (state) => state.removeFieldRow);
  const addFieldRow = useForm(consumerName, (state) => state.addFieldRow);
  const handleDisconnect = (relation) => {
    if (field.value && field.value.connect) {
      const indexOfRelationInConnectArray = field.value.connect.findIndex(
        (rel) => rel.id === relation.id
      );
      if (indexOfRelationInConnectArray >= 0) {
        removeFieldRow(`${fieldName}.connect`, indexOfRelationInConnectArray);
        return;
      }
    }
    addFieldRow(`${fieldName}.disconnect`, {
      id: relation.id,
      apiData: {
        id: relation.id,
        documentId: relation.documentId,
        locale: relation.locale
      }
    });
  };
  return handleDisconnect;
}
const RELATIONS_TO_DISPLAY = 5;
const ONE_WAY_RELATIONS = ["oneWay", "oneToOne", "manyToOne", "oneToManyMorph", "oneToOneMorph"];
const RelationsField = React.forwardRef(
  ({ disabled, label, ...props }, ref) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const { document, model: documentModel } = useDoc();
    const documentId = document?.documentId;
    const { formatMessage } = useIntl();
    const [{ query }] = useQueryParams();
    const params = buildValidParams(query);
    const isMorph = props.attribute.relation.toLowerCase().includes("morph");
    const isDisabled = isMorph || disabled;
    const { componentId, componentUID } = useComponent("RelationsField", ({ uid, id: id2 }) => ({
      componentId: id2,
      componentUID: uid
    }));
    const isSubmitting = useForm("RelationsList", (state) => state.isSubmitting);
    React.useEffect(() => {
      setCurrentPage(1);
    }, [isSubmitting]);
    const id = componentId ? componentId.toString() : documentId;
    const model = componentUID ?? documentModel;
    const [targetField] = props.name.split(".").slice(-1);
    const { data, isLoading, isFetching } = useGetRelationsQuery(
      {
        model,
        targetField,
        // below we don't run the query if there is no id.
        id,
        params: {
          ...params,
          pageSize: RELATIONS_TO_DISPLAY,
          page: currentPage
        }
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !id,
        selectFromResult: (result) => {
          return {
            ...result,
            data: {
              ...result.data,
              results: result.data?.results ? result.data.results : []
            }
          };
        }
      }
    );
    const handleLoadMore = () => {
      setCurrentPage((prev) => prev + 1);
    };
    const field = useField(props.name);
    const isFetchingMoreRelations = isLoading || isFetching;
    const realServerRelationsCount = "pagination" in data && data.pagination ? data.pagination.total : 0;
    const relationsConnected = (field.value?.connect ?? []).filter(
      (rel) => data.results.findIndex((relation) => relation.id === rel.id) === -1
    ).length ?? 0;
    const relationsDisconnected = field.value?.disconnect?.length ?? 0;
    const relationsCount = realServerRelationsCount + relationsConnected - relationsDisconnected;
    const relations = React.useMemo(() => {
      const ctx = {
        field: field.value,
        // @ts-expect-error – targetModel does exist on the attribute. But it's not typed.
        href: `../${COLLECTION_TYPES}/${props.attribute.targetModel}`,
        mainField: props.mainField
      };
      const transformations = pipe(
        removeConnected(ctx),
        removeDisconnected(ctx),
        addLabelAndHref(ctx)
      );
      const transformedRels = transformations([...data.results]);
      return [...transformedRels, ...field.value?.connect ?? []].sort((a, b) => {
        if (a.__temp_key__ < b.__temp_key__) return -1;
        if (a.__temp_key__ > b.__temp_key__) return 1;
        return 0;
      });
    }, [
      data.results,
      field.value,
      // @ts-expect-error – targetModel does exist on the attribute. But it's not typed.
      props.attribute.targetModel,
      props.mainField
    ]);
    const handleDisconnect = useHandleDisconnect(props.name, "RelationsField");
    const handleConnect = (relation) => {
      const [lastItemInList] = relations.slice(-1);
      const item = {
        id: relation.id,
        apiData: {
          id: relation.id,
          documentId: relation.documentId,
          locale: relation.locale
        },
        status: relation.status,
        /**
         * If there's a last item, that's the first key we use to generate out next one.
         */
        __temp_key__: generateNKeysBetween(lastItemInList?.__temp_key__ ?? null, null, 1)[0],
        // Fallback to `id` if there is no `mainField` value, which will overwrite the above `id` property with the exact same data.
        [props.mainField?.name ?? "documentId"]: relation[props.mainField?.name ?? "documentId"],
        label: getRelationLabel(relation, props.mainField),
        // @ts-expect-error – targetModel does exist on the attribute, but it's not typed.
        href: `../${COLLECTION_TYPES}/${props.attribute.targetModel}/${relation.documentId}?${relation.locale ? `plugins[i18n][locale]=${relation.locale}` : ""}`
      };
      if (ONE_WAY_RELATIONS.includes(props.attribute.relation)) {
        field.value?.connect?.forEach(handleDisconnect);
        relations.forEach(handleDisconnect);
        field.onChange(`${props.name}.connect`, [item]);
      } else {
        field.onChange(`${props.name}.connect`, [...field.value?.connect ?? [], item]);
      }
    };
    return /* @__PURE__ */ jsxs(
      Flex,
      {
        ref,
        direction: "column",
        gap: 3,
        justifyContent: "space-between",
        alignItems: "stretch",
        wrap: "wrap",
        children: [
          /* @__PURE__ */ jsxs(StyledFlex, { direction: "column", alignItems: "start", gap: 2, width: "100%", children: [
            /* @__PURE__ */ jsx(
              RelationsInput,
              {
                disabled: isDisabled,
                id: componentUID ? componentId ? `${componentId}` : "" : documentId,
                label: `${label} ${relationsCount > 0 ? `(${relationsCount})` : ""}`,
                model,
                onChange: handleConnect,
                ...props
              }
            ),
            "pagination" in data && data.pagination && data.pagination.pageCount > data.pagination.page ? /* @__PURE__ */ jsx(
              TextButton,
              {
                disabled: isFetchingMoreRelations,
                onClick: handleLoadMore,
                loading: isFetchingMoreRelations,
                startIcon: /* @__PURE__ */ jsx(ArrowClockwise, {}),
                shrink: 0,
                children: formatMessage({
                  id: getTranslation("relation.loadMore"),
                  defaultMessage: "Load More"
                })
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsx(
            RelationsList,
            {
              data: relations,
              serverData: data.results,
              disabled: isDisabled,
              name: props.name,
              isLoading: isFetchingMoreRelations,
              relationType: props.attribute.relation
            }
          )
        ]
      }
    );
  }
);
const StyledFlex = styled(Flex)`
  & > div {
    width: 100%;
  }
`;
const removeConnected = ({ field }) => (relations) => {
  return relations.filter((relation) => {
    const connectedRelations = field?.connect ?? [];
    return connectedRelations.findIndex((rel) => rel.id === relation.id) === -1;
  });
};
const removeDisconnected = ({ field }) => (relations) => relations.filter((relation) => {
  const disconnectedRelations = field?.disconnect ?? [];
  return disconnectedRelations.findIndex((rel) => rel.id === relation.id) === -1;
});
const addLabelAndHref = ({ mainField, href }) => (relations) => relations.map((relation) => {
  return {
    ...relation,
    // Fallback to `id` if there is no `mainField` value, which will overwrite the above `documentId` property with the exact same data.
    [mainField?.name ?? "documentId"]: relation[mainField?.name ?? "documentId"],
    label: getRelationLabel(relation, mainField),
    href: `${href}/${relation.documentId}?${relation.locale ? `plugins[i18n][locale]=${relation.locale}` : ""}`
  };
});
const RelationsInput = ({
  hint,
  id,
  model,
  label,
  labelAction,
  name,
  mainField,
  placeholder,
  required,
  unique: _unique,
  "aria-label": _ariaLabel,
  onChange,
  ...props
}) => {
  const [textValue, setTextValue] = React.useState("");
  const [searchParams, setSearchParams] = React.useState({
    _q: "",
    page: 1
  });
  const { toggleNotification } = useNotification();
  const [{ query }] = useQueryParams();
  const { formatMessage } = useIntl();
  const fieldRef = useFocusInputField(name);
  const field = useField(name);
  const [searchForTrigger, { data, isLoading }] = useLazySearchRelationsQuery();
  React.useEffect(() => {
    const [targetField] = name.split(".").slice(-1);
    searchForTrigger({
      model,
      targetField,
      params: {
        ...buildValidParams(query),
        id: id ?? "",
        pageSize: 10,
        idsToInclude: field.value?.disconnect?.map((rel) => rel.id.toString()) ?? [],
        idsToOmit: field.value?.connect?.map((rel) => rel.id.toString()) ?? [],
        ...searchParams
      }
    });
  }, [
    field.value?.connect,
    field.value?.disconnect,
    id,
    model,
    name,
    query,
    searchForTrigger,
    searchParams
  ]);
  const handleSearch = async (search) => {
    setSearchParams((s) => ({ ...s, _q: search, page: 1 }));
  };
  const hasNextPage = data?.pagination ? data.pagination.page < data.pagination.pageCount : false;
  const options = data?.results ?? [];
  const handleChange = (relationId) => {
    if (!relationId) {
      return;
    }
    const relation = options.find((opt) => opt.id.toString() === relationId);
    if (!relation) {
      console.error(
        "You've tried to add a relation with an id that does not exist in the options you can see, this is likely a bug with Strapi. Please open an issue."
      );
      toggleNotification({
        message: formatMessage({
          id: getTranslation("relation.error-adding-relation"),
          defaultMessage: "An error occurred while trying to add the relation."
        }),
        type: "danger"
      });
      return;
    }
    onChange(relation);
  };
  const handleLoadMore = () => {
    if (!data || !data.pagination) {
      return;
    } else if (data.pagination.page < data.pagination.pageCount) {
      setSearchParams((s) => ({ ...s, page: s.page + 1 }));
    }
  };
  React.useLayoutEffect(() => {
    setTextValue("");
  }, [field.value]);
  return /* @__PURE__ */ jsxs(Field.Root, { error: field.error, hint, name, required, children: [
    /* @__PURE__ */ jsx(Field.Label, { action: labelAction, children: label }),
    /* @__PURE__ */ jsx(
      Combobox,
      {
        ref: fieldRef,
        name,
        autocomplete: "list",
        placeholder: placeholder || formatMessage({
          id: getTranslation("relation.add"),
          defaultMessage: "Add relation"
        }),
        hasMoreItems: hasNextPage,
        loading: isLoading,
        onOpenChange: () => {
          handleSearch(textValue ?? "");
        },
        noOptionsMessage: () => formatMessage({
          id: getTranslation("relation.notAvailable"),
          defaultMessage: "No relations available"
        }),
        loadingMessage: formatMessage({
          id: getTranslation("relation.isLoading"),
          defaultMessage: "Relations are loading"
        }),
        onLoadMore: handleLoadMore,
        textValue,
        onChange: handleChange,
        onTextValueChange: (text) => {
          setTextValue(text);
        },
        onInputChange: (event) => {
          handleSearch(event.currentTarget.value);
        },
        ...props,
        children: options.map((opt) => {
          const textValue2 = getRelationLabel(opt, mainField);
          return /* @__PURE__ */ jsx(ComboboxOption, { value: opt.id.toString(), textValue: textValue2, children: /* @__PURE__ */ jsxs(Flex, { gap: 2, justifyContent: "space-between", children: [
            /* @__PURE__ */ jsx(Typography, { ellipsis: true, children: textValue2 }),
            opt.status ? /* @__PURE__ */ jsx(DocumentStatus, { status: opt.status }) : null
          ] }) }, opt.id);
        })
      }
    ),
    /* @__PURE__ */ jsx(Field.Error, {}),
    /* @__PURE__ */ jsx(Field.Hint, {})
  ] });
};
const RELATION_ITEM_HEIGHT = 50;
const RELATION_GUTTER = 4;
const RelationsList = ({
  data,
  serverData,
  disabled,
  name,
  isLoading,
  relationType
}) => {
  const ariaDescriptionId = React.useId();
  const { formatMessage } = useIntl();
  const listRef = React.useRef(null);
  const outerListRef = React.useRef(null);
  const [overflow, setOverflow] = React.useState();
  const [liveText, setLiveText] = React.useState("");
  const field = useField(name);
  React.useEffect(() => {
    if (data.length <= RELATIONS_TO_DISPLAY) {
      return setOverflow(void 0);
    }
    const handleNativeScroll = (e) => {
      const el = e.target;
      const parentScrollContainerHeight = el.parentNode.scrollHeight;
      const maxScrollBottom = el.scrollHeight - el.scrollTop;
      if (el.scrollTop === 0) {
        return setOverflow("bottom");
      }
      if (maxScrollBottom === parentScrollContainerHeight) {
        return setOverflow("top");
      }
      return setOverflow("top-bottom");
    };
    const outerListRefCurrent = outerListRef?.current;
    if (!isLoading && data.length > 0 && outerListRefCurrent) {
      outerListRef.current.addEventListener("scroll", handleNativeScroll);
    }
    return () => {
      if (outerListRefCurrent) {
        outerListRefCurrent.removeEventListener("scroll", handleNativeScroll);
      }
    };
  }, [isLoading, data.length]);
  const getItemPos = (index) => `${index + 1} of ${data.length}`;
  const handleMoveItem = (newIndex, oldIndex) => {
    const item = data[oldIndex];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: item.label ?? item.documentId,
          position: getItemPos(newIndex)
        }
      )
    );
    const newData = [...data];
    const currentRow = data[oldIndex];
    const startKey = oldIndex > newIndex ? newData[newIndex - 1]?.__temp_key__ : newData[newIndex]?.__temp_key__;
    const endKey = oldIndex > newIndex ? newData[newIndex]?.__temp_key__ : newData[newIndex + 1]?.__temp_key__;
    const [newKey] = generateNKeysBetween(startKey, endKey, 1);
    newData.splice(oldIndex, 1);
    newData.splice(newIndex, 0, { ...currentRow, __temp_key__: newKey });
    const connectedRelations = newData.reduce((acc, relation, currentIndex, array) => {
      const relationOnServer = serverData.find((oldRelation) => oldRelation.id === relation.id);
      const relationInFront = array[currentIndex + 1];
      if (!relationOnServer || relationOnServer.__temp_key__ !== relation.__temp_key__) {
        const position = relationInFront ? {
          before: relationInFront.documentId,
          locale: relationInFront.locale,
          status: "publishedAt" in relationInFront && relationInFront.publishedAt ? "published" : "draft"
        } : { end: true };
        const relationWithPosition = {
          ...relation,
          ...{
            apiData: {
              id: relation.id,
              documentId: relation.documentId,
              locale: relation.locale,
              position
            }
          }
        };
        return [...acc, relationWithPosition];
      }
      return acc;
    }, []).toReversed();
    field.onChange(`${name}.connect`, connectedRelations);
  };
  const handleGrabItem = (index) => {
    const item = data[index];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: item.label ?? item.documentId,
          position: getItemPos(index)
        }
      )
    );
  };
  const handleDropItem = (index) => {
    const { href: _href, label, ...item } = data[index];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: label ?? item.documentId,
          position: getItemPos(index)
        }
      )
    );
  };
  const handleCancel = (index) => {
    const item = data[index];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: item.label ?? item.documentId
        }
      )
    );
  };
  const handleDisconnect = useHandleDisconnect(name, "RelationsList");
  const canReorder = !ONE_WAY_RELATIONS.includes(relationType);
  const dynamicListHeight = data.length > RELATIONS_TO_DISPLAY ? Math.min(data.length, RELATIONS_TO_DISPLAY) * (RELATION_ITEM_HEIGHT + RELATION_GUTTER) + RELATION_ITEM_HEIGHT / 2 : Math.min(data.length, RELATIONS_TO_DISPLAY) * (RELATION_ITEM_HEIGHT + RELATION_GUTTER);
  return /* @__PURE__ */ jsxs(ShadowBox, { $overflowDirection: overflow, children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
      id: getTranslation("dnd.instructions"),
      defaultMessage: `Press spacebar to grab and re-order`
    }) }),
    /* @__PURE__ */ jsx(VisuallyHidden, { "aria-live": "assertive", children: liveText }),
    /* @__PURE__ */ jsx(
      FixedSizeList,
      {
        height: dynamicListHeight,
        ref: listRef,
        outerRef: outerListRef,
        itemCount: data.length,
        itemSize: RELATION_ITEM_HEIGHT + RELATION_GUTTER,
        itemData: {
          ariaDescribedBy: ariaDescriptionId,
          canDrag: canReorder,
          disabled,
          handleCancel,
          handleDropItem,
          handleGrabItem,
          handleMoveItem,
          name,
          handleDisconnect,
          relations: data
        },
        itemKey: (index) => data[index].id,
        innerElementType: "ol",
        children: ListItem
      }
    )
  ] });
};
const ShadowBox = styled(Box)`
  position: relative;
  overflow: hidden;
  flex: 1;

  &:before,
  &:after {
    position: absolute;
    width: 100%;
    height: 4px;
    z-index: 1;
  }

  &:before {
    /* TODO: as for DS Table component we would need this to be handled by the DS theme */
    content: '';
    background: linear-gradient(rgba(3, 3, 5, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    top: 0;
    opacity: ${({ $overflowDirection }) => $overflowDirection === "top-bottom" || $overflowDirection === "top" ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
  }

  &:after {
    /* TODO: as for DS Table component we would need this to be handled by the DS theme */
    content: '';
    background: linear-gradient(0deg, rgba(3, 3, 5, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    bottom: 0;
    opacity: ${({ $overflowDirection }) => $overflowDirection === "top-bottom" || $overflowDirection === "bottom" ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
  }
`;
const ListItem = ({ data, index, style }) => {
  const {
    ariaDescribedBy,
    canDrag = false,
    disabled = false,
    handleCancel,
    handleDisconnect,
    handleDropItem,
    handleGrabItem,
    handleMoveItem,
    name,
    relations
  } = data;
  const { formatMessage } = useIntl();
  const { href, id, label, status } = relations[index];
  const [{ handlerId, isDragging, handleKeyDown }, relationRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(
    canDrag && !disabled,
    {
      type: `${ItemTypes.RELATION}_${name}`,
      index,
      item: {
        displayedValue: label,
        status,
        id,
        index
      },
      onMoveItem: handleMoveItem,
      onDropItem: handleDropItem,
      onGrabItem: handleGrabItem,
      onCancel: handleCancel,
      dropSensitivity: DROP_SENSITIVITY.REGULAR
    }
  );
  const composedRefs = useComposedRefs(relationRef, dragRef);
  React.useEffect(() => {
    dragPreviewRef(getEmptyImage());
  }, [dragPreviewRef]);
  return /* @__PURE__ */ jsx(
    Box,
    {
      style,
      tag: "li",
      ref: dropRef,
      "aria-describedby": ariaDescribedBy,
      cursor: canDrag ? "all-scroll" : "default",
      children: isDragging ? /* @__PURE__ */ jsx(RelationItemPlaceholder, {}) : /* @__PURE__ */ jsxs(
        Flex,
        {
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: canDrag ? 2 : 4,
          paddingRight: 4,
          hasRadius: true,
          borderColor: "neutral200",
          background: disabled ? "neutral150" : "neutral0",
          justifyContent: "space-between",
          ref: composedRefs,
          "data-handler-id": handlerId,
          children: [
            /* @__PURE__ */ jsxs(FlexWrapper, { gap: 1, children: [
              canDrag ? /* @__PURE__ */ jsx(
                IconButton,
                {
                  tag: "div",
                  role: "button",
                  tabIndex: 0,
                  withTooltip: false,
                  label: formatMessage({
                    id: getTranslation("components.RelationInput.icon-button-aria-label"),
                    defaultMessage: "Drag"
                  }),
                  variant: "ghost",
                  onKeyDown: handleKeyDown,
                  disabled,
                  children: /* @__PURE__ */ jsx(Drag, {})
                }
              ) : null,
              /* @__PURE__ */ jsxs(Flex, { width: "100%", minWidth: 0, justifyContent: "space-between", children: [
                /* @__PURE__ */ jsx(Box, { minWidth: 0, paddingTop: 1, paddingBottom: 1, paddingRight: 4, children: /* @__PURE__ */ jsx(Tooltip, { description: label, children: href ? /* @__PURE__ */ jsx(LinkEllipsis, { tag: NavLink, to: href, isExternal: false, children: label }) : /* @__PURE__ */ jsx(Typography, { textColor: disabled ? "neutral600" : "primary600", ellipsis: true, children: label }) }) }),
                status ? /* @__PURE__ */ jsx(DocumentStatus, { status }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsx(Box, { paddingLeft: 4, children: /* @__PURE__ */ jsx(
              IconButton,
              {
                onClick: () => handleDisconnect(relations[index]),
                disabled,
                label: formatMessage({
                  id: getTranslation("relation.disconnect"),
                  defaultMessage: "Remove"
                }),
                variant: "ghost",
                size: "S",
                children: /* @__PURE__ */ jsx(Cross, {})
              }
            ) })
          ]
        }
      )
    }
  );
};
const FlexWrapper = styled(Flex)`
  width: 100%;
  /* Used to prevent endAction to be pushed out of container */
  min-width: 0;

  & > div[role='button'] {
    cursor: all-scroll;
  }
`;
const DisconnectButton = styled.button`
  svg path {
    fill: ${({ theme, disabled }) => disabled ? theme.colors.neutral600 : theme.colors.neutral500};
  }

  &:hover svg path,
  &:focus svg path {
    fill: ${({ theme, disabled }) => !disabled && theme.colors.neutral600};
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
const RelationItemPlaceholder = () => /* @__PURE__ */ jsx(
  Box,
  {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    hasRadius: true,
    borderStyle: "dashed",
    borderColor: "primary600",
    borderWidth: "1px",
    background: "primary100",
    height: `calc(100% - ${RELATION_GUTTER}px)`
  }
);
const MemoizedRelationsField = React.memo(RelationsField);
export {
  ComponentProvider as C,
  DisconnectButton as D,
  FlexWrapper as F,
  LinkEllipsis as L,
  MemoizedRelationsField as M,
  useComponent as u
};
//# sourceMappingURL=Relations-Bvne4TvU.mjs.map
