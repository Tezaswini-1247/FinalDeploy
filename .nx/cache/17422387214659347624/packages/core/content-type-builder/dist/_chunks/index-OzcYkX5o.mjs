import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useContext, useState, Fragment, useRef, useEffect, memo, useMemo, lazy, Suspense } from "react";
import { useNotification, useTracking, useStrapiApp, ConfirmDialog, translatedErrors, useGuidedTour, useAppInfo, useAuth, useFetchClient, Page, Layouts } from "@strapi/admin/strapi-admin";
import { useIntl } from "react-intl";
import { NavLink, Link, useNavigate, useLocation, useMatch, Navigate, Routes, Route } from "react-router-dom";
import { p as pluginId, n as nameToSlug, O as ON_CHANGE_RELATION_TARGET, a as ON_CHANGE_RELATION_TYPE, g as getRelationType, M as MAX_COMPONENT_DEPTH, c as createComponentUid, b as createUid, i as initialState, S as SET_DATA_TO_EDIT, d as SET_DYNAMIC_ZONE_DATA_SCHEMA, e as SET_CUSTOM_FIELD_DATA_SCHEMA, f as SET_ATTRIBUTE_DATA_SCHEMA, R as RESET_PROPS, h as SET_ERRORS, j as ON_CHANGE, k as RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ, l as RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO, m as RESET_PROPS_AND_SAVE_CURRENT_DATA, o as initialState$1, q as makeUnique, u as useAutoReloadOverlayBlocker, G as GET_DATA_SUCCEEDED, r as RELOAD_PLUGIN, s as retrieveComponentsFromSchema, t as SET_MODIFIED_DATA, A as ADD_CUSTOM_FIELD_ATTRIBUTE, E as EDIT_CUSTOM_FIELD_ATTRIBUTE, v as ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE, C as CHANGE_DYNAMIC_ZONE_COMPONENTS, D as DELETE_NOT_SAVED_TYPE, w as REMOVE_COMPONENT_FROM_DYNAMIC_ZONE, U as UPDATE_INITIAL_STATE, x as UPDATE_SCHEMA, y as EDIT_ATTRIBUTE, z as ADD_ATTRIBUTE, B as CREATE_SCHEMA, F as CREATE_COMPONENT_SCHEMA, H as REMOVE_FIELD_FROM_DISPLAYED_COMPONENT, I as REMOVE_FIELD, P as PERMISSIONS, J as AutoReloadOverlayBlockerProvider } from "./index-Dj0FBBTu.mjs";
import { useFilter, useCollator, SubNavLink, SubNav, SubNavHeader, SubNavSections, SubNavSection, SubNavLinkSection, Box, TextButton, Field, MultiSelectNested, Flex, Typography, KeyboardNavigable, Grid, LinkButton, Link as Link$1, Modal, Tabs, Divider, SingleSelect, SingleSelectOption, inputFocusStyle, Checkbox, TextInput, NumberInput, Dialog, Button, Breadcrumbs, Crumb, Searchbar, IconButton, Tooltip, VisuallyHidden, TimePicker, Textarea, DatePicker, DateTimePicker, Toggle, JSONInput, Menu, Combobox, ComboboxOption } from "@strapi/design-system";
import * as Icons from "@strapi/icons";
import { Plus, Sparkle, ArrowLeft, Search, Trash, Eye, EyeStriked, OneWay, OneToOne, OneToMany, ManyToOne, ManyToMany, ManyWays } from "@strapi/icons";
import upperFirst from "lodash/upperFirst";
import { styled } from "styled-components";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import set from "lodash/set";
import size from "lodash/size";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import has from "lodash/has";
import toLower from "lodash/toLower";
import * as Symbols from "@strapi/icons/symbols";
import { NumberField, BlocksField, BooleanField, CollectionType, ComponentField, DateField, DynamicZoneField, EmailField, EnumerationField, MediaField, JsonField, PasswordField, RelationField, MarkdownField, SingleType, TextField, UidField, EmptyDocuments } from "@strapi/icons/symbols";
import * as qs from "qs";
import pluralize from "pluralize";
import formatISO from "date-fns/formatISO";
import truncate from "lodash/truncate";
import uniq from "lodash/uniq";
import * as yup from "yup";
import slugify from "@sindresorhus/slugify";
import { snakeCase } from "lodash/fp";
import toNumber from "lodash/toNumber";
import { createSelector } from "@reduxjs/toolkit";
import camelCase from "lodash/camelCase";
import omit from "lodash/omit";
import sortBy from "lodash/sortBy";
const getTrad = (id) => `${pluginId}.${id}`;
const DataManagerContext = createContext();
const useDataManager = () => useContext(DataManagerContext);
const FormModalNavigationContext = React.createContext();
const useFormModalNavigation = () => useContext(FormModalNavigationContext);
const useContentTypeBuilderMenu = () => {
  const {
    components,
    componentsGroupedByCategory,
    contentTypes,
    isInDevelopmentMode,
    sortedContentTypesList,
    modifiedData,
    initialData
  } = useDataManager();
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const [search, setSearch] = useState("");
  const { onOpenModalCreateSchema, onOpenModalEditCategory } = useFormModalNavigation();
  const { locale } = useIntl();
  const { startsWith } = useFilter(locale, {
    sensitivity: "base"
  });
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const canOpenModalCreateCTorComponent = !Object.keys(contentTypes).some((ct) => contentTypes[ct].isTemporary === true) && !Object.keys(components).some(
    (component) => components[component].isTemporary === true
  ) && isEqual(modifiedData, initialData);
  const handleClickOpenModalCreateCollectionType = () => {
    if (canOpenModalCreateCTorComponent) {
      trackUsage(`willCreateContentType`);
      const nextState = {
        modalType: "contentType",
        kind: "collectionType",
        actionType: "create",
        forTarget: "contentType"
      };
      onOpenModalCreateSchema(nextState);
    } else {
      toggleNotificationCannotCreateSchema();
    }
  };
  const handleClickOpenModalCreateSingleType = () => {
    if (canOpenModalCreateCTorComponent) {
      trackUsage(`willCreateSingleType`);
      const nextState = {
        modalType: "contentType",
        kind: "singleType",
        actionType: "create",
        forTarget: "contentType"
      };
      onOpenModalCreateSchema(nextState);
    } else {
      toggleNotificationCannotCreateSchema();
    }
  };
  const handleClickOpenModalCreateComponent = () => {
    if (canOpenModalCreateCTorComponent) {
      trackUsage("willCreateComponent");
      const nextState = {
        modalType: "component",
        kind: null,
        actionType: "create",
        forTarget: "component"
      };
      onOpenModalCreateSchema(nextState);
    } else {
      toggleNotificationCannotCreateSchema();
    }
  };
  const toggleNotificationCannotCreateSchema = () => {
    toggleNotification({
      type: "info",
      message: formatMessage({
        id: getTrad("notification.info.creating.notSaved"),
        defaultMessage: "Please save your work before creating a new collection type or component"
      })
    });
  };
  const componentsData = Object.entries(componentsGroupedByCategory).map(([category, components2]) => ({
    name: category,
    title: category,
    isEditable: isInDevelopmentMode,
    onClickEdit(e, data2) {
      e.stopPropagation();
      if (canOpenModalCreateCTorComponent) {
        onOpenModalEditCategory(data2.name);
      } else {
        toggleNotificationCannotCreateSchema();
      }
    },
    links: components2.map((component) => ({
      name: component.uid,
      to: `/plugins/${pluginId}/component-categories/${category}/${component.uid}`,
      title: component.schema.displayName
    })).sort((a, b) => formatter.compare(a.title, b.title))
  })).sort((a, b) => formatter.compare(a.title, b.title));
  const displayedContentTypes = sortedContentTypesList.filter((obj) => obj.visible);
  const data = [
    {
      name: "models",
      title: {
        id: `${getTrad("menu.section.models.name")}`,
        defaultMessage: "Collection Types"
      },
      customLink: isInDevelopmentMode && {
        id: `${getTrad("button.model.create")}`,
        defaultMessage: "Create new collection type",
        onClick: handleClickOpenModalCreateCollectionType
      },
      links: displayedContentTypes.filter((contentType) => contentType.kind === "collectionType")
    },
    {
      name: "singleTypes",
      title: {
        id: `${getTrad("menu.section.single-types.name")}`,
        defaultMessage: "Single Types"
      },
      customLink: isInDevelopmentMode && {
        id: `${getTrad("button.single-types.create")}`,
        defaultMessage: "Create new single type",
        onClick: handleClickOpenModalCreateSingleType
      },
      links: displayedContentTypes.filter((singleType) => singleType.kind === "singleType")
    },
    {
      name: "components",
      title: {
        id: `${getTrad("menu.section.components.name")}`,
        defaultMessage: "Components"
      },
      customLink: isInDevelopmentMode && {
        id: `${getTrad("button.component.create")}`,
        defaultMessage: "Create a new component",
        onClick: handleClickOpenModalCreateComponent
      },
      links: componentsData
    }
  ].map((section) => {
    const hasChild = section.links.some((l) => Array.isArray(l.links));
    if (hasChild) {
      let filteredLinksCount = 0;
      return {
        ...section,
        links: section.links.map((link) => {
          const filteredLinks2 = link.links.filter((link2) => startsWith(link2.title, search));
          if (filteredLinks2.length === 0) {
            return null;
          }
          filteredLinksCount += filteredLinks2.length;
          return {
            ...link,
            links: filteredLinks2.sort((a, b) => formatter.compare(a.title, b.title))
          };
        }).filter(Boolean),
        linksCount: filteredLinksCount
      };
    }
    const filteredLinks = section.links.filter((link) => startsWith(link.title, search)).sort((a, b) => formatter.compare(a.title, b.title));
    return {
      ...section,
      links: filteredLinks,
      linksCount: filteredLinks.length
    };
  });
  return {
    menu: data,
    searchValue: search,
    onSearchChange: setSearch
  };
};
const SubNavLinkCustom = styled(SubNavLink)`
  div {
    width: inherit;
    span:nth-child(2) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: inherit;
    }
  }
`;
const ContentTypeBuilderNav = () => {
  const { menu, searchValue, onSearchChange } = useContentTypeBuilderMenu();
  const { formatMessage } = useIntl();
  const pluginName = formatMessage({
    id: getTrad("plugin.name"),
    defaultMessage: "Content-Type Builder"
  });
  return /* @__PURE__ */ jsxs(SubNav, { "aria-label": pluginName, children: [
    /* @__PURE__ */ jsx(
      SubNavHeader,
      {
        searchable: true,
        value: searchValue,
        onClear: () => onSearchChange(""),
        onChange: (e) => onSearchChange(e.target.value),
        label: pluginName,
        searchLabel: formatMessage({
          id: "global.search",
          defaultMessage: "Search"
        })
      }
    ),
    /* @__PURE__ */ jsx(SubNavSections, { children: menu.map((section) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        SubNavSection,
        {
          label: formatMessage({
            id: section.title.id,
            defaultMessage: section.title.defaultMessage
          }),
          collapsable: true,
          badgeLabel: section.linksCount.toString(),
          children: section.links.map((link) => {
            if (link.links) {
              return /* @__PURE__ */ jsx(SubNavLinkSection, { label: upperFirst(link.title), children: link.links.map((subLink) => /* @__PURE__ */ jsx(
                SubNavLink,
                {
                  tag: NavLink,
                  to: subLink.to,
                  active: subLink.active,
                  isSubSectionChild: true,
                  children: upperFirst(
                    formatMessage({ id: subLink.name, defaultMessage: subLink.title })
                  )
                },
                subLink.name
              )) }, link.name);
            }
            return /* @__PURE__ */ jsx(
              SubNavLinkCustom,
              {
                tag: NavLink,
                to: link.to,
                active: link.active,
                width: "100%",
                children: upperFirst(formatMessage({ id: link.name, defaultMessage: link.title }))
              },
              link.name
            );
          })
        }
      ),
      section.customLink && /* @__PURE__ */ jsx(Box, { paddingLeft: 7, children: /* @__PURE__ */ jsx(
        TextButton,
        {
          onClick: section.customLink.onClick,
          startIcon: /* @__PURE__ */ jsx(Plus, { width: "0.8rem", height: "0.8rem" }),
          marginTop: 2,
          cursor: "pointer",
          children: formatMessage({
            id: section.customLink.id,
            defaultMessage: section.customLink.defaultMessage
          })
        }
      ) })
    ] }, section.name)) })
  ] });
};
const isAllowedContentTypesForRelations = (contentType) => {
  return contentType.kind === "collectionType" && (contentType.restrictRelationsTo === null || Array.isArray(contentType.restrictRelationsTo) && contentType.restrictRelationsTo.length > 0);
};
const findAttribute = (attributes, attributeToFind) => {
  return attributes.find(({ name }) => name === attributeToFind);
};
const extractValuesFromYupError = (errorType, errorParams) => {
  if (!errorType || !errorParams) {
    return {};
  }
  return {
    [errorType]: errorParams[errorType]
  };
};
const getYupInnerErrors = (error) => (error?.inner || []).reduce((acc, currentError) => {
  if (currentError.path) {
    acc[currentError.path.split("[").join(".").split("]").join("")] = {
      id: currentError.message,
      defaultMessage: currentError.message,
      values: extractValuesFromYupError(currentError?.type, currentError?.params)
    };
  }
  return acc;
}, {});
const options = [
  {
    label: "All",
    children: [
      { label: "images (JPEG, PNG, GIF, SVG, TIFF, ICO, DVU)", value: "images" },
      { label: "videos (MPEG, MP4, Quicktime, WMV, AVI, FLV)", value: "videos" },
      { label: "audios (MP3, WAV, OGG)", value: "audios" },
      { label: "files (CSV, ZIP, PDF, Excel, JSON, ...)", value: "files" }
    ]
  }
];
const AllowedTypesSelect = ({
  intlLabel,
  name,
  onChange,
  value = null
}) => {
  const { formatMessage } = useIntl();
  const displayedValue = value === null || value?.length === 0 ? formatMessage({ id: "global.none", defaultMessage: "None" }) : [...value].sort().map((v) => upperFirst(v)).join(", ");
  const label = intlLabel.id ? formatMessage({ id: intlLabel.id, defaultMessage: intlLabel.defaultMessage }) : name;
  return /* @__PURE__ */ jsxs(Field.Root, { name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(
      MultiSelectNested,
      {
        customizeContent: () => displayedValue,
        onChange: (values) => {
          if (values.length > 0) {
            onChange({ target: { name, value: values, type: "allowed-types-select" } });
          } else {
            onChange({ target: { name, value: null, type: "allowed-types-select" } });
          }
        },
        options,
        value: value || []
      }
    )
  ] });
};
const iconByTypes = {
  biginteger: NumberField,
  blocks: BlocksField,
  boolean: BooleanField,
  collectionType: CollectionType,
  component: ComponentField,
  contentType: CollectionType,
  date: DateField,
  datetime: DateField,
  decimal: NumberField,
  dynamiczone: DynamicZoneField,
  email: EmailField,
  enum: EnumerationField,
  enumeration: EnumerationField,
  file: MediaField,
  files: MediaField,
  float: NumberField,
  integer: NumberField,
  json: JsonField,
  JSON: JsonField,
  media: MediaField,
  number: NumberField,
  password: PasswordField,
  relation: RelationField,
  richtext: MarkdownField,
  singleType: SingleType,
  string: TextField,
  text: TextField,
  time: DateField,
  timestamp: DateField,
  uid: UidField
};
const IconBox = styled(Box)`
  svg {
    height: 100%;
    width: 100%;
  }
`;
const AttributeIcon = ({ type, customField = null, ...rest }) => {
  const getCustomField = useStrapiApp("AttributeIcon", (state) => state.customFields.get);
  let Compo = iconByTypes[type];
  if (customField) {
    const customFieldObject = getCustomField(customField);
    const icon = customFieldObject?.icon;
    if (icon) {
      Compo = icon;
    }
  }
  if (!iconByTypes[type]) {
    return null;
  }
  return /* @__PURE__ */ jsx(IconBox, { width: "3.2rem", shrink: 0, ...rest, "aria-hidden": true, children: /* @__PURE__ */ jsx(Box, { tag: Compo }) });
};
const OptionBoxWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  text-align: left;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary100};
    border: 1px solid ${({ theme }) => theme.colors.primary200};
  }
`;
const newAttributes = [];
const NewBadge = () => /* @__PURE__ */ jsx(Flex, { grow: 1, justifyContent: "flex-end", children: /* @__PURE__ */ jsxs(Flex, { gap: 1, hasRadius: true, background: "alternative100", padding: `0.2rem 0.4rem`, children: [
  /* @__PURE__ */ jsx(Sparkle, { width: `1rem`, height: `1rem`, fill: "alternative600" }),
  /* @__PURE__ */ jsx(Typography, { textColor: "alternative600", variant: "sigma", children: "New" })
] }) });
const AttributeOption = ({ type = "text" }) => {
  const { formatMessage } = useIntl();
  const { onClickSelectField } = useFormModalNavigation();
  const handleClick = () => {
    const step = type === "component" ? "1" : null;
    onClickSelectField({
      attributeType: type,
      step
    });
  };
  return /* @__PURE__ */ jsx(OptionBoxWrapper, { padding: 4, tag: "button", hasRadius: true, type: "button", onClick: handleClick, children: /* @__PURE__ */ jsxs(Flex, { children: [
    /* @__PURE__ */ jsx(AttributeIcon, { type }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 4, width: "100%", children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
        /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", children: formatMessage({ id: getTrad(`attribute.${type}`), defaultMessage: type }) }),
        newAttributes.includes(type) && /* @__PURE__ */ jsx(NewBadge, {})
      ] }),
      /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
        id: getTrad(`attribute.${type}.description`),
        defaultMessage: "A type for modeling data"
      }) }) })
    ] })
  ] }) });
};
const AttributeList = ({ attributes }) => /* @__PURE__ */ jsx(KeyboardNavigable, { tagName: "button", children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 8, children: attributes.map((attributeRow, index2) => {
  return (
    // eslint-disable-next-line react/no-array-index-key
    /* @__PURE__ */ jsx(Grid.Root, { gap: 3, children: attributeRow.map((attribute) => /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(AttributeOption, { type: attribute }) }, attribute)) }, index2)
  );
}) }) });
const CustomFieldOption = ({ customFieldUid, customField }) => {
  const { type, intlLabel, intlDescription } = customField;
  const { formatMessage } = useIntl();
  const { onClickSelectCustomField } = useFormModalNavigation();
  const handleClick = () => {
    onClickSelectCustomField({
      attributeType: type,
      customFieldUid
    });
  };
  return /* @__PURE__ */ jsx(OptionBoxWrapper, { padding: 4, tag: "button", hasRadius: true, type: "button", onClick: handleClick, children: /* @__PURE__ */ jsxs(Flex, { children: [
    /* @__PURE__ */ jsx(AttributeIcon, { type, customField: customFieldUid }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 4, children: [
      /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", children: formatMessage(intlLabel) }) }),
      /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(intlDescription) }) })
    ] })
  ] }) });
};
const EmptyCard = styled(Box)`
  background: ${({ theme }) => `linear-gradient(180deg, rgba(234, 234, 239, 0) 0%, ${theme.colors.neutral150} 100%)`};
  opacity: 0.33;
`;
const EmptyCardGrid = () => {
  return /* @__PURE__ */ jsx(Flex, { wrap: "wrap", gap: 4, children: [...Array(4)].map((_, idx) => {
    return /* @__PURE__ */ jsx(
      EmptyCard,
      {
        height: "138px",
        width: "375px",
        hasRadius: true
      },
      `empty-card-${idx}`
    );
  }) });
};
const EmptyAttributes = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Box, { position: "relative", children: [
    /* @__PURE__ */ jsx(EmptyCardGrid, {}),
    /* @__PURE__ */ jsx(Box, { position: "absolute", top: 6, width: "100%", children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", justifyContent: "center", direction: "column", children: [
      /* @__PURE__ */ jsx(EmptyDocuments, { width: "160px", height: "88px" }),
      /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 4, children: /* @__PURE__ */ jsxs(Box, { textAlign: "center", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "p", textColor: "neutral600", children: formatMessage({
          id: getTrad("modalForm.empty.heading"),
          defaultMessage: "Nothing in here yet."
        }) }),
        /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "p", textColor: "neutral600", children: formatMessage({
          id: getTrad("modalForm.empty.sub-heading"),
          defaultMessage: "Find what you are looking for through a wide range of extensions."
        }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        LinkButton,
        {
          tag: Link,
          to: `/marketplace?${qs.stringify({ categories: ["Custom fields"] })}`,
          variant: "secondary",
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          children: formatMessage({
            id: getTrad("modalForm.empty.button"),
            defaultMessage: "Add custom fields"
          })
        }
      )
    ] }) })
  ] });
};
const CustomFieldsList = () => {
  const { formatMessage } = useIntl();
  const getAllCustomFields = useStrapiApp("CustomFieldsList", (state) => state.customFields.getAll);
  const registeredCustomFields = Object.entries(getAllCustomFields());
  if (!registeredCustomFields.length) {
    return /* @__PURE__ */ jsx(EmptyAttributes, {});
  }
  const sortedCustomFields = registeredCustomFields.sort(
    (a, b) => a[1].name > b[1].name ? 1 : -1
  );
  return /* @__PURE__ */ jsx(KeyboardNavigable, { tagName: "button", children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 3, children: [
    /* @__PURE__ */ jsx(Grid.Root, { gap: 3, children: sortedCustomFields.map(([uid, customField]) => /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(CustomFieldOption, { customFieldUid: uid, customField }, uid) }, uid)) }),
    /* @__PURE__ */ jsx(
      Link$1,
      {
        href: "https://docs.strapi.io/developer-docs/latest/development/custom-fields.html",
        isExternal: true,
        children: formatMessage({
          id: getTrad("modalForm.tabs.custom.howToLink"),
          defaultMessage: "How to add custom fields"
        })
      }
    )
  ] }) });
};
const AttributeOptions = ({ attributes, forTarget, kind }) => {
  const { formatMessage } = useIntl();
  const defaultTabId = getTrad("modalForm.tabs.default");
  const customTabId = getTrad("modalForm.tabs.custom");
  const titleIdSuffix = forTarget.includes("component") ? "component" : kind;
  const titleId = getTrad(`modalForm.sub-header.chooseAttribute.${titleIdSuffix}`);
  return /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Tabs.Root, { variant: "simple", defaultValue: "default", children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "beta", tag: "h2", children: formatMessage({ id: titleId, defaultMessage: "Select a field" }) }),
      /* @__PURE__ */ jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsx(Tabs.Trigger, { value: "default", children: formatMessage({ id: defaultTabId, defaultMessage: "Default" }) }),
        /* @__PURE__ */ jsx(Tabs.Trigger, { value: "custom", children: formatMessage({ id: customTabId, defaultMessage: "Custom" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Divider, { marginBottom: 6 }),
    /* @__PURE__ */ jsx(Tabs.Content, { value: "default", children: /* @__PURE__ */ jsx(AttributeList, { attributes }) }),
    /* @__PURE__ */ jsx(Tabs.Content, { value: "custom", children: /* @__PURE__ */ jsx(CustomFieldsList, {}) })
  ] }) });
};
const BooleanDefaultValueSelect = ({
  intlLabel,
  name,
  options: options2,
  onChange,
  value = null
}) => {
  const { formatMessage } = useIntl();
  const label = intlLabel.id ? formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { ...intlLabel.values }
  ) : name;
  const handleChange = (value2) => {
    let nextValue = "";
    if (value2 === "true") {
      nextValue = true;
    }
    if (value2 === "false") {
      nextValue = false;
    }
    onChange({ target: { name, value: nextValue, type: "select-default-boolean" } });
  };
  return /* @__PURE__ */ jsxs(Field.Root, { name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(SingleSelect, { onChange: handleChange, value: (value === null ? "" : value).toString(), children: options2.map(({ metadatas: { intlLabel: intlLabel2, disabled, hidden }, key, value: value2 }) => {
      return /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, disabled, hidden, children: intlLabel2.defaultMessage }, key);
    }) })
  ] });
};
const Wrapper$1 = styled(Flex)`
  position: relative;
  align-items: stretch;

  label {
    border-radius: 4px;
    max-width: 50%;
    cursor: pointer;
    user-select: none;
    flex: 1;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.neutral200};

    ${inputFocusStyle()}
  }

  input {
    position: absolute;
    opacity: 0;
  }

  .option {
    height: 100%;
    border-radius: 4px;
    will-change: transform, opacity;
    background: ${({ theme }) => theme.colors.neutral0};

    .checkmark {
      position: relative;
      display: block;
      will-change: transform;
      background: ${({ theme }) => theme.colors.neutral0};
      width: ${({ theme }) => theme.spaces[5]};
      height: ${({ theme }) => theme.spaces[5]};
      border: solid 1px ${({ theme }) => theme.colors.neutral300};
      border-radius: 50%;

      &:before,
      &:after {
        content: '';
        display: block;
        border-radius: 50%;
        width: ${({ theme }) => theme.spaces[3]};
        height: ${({ theme }) => theme.spaces[3]};
        position: absolute;
        top: 3px;
        left: 3px;
      }

      &:after {
        transform: scale(0);
        transition: inherit;
        will-change: transform;
      }
    }
  }

  .container input:checked ~ div {
    background: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
    .checkmark {
      border: solid 1px ${({ theme }) => theme.colors.primary600};
      &::after {
        background: ${({ theme }) => theme.colors.primary600};
        transform: scale(1);
      }
    }
  }
`;
const CustomRadioGroup = ({
  intlLabel,
  name,
  onChange,
  radios = [],
  value
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", htmlFor: name, tag: "label", children: formatMessage(intlLabel) }),
    /* @__PURE__ */ jsx(Wrapper$1, { gap: 4, alignItems: "stretch", children: radios.map((radio) => {
      return /* @__PURE__ */ jsxs("label", { htmlFor: radio.value.toString(), className: "container", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: radio.value.toString(),
            name,
            className: "option-input",
            checked: radio.value === value,
            value: radio.value,
            onChange,
            type: "radio"
          },
          radio.value
        ),
        /* @__PURE__ */ jsx(Box, { className: "option", padding: 4, children: /* @__PURE__ */ jsxs(Flex, { children: [
          /* @__PURE__ */ jsx(Box, { paddingRight: 4, children: /* @__PURE__ */ jsx("span", { className: "checkmark" }) }),
          /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
            /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: formatMessage(radio.title) }),
            /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(radio.description) })
          ] })
        ] }) })
      ] }, radio.value);
    }) })
  ] });
};
const BooleanRadioGroup = ({
  onChange,
  name,
  intlLabel,
  ...rest
}) => {
  const handleChange = (e) => {
    const checked = e.target.value !== "false";
    onChange({ target: { name, value: checked, type: "boolean-radio-group" } });
  };
  return /* @__PURE__ */ jsx(CustomRadioGroup, { ...rest, name, onChange: handleChange, intlLabel });
};
const CheckboxWithNumberField = ({
  error,
  intlLabel,
  modifiedData,
  name,
  onChange,
  value = null
}) => {
  const { formatMessage } = useIntl();
  const label = intlLabel.id ? formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { ...intlLabel.values }
  ) : name;
  const type = modifiedData.type === "biginteger" ? "text" : "number";
  const disabled = !modifiedData.type;
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        id: name,
        name,
        onCheckedChange: (value2) => {
          const initValue = type === "text" ? "0" : 0;
          const nextValue = value2 ? initValue : null;
          onChange({ target: { name, value: nextValue } });
        },
        checked: value !== null,
        children: label
      }
    ),
    value !== null && /* @__PURE__ */ jsx(Box, { paddingLeft: 6, style: { maxWidth: "200px" }, children: type === "text" ? /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          "aria-label": label,
          disabled,
          onChange,
          value: value === null ? "" : value
        }
      ),
      /* @__PURE__ */ jsx(Field.Error, {})
    ] }) : /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, children: [
      /* @__PURE__ */ jsx(
        NumberInput,
        {
          "aria-label": label,
          disabled,
          onValueChange: (value2) => {
            onChange({ target: { name, value: value2 ?? 0, type } });
          },
          value: value || 0
        }
      ),
      /* @__PURE__ */ jsx(Field.Error, {})
    ] }) })
  ] });
};
const ContentTypeRadioGroup = ({ onChange, ...rest }) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const handleChange = (e) => {
    toggleNotification({
      type: "info",
      message: formatMessage({
        id: getTrad("contentType.kind.change.warning"),
        defaultMessage: "You just changed the kind of a content type: API will be reset (routes, controllers, and services will be overwritten)."
      })
    });
    onChange(e);
  };
  return /* @__PURE__ */ jsx(CustomRadioGroup, { ...rest, onChange: handleChange });
};
const DraftAndPublishToggle = ({
  description,
  disabled = false,
  intlLabel,
  isCreating,
  name,
  onChange,
  value = false
}) => {
  const { formatMessage } = useIntl();
  const [showWarning, setShowWarning] = useState(false);
  const label = intlLabel.id ? formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { ...intlLabel.values }
  ) : name;
  const hint = description ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  const handleConfirm = () => {
    onChange({ target: { name, value: false } });
    setShowWarning(false);
  };
  const handleChange = (checked) => {
    if (!checked && !isCreating) {
      setShowWarning(true);
      return;
    }
    onChange({ target: { name, value: !!checked } });
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(Field.Root, { hint, name, children: [
      /* @__PURE__ */ jsx(Checkbox, { checked: value, disabled, onCheckedChange: handleChange, children: label }),
      /* @__PURE__ */ jsx(Field.Hint, {})
    ] }),
    /* @__PURE__ */ jsx(Dialog.Root, { open: showWarning, onOpenChange: (isOpen) => setShowWarning(isOpen), children: /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        endAction: /* @__PURE__ */ jsx(Button, { onClick: handleConfirm, variant: "danger", width: "100%", justifyContent: "center", children: formatMessage({
          id: getTrad("popUpWarning.draft-publish.button.confirm"),
          defaultMessage: "Yes, disable"
        }) }),
        children: formatMessage({
          id: getTrad("popUpWarning.draft-publish.message"),
          defaultMessage: "If you disable the draft & publish, your drafts will be deleted."
        })
      }
    ) })
  ] });
};
const FormModalEndActions = ({
  categoryName,
  deleteCategory,
  deleteComponent,
  deleteContentType,
  isAttributeModal,
  isCustomFieldModal,
  isComponentAttribute,
  isComponentToDzModal,
  isContentTypeModal,
  isCreatingComponent,
  isCreatingComponentAttribute,
  isCreatingComponentInDz,
  isCreatingComponentWhileAddingAField,
  isCreatingContentType,
  isCreatingDz,
  isComponentModal,
  isDzAttribute,
  isEditingAttribute,
  isEditingCategory,
  isInFirstComponentStep,
  onSubmitAddComponentAttribute,
  onSubmitAddComponentToDz,
  onSubmitCreateContentType,
  onSubmitCreateComponent,
  onSubmitCreateDz,
  onSubmitEditAttribute,
  onSubmitEditCategory,
  onSubmitEditComponent,
  onSubmitEditContentType,
  onSubmitEditCustomFieldAttribute,
  onSubmitEditDz,
  onClickFinish
}) => {
  const { formatMessage } = useIntl();
  if (isComponentToDzModal) {
    if (isCreatingComponentInDz) {
      return /* @__PURE__ */ jsx(
        Button,
        {
          variant: "secondary",
          type: "submit",
          onClick: (e) => {
            e.preventDefault();
            onSubmitAddComponentToDz(e, true);
          },
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          children: formatMessage({
            id: getTrad("form.button.add-first-field-to-created-component"),
            defaultMessage: "Add first field to the component"
          })
        }
      );
    }
    return /* @__PURE__ */ jsx(
      Button,
      {
        variant: "default",
        type: "submit",
        onClick: (e) => {
          e.preventDefault();
          onSubmitAddComponentToDz(e, false);
        },
        children: formatMessage({
          id: "global.finish",
          defaultMessage: "Finish"
        })
      }
    );
  }
  if (isAttributeModal && isDzAttribute && !isCreatingDz) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        variant: "default",
        type: "submit",
        onClick: (e) => {
          e.preventDefault();
          onClickFinish();
          onSubmitEditDz(e, false);
        },
        children: formatMessage({
          id: "global.finish",
          defaultMessage: "Finish"
        })
      }
    );
  }
  if (isAttributeModal && isDzAttribute && isCreatingDz) {
    return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "secondary",
        type: "submit",
        onClick: (e) => {
          e.preventDefault();
          onSubmitCreateDz(e, true);
        },
        startIcon: /* @__PURE__ */ jsx(Plus, {}),
        children: formatMessage({
          id: getTrad("form.button.add-components-to-dynamiczone"),
          defaultMessage: "Add components to the zone"
        })
      }
    ) });
  }
  if (isAttributeModal && isComponentAttribute) {
    if (isInFirstComponentStep) {
      return /* @__PURE__ */ jsx(
        Button,
        {
          variant: "secondary",
          type: "submit",
          onClick: (e) => {
            e.preventDefault();
            onSubmitAddComponentAttribute(e, true);
          },
          children: isCreatingComponentAttribute ? formatMessage({
            id: getTrad("form.button.configure-component"),
            defaultMessage: "Configure the component"
          }) : formatMessage({
            id: getTrad("form.button.select-component"),
            defaultMessage: "Configure the component"
          })
        }
      );
    }
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "secondary",
          type: "submit",
          onClick: (e) => {
            e.preventDefault();
            onSubmitAddComponentAttribute(e, true);
          },
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          children: isCreatingComponentWhileAddingAField ? formatMessage({
            id: getTrad("form.button.add-first-field-to-created-component"),
            defaultMessage: "Add first field to the component"
          }) : formatMessage({
            id: getTrad("form.button.add-field"),
            defaultMessage: "Add another field"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "default",
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            onClickFinish();
            onSubmitAddComponentAttribute(e, false);
          },
          children: formatMessage({
            id: "global.finish",
            defaultMessage: "Finish"
          })
        }
      )
    ] });
  }
  if (isAttributeModal && !isComponentAttribute && !isDzAttribute) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: isEditingAttribute ? "button" : "submit",
          variant: "secondary",
          onClick: (e) => {
            e.preventDefault();
            onSubmitEditAttribute(e, true);
          },
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          children: formatMessage({
            id: getTrad("form.button.add-field"),
            defaultMessage: "Add another field"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: isEditingAttribute ? "submit" : "button",
          variant: "default",
          onClick: (e) => {
            e.preventDefault();
            onClickFinish();
            onSubmitEditAttribute(e, false);
          },
          children: formatMessage({
            id: "global.finish",
            defaultMessage: "Finish"
          })
        }
      )
    ] });
  }
  if (isContentTypeModal) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      !isCreatingContentType && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "danger",
            onClick: (e) => {
              e.preventDefault();
              deleteContentType();
            },
            children: formatMessage({
              id: "global.delete",
              defaultMessage: "Delete"
            })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "default",
            onClick: (e) => {
              e.preventDefault();
              onSubmitEditContentType(e, false);
            },
            children: formatMessage({
              id: "global.finish",
              defaultMessage: "Finish"
            })
          }
        )
      ] }),
      isCreatingContentType && /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "secondary",
          onClick: (e) => {
            e.preventDefault();
            onSubmitCreateContentType(e, true);
          },
          children: formatMessage({
            id: "global.continue",
            defaultMessage: "Continue"
          })
        }
      )
    ] });
  }
  if (isComponentModal) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      !isCreatingComponent && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "danger",
            onClick: (e) => {
              e.preventDefault();
              deleteComponent();
            },
            children: formatMessage({
              id: "global.delete",
              defaultMessage: "Delete"
            })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "default",
            onClick: (e) => {
              e.preventDefault();
              onSubmitEditComponent(e, false);
            },
            children: formatMessage({
              id: "global.finish",
              defaultMessage: "Finish"
            })
          }
        )
      ] }),
      isCreatingComponent && /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "secondary",
          onClick: (e) => {
            e.preventDefault();
            onSubmitCreateComponent(e, true);
          },
          children: formatMessage({
            id: "global.continue",
            defaultMessage: "Continue"
          })
        }
      )
    ] });
  }
  if (isEditingCategory) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "danger",
          onClick: (e) => {
            e.preventDefault();
            if (categoryName) {
              deleteCategory(categoryName);
            }
          },
          children: formatMessage({
            id: "global.delete",
            defaultMessage: "Delete"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "default",
          onClick: (e) => {
            e.preventDefault();
            onSubmitEditCategory(e);
          },
          children: formatMessage({
            id: "global.finish",
            defaultMessage: "finish"
          })
        }
      )
    ] });
  }
  if (isCustomFieldModal) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: isEditingAttribute ? "button" : "submit",
          variant: "secondary",
          onClick: (e) => {
            e.preventDefault();
            onSubmitEditCustomFieldAttribute(e, true);
          },
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          children: formatMessage({
            id: getTrad("form.button.add-field"),
            defaultMessage: "Add another field"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: isEditingAttribute ? "submit" : "button",
          variant: "default",
          onClick: (e) => {
            e.preventDefault();
            onClickFinish();
            onSubmitEditCustomFieldAttribute(e, false);
          },
          children: formatMessage({
            id: "global.finish",
            defaultMessage: "Finish"
          })
        }
      )
    ] });
  }
  return null;
};
const FormModalHeader = ({
  actionType = null,
  attributeName,
  attributeType,
  categoryName,
  contentTypeKind,
  dynamicZoneTarget,
  forTarget,
  modalType = null,
  targetUid,
  customFieldUid = null,
  showBackLink = false
}) => {
  const { formatMessage } = useIntl();
  const { modifiedData } = useDataManager();
  const { onOpenModalAddField } = useFormModalNavigation();
  let icon = "component";
  let headers = [];
  const schema = modifiedData?.[forTarget]?.[targetUid] || modifiedData?.[forTarget] || null;
  const displayName = schema?.schema.displayName;
  if (modalType === "contentType") {
    icon = contentTypeKind;
  }
  if (["component", "editCategory"].includes(modalType || "")) {
    icon = "component";
  }
  const isCreatingMainSchema = ["component", "contentType"].includes(modalType || "");
  if (isCreatingMainSchema) {
    let headerId = getTrad(`modalForm.component.header-${actionType}`);
    if (modalType === "contentType") {
      headerId = getTrad(`modalForm.${contentTypeKind}.header-create`);
    }
    if (actionType === "edit") {
      headerId = getTrad(`modalForm.header-edit`);
    }
    return /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsxs(Flex, { children: [
      /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(AttributeIcon, { type: icon }) }),
      /* @__PURE__ */ jsx(Box, { paddingLeft: 3, children: /* @__PURE__ */ jsx(Modal.Title, { children: formatMessage({ id: headerId }, { name: displayName }) }) })
    ] }) });
  }
  headers = [
    {
      label: displayName,
      info: { category: schema?.category || null, name: schema?.schema.displayName }
    }
  ];
  if (modalType === "chooseAttribute") {
    icon = ["component", "components"].includes(forTarget) ? "component" : schema.schema.kind;
  }
  if (modalType === "addComponentToDynamicZone") {
    icon = "dynamiczone";
    headers.push({ label: dynamicZoneTarget });
  }
  if (modalType === "attribute" || modalType === "customField") {
    icon = attributeType;
    headers.push({ label: attributeName });
  }
  if (modalType === "editCategory") {
    const label = formatMessage({
      id: getTrad("modalForm.header.categories"),
      defaultMessage: "Categories"
    });
    headers = [{ label }, { label: categoryName }];
  }
  return /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsxs(Flex, { gap: 3, children: [
    showBackLink && // This is a workaround and should use the LinkButton with a variant that currently doesn't exist
    /* @__PURE__ */ jsx(
      Link$1,
      {
        "aria-label": formatMessage({
          id: getTrad("modalForm.header.back"),
          defaultMessage: "Back"
        }),
        startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}),
        onClick: () => onOpenModalAddField({ forTarget, targetUid }),
        href: "#back",
        isExternal: false
      }
    ),
    /* @__PURE__ */ jsx(AttributeIcon, { type: icon, customField: customFieldUid }),
    /* @__PURE__ */ jsx(Breadcrumbs, { label: headers.map(({ label }) => label).join(","), children: headers.map(({ label, info }, index2, arr) => {
      label = upperFirst(label);
      if (!label) {
        return null;
      }
      const key = `${label}.${index2}`;
      if (info?.category) {
        label = `${label} (${upperFirst(info.category)} - ${upperFirst(info.name)})`;
      }
      return /* @__PURE__ */ jsx(Crumb, { isCurrent: index2 === arr.length - 1, children: label }, key);
    }) })
  ] }) });
};
const getModalTitleSubHeader = ({
  modalType,
  forTarget,
  kind,
  actionType,
  step
}) => {
  switch (modalType) {
    case "chooseAttribute":
      return getTrad(
        `modalForm.sub-header.chooseAttribute.${forTarget?.includes("component") ? "component" : kind || "collectionType"}`
      );
    case "attribute": {
      return getTrad(
        `modalForm.sub-header.attribute.${actionType}${step !== "null" && step !== null && actionType !== "edit" ? ".step" : ""}`
      );
    }
    case "customField": {
      return getTrad(`modalForm.sub-header.attribute.${actionType}`);
    }
    case "addComponentToDynamicZone":
      return getTrad("modalForm.sub-header.addComponentToDynamicZone");
    default:
      return getTrad("configurations");
  }
};
const FormModalSubHeader = ({
  actionType,
  modalType,
  forTarget,
  kind,
  step,
  attributeType,
  attributeName,
  customField
}) => {
  const { formatMessage } = useIntl();
  const intlLabel = modalType === "customField" ? customField?.intlLabel : { id: getTrad(`attribute.${attributeType}`) };
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "flex-start", paddingBottom: 1, gap: 1, children: [
    /* @__PURE__ */ jsx(Typography, { tag: "h2", variant: "beta", children: formatMessage(
      {
        id: getModalTitleSubHeader({
          actionType,
          forTarget,
          kind,
          step,
          modalType
        }),
        defaultMessage: "Add new field"
      },
      {
        type: intlLabel ? upperFirst(formatMessage(intlLabel)) : "",
        name: upperFirst(attributeName),
        step
      }
    ) }),
    /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
      id: getTrad(`attribute.${attributeType}.description`),
      defaultMessage: "A type for modeling data"
    }) })
  ] });
};
const COMPONENT_ICONS = {
  alien: Icons.Alien,
  apps: Icons.GridNine,
  archive: Icons.Archive,
  arrowDown: Icons.ArrowDown,
  arrowLeft: Icons.ArrowLeft,
  arrowRight: Icons.ArrowRight,
  arrowUp: Icons.ArrowUp,
  attachment: Icons.Paperclip,
  bell: Icons.Bell,
  bold: Icons.Bold,
  book: Icons.Book,
  briefcase: Icons.Briefcase,
  brush: Icons.PaintBrush,
  bulletList: Icons.BulletList,
  calendar: Icons.Calendar,
  car: Icons.Car,
  cast: Icons.Cast,
  chartBubble: Icons.ChartBubble,
  chartCircle: Icons.ChartCircle,
  chartPie: Icons.ChartPie,
  check: Icons.Check,
  clock: Icons.Clock,
  cloud: Icons.Cloud,
  code: Icons.Code,
  cog: Icons.Cog,
  collapse: Icons.Collapse,
  command: Icons.Command,
  connector: Icons.Faders,
  crop: Icons.Crop,
  crown: Icons.Crown,
  cup: Icons.Coffee,
  cursor: Icons.Cursor,
  dashboard: Icons.SquaresFour,
  database: Icons.Database,
  discuss: Icons.Discuss,
  doctor: Icons.Stethoscope,
  earth: Icons.Earth,
  emotionHappy: Icons.EmotionHappy,
  emotionUnhappy: Icons.EmotionUnhappy,
  envelop: Icons.Mail,
  exit: Icons.SignOut,
  expand: Icons.Expand,
  eye: Icons.Eye,
  feather: Icons.Feather,
  file: Icons.File,
  fileError: Icons.FileError,
  filePdf: Icons.FilePdf,
  filter: Icons.Filter,
  folder: Icons.Folder,
  gate: Icons.CastleTurret,
  gift: Icons.Gift,
  globe: Icons.Globe,
  grid: Icons.GridFour,
  handHeart: Icons.HandHeart,
  hashtag: Icons.Hashtag,
  headphone: Icons.Headphones,
  heart: Icons.Heart,
  house: Icons.House,
  information: Icons.Information,
  italic: Icons.Italic,
  key: Icons.Key,
  landscape: Icons.Images,
  layer: Icons.ListPlus,
  layout: Icons.Layout,
  lightbulb: Icons.Lightbulb,
  link: Icons.Link,
  lock: Icons.Lock,
  magic: Icons.Magic,
  manyToMany: Icons.ManyToMany,
  manyToOne: Icons.ManyToOne,
  manyWays: Icons.ManyWays,
  medium: Symbols.Medium,
  message: Icons.Message,
  microphone: Icons.Microphone,
  monitor: Icons.Monitor,
  moon: Icons.Moon,
  music: Icons.MusicNotes,
  oneToMany: Icons.OneToMany,
  oneToOne: Icons.OneToOne,
  oneWay: Icons.OneWay,
  paint: Icons.PaintBrush,
  paintBrush: Icons.PaintBrush,
  paperPlane: Icons.PaperPlane,
  pencil: Icons.Pencil,
  phone: Icons.Phone,
  picture: Icons.Image,
  pin: Icons.Pin,
  pinMap: Icons.PinMap,
  plane: Icons.Plane,
  play: Icons.Play,
  plus: Icons.Plus,
  priceTag: Icons.PriceTag,
  puzzle: Icons.PuzzlePiece,
  question: Icons.Question,
  quote: Icons.Quotes,
  refresh: Icons.ArrowClockwise,
  restaurant: Icons.Restaurant,
  rocket: Icons.Rocket,
  rotate: Icons.ArrowsCounterClockwise,
  scissors: Icons.Scissors,
  search: Icons.Search,
  seed: Icons.Plant,
  server: Icons.Server,
  shield: Icons.Shield,
  shirt: Icons.Shirt,
  shoppingCart: Icons.ShoppingCart,
  slideshow: Icons.PresentationChart,
  stack: Icons.Stack,
  star: Icons.Star,
  store: Icons.Store,
  strikeThrough: Icons.StrikeThrough,
  sun: Icons.Sun,
  television: Icons.Television,
  thumbDown: Icons.ThumbDown,
  thumbUp: Icons.ThumbUp,
  train: Icons.Train,
  twitter: Symbols.X,
  typhoon: Icons.Typhoon,
  underline: Icons.Underline,
  user: Icons.User,
  volumeMute: Icons.VolumeMute,
  volumeUp: Icons.VolumeUp,
  walk: Icons.Walk,
  wheelchair: Icons.Wheelchair,
  write: Icons.Feather
};
const IconPickerWrapper = styled(Flex)`
  label {
    ${inputFocusStyle()}
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid ${({ theme }) => theme.colors.neutral100};
  }
`;
const IconPick = ({ iconKey, name, onChange, isSelected, ariaLabel }) => {
  const Icon = COMPONENT_ICONS[iconKey];
  return /* @__PURE__ */ jsx(Field.Root, { name, required: false, children: /* @__PURE__ */ jsxs(Field.Label, { children: [
    /* @__PURE__ */ jsxs(VisuallyHidden, { children: [
      ariaLabel,
      /* @__PURE__ */ jsx(
        Field.Input,
        {
          type: "radio",
          checked: isSelected,
          onChange,
          value: iconKey,
          "aria-checked": isSelected
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Flex,
      {
        padding: 2,
        cursor: "pointer",
        hasRadius: true,
        background: isSelected ? "primary200" : void 0,
        children: /* @__PURE__ */ jsx(Icon, { fill: isSelected ? "primary600" : "neutral300" })
      }
    )
  ] }) });
};
const IconPicker = ({ intlLabel, name, onChange, value = "" }) => {
  const { formatMessage } = useIntl();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const allIcons = Object.keys(COMPONENT_ICONS);
  const [icons, setIcons] = useState(allIcons);
  const searchIconRef = useRef(null);
  const searchBarRef = useRef(null);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const onChangeSearch = ({ target: { value: value2 } }) => {
    setSearch(value2);
    setIcons(() => allIcons.filter((icon) => icon.toLowerCase().includes(value2.toLowerCase())));
  };
  const onClearSearch = () => {
    toggleSearch();
    setSearch("");
    setIcons(allIcons);
  };
  const removeIconSelected = () => {
    onChange({ target: { name, value: "" } });
  };
  useEffect(() => {
    if (showSearch) {
      searchBarRef.current?.focus();
    }
  }, [showSearch]);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", paddingBottom: 2, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", tag: "label", children: formatMessage(intlLabel) }),
      /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
        showSearch ? /* @__PURE__ */ jsx(
          Searchbar,
          {
            ref: searchBarRef,
            name: "searchbar",
            placeholder: formatMessage({
              id: getTrad("ComponentIconPicker.search.placeholder"),
              defaultMessage: "Search for an icon"
            }),
            onBlur: () => {
              if (!search) {
                toggleSearch();
              }
            },
            onChange: onChangeSearch,
            value: search,
            onClear: onClearSearch,
            clearLabel: formatMessage({
              id: getTrad("IconPicker.search.clear.label"),
              defaultMessage: "Clear the icon search"
            }),
            children: formatMessage({
              id: getTrad("IconPicker.search.placeholder.label"),
              defaultMessage: "Search for an icon"
            })
          }
        ) : /* @__PURE__ */ jsx(
          IconButton,
          {
            ref: searchIconRef,
            onClick: toggleSearch,
            withTooltip: false,
            label: formatMessage({
              id: getTrad("IconPicker.search.button.label"),
              defaultMessage: "Search icon button"
            }),
            variant: "ghost",
            children: /* @__PURE__ */ jsx(Search, {})
          }
        ),
        value && /* @__PURE__ */ jsx(
          Tooltip,
          {
            label: formatMessage({
              id: getTrad("IconPicker.remove.tooltip"),
              defaultMessage: "Remove the selected icon"
            }),
            children: /* @__PURE__ */ jsx(
              IconButton,
              {
                onClick: removeIconSelected,
                withTooltip: false,
                label: formatMessage({
                  id: getTrad("IconPicker.remove.button"),
                  defaultMessage: "Remove the selected icon"
                }),
                variant: "ghost",
                children: /* @__PURE__ */ jsx(Trash, {})
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      IconPickerWrapper,
      {
        position: "relative",
        padding: 1,
        background: "neutral100",
        hasRadius: true,
        wrap: "wrap",
        gap: 2,
        maxHeight: "126px",
        overflow: "auto",
        textAlign: "center",
        children: icons.length > 0 ? icons.map((iconKey) => /* @__PURE__ */ jsx(
          IconPick,
          {
            iconKey,
            name,
            onChange,
            isSelected: iconKey === value,
            ariaLabel: formatMessage(
              {
                id: getTrad("IconPicker.icon.label"),
                defaultMessage: "Select {icon} icon"
              },
              { icon: iconKey }
            )
          },
          iconKey
        )) : /* @__PURE__ */ jsx(Box, { padding: 4, grow: 2, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral600", textAlign: "center", children: formatMessage({
          id: getTrad("IconPicker.emptyState.label"),
          defaultMessage: "No icon found"
        }) }) })
      }
    )
  ] });
};
const PluralName = ({
  description,
  error,
  intlLabel,
  modifiedData,
  name,
  onChange,
  value
}) => {
  const { formatMessage } = useIntl();
  const onChangeRef = useRef(onChange);
  const displayName = modifiedData?.displayName || "";
  useEffect(() => {
    if (displayName) {
      const value2 = nameToSlug(displayName);
      try {
        const plural = pluralize(value2, 2);
        onChangeRef.current({ target: { name, value: plural } });
      } catch (err) {
        onChangeRef.current({ target: { name, value: value2 } });
      }
    } else {
      onChangeRef.current({ target: { name, value: "" } });
    }
  }, [displayName, name]);
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const hint = description ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  const label = formatMessage(intlLabel);
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, hint, name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(TextInput, { onChange, value: value || "" }),
    /* @__PURE__ */ jsx(Field.Error, {})
  ] });
};
const parseDateValue = (value) => {
  if (value instanceof Date && isValidDate(value)) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    if (isValidDate(date)) {
      return date;
    }
  }
};
const isValidDate = (date) => !isNaN(date.getTime());
const removeSeconds = (time) => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};
const addSecondsAndMilliseconds = (time) => {
  return time.split(":").length === 2 ? `${time}:00.000` : time;
};
const formatTimeForInput = (value) => {
  if (!value) return;
  return value.split(":").length > 2 ? removeSeconds(value) : value;
};
const formatTimeForOutput = (value) => {
  if (!value) return void 0;
  return addSecondsAndMilliseconds(value);
};
const handleTimeChange = ({ value }) => {
  const formattedInputTime = formatTimeForInput(value);
  return formattedInputTime;
};
const handleTimeChangeEvent = (onChange, name, type, time) => {
  const formattedOutputTime = formatTimeForOutput(time);
  onChange({
    target: {
      name,
      value: formattedOutputTime,
      type
    }
  });
};
const GenericInput = ({
  autoComplete,
  customInputs,
  description,
  disabled,
  intlLabel,
  labelAction,
  error,
  name,
  onChange,
  options: options2 = [],
  placeholder,
  required,
  step,
  type,
  value: defaultValue,
  isNullable,
  attribute,
  ...rest
}) => {
  const { formatMessage } = useIntl();
  const getFieldHintValue = (attribute2, key) => {
    if (!attribute2) return;
    if (key === "minLength" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "maxLength" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "max" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "min" && key in attribute2) {
      return attribute2[key];
    }
  };
  const { hint } = useFieldHint({
    description,
    fieldSchema: {
      minLength: getFieldHintValue(attribute, "minLength"),
      maxLength: getFieldHintValue(attribute, "maxLength"),
      max: getFieldHintValue(attribute, "max"),
      min: getFieldHintValue(attribute, "min")
    },
    type: attribute?.type || type
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const CustomInput = customInputs ? customInputs[type] : null;
  const value = defaultValue ?? void 0;
  const valueWithEmptyStringFallback = value ?? "";
  function getErrorMessage(error2) {
    if (!error2) {
      return null;
    }
    if (typeof error2 === "string") {
      return formatMessage({ id: error2, defaultMessage: error2 });
    }
    const values = {
      ...error2.values
    };
    return formatMessage(
      {
        id: error2.id,
        defaultMessage: error2?.defaultMessage ?? error2.id
      },
      values
    );
  }
  const errorMessage = getErrorMessage(error) ?? void 0;
  if (CustomInput) {
    return /* @__PURE__ */ jsx(
      CustomInput,
      {
        ...rest,
        attribute,
        description,
        hint,
        disabled,
        intlLabel,
        labelAction,
        error: errorMessage || "",
        name,
        onChange,
        options: options2,
        required,
        placeholder,
        type,
        value
      }
    );
  }
  const label = intlLabel.id ? formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { ...intlLabel.values }
  ) : name;
  const formattedPlaceholder = placeholder ? formatMessage(
    { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
    { ...placeholder.values }
  ) : "";
  const getComponent = () => {
    switch (type) {
      case "json": {
        return /* @__PURE__ */ jsx(
          JSONInput,
          {
            value,
            disabled,
            onChange: (json) => {
              const value2 = attribute && "required" in attribute && !attribute?.required && !json.length ? null : json;
              onChange({ target: { name, value: value2 } }, false);
            },
            minHeight: "25.2rem",
            maxHeight: "50.4rem"
          }
        );
      }
      case "bool": {
        return /* @__PURE__ */ jsx(
          Toggle,
          {
            checked: defaultValue === null ? null : defaultValue || false,
            disabled,
            offLabel: formatMessage({
              id: "app.components.ToggleCheckbox.off-label",
              defaultMessage: "False"
            }),
            onLabel: formatMessage({
              id: "app.components.ToggleCheckbox.on-label",
              defaultMessage: "True"
            }),
            onChange: (e) => {
              onChange({ target: { name, value: e.target.checked } });
            }
          }
        );
      }
      case "checkbox": {
        return /* @__PURE__ */ jsx(
          Checkbox,
          {
            disabled,
            onCheckedChange: (value2) => {
              onChange({ target: { name, value: value2 } });
            },
            checked: Boolean(value),
            children: label
          }
        );
      }
      case "datetime": {
        const dateValue = parseDateValue(value);
        return /* @__PURE__ */ jsx(
          DateTimePicker,
          {
            clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
            disabled,
            onChange: (date) => {
              const formattedDate = date ? date.toISOString() : null;
              onChange({ target: { name, value: formattedDate, type } });
            },
            onClear: () => onChange({ target: { name, value: null, type } }),
            placeholder: formattedPlaceholder,
            value: dateValue
          }
        );
      }
      case "date": {
        const dateValue = parseDateValue(value);
        return /* @__PURE__ */ jsx(
          DatePicker,
          {
            clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
            disabled,
            onChange: (date) => {
              onChange({
                target: {
                  name,
                  value: date ? formatISO(date, { representation: "date" }) : null,
                  type
                }
              });
            },
            onClear: () => onChange({ target: { name, value: null, type } }),
            placeholder: formattedPlaceholder,
            value: dateValue
          }
        );
      }
      case "number": {
        return /* @__PURE__ */ jsx(
          NumberInput,
          {
            disabled,
            onValueChange: (value2) => {
              onChange({ target: { name, value: value2, type } });
            },
            placeholder: formattedPlaceholder,
            step,
            value
          }
        );
      }
      case "email": {
        return /* @__PURE__ */ jsx(
          TextInput,
          {
            autoComplete,
            disabled,
            onChange: (e) => {
              onChange({ target: { name, value: e.target.value, type } });
            },
            placeholder: formattedPlaceholder,
            type: "email",
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "timestamp":
      case "text":
      case "string": {
        return /* @__PURE__ */ jsx(
          TextInput,
          {
            autoComplete,
            disabled,
            onChange: (e) => {
              onChange({ target: { name, value: e.target.value, type } });
            },
            placeholder: formattedPlaceholder,
            type: "text",
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "password": {
        return /* @__PURE__ */ jsx(
          TextInput,
          {
            autoComplete,
            disabled,
            endAction: /* @__PURE__ */ jsx(
              "button",
              {
                "aria-label": formatMessage({
                  id: "Auth.form.password.show-password",
                  defaultMessage: "Show password"
                }),
                onClick: () => {
                  setShowPassword((prev) => !prev);
                },
                style: {
                  border: "none",
                  padding: 0,
                  background: "transparent"
                },
                type: "button",
                children: showPassword ? /* @__PURE__ */ jsx(Eye, { fill: "neutral500" }) : /* @__PURE__ */ jsx(EyeStriked, { fill: "neutral500" })
              }
            ),
            onChange: (e) => {
              onChange({ target: { name, value: e.target.value, type } });
            },
            placeholder: formattedPlaceholder,
            type: showPassword ? "text" : "password",
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "select": {
        return /* @__PURE__ */ jsx(
          SingleSelect,
          {
            disabled,
            onChange: (value2) => {
              onChange({ target: { name, value: value2, type: "select" } });
            },
            placeholder: formattedPlaceholder,
            value,
            children: options2.map(({ metadatas: { intlLabel: intlLabel2, disabled: disabled2, hidden }, key, value: value2 }) => {
              return /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, disabled: disabled2, hidden, children: formatMessage(intlLabel2) }, key);
            })
          }
        );
      }
      case "textarea": {
        return /* @__PURE__ */ jsx(
          Textarea,
          {
            disabled,
            onChange: (event) => onChange({ target: { name, value: event.target.value, type } }),
            placeholder: formattedPlaceholder,
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "time": {
        const formattedValue = handleTimeChange({ value, onChange, name, type });
        return /* @__PURE__ */ jsx(
          TimePicker,
          {
            clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
            disabled,
            onChange: (time) => handleTimeChangeEvent(onChange, name, type, time),
            onClear: () => handleTimeChangeEvent(onChange, name, type, void 0),
            value: formattedValue
          }
        );
      }
      default: {
        return /* @__PURE__ */ jsx(TextInput, { disabled: true, placeholder: "Not supported", type: "text", value: "" });
      }
    }
  };
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, hint, required, children: [
    type !== "checkbox" ? /* @__PURE__ */ jsx(Field.Label, { action: labelAction, children: label }) : null,
    getComponent(),
    /* @__PURE__ */ jsx(Field.Error, {}),
    /* @__PURE__ */ jsx(Field.Hint, {})
  ] });
};
const useFieldHint = ({ description, fieldSchema, type }) => {
  const { formatMessage } = useIntl();
  const buildDescription = () => description?.id ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  const buildHint = () => {
    const { maximum, minimum } = getMinMax(fieldSchema);
    const units = getFieldUnits({
      type,
      minimum,
      maximum
    });
    const minIsNumber = typeof minimum === "number";
    const maxIsNumber = typeof maximum === "number";
    const hasMinAndMax = maxIsNumber && minIsNumber;
    const hasMinOrMax = maxIsNumber || minIsNumber;
    if (!description?.id && !hasMinOrMax) {
      return "";
    }
    return formatMessage(
      {
        id: "content-manager.form.Input.hint.text",
        defaultMessage: "{min, select, undefined {} other {min. {min}}}{divider}{max, select, undefined {} other {max. {max}}}{unit}{br}{description}"
      },
      {
        min: minimum,
        max: maximum,
        description: buildDescription(),
        unit: units?.message && hasMinOrMax ? formatMessage(units.message, units.values) : null,
        divider: hasMinAndMax ? formatMessage({
          id: "content-manager.form.Input.hint.minMaxDivider",
          defaultMessage: " / "
        }) : null,
        br: hasMinOrMax ? /* @__PURE__ */ jsx("br", {}) : null
      }
    );
  };
  return { hint: buildHint() };
};
const getFieldUnits = ({
  type,
  minimum,
  maximum
}) => {
  if (type && ["biginteger", "integer", "number"].includes(type)) {
    return {};
  }
  const maxValue = Math.max(minimum || 0, maximum || 0);
  return {
    message: {
      id: "content-manager.form.Input.hint.character.unit",
      defaultMessage: "{maxValue, plural, one { character} other { characters}}"
    },
    values: {
      maxValue
    }
  };
};
const getMinMax = (fieldSchema) => {
  if (!fieldSchema) {
    return { maximum: void 0, minimum: void 0 };
  }
  const { minLength, maxLength, max, min } = fieldSchema;
  let minimum;
  let maximum;
  const parsedMin = Number(min);
  const parsedMinLength = Number(minLength);
  if (!Number.isNaN(parsedMin)) {
    minimum = parsedMin;
  } else if (!Number.isNaN(parsedMinLength)) {
    minimum = parsedMinLength;
  }
  const parsedMax = Number(max);
  const parsedMaxLength = Number(maxLength);
  if (!Number.isNaN(parsedMax)) {
    maximum = parsedMax;
  } else if (!Number.isNaN(parsedMaxLength)) {
    maximum = parsedMaxLength;
  }
  return { maximum, minimum };
};
const MemoizedGenericInput = React.memo(GenericInput, isEqual);
const RelationTargetPicker = ({
  oneThatIsCreatingARelationWithAnother,
  target
}) => {
  const { contentTypes, sortedContentTypesList } = useDataManager();
  const dispatch = useDispatch();
  const allowedContentTypesForRelation = sortedContentTypesList.filter(
    isAllowedContentTypesForRelations
  );
  const { plugin = null, schema: { displayName } = { displayName: "error" } } = contentTypes?.[target] ?? {};
  const handleSelect = ({
    uid,
    plugin: plugin2,
    title,
    restrictRelationsTo
  }) => () => {
    const selectedContentTypeFriendlyName = plugin2 ? `${plugin2}_${title}` : title;
    dispatch({
      type: ON_CHANGE_RELATION_TARGET,
      target: {
        value: uid,
        oneThatIsCreatingARelationWithAnother,
        selectedContentTypeFriendlyName,
        targetContentTypeAllowedRelations: restrictRelationsTo
      }
    });
  };
  return /* @__PURE__ */ jsxs(Menu.Root, { children: [
    /* @__PURE__ */ jsx(MenuTrigger, { children: `${displayName} ${plugin ? `(from: ${plugin})` : ""}` }),
    /* @__PURE__ */ jsx(Menu.Content, { zIndex: "popover", children: allowedContentTypesForRelation.map(({ uid, title, restrictRelationsTo, plugin: plugin2 }) => /* @__PURE__ */ jsxs(Menu.Item, { onSelect: handleSelect({ uid, plugin: plugin2, title, restrictRelationsTo }), children: [
      title,
      " ",
      plugin2 && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        "(from: ",
        plugin2,
        ")"
      ] })
    ] }, uid)) })
  ] });
};
const MenuTrigger = styled(Menu.Trigger)`
  max-width: 16.8rem;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const RelationFormBox = ({
  disabled = false,
  error,
  header,
  isMain = false,
  name,
  onChange,
  oneThatIsCreatingARelationWithAnother = "",
  target = "",
  value = ""
}) => {
  return /* @__PURE__ */ jsxs(Box, { background: "neutral100", hasRadius: true, borderColor: "neutral200", children: [
    /* @__PURE__ */ jsx(Flex, { paddingTop: isMain ? 4 : 1, paddingBottom: isMain ? 3 : 1, justifyContent: "center", children: isMain ? /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: header }) : /* @__PURE__ */ jsx(
      RelationTargetPicker,
      {
        target,
        oneThatIsCreatingARelationWithAnother
      }
    ) }),
    /* @__PURE__ */ jsx(Divider, { background: "neutral200" }),
    /* @__PURE__ */ jsx(Box, { padding: 4, children: /* @__PURE__ */ jsx(
      MemoizedGenericInput,
      {
        disabled,
        error: error?.id || null,
        intlLabel: {
          id: getTrad("form.attribute.item.defineRelation.fieldName"),
          defaultMessage: "Field name"
        },
        name,
        onChange,
        type: "text",
        value
      }
    ) })
  ] });
};
const Wrapper = styled(Box)`
  position: relative;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 0px);
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary600};
    z-index: 0;
  }
`;
const IconWrapper = styled(Box)`
  background: ${({ theme, $isSelected }) => theme.colors[$isSelected ? "primary100" : "neutral0"]};
  border: 1px solid
    ${({ theme, $isSelected }) => theme.colors[$isSelected ? "primary700" : "neutral200"]};
  border-radius: ${({ theme }) => theme.borderRadius};
  z-index: 1;
  flex: 0 0 2.4rem;
  svg {
    width: 2.4rem;
    height: 2.4rem;
    max-width: unset;
    path {
      fill: ${({ theme, $isSelected }) => theme.colors[$isSelected ? "primary700" : "neutral500"]};
    }
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const InfosWrapper = styled(Flex)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
const relations = {
  oneWay: OneWay,
  oneToOne: OneToOne,
  oneToMany: OneToMany,
  manyToOne: ManyToOne,
  manyToMany: ManyToMany,
  manyWay: ManyWays
};
const RelationNaturePicker = ({
  naturePickerType,
  oneThatIsCreatingARelationWithAnother,
  relationType,
  target
}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { contentTypes, modifiedData } = useDataManager();
  const ctRelations = ["oneWay", "oneToOne", "oneToMany", "manyToOne", "manyToMany", "manyWay"];
  const componentRelations = ["oneWay", "manyWay"];
  const dataType = naturePickerType === "contentType" ? get(modifiedData, [naturePickerType, "schema", "kind"], "") : naturePickerType;
  const relationsType = dataType === "collectionType" ? ctRelations : componentRelations;
  const areDisplayedNamesInverted = relationType === "manyToOne";
  const targetLabel = get(contentTypes, [target, "schema", "displayName"], "unknown");
  const leftTarget = areDisplayedNamesInverted ? targetLabel : oneThatIsCreatingARelationWithAnother;
  const rightTarget = areDisplayedNamesInverted ? oneThatIsCreatingARelationWithAnother : targetLabel;
  const leftDisplayedValue = pluralize(leftTarget, relationType === "manyToMany" ? 2 : 1);
  const restrictedRelations = get(contentTypes, [target, "schema", "restrictRelationsTo"], null);
  const rightDisplayedValue = pluralize(
    rightTarget,
    ["manyToMany", "oneToMany", "manyToOne", "manyWay"].includes(relationType) ? 2 : 1
  );
  if (!relationType) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Flex, { style: { flex: 1 }, children: [
    /* @__PURE__ */ jsx(Wrapper, { children: /* @__PURE__ */ jsx(Flex, { paddingLeft: 9, paddingRight: 9, paddingTop: 1, justifyContent: "center", children: /* @__PURE__ */ jsx(KeyboardNavigable, { tagName: "button", children: /* @__PURE__ */ jsx(Flex, { gap: 3, children: relationsType.map((relation) => {
      const Asset = relations[relation];
      const isEnabled = restrictedRelations === null || restrictedRelations.includes(relation);
      return /* @__PURE__ */ jsx(
        IconWrapper,
        {
          tag: "button",
          $isSelected: relationType === relation,
          disabled: !isEnabled,
          onClick: () => {
            if (isEnabled) {
              dispatch({
                type: ON_CHANGE_RELATION_TYPE,
                target: {
                  oneThatIsCreatingARelationWithAnother,
                  targetContentType: target,
                  value: relation
                }
              });
            }
          },
          padding: 2,
          type: "button",
          children: /* @__PURE__ */ jsx(Asset, {}, relation)
        },
        relation
      );
    }) }) }) }) }),
    /* @__PURE__ */ jsxs(InfosWrapper, { justifyContent: "center", children: [
      /* @__PURE__ */ jsxs(Typography, { children: [
        truncate(leftDisplayedValue, { length: 24 }),
        " "
      ] }),
      /* @__PURE__ */ jsxs(Typography, { textColor: "primary600", children: [
        formatMessage({ id: getTrad(`relation.${relationType}`) }),
        " "
      ] }),
      /* @__PURE__ */ jsx(Typography, { children: truncate(rightDisplayedValue, { length: 24 }) })
    ] })
  ] });
};
const Relation = ({
  formErrors,
  mainBoxHeader,
  modifiedData,
  naturePickerType,
  onChange
}) => {
  const relationType = getRelationType(modifiedData.relation, modifiedData.targetAttribute);
  return /* @__PURE__ */ jsxs(Flex, { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx(
      RelationFormBox,
      {
        isMain: true,
        header: mainBoxHeader,
        error: formErrors?.name || null,
        name: "name",
        onChange,
        value: modifiedData?.name || ""
      }
    ),
    /* @__PURE__ */ jsx(
      RelationNaturePicker,
      {
        naturePickerType,
        oneThatIsCreatingARelationWithAnother: mainBoxHeader,
        relationType,
        target: modifiedData.target
      }
    ),
    /* @__PURE__ */ jsx(
      RelationFormBox,
      {
        disabled: ["oneWay", "manyWay"].includes(relationType),
        error: formErrors?.targetAttribute || null,
        name: "targetAttribute",
        onChange,
        oneThatIsCreatingARelationWithAnother: mainBoxHeader,
        target: modifiedData.target,
        value: modifiedData?.targetAttribute || ""
      }
    )
  ] });
};
const SelectCategory = ({
  error = null,
  intlLabel,
  name,
  onChange,
  value = void 0,
  isCreating,
  dynamicZoneTarget
}) => {
  const { formatMessage } = useIntl();
  const { allComponentsCategories } = useDataManager();
  const [categories, setCategories] = useState(allComponentsCategories);
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const label = formatMessage(intlLabel);
  const handleChange = (value2) => {
    onChange({ target: { name, value: value2, type: "select-category" } });
  };
  const handleCreateOption = (value2) => {
    setCategories((prev) => [...prev, value2]);
    handleChange(value2);
  };
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(
      Combobox,
      {
        disabled: !isCreating && !dynamicZoneTarget,
        onChange: handleChange,
        onCreateOption: handleCreateOption,
        value,
        creatable: true,
        children: categories.map((category) => /* @__PURE__ */ jsx(ComboboxOption, { value: category, children: category }, category))
      }
    ),
    /* @__PURE__ */ jsx(Field.Error, {})
  ] });
};
const findComponent = (componentUid, components) => {
  return components.find((c) => c.component === componentUid);
};
const getChildrenMaxDepth = (componentUid, components, currentDepth = 0) => {
  const component = findComponent(componentUid, components);
  if (!component || !component.childComponents || component.childComponents.length === 0) {
    return currentDepth;
  }
  let maxDepth = currentDepth;
  component.childComponents.forEach((child) => {
    const depth = getChildrenMaxDepth(child.component, components, currentDepth + 1);
    if (depth > maxDepth) {
      maxDepth = depth;
    }
  });
  return maxDepth;
};
const getComponentDepth = (component, components) => {
  const getDepth = (currentComponent, currentLevel) => {
    const levels = [];
    levels.push(currentLevel);
    if (!currentComponent.uidsOfAllParents) {
      return levels;
    }
    for (const parentUid of currentComponent.uidsOfAllParents) {
      const parentComponent = findComponent(parentUid, components);
      if (parentComponent) {
        levels.push(...getDepth(parentComponent, currentLevel + 1));
      }
    }
    return levels;
  };
  const nestedCompo = findComponent(component, components);
  if (!nestedCompo) {
    return 0;
  }
  const compoDepth = Math.max(...getDepth(nestedCompo, 1));
  return compoDepth;
};
const SelectComponent = ({
  error = null,
  intlLabel,
  isAddingAComponentToAnotherComponent,
  isCreating,
  isCreatingComponentWhileAddingAField,
  componentToCreate,
  name,
  onChange,
  targetUid,
  forTarget,
  value
}) => {
  const { formatMessage } = useIntl();
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const label = formatMessage(intlLabel);
  const {
    componentsGroupedByCategory,
    componentsThatHaveOtherComponentInTheirAttributes,
    nestedComponents
  } = useDataManager();
  const isTargetAComponent = ["component", "components"].includes(forTarget);
  let options2 = Object.entries(componentsGroupedByCategory).reduce(
    (acc, current) => {
      const [categoryName, components] = current;
      const compos = components.map((component) => {
        return {
          uid: component.uid,
          label: component.schema.displayName,
          categoryName
        };
      });
      return [...acc, ...compos];
    },
    []
  );
  if (isAddingAComponentToAnotherComponent) {
    options2 = options2.filter(({ uid }) => {
      const maxDepth = getChildrenMaxDepth(uid, componentsThatHaveOtherComponentInTheirAttributes);
      const componentDepth = getComponentDepth(targetUid, nestedComponents);
      const totalDepth = maxDepth + componentDepth;
      return totalDepth <= MAX_COMPONENT_DEPTH;
    });
  }
  if (isTargetAComponent) {
    options2 = options2.filter((option) => {
      return option.uid !== targetUid;
    });
  }
  if (isCreatingComponentWhileAddingAField) {
    options2 = [
      {
        uid: value,
        label: componentToCreate?.displayName,
        categoryName: componentToCreate?.category
      }
    ];
  }
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(
      SingleSelect,
      {
        disabled: isCreatingComponentWhileAddingAField || !isCreating,
        onChange: (value2) => {
          onChange({ target: { name, value: value2, type: "select-category" } });
        },
        value: value || "",
        children: options2.map((option) => {
          return /* @__PURE__ */ jsx(SingleSelectOption, { value: option.uid, children: `${option.categoryName} - ${option.label}` }, option.uid);
        })
      }
    ),
    /* @__PURE__ */ jsx(Field.Error, {})
  ] });
};
const SelectComponents = ({
  dynamicZoneTarget,
  intlLabel,
  name,
  onChange,
  value
}) => {
  const { formatMessage } = useIntl();
  const { componentsGroupedByCategory, modifiedData } = useDataManager();
  const dzSchema = findAttribute(modifiedData.contentType.schema.attributes, dynamicZoneTarget);
  const alreadyUsedComponents = dzSchema?.components || [];
  const filteredComponentsGroupedByCategory = Object.keys(componentsGroupedByCategory).reduce(
    (acc, current) => {
      const filteredComponents = componentsGroupedByCategory[current].filter(({ uid }) => {
        return !alreadyUsedComponents.includes(uid);
      });
      if (filteredComponents.length > 0) {
        acc[current] = filteredComponents;
      }
      return acc;
    },
    {}
  );
  const options2 = Object.entries(filteredComponentsGroupedByCategory).reduce(
    (acc, current) => {
      const [categoryName, components] = current;
      const section = {
        label: categoryName,
        children: components.map(({ uid, schema: { displayName } }) => {
          return { label: displayName, value: uid };
        })
      };
      acc.push(section);
      return acc;
    },
    []
  );
  const displayedValue = formatMessage(
    {
      id: getTrad("components.SelectComponents.displayed-value"),
      defaultMessage: "{number, plural, =0 {# components} one {# component} other {# components}} selected"
    },
    { number: value?.length ?? 0 }
  );
  return /* @__PURE__ */ jsxs(Field.Root, { name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: formatMessage(intlLabel) }),
    /* @__PURE__ */ jsx(
      MultiSelectNested,
      {
        id: "select1",
        customizeContent: () => displayedValue,
        onChange: (values) => {
          onChange({ target: { name, value: values, type: "select-components" } });
        },
        options: options2,
        value: value || []
      }
    )
  ] });
};
const SelectDateType = ({
  intlLabel,
  error = void 0,
  modifiedData,
  name,
  onChange,
  options: options2,
  value = ""
}) => {
  const { formatMessage } = useIntl();
  const label = formatMessage(intlLabel);
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const handleChange = (nextValue) => {
    onChange({ target: { name, value: nextValue, type: "select" } });
    if (!value) {
      return;
    }
    if (modifiedData.default !== void 0 && modifiedData.default !== null) {
      onChange({ target: { name: "default", value: null } });
    }
  };
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(SingleSelect, { onChange: handleChange, value: value || "", children: options2.map(({ metadatas: { intlLabel: intlLabel2, disabled, hidden }, key, value: value2 }) => {
      return /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, disabled, hidden, children: formatMessage(
        { id: intlLabel2.id, defaultMessage: intlLabel2.defaultMessage },
        intlLabel2.values
      ) }, key);
    }) }),
    /* @__PURE__ */ jsx(Field.Error, {})
  ] });
};
const SelectNumber = ({
  intlLabel,
  error = void 0,
  modifiedData,
  name,
  onChange,
  options: options2,
  value = ""
}) => {
  const { formatMessage } = useIntl();
  const label = formatMessage(intlLabel);
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const handleChange = (nextValue) => {
    onChange({ target: { name, value: nextValue, type: "select" } });
    if (!value) {
      return;
    }
    if (nextValue === "biginteger" && value !== "biginteger") {
      if (modifiedData.default !== void 0 && modifiedData.default !== null) {
        onChange({ target: { name: "default", value: null } });
      }
      if (modifiedData.max !== void 0 && modifiedData.max !== null) {
        onChange({ target: { name: "max", value: null } });
      }
      if (modifiedData.min !== void 0 && modifiedData.min !== null) {
        onChange({ target: { name: "min", value: null } });
      }
    }
    if (typeof nextValue === "string" && ["decimal", "float", "integer"].includes(nextValue) && value === "biginteger") {
      if (modifiedData.default !== void 0 && modifiedData.default !== null) {
        onChange({ target: { name: "default", value: null } });
      }
      if (modifiedData.max !== void 0 && modifiedData.max !== null) {
        onChange({ target: { name: "max", value: null } });
      }
      if (modifiedData.min !== void 0 && modifiedData.min !== null) {
        onChange({ target: { name: "min", value: null } });
      }
    }
  };
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(SingleSelect, { onChange: handleChange, value: value || "", children: options2.map(({ metadatas: { intlLabel: intlLabel2, disabled, hidden }, key, value: value2 }) => {
      return /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, disabled, hidden, children: formatMessage(intlLabel2) }, key);
    }) }),
    /* @__PURE__ */ jsx(Field.Error, {})
  ] });
};
SelectNumber.defaultProps = {
  error: void 0,
  value: ""
};
const SingularName = ({
  description = null,
  error = null,
  intlLabel,
  modifiedData,
  name,
  onChange,
  value = null
}) => {
  const { formatMessage } = useIntl();
  const onChangeRef = useRef(onChange);
  const displayName = modifiedData?.displayName || "";
  useEffect(() => {
    if (displayName) {
      onChangeRef.current({ target: { name, value: nameToSlug(displayName) } });
    } else {
      onChangeRef.current({ target: { name, value: "" } });
    }
  }, [displayName, name]);
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const hint = description ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  const label = formatMessage(intlLabel);
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, hint, name, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(TextInput, { onChange, value: value || "" }),
    /* @__PURE__ */ jsx(Field.Error, {}),
    /* @__PURE__ */ jsx(Field.Hint, {})
  ] });
};
const TabForm = ({
  form,
  formErrors,
  genericInputProps,
  modifiedData,
  onChange
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Fragment$1, { children: form.map((section, sectionIndex) => {
    if (section.items.length === 0) {
      return null;
    }
    return /* @__PURE__ */ jsxs(Box, { children: [
      section.sectionTitle && /* @__PURE__ */ jsx(Box, { paddingBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h3", children: formatMessage(section.sectionTitle) }) }),
      /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: section.items.map((input, i) => {
        const key = `${sectionIndex}.${i}`;
        const value = get(modifiedData, input.name, void 0);
        const pluginOptionError = Object.keys(formErrors).find((key2) => key2 === input.name);
        const errorId = pluginOptionError ? formErrors[pluginOptionError].id : get(
          formErrors,
          [
            ...input.name.split(".").filter((key2) => key2 !== "componentToCreate"),
            "id"
          ],
          null
        );
        if (input.type === "pushRight") {
          return /* @__PURE__ */ jsx(
            Grid.Item,
            {
              col: input.size || 6,
              direction: "column",
              alignItems: "stretch",
              children: /* @__PURE__ */ jsx("div", {})
            },
            input.name || key
          );
        }
        return /* @__PURE__ */ jsx(
          Grid.Item,
          {
            col: input.size || 6,
            direction: "column",
            alignItems: "stretch",
            children: /* @__PURE__ */ jsx(
              MemoizedGenericInput,
              {
                ...input,
                ...genericInputProps,
                error: errorId,
                onChange,
                value
              }
            )
          },
          input.name || key
        );
      }) })
    ] }, sectionIndex);
  }) });
};
const TextareaEnum = ({
  description = null,
  disabled = false,
  error = "",
  intlLabel,
  labelAction,
  name,
  onChange,
  placeholder = null,
  value = ""
}) => {
  const { formatMessage } = useIntl();
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const hint = description ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  const label = formatMessage(intlLabel);
  const formattedPlaceholder = placeholder ? formatMessage(
    { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
    { ...placeholder.values }
  ) : "";
  const inputValue = Array.isArray(value) ? value.join("\n") : "";
  const handleChange = (e) => {
    const arrayValue = e.target.value.split("\n");
    onChange({ target: { name, value: arrayValue } });
  };
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, hint, name, children: [
    /* @__PURE__ */ jsx(Field.Label, { action: labelAction, children: label }),
    /* @__PURE__ */ jsx(
      Textarea,
      {
        disabled,
        onChange: handleChange,
        placeholder: formattedPlaceholder,
        value: inputValue
      }
    ),
    /* @__PURE__ */ jsx(Field.Error, {}),
    /* @__PURE__ */ jsx(Field.Hint, {})
  ] });
};
const nameField$1 = {
  name: "name",
  type: "text",
  intlLabel: {
    id: "global.name",
    defaultMessage: "Name"
  },
  description: {
    id: getTrad("modalForm.attribute.form.base.name.description"),
    defaultMessage: "No space is allowed for the name of the attribute"
  }
  // validations: {
  //   required: true,
  // },
};
const commonBaseForm = {
  sections: [{ sectionTitle: null, items: [nameField$1] }]
};
const componentForm = {
  base(prefix = "") {
    const sections = [
      {
        sectionTitle: null,
        items: [
          {
            name: `${prefix}displayName`,
            type: "text",
            intlLabel: {
              id: getTrad("contentType.displayName.label"),
              defaultMessage: "Display Name"
            }
          },
          {
            name: `${prefix}category`,
            type: "select-category",
            intlLabel: {
              id: getTrad("modalForm.components.create-component.category.label"),
              defaultMessage: "Select a category or enter a name to create a new one"
            }
          }
        ]
      },
      {
        sectionTitle: null,
        items: [
          {
            name: `${prefix}icon`,
            type: "icon-picker",
            size: 12,
            intlLabel: {
              id: getTrad("modalForm.components.icon.label"),
              defaultMessage: "Icon"
            }
          }
        ]
      }
    ];
    return sections;
  },
  advanced() {
    const sections = [];
    return sections;
  }
};
const attributeOptions = {
  default: {
    name: "default",
    type: "text",
    intlLabel: {
      id: getTrad("form.attribute.settings.default"),
      defaultMessage: "Default value"
    }
  },
  max: {
    name: "max",
    type: "checkbox-with-number-field",
    intlLabel: {
      id: getTrad("form.attribute.item.maximum"),
      defaultMessage: "Maximum value"
    }
  },
  maxLength: {
    name: "maxLength",
    type: "checkbox-with-number-field",
    intlLabel: {
      id: getTrad("form.attribute.item.maximumLength"),
      defaultMessage: "Maximum length"
    }
  },
  min: {
    name: "min",
    type: "checkbox-with-number-field",
    intlLabel: {
      id: getTrad("form.attribute.item.minimum"),
      defaultMessage: "Minimum value"
    }
  },
  minLength: {
    name: "minLength",
    type: "checkbox-with-number-field",
    intlLabel: {
      id: getTrad("form.attribute.item.minimumLength"),
      defaultMessage: "Minimum length"
    }
  },
  private: {
    name: "private",
    type: "checkbox",
    intlLabel: {
      id: getTrad("form.attribute.item.privateField"),
      defaultMessage: "Private field"
    },
    description: {
      id: getTrad("form.attribute.item.privateField.description"),
      defaultMessage: "This field will not show up in the API response"
    }
  },
  regex: {
    intlLabel: {
      id: getTrad("form.attribute.item.text.regex"),
      defaultMessage: "RegExp pattern"
    },
    name: "regex",
    type: "text",
    description: {
      id: getTrad("form.attribute.item.text.regex.description"),
      defaultMessage: "The text of the regular expression"
    }
  },
  required: {
    name: "required",
    type: "checkbox",
    intlLabel: {
      id: getTrad("form.attribute.item.requiredField"),
      defaultMessage: "Required field"
    },
    description: {
      id: getTrad("form.attribute.item.requiredField.description"),
      defaultMessage: "You won't be able to create an entry if this field is empty"
    }
  },
  unique: {
    name: "unique",
    type: "checkbox",
    intlLabel: {
      id: getTrad("form.attribute.item.uniqueField"),
      defaultMessage: "Unique field"
    },
    description: {
      id: getTrad("form.attribute.item.uniqueField.description"),
      defaultMessage: "You won't be able to create an entry if there is an existing entry with identical content"
    }
  }
};
const advancedForm = {
  blocks() {
    return {
      sections: [
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.private]
        }
      ]
    };
  },
  boolean() {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              autoFocus: true,
              type: "select-default-boolean",
              intlLabel: {
                id: getTrad("form.attribute.settings.default"),
                defaultMessage: "Default value"
              },
              name: "default",
              options: [
                {
                  value: "true",
                  key: "true",
                  metadatas: { intlLabel: { id: "true", defaultMessage: "true" } }
                },
                {
                  value: "",
                  key: "null",
                  metadatas: { intlLabel: { id: "null", defaultMessage: "null" } }
                },
                {
                  value: "false",
                  key: "false",
                  metadatas: { intlLabel: { id: "false", defaultMessage: "false" } }
                }
              ]
            }
          ]
        },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.private]
        }
      ]
    };
  },
  component({ repeatable }, step) {
    if (step === "1") {
      return { sections: componentForm.advanced() };
    }
    if (repeatable) {
      return {
        sections: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings"
            },
            items: [
              attributeOptions.required,
              attributeOptions.private,
              attributeOptions.max,
              attributeOptions.min
            ]
          }
        ]
      };
    }
    return {
      sections: [
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.private]
        }
      ]
    };
  },
  date({ type }) {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              ...attributeOptions.default,
              type: type || "date",
              value: null,
              withDefaultValue: false,
              disabled: !type,
              autoFocus: false
            }
          ]
        },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.unique, attributeOptions.private]
        }
      ]
    };
  },
  dynamiczone() {
    return {
      sections: [
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.max, attributeOptions.min]
        }
      ]
    };
  },
  email() {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              ...attributeOptions.default,
              type: "email"
            }
          ]
        },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [
            attributeOptions.required,
            attributeOptions.unique,
            attributeOptions.maxLength,
            attributeOptions.minLength,
            attributeOptions.private
          ]
        }
      ]
    };
  },
  enumeration(data) {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              name: "default",
              type: "select",
              intlLabel: {
                id: getTrad("form.attribute.settings.default"),
                defaultMessage: "Default value"
              },
              validations: {},
              options: [
                {
                  key: "__null_reset_value__",
                  value: "",
                  metadatas: {
                    intlLabel: {
                      id: "components.InputSelect.option.placeholder",
                      defaultMessage: "Choose here"
                    }
                  }
                },
                ...(data.enum || []).filter((value, index2) => data.enum.indexOf(value) === index2 && value).map((value) => {
                  return {
                    key: value,
                    value,
                    metadatas: {
                      intlLabel: { id: `${value}.no-override`, defaultMessage: value }
                    }
                  };
                })
              ]
            },
            {
              intlLabel: {
                id: getTrad("form.attribute.item.enumeration.graphql"),
                defaultMessage: "Name override for GraphQL"
              },
              name: "enumName",
              type: "text",
              validations: {},
              description: {
                id: getTrad("form.attribute.item.enumeration.graphql.description"),
                defaultMessage: "Allows you to override the default generated name for GraphQL"
              }
            }
          ]
        },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.private]
        }
      ]
    };
  },
  json() {
    return {
      sections: [
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.private]
        }
      ]
    };
  },
  media() {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              intlLabel: {
                id: getTrad("form.attribute.media.allowed-types"),
                defaultMessage: "Select allowed types of media"
              },
              name: "allowedTypes",
              type: "allowed-types-select",
              size: 7,
              value: "",
              validations: {}
            }
          ]
        },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.required, attributeOptions.private]
        }
      ]
    };
  },
  number(data) {
    const inputStep = data.type === "decimal" || data.type === "float" ? "any" : 1;
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              autoFocus: true,
              name: "default",
              type: data.type === "biginteger" ? "text" : "number",
              step: inputStep,
              intlLabel: {
                id: getTrad("form.attribute.settings.default"),
                defaultMessage: "Default value"
              },
              validations: {}
            }
          ]
        },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [
            attributeOptions.required,
            attributeOptions.unique,
            attributeOptions.max,
            attributeOptions.min,
            attributeOptions.private
          ]
        }
      ]
    };
  },
  password() {
    return {
      sections: [
        { sectionTitle: null, items: [attributeOptions.default] },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [
            attributeOptions.required,
            attributeOptions.maxLength,
            attributeOptions.minLength,
            attributeOptions.private
          ]
        }
      ]
    };
  },
  relation() {
    return {
      sections: [
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [attributeOptions.private]
        }
      ]
    };
  },
  richtext() {
    return {
      sections: [
        { sectionTitle: null, items: [attributeOptions.default] },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [
            attributeOptions.required,
            attributeOptions.maxLength,
            attributeOptions.minLength,
            attributeOptions.private
          ]
        }
      ]
    };
  },
  text() {
    return {
      sections: [
        { sectionTitle: null, items: [attributeOptions.default, attributeOptions.regex] },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [
            attributeOptions.required,
            attributeOptions.unique,
            attributeOptions.maxLength,
            attributeOptions.minLength,
            attributeOptions.private
          ]
        }
      ]
    };
  },
  uid(data) {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            { ...attributeOptions.default, disabled: Boolean(data.targetField), type: "text" }
          ]
        },
        {
          sectionTitle: {
            id: "global.settings",
            defaultMessage: "Settings"
          },
          items: [
            attributeOptions.required,
            attributeOptions.maxLength,
            attributeOptions.minLength,
            attributeOptions.private
          ]
        }
      ]
    };
  }
};
const componentField = {
  intlLabel: {
    id: "global.type",
    defaultMessage: "Type"
  },
  name: "createComponent",
  type: "boolean-radio-group",
  size: 12,
  radios: [
    {
      title: {
        id: getTrad("form.attribute.component.option.create"),
        defaultMessage: "Create a new component"
      },
      description: {
        id: getTrad("form.attribute.component.option.create.description"),
        defaultMessage: "A component is shared across types and components, it will be available and accessible everywhere."
      },
      value: true
    },
    {
      title: {
        id: getTrad("form.attribute.component.option.reuse-existing"),
        defaultMessage: "Use an existing component"
      },
      description: {
        id: getTrad("form.attribute.component.option.reuse-existing.description"),
        defaultMessage: "Reuse a component already created to keep your data consistent across content-types."
      },
      value: false
    }
  ]
};
const baseForm = {
  component(data, step) {
    if (step === "1") {
      const itemsToConcat = data.createComponent === true ? componentForm.base("componentToCreate.") : [];
      return {
        sections: [{ sectionTitle: null, items: [componentField] }, ...itemsToConcat]
      };
    }
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            nameField$1,
            {
              name: "component",
              type: "select-component",
              intlLabel: {
                id: getTrad("modalForm.attributes.select-component"),
                defaultMessage: "Select a component"
              },
              isMultiple: false
            }
          ]
        },
        {
          sectionTitle: null,
          items: [
            {
              intlLabel: {
                id: "global.type",
                defaultMessage: "Type"
              },
              name: "repeatable",
              type: "boolean-radio-group",
              size: 12,
              radios: [
                {
                  title: {
                    id: getTrad("form.attribute.component.option.repeatable"),
                    defaultMessage: "Repeatable component"
                  },
                  description: {
                    id: getTrad("form.attribute.component.option.repeatable.description"),
                    defaultMessage: "Best for multiple instances (array) of ingredients, meta tags, etc.."
                  },
                  value: true
                },
                {
                  title: {
                    id: getTrad("form.attribute.component.option.single"),
                    defaultMessage: "Single component"
                  },
                  description: {
                    id: getTrad("form.attribute.component.option.single.description"),
                    defaultMessage: "Best for grouping fields like full address, main information, etc..."
                  },
                  value: false
                }
              ]
            }
          ]
        }
      ]
    };
  },
  date() {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            nameField$1,
            {
              intlLabel: {
                id: "global.type",
                defaultMessage: "Type"
              },
              name: "type",
              type: "select-date",
              options: [
                {
                  key: "__null_reset_value__",
                  value: "",
                  metadatas: {
                    intlLabel: {
                      id: "components.InputSelect.option.placeholder",
                      defaultMessage: "Choose here"
                    },
                    hidden: true
                  }
                },
                {
                  key: "date",
                  value: "date",
                  metadatas: {
                    intlLabel: {
                      id: getTrad("form.attribute.item.date.type.date"),
                      defaultMessage: "date (ex: 01/01/{currentYear})",
                      values: { currentYear: (/* @__PURE__ */ new Date()).getFullYear() }
                    }
                  }
                },
                {
                  key: "datetime",
                  value: "datetime",
                  metadatas: {
                    intlLabel: {
                      id: getTrad("form.attribute.item.date.type.datetime"),
                      defaultMessage: "datetime (ex: 01/01/{currentYear} 00:00 AM)",
                      values: { currentYear: (/* @__PURE__ */ new Date()).getFullYear() }
                    }
                  }
                },
                {
                  key: "time",
                  value: "time",
                  metadatas: {
                    intlLabel: {
                      id: getTrad("form.attribute.item.date.type.time"),
                      defaultMessage: "time (ex: 00:00 AM)"
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  },
  enumeration() {
    return {
      sections: [
        { sectionTitle: null, items: [nameField$1] },
        {
          sectionTitle: null,
          items: [
            {
              name: "enum",
              type: "textarea-enum",
              size: 6,
              intlLabel: {
                id: getTrad("form.attribute.item.enumeration.rules"),
                defaultMessage: "Values (one line per value)"
              },
              placeholder: {
                id: getTrad("form.attribute.item.enumeration.placeholder"),
                defaultMessage: "Ex:\nmorning\nnoon\nevening"
              },
              validations: {
                required: true
              }
            }
          ]
        }
      ]
    };
  },
  media() {
    return {
      sections: [
        { sectionTitle: null, items: [nameField$1] },
        {
          sectionTitle: null,
          items: [
            {
              intlLabel: {
                id: "global.type",
                defaultMessage: "Type"
              },
              name: "multiple",
              size: 12,
              type: "boolean-radio-group",
              radios: [
                {
                  title: {
                    id: getTrad("form.attribute.media.option.multiple"),
                    defaultMessage: "Multiple media"
                  },
                  description: {
                    id: getTrad("form.attribute.media.option.multiple.description"),
                    defaultMessage: "Best for sliders, carousels or multiple files download"
                  },
                  value: true
                },
                {
                  title: {
                    id: getTrad("form.attribute.media.option.single"),
                    defaultMessage: "Single media"
                  },
                  description: {
                    id: getTrad("form.attribute.media.option.single.description"),
                    defaultMessage: "Best for avatar, profile picture or cover"
                  },
                  value: false
                }
              ]
            }
          ]
        }
      ]
    };
  },
  number() {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            nameField$1,
            {
              intlLabel: {
                id: getTrad("form.attribute.item.number.type"),
                defaultMessage: "Number format"
              },
              name: "type",
              type: "select-number",
              options: [
                {
                  key: "__null_reset_value__",
                  value: "",
                  metadatas: {
                    intlLabel: {
                      id: "components.InputSelect.option.placeholder",
                      defaultMessage: "Choose here"
                    },
                    hidden: true
                  }
                },
                {
                  key: "integer",
                  value: "integer",
                  metadatas: {
                    intlLabel: {
                      id: getTrad("form.attribute.item.number.type.integer"),
                      defaultMessage: "integer (ex: 10)"
                    }
                  }
                },
                {
                  key: "biginteger",
                  value: "biginteger",
                  metadatas: {
                    intlLabel: {
                      id: getTrad("form.attribute.item.number.type.biginteger"),
                      defaultMessage: "biginteger (ex: 123456789)"
                    }
                  }
                },
                {
                  key: "decimal",
                  value: "decimal",
                  metadatas: {
                    intlLabel: {
                      id: getTrad("form.attribute.item.number.type.decimal"),
                      defaultMessage: "decimal (ex: 2.22)"
                    }
                  }
                },
                {
                  key: "float",
                  value: "float",
                  metadatas: {
                    intlLabel: {
                      id: getTrad("form.attribute.item.number.type.float"),
                      defaultMessage: "decimal (ex: 3.3333333)"
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  },
  relation() {
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              intlLabel: { id: "FIXME", defaultMessage: "FIXME" },
              name: "relation",
              size: 12,
              type: "relation"
            }
          ]
        }
      ]
    };
  },
  string() {
    return {
      sections: [
        { sectionTitle: null, items: [nameField$1] },
        {
          sectionTitle: null,
          items: [
            {
              intlLabel: {
                id: "global.type",
                defaultMessage: "Type"
              },
              name: "type",
              size: 12,
              type: "radio-group",
              radios: [
                {
                  title: {
                    id: getTrad("form.attribute.text.option.short-text"),
                    defaultMessage: "Sort text"
                  },
                  description: {
                    id: getTrad("form.attribute.text.option.short-text.description"),
                    defaultMessage: "Best for titles, names, links (URL). It also enables exact search on the field."
                  },
                  value: "string"
                },
                {
                  title: {
                    id: getTrad("form.attribute.text.option.long-text"),
                    defaultMessage: "Long text"
                  },
                  description: {
                    id: getTrad("form.attribute.text.option.long-text.description"),
                    defaultMessage: "Best for descriptions, biography. Exact search is disabled."
                  },
                  value: "text"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  text() {
    return {
      sections: [
        { sectionTitle: null, items: [nameField$1] },
        {
          sectionTitle: null,
          items: [
            {
              intlLabel: {
                id: "global.type",
                defaultMessage: "Type"
              },
              name: "type",
              size: 12,
              type: "radio-group",
              radios: [
                {
                  title: {
                    id: getTrad("form.attribute.text.option.short-text"),
                    defaultMessage: "Sort text"
                  },
                  description: {
                    id: getTrad("form.attribute.text.option.short-text.description"),
                    defaultMessage: "Best for titles, names, links (URL). It also enables exact search on the field."
                  },
                  value: "string"
                },
                {
                  title: {
                    id: getTrad("form.attribute.text.option.long-text"),
                    defaultMessage: "Long text"
                  },
                  description: {
                    id: getTrad("form.attribute.text.option.long-text.description"),
                    defaultMessage: "Best for descriptions, biography. Exact search is disabled."
                  },
                  value: "text"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  uid(_data, step, attributes) {
    const options2 = attributes.filter(({ type }) => ["string", "text"].includes(type)).map(({ name }) => ({
      key: name,
      value: name,
      metadatas: {
        intlLabel: { id: `${name}.no-override`, defaultMessage: name }
      }
    }));
    return {
      sections: [
        {
          sectionTitle: null,
          items: [
            {
              ...nameField$1,
              placeholder: {
                id: getTrad("modalForm.attribute.form.base.name.placeholder"),
                defaultMessage: "e.g. slug, seoUrl, canonicalUrl"
              }
            },
            {
              intlLabel: {
                id: getTrad("modalForm.attribute.target-field"),
                defaultMessage: "Attached field"
              },
              name: "targetField",
              type: "select",
              options: [
                {
                  key: "__null_reset_value__",
                  value: "",
                  metadatas: { intlLabel: { id: "global.none", defaultMessage: "None" } }
                },
                ...options2
              ]
            }
          ]
        }
      ]
    };
  }
};
const attributesForm = {
  advanced: advancedForm,
  base: baseForm
};
const toRegressedEnumValue = (value) => {
  if (!value) {
    return "";
  }
  return slugify(value, {
    decamelize: false,
    lowercase: false,
    separator: "_"
  });
};
const NAME_REGEX = /^[A-Za-z][_0-9A-Za-z]*$/;
const alreadyUsedAttributeNames = (usedNames) => {
  return {
    name: "attributeNameAlreadyUsed",
    message: translatedErrors.unique.id,
    test(value) {
      if (!value) {
        return false;
      }
      const snakeCaseKey = snakeCase(value);
      return !usedNames.some((existingKey) => {
        return snakeCase(existingKey) === snakeCaseKey;
      });
    }
  };
};
const isNameAllowed = (reservedNames) => {
  return {
    name: "forbiddenAttributeName",
    message: getTrad("error.attributeName.reserved-name"),
    test(value) {
      if (!value) {
        return false;
      }
      const snakeCaseKey = snakeCase(value);
      return !reservedNames.some((existingKey) => {
        return snakeCase(existingKey) === snakeCaseKey;
      });
    }
  };
};
const validators = {
  default: () => yup.string().nullable(),
  max: () => yup.number().integer().nullable(),
  min: () => yup.number().integer().when("max", (max, schema) => {
    if (max) {
      return schema.max(max, getTrad("error.validation.minSupMax"));
    }
    return schema;
  }).nullable(),
  maxLength: () => yup.number().integer().positive(getTrad("error.validation.positive")).nullable(),
  minLength: () => yup.number().integer().min(1).when("maxLength", (maxLength, schema) => {
    if (maxLength) {
      return schema.max(maxLength, getTrad("error.validation.minSupMax"));
    }
    return schema;
  }).nullable(),
  name(usedNames, reservedNames) {
    return yup.string().test(alreadyUsedAttributeNames(usedNames)).test(isNameAllowed(reservedNames)).matches(NAME_REGEX, translatedErrors.regex.id).required(translatedErrors.required.id);
  },
  required: () => yup.boolean(),
  type: () => yup.string().required(translatedErrors.required.id),
  unique: () => yup.boolean().nullable()
};
const createTextShape = (usedAttributeNames, reservedNames) => {
  const shape = {
    name: validators.name(usedAttributeNames, reservedNames),
    type: validators.type(),
    default: validators.default(),
    unique: validators.unique(),
    required: validators.required(),
    maxLength: validators.maxLength(),
    minLength: validators.minLength(),
    regex: yup.string().test({
      name: "isValidRegExpPattern",
      message: getTrad("error.validation.regex"),
      test(value) {
        try {
          return new RegExp(value || "") !== null;
        } catch (e) {
          return false;
        }
      }
    }).nullable()
  };
  return shape;
};
const isMinSuperiorThanMax = () => ({
  name: "isMinSuperiorThanMax",
  message: getTrad("error.validation.minSupMax"),
  test(min) {
    if (!min) {
      return true;
    }
    const { max } = this.parent;
    if (!max) {
      return true;
    }
    if (Number.isNaN(toNumber(min))) {
      return true;
    }
    return toNumber(max) >= toNumber(min);
  }
});
const attributeTypes = {
  date(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type()
    };
    return yup.object(shape);
  },
  datetime(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type()
    };
    return yup.object(shape);
  },
  time(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type()
    };
    return yup.object(shape);
  },
  default(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type()
    };
    return yup.object(shape);
  },
  biginteger(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      default: yup.string().nullable().matches(/^-?\d*$/),
      unique: validators.unique(),
      required: validators.required(),
      max: yup.string().nullable().matches(/^-?\d*$/, translatedErrors.regex.id),
      min: yup.string().nullable().test(isMinSuperiorThanMax()).matches(/^-?\d*$/, translatedErrors.regex.id)
    };
    return yup.object(shape);
  },
  boolean(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      default: yup.boolean().nullable(),
      required: validators.required(),
      unique: validators.unique()
    };
    return yup.object(shape);
  },
  component(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      required: validators.required(),
      max: validators.max(),
      min: validators.min(),
      component: yup.string().required(translatedErrors.required.id)
    };
    return yup.object(shape);
  },
  decimal(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      default: yup.number(),
      required: validators.required(),
      max: yup.number(),
      min: yup.number().test(isMinSuperiorThanMax())
    };
    return yup.object(shape);
  },
  dynamiczone(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      required: validators.required(),
      max: validators.max(),
      min: validators.min()
    };
    return yup.object(shape);
  },
  email(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      default: yup.string().email().nullable(),
      unique: validators.unique(),
      required: validators.required(),
      maxLength: validators.maxLength(),
      minLength: validators.minLength()
    };
    return yup.object(shape);
  },
  enumeration(usedAttributeNames, reservedNames) {
    const GRAPHQL_ENUM_REGEX = /^[_A-Za-z][_0-9A-Za-z]*$/;
    const shape = {
      name: yup.string().test(alreadyUsedAttributeNames(usedAttributeNames)).test(isNameAllowed(reservedNames)).matches(GRAPHQL_ENUM_REGEX, translatedErrors.regex.id).required(translatedErrors.required.id),
      type: validators.type(),
      default: validators.default(),
      unique: validators.unique(),
      required: validators.required(),
      enum: yup.array().of(yup.string()).min(1, translatedErrors.min.id).test({
        name: "areEnumValuesUnique",
        message: getTrad("error.validation.enum-duplicate"),
        test(values) {
          if (!values) {
            return false;
          }
          const duplicates = uniq(
            values.map(toRegressedEnumValue).filter((value, index2, values2) => values2.indexOf(value) !== index2)
          );
          return !duplicates.length;
        }
      }).test({
        name: "doesNotHaveEmptyValues",
        message: getTrad("error.validation.enum-empty-string"),
        test: (values) => {
          if (!values) {
            return false;
          }
          return !values.map(toRegressedEnumValue).some((val) => val === "");
        }
      }).test({
        name: "doesMatchRegex",
        message: getTrad("error.validation.enum-regex"),
        test: (values) => {
          if (!values) {
            return false;
          }
          return values.map(toRegressedEnumValue).every((value) => GRAPHQL_ENUM_REGEX.test(value));
        }
      }),
      enumName: yup.string().nullable()
    };
    return yup.object(shape);
  },
  float(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      required: validators.required(),
      default: yup.number(),
      max: yup.number(),
      min: yup.number().test(isMinSuperiorThanMax())
    };
    return yup.object(shape);
  },
  integer(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      default: yup.number().integer(),
      unique: validators.unique(),
      required: validators.required(),
      max: validators.max(),
      min: validators.min()
    };
    return yup.object(shape);
  },
  json(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      required: validators.required(),
      unique: validators.unique()
    };
    return yup.object(shape);
  },
  media(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      multiple: yup.boolean(),
      required: validators.required(),
      allowedTypes: yup.array().of(yup.string().oneOf(["images", "videos", "files", "audios"])).min(1).nullable()
    };
    return yup.object(shape);
  },
  password(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      default: validators.default(),
      unique: validators.unique(),
      required: validators.required(),
      maxLength: validators.maxLength(),
      minLength: validators.minLength()
    };
    return yup.object(shape);
  },
  relation(usedAttributeNames, reservedNames, alreadyTakenTargetAttributes, {
    initialData,
    modifiedData
  }) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      target: yup.string().required(translatedErrors.required.id),
      relation: yup.string().required(),
      type: yup.string().required(),
      targetAttribute: yup.lazy(() => {
        const relationType = getRelationType(modifiedData.relation, modifiedData.targetAttribute);
        if (relationType === "oneWay" || relationType === "manyWay") {
          return yup.string().nullable();
        }
        const schema = yup.string().test(isNameAllowed(reservedNames));
        const initialForbiddenName = [
          ...alreadyTakenTargetAttributes.map(({ name }) => name),
          modifiedData.name
        ];
        const forbiddenTargetAttributeName = initialForbiddenName.filter(
          (val) => val !== initialData.targetAttribute
        );
        return schema.matches(NAME_REGEX, translatedErrors.regex.id).test({
          name: "forbiddenTargetAttributeName",
          message: getTrad("error.validation.relation.targetAttribute-taken"),
          test(value) {
            if (!value) {
              return false;
            }
            return !forbiddenTargetAttributeName.includes(value);
          }
        }).required(translatedErrors.required.id);
      })
    };
    return yup.object(shape);
  },
  richtext(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      default: validators.default(),
      unique: validators.unique(),
      required: validators.required(),
      maxLength: validators.maxLength(),
      minLength: validators.minLength()
    };
    return yup.object(shape);
  },
  blocks(usedAttributeNames, reservedNames) {
    const shape = {
      name: validators.name(usedAttributeNames, reservedNames),
      type: validators.type(),
      default: validators.default(),
      unique: validators.unique(),
      required: validators.required(),
      maxLength: validators.maxLength(),
      minLength: validators.minLength()
    };
    return yup.object(shape);
  },
  string(usedAttributeNames, reservedNames) {
    const shape = createTextShape(usedAttributeNames, reservedNames);
    return yup.object(shape);
  },
  text(usedAttributeNames, reservedNames) {
    const shape = createTextShape(usedAttributeNames, reservedNames);
    return yup.object(shape);
  },
  uid(usedAttributeNames, reservedNames) {
    const shape = createTextShape(usedAttributeNames, reservedNames);
    return yup.object(shape);
  }
};
const CATEGORY_NAME_REGEX = /^[A-Za-z][-_0-9A-Za-z]*$/;
const createCategorySchema = (usedCategoryNames) => {
  const shape = {
    name: yup.string().matches(CATEGORY_NAME_REGEX, translatedErrors.regex.id).test({
      name: "nameNotAllowed",
      message: translatedErrors.unique.id,
      test(value) {
        if (!value) {
          return false;
        }
        return !usedCategoryNames.includes(value?.toLowerCase());
      }
    }).required(translatedErrors.required.id)
  };
  return yup.object(shape);
};
const categoryForm = {
  base: {
    sections: [
      {
        sectionTitle: null,
        items: [
          {
            autoFocus: true,
            name: "name",
            type: "text",
            intlLabel: {
              id: "global.name",
              defaultMessage: "Name"
            },
            // validations: {
            //   required: true,
            // },
            description: {
              id: getTrad("modalForm.editCategory.base.name.description"),
              defaultMessage: "No space is allowed for the name of the category"
            }
          }
        ]
      }
    ]
  }
};
const createComponentSchema = (usedComponentNames, reservedNames, category, takenCollectionNames, currentCollectionName) => {
  const shape = {
    displayName: yup.string().test({
      name: "nameAlreadyUsed",
      message: translatedErrors.unique.id,
      test(value) {
        if (!value) {
          return false;
        }
        const name = createComponentUid(value, category);
        const snakeCaseKey = snakeCase(name);
        const snakeCaseCollectionName = snakeCase(currentCollectionName);
        return usedComponentNames.every((reserved) => {
          return snakeCase(reserved) !== snakeCaseKey;
        }) && takenCollectionNames.every(
          (collectionName) => snakeCase(collectionName) !== snakeCaseCollectionName
        );
      }
    }).test({
      name: "nameNotAllowed",
      message: getTrad("error.contentTypeName.reserved-name"),
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return reservedNames.every((reserved) => {
          return snakeCase(reserved) !== snakeCaseKey;
        });
      }
    }).required(translatedErrors.required.id),
    category: yup.string().matches(CATEGORY_NAME_REGEX, translatedErrors.regex.id).required(translatedErrors.required.id),
    icon: yup.string()
  };
  return yup.object(shape);
};
const nameField = {
  name: "displayName",
  type: "text",
  intlLabel: {
    id: getTrad("contentType.displayName.label"),
    defaultMessage: "Display name"
  }
};
const contentTypeForm = {
  advanced: {
    default() {
      return {
        sections: [
          {
            items: [
              {
                intlLabel: {
                  id: getTrad("contentType.draftAndPublish.label"),
                  defaultMessage: "Draft & publish"
                },
                description: {
                  id: getTrad("contentType.draftAndPublish.description"),
                  defaultMessage: "Allows writing a draft version of an entry, before it is published"
                },
                name: "draftAndPublish",
                type: "toggle-draft-publish",
                validations: {}
              }
            ]
          }
        ]
      };
    }
  },
  base: {
    create() {
      return {
        sections: [
          {
            sectionTitle: null,
            items: [
              nameField,
              {
                description: {
                  id: getTrad("contentType.apiId-singular.description"),
                  defaultMessage: "Used to generate the API routes and databases tables/collections"
                },
                intlLabel: {
                  id: getTrad("contentType.apiId-singular.label"),
                  defaultMessage: "API ID (Singular)"
                },
                name: "singularName",
                type: "text-singular"
              },
              {
                type: "pushRight",
                size: 6,
                intlLabel: { id: "", defaultMessage: "" },
                name: "pushRight"
              },
              {
                description: {
                  id: getTrad("contentType.apiId-plural.description"),
                  defaultMessage: "Pluralized API ID"
                },
                intlLabel: {
                  id: getTrad("contentType.apiId-plural.label"),
                  defaultMessage: "API ID (Plural)"
                },
                name: "pluralName",
                type: "text-plural"
              }
            ]
          }
        ]
      };
    },
    edit() {
      return {
        sections: [
          {
            sectionTitle: null,
            items: [
              nameField,
              {
                disabled: true,
                description: {
                  id: getTrad("contentType.apiId-singular.description"),
                  defaultMessage: "Used to generate the API routes and databases tables/collections"
                },
                intlLabel: {
                  id: getTrad("contentType.apiId-singular.label"),
                  defaultMessage: "API ID (Singular)"
                },
                name: "singularName",
                type: "text"
              },
              {
                type: "pushRight",
                size: 6,
                intlLabel: { id: "", defaultMessage: "" },
                name: "pushRight"
              },
              {
                disabled: true,
                description: {
                  id: getTrad("contentType.apiId-plural.description"),
                  defaultMessage: "Pluralized API ID"
                },
                intlLabel: {
                  id: getTrad("contentType.apiId-plural.label"),
                  defaultMessage: "API ID (Plural)"
                },
                name: "pluralName",
                type: "text"
              },
              {
                intlLabel: {
                  id: "global.type",
                  defaultMessage: "Type"
                },
                name: "kind",
                type: "content-type-radio-group",
                size: 12,
                radios: [
                  {
                    title: {
                      id: getTrad("form.button.collection-type.name"),
                      defaultMessage: "Collection Type"
                    },
                    description: {
                      id: getTrad("form.button.collection-type.description"),
                      defaultMessage: "Best for multiple instances like articles, products, comments, etc."
                    },
                    value: "collectionType"
                  },
                  {
                    title: {
                      id: getTrad("form.button.single-type.name"),
                      defaultMessage: "Single Type"
                    },
                    description: {
                      id: getTrad("form.button.single-type.description"),
                      defaultMessage: "Best for single instance like about us, homepage, etc."
                    },
                    value: "singleType"
                  }
                ]
              }
            ]
          }
        ]
      };
    }
  }
};
const createContentTypeSchema = ({
  usedContentTypeNames = [],
  reservedModels = [],
  singularNames = [],
  pluralNames = [],
  collectionNames = []
}) => {
  const shape = {
    displayName: yup.string().test({
      name: "nameAlreadyUsed",
      message: translatedErrors.unique.id,
      test(value) {
        if (!value) {
          return false;
        }
        const name = createUid(value);
        const snakeCaseKey = snakeCase(name);
        return !usedContentTypeNames.some((value2) => {
          return snakeCase(value2) === snakeCaseKey;
        });
      }
    }).test({
      name: "nameNotAllowed",
      message: getTrad("error.contentTypeName.reserved-name"),
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !reservedModels.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).required(translatedErrors.required.id),
    pluralName: yup.string().test({
      name: "pluralNameAlreadyUsed",
      message: translatedErrors.unique.id,
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !pluralNames.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).test({
      name: "pluralNameAlreadyUsedAsSingular",
      message: getTrad("error.contentType.pluralName-equals-singularName"),
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !singularNames.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).test({
      name: "pluralAndSingularAreUnique",
      message: getTrad("error.contentType.pluralName-used"),
      test(value, context) {
        if (!value) {
          return false;
        }
        return snakeCase(context.parent.singularName) !== snakeCase(value);
      }
    }).test({
      name: "pluralNameNotAllowed",
      message: getTrad("error.contentTypeName.reserved-name"),
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !reservedModels.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).test({
      name: "pluralNameNotAlreadyUsedInCollectionName",
      message: getTrad("error.contentType.pluralName-equals-collectionName"),
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !collectionNames.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).required(translatedErrors.required.id),
    singularName: yup.string().test({
      name: "singularNameAlreadyUsed",
      message: translatedErrors.unique.id,
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !singularNames.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).test({
      name: "singularNameAlreadyUsedAsPlural",
      message: getTrad("error.contentType.singularName-equals-pluralName"),
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !pluralNames.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).test({
      name: "pluralAndSingularAreUnique",
      message: getTrad("error.contentType.singularName-used"),
      test(value, context) {
        if (!value) {
          return false;
        }
        return snakeCase(context.parent.pluralName) !== snakeCase(value);
      }
    }).test({
      name: "singularNameNotAllowed",
      message: getTrad("error.contentTypeName.reserved-name"),
      test(value) {
        if (!value) {
          return false;
        }
        const snakeCaseKey = snakeCase(value);
        return !reservedModels.some((key) => {
          return snakeCase(key) === snakeCaseKey;
        });
      }
    }).required(translatedErrors.required.id),
    draftAndPublish: yup.boolean(),
    kind: yup.string().oneOf(["singleType", "collectionType"])
  };
  return yup.object(shape);
};
const dynamiczoneForm = {
  advanced: {
    default() {
      return {
        sections: componentForm.advanced()
      };
    }
  },
  base: {
    createComponent() {
      return {
        sections: [
          { sectionTitle: null, items: [componentField] },
          ...componentForm.base("componentToCreate.")
        ]
      };
    },
    default() {
      return {
        sections: [
          { sectionTitle: null, items: [componentField] },
          {
            sectionTitle: null,
            items: [
              {
                type: "pushRight",
                size: 6,
                intlLabel: { id: "", defaultMessage: "" },
                name: "pushRight"
              },
              {
                name: "components",
                type: "select-components",
                intlLabel: {
                  id: getTrad("modalForm.attributes.select-components"),
                  defaultMessage: "Select the components"
                },
                isMultiple: true
              }
            ]
          }
        ]
      };
    }
  }
};
const addItemsToFormSection = (formTypeOptions, sections) => {
  formTypeOptions.forEach((item) => {
    if (!("sectionTitle" in item)) {
      sections[0].items?.push(item);
      return;
    }
    sections.push(item);
  });
};
const createComponentCollectionName = (name, category) => {
  return `components_${snakeCase(category)}_${pluralize(snakeCase(name))}`;
};
const getUsedAttributeNames = (attributes, schemaData) => {
  return attributes.filter(({ name }) => {
    return name !== schemaData.initialData.name;
  }).map(({ name }) => name);
};
const forms = {
  customField: {
    schema({
      schemaAttributes,
      attributeType,
      customFieldValidator,
      reservedNames,
      schemaData,
      ctbFormsAPI
    }) {
      const usedAttributeNames = getUsedAttributeNames(schemaAttributes, schemaData);
      let attributeShape;
      if (attributeType === "relation") {
        attributeShape = attributeTypes[attributeType](
          usedAttributeNames,
          reservedNames.attributes,
          [],
          { initialData: {}, modifiedData: {} }
        );
      } else {
        attributeShape = attributeTypes[attributeType](
          usedAttributeNames,
          reservedNames.attributes
        );
      }
      return ctbFormsAPI.makeCustomFieldValidator(
        attributeShape,
        customFieldValidator,
        usedAttributeNames,
        reservedNames.attributes,
        schemaData
      );
    },
    form: {
      base({ customField }) {
        const sections = [{ sectionTitle: null, items: [nameField$1] }];
        if (customField.options?.base) {
          addItemsToFormSection(customField.options.base, sections);
        }
        return { sections };
      },
      advanced({ customField, data, step, extensions, ...rest }) {
        const sections = [{ sectionTitle: null, items: [] }];
        const injectedInputs = extensions.getAdvancedForm(["attribute", customField.type], {
          data,
          type: customField.type,
          step,
          ...rest
        });
        if (customField.options?.advanced) {
          addItemsToFormSection(customField.options.advanced, sections);
        }
        if (injectedInputs) {
          const extendedSettings = {
            sectionTitle: {
              id: getTrad("modalForm.custom-fields.advanced.settings.extended"),
              defaultMessage: "Extended settings"
            },
            items: injectedInputs
          };
          sections.push(extendedSettings);
        }
        return { sections };
      }
    }
  },
  attribute: {
    schema(currentSchema, attributeType, reservedNames, alreadyTakenTargetContentTypeAttributes, options2, extensions) {
      const attributes = currentSchema?.schema?.attributes ?? [];
      const usedAttributeNames = getUsedAttributeNames(attributes, options2);
      try {
        const attributeShape = attributeTypes[attributeType](
          usedAttributeNames,
          reservedNames.attributes,
          alreadyTakenTargetContentTypeAttributes,
          options2
        );
        return extensions.makeValidator(
          ["attribute", attributeType],
          attributeShape,
          usedAttributeNames,
          reservedNames.attributes,
          alreadyTakenTargetContentTypeAttributes,
          options2
        );
      } catch (err) {
        console.error("Error yup build schema", err);
        return attributeTypes.default(usedAttributeNames, reservedNames.attributes);
      }
    },
    form: {
      advanced({ data, type, step, extensions, ...rest }) {
        try {
          const baseForm2 = attributesForm.advanced[type](data, step).sections;
          const itemsToAdd = extensions.getAdvancedForm(["attribute", type], {
            data,
            type,
            step,
            ...rest
          });
          const sections = baseForm2.reduce((acc, current) => {
            if (current.sectionTitle === null) {
              acc.push(current);
            } else {
              acc.push({ ...current, items: [...current.items, ...itemsToAdd] });
            }
            return acc;
          }, []);
          return { sections };
        } catch (err) {
          console.error(err);
          return { sections: [] };
        }
      },
      base({ data, type, step, attributes }) {
        try {
          return attributesForm.base[type](data, step, attributes);
        } catch (err) {
          return commonBaseForm;
        }
      }
    }
  },
  contentType: {
    schema(alreadyTakenNames, isEditing, ctUid, reservedNames, extensions, contentTypes) {
      const singularNames = Object.values(contentTypes).map((contentType) => {
        return contentType.schema.singularName;
      });
      const pluralNames = Object.values(contentTypes).map((contentType) => {
        return contentType?.schema?.pluralName ?? "";
      });
      const takenNames = isEditing ? alreadyTakenNames.filter((uid) => uid !== ctUid) : alreadyTakenNames;
      const takenSingularNames = isEditing ? singularNames.filter((singName) => {
        const { schema } = contentTypes[ctUid];
        return schema.singularName !== singName;
      }) : singularNames;
      const takenPluralNames = isEditing ? pluralNames.filter((pluralName) => {
        const { schema } = contentTypes[ctUid];
        return schema.pluralName !== pluralName;
      }) : pluralNames;
      const collectionNames = Object.values(contentTypes).map((contentType) => {
        return contentType?.schema?.collectionName ?? "";
      });
      const takenCollectionNames = isEditing ? collectionNames.filter((collectionName) => {
        const { schema } = contentTypes[ctUid];
        const currentCollectionName = schema.collectionName;
        return collectionName !== currentCollectionName;
      }) : collectionNames;
      const contentTypeShape = createContentTypeSchema({
        usedContentTypeNames: takenNames,
        reservedModels: reservedNames.models,
        singularNames: takenSingularNames,
        pluralNames: takenPluralNames,
        collectionNames: takenCollectionNames
      });
      return extensions.makeValidator(
        ["contentType"],
        contentTypeShape,
        takenNames,
        reservedNames.models,
        takenSingularNames,
        takenPluralNames
      );
    },
    form: {
      base({ actionType }) {
        if (actionType === "create") {
          return contentTypeForm.base.create();
        }
        return contentTypeForm.base.edit();
      },
      advanced({ extensions }) {
        const baseForm2 = contentTypeForm.advanced.default().sections.map((section) => section.items).flat();
        const itemsToAdd = extensions.getAdvancedForm(["contentType"]);
        return {
          sections: [
            {
              items: [...baseForm2, ...itemsToAdd]
            }
          ]
        };
      }
    }
  },
  component: {
    schema(alreadyTakenAttributes, componentCategory, reservedNames, isEditing = false, components, componentDisplayName, compoUid = null) {
      const takenNames = isEditing ? alreadyTakenAttributes.filter((uid) => uid !== compoUid) : alreadyTakenAttributes;
      const collectionNames = Object.values(components).map((component) => {
        return component?.schema?.collectionName;
      });
      const currentCollectionName = createComponentCollectionName(
        componentDisplayName,
        componentCategory
      );
      const takenCollectionNames = isEditing ? collectionNames.filter((collectionName) => collectionName !== currentCollectionName) : collectionNames;
      return createComponentSchema(
        takenNames,
        reservedNames.models,
        componentCategory,
        takenCollectionNames,
        currentCollectionName
      );
    },
    form: {
      advanced() {
        return {
          sections: componentForm.advanced()
        };
      },
      base() {
        return {
          sections: componentForm.base()
        };
      }
    }
  },
  addComponentToDynamicZone: {
    form: {
      advanced() {
        return dynamiczoneForm.advanced.default();
      },
      base({ data }) {
        const isCreatingComponent = data?.createComponent ?? false;
        if (isCreatingComponent) {
          return dynamiczoneForm.base.createComponent();
        }
        return dynamiczoneForm.base.default();
      }
    }
  },
  editCategory: {
    schema(allCategories, initialData) {
      const allowedCategories = allCategories.filter((cat) => cat !== initialData.name).map((cat) => cat.toLowerCase());
      return createCategorySchema(allowedCategories);
    },
    form: {
      advanced: () => ({ sections: [] }),
      base() {
        return categoryForm.base;
      }
    }
  }
};
const formModalDomain = () => (state) => state[`${pluginId}_formModal`] || initialState;
const makeSelectFormModal = () => createSelector(formModalDomain(), (substate) => {
  return substate;
});
const canEditContentType = (data, modifiedData) => {
  const kind = get(data, ["contentType", "schema", "kind"], "");
  if (kind === "singleType" || kind === modifiedData.kind) {
    return true;
  }
  const contentTypeAttributes = get(
    data,
    ["contentType", "schema", "attributes"],
    []
  );
  const relationAttributes = contentTypeAttributes.filter(({ relation, type, targetAttribute }) => {
    const relationType = getRelationType(relation, targetAttribute);
    return type === "relation" && !["oneWay", "manyWay"].includes(relationType || "");
  });
  return relationAttributes.length === 0;
};
const getAttributesToDisplay = (dataTarget = "", targetUid, nestedComponents) => {
  const defaultAttributes = [
    "text",
    "boolean",
    "blocks",
    "json",
    "number",
    "email",
    "date",
    "password",
    "media",
    "enumeration",
    "relation",
    "richtext"
  ];
  const isPickingAttributeForAContentType = dataTarget === "contentType";
  if (isPickingAttributeForAContentType) {
    return [
      // Insert UID before the last item (richtext)
      [...defaultAttributes.slice(0, -1), "uid", ...defaultAttributes.slice(-1)],
      ["component", "dynamiczone"]
    ];
  }
  if (dataTarget) {
    const componentDepth = getComponentDepth(targetUid, nestedComponents);
    const isNestedInAnotherComponent = componentDepth >= MAX_COMPONENT_DEPTH;
    const canAddComponentInAnotherComponent = !isPickingAttributeForAContentType && !isNestedInAnotherComponent;
    if (canAddComponentInAnotherComponent) {
      return [defaultAttributes, ["component"]];
    }
  }
  return [defaultAttributes];
};
const getFormInputNames = (form) => form.reduce((acc, current) => {
  const names = current.items.reduce((acc2, current2) => {
    if (current2.name) {
      acc2.push(current2.name);
    }
    return acc2;
  }, []);
  return [...acc, ...names];
}, []);
const FormComponent = styled.form`
  overflow: auto;
`;
const FormModal = () => {
  const {
    onCloseModal,
    onNavigateToChooseAttributeModal,
    onNavigateToAddCompoToDZModal,
    onNavigateToCreateComponentStep2,
    actionType,
    attributeName,
    attributeType,
    customFieldUid,
    categoryName,
    dynamicZoneTarget,
    forTarget,
    modalType,
    isOpen,
    kind,
    step,
    targetUid,
    showBackLink,
    activeTab,
    setActiveTab
  } = useFormModalNavigation();
  const getPlugin = useStrapiApp("FormModal", (state) => state.getPlugin);
  const getCustomField = useStrapiApp("FormModal", (state) => state.customFields.get);
  const customField = getCustomField(customFieldUid);
  const formModalSelector = React.useMemo(makeSelectFormModal, []);
  const dispatch = useDispatch();
  const { toggleNotification } = useNotification();
  const reducerState = useSelector((state) => formModalSelector(state), shallowEqual);
  const navigate = useNavigate();
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const ctbPlugin = getPlugin(pluginId);
  const ctbFormsAPI = ctbPlugin?.apis.forms;
  const inputsFromPlugins = ctbFormsAPI.components.inputs;
  const {
    addAttribute,
    addCustomFieldAttribute,
    addCreatedComponentToDynamicZone,
    allComponentsCategories,
    changeDynamicZoneComponents,
    contentTypes,
    components,
    createSchema,
    deleteCategory,
    deleteData,
    editCategory,
    editCustomFieldAttribute,
    submitData,
    modifiedData: allDataSchema,
    nestedComponents,
    setModifiedData,
    sortedContentTypesList,
    updateSchema,
    reservedNames
  } = useDataManager();
  const {
    componentToCreate,
    formErrors,
    initialData,
    isCreatingComponentWhileAddingAField,
    modifiedData
  } = reducerState;
  const pathToSchema = forTarget === "contentType" || forTarget === "component" ? [forTarget] : [forTarget, targetUid];
  React.useEffect(() => {
    if (isOpen) {
      const collectionTypesForRelation = sortedContentTypesList.filter(
        isAllowedContentTypesForRelations
      );
      if (modalType === "editCategory") {
        setModifiedData();
      }
      if (actionType === "edit" && modalType === "attribute" && forTarget === "contentType") {
        trackUsage("willEditFieldOfContentType");
      }
      const pathToAttributes = [...pathToSchema, "schema", "attributes"];
      const foundDynamicZoneTarget = findAttribute(get(allDataSchema, pathToAttributes, []), dynamicZoneTarget) || null;
      if (modalType === "editCategory" && actionType === "edit") {
        dispatch({
          type: SET_DATA_TO_EDIT,
          modalType,
          actionType,
          data: {
            name: categoryName
          }
        });
      }
      if (modalType === "contentType" && actionType === "create") {
        dispatch({
          type: SET_DATA_TO_EDIT,
          modalType,
          actionType,
          data: {
            draftAndPublish: true
          },
          pluginOptions: {}
        });
      }
      if (modalType === "contentType" && actionType === "edit") {
        const { displayName, draftAndPublish, kind: kind2, pluginOptions, pluralName, singularName } = get(
          allDataSchema,
          [...pathToSchema, "schema"],
          {
            displayName: null,
            pluginOptions: {},
            singularName: null,
            pluralName: null
          }
        );
        dispatch({
          type: SET_DATA_TO_EDIT,
          actionType,
          modalType,
          data: {
            displayName,
            draftAndPublish,
            kind: kind2,
            pluginOptions,
            pluralName,
            singularName
          }
        });
      }
      if (modalType === "component" && actionType === "edit") {
        const data = get(allDataSchema, pathToSchema, {});
        dispatch({
          type: SET_DATA_TO_EDIT,
          actionType,
          modalType,
          data: {
            displayName: data.schema.displayName,
            category: data.category,
            icon: data.schema.icon
          }
        });
      }
      if (modalType === "addComponentToDynamicZone" && actionType === "edit") {
        const attributeToEdit = {
          ...foundDynamicZoneTarget,
          // We filter the available components
          // Because this modal is only used for adding components
          components: [],
          name: dynamicZoneTarget,
          createComponent: false,
          componentToCreate: { type: "component" }
        };
        dispatch({
          type: SET_DYNAMIC_ZONE_DATA_SCHEMA,
          attributeToEdit
        });
      }
      if (attributeType) {
        const attributeToEditNotFormatted = findAttribute(
          get(allDataSchema, pathToAttributes, []),
          attributeName
        );
        const attributeToEdit = {
          ...attributeToEditNotFormatted,
          name: attributeName
        };
        if (attributeType === "component" && actionType === "edit") {
          if (!attributeToEdit.repeatable) {
            set(attributeToEdit, "repeatable", false);
          }
        }
        if (modalType === "customField") {
          dispatch({
            type: SET_CUSTOM_FIELD_DATA_SCHEMA,
            customField,
            isEditing: actionType === "edit",
            modifiedDataToSetForEditing: attributeToEdit,
            // NOTE: forTarget is used in the i18n middleware
            forTarget
          });
        } else {
          dispatch({
            type: SET_ATTRIBUTE_DATA_SCHEMA,
            attributeType,
            nameToSetForRelation: get(collectionTypesForRelation, ["0", "title"], "error"),
            targetUid: get(collectionTypesForRelation, ["0", "uid"], "error"),
            isEditing: actionType === "edit",
            modifiedDataToSetForEditing: attributeToEdit,
            step,
            forTarget
          });
        }
      }
    } else {
      dispatch({ type: RESET_PROPS });
    }
  }, [
    actionType,
    attributeName,
    attributeType,
    categoryName,
    dynamicZoneTarget,
    forTarget,
    isOpen,
    modalType
  ]);
  const isCreatingContentType = modalType === "contentType";
  const isCreatingComponent = modalType === "component";
  const isCreatingAttribute = modalType === "attribute";
  const isCreatingCustomFieldAttribute = modalType === "customField";
  const isComponentAttribute = attributeType === "component" && isCreatingAttribute;
  const isCreating = actionType === "create";
  const isCreatingComponentFromAView = get(modifiedData, "createComponent", false) || isCreatingComponentWhileAddingAField;
  const isInFirstComponentStep = step === "1";
  const isEditingCategory = modalType === "editCategory";
  const isPickingAttribute = modalType === "chooseAttribute";
  const uid = createUid(modifiedData.displayName || "");
  const attributes = get(allDataSchema, [...pathToSchema, "schema", "attributes"], null);
  const checkFormValidity = async () => {
    let schema;
    const dataToValidate = isCreatingComponentFromAView && step === "1" ? get(modifiedData, "componentToCreate", {}) : modifiedData;
    if (isCreatingContentType) {
      schema = forms.contentType.schema(
        Object.keys(contentTypes),
        actionType === "edit",
        // currentUID
        get(allDataSchema, [...pathToSchema, "uid"], null),
        reservedNames,
        ctbFormsAPI,
        contentTypes
      );
    } else if (isCreatingComponent) {
      schema = forms.component.schema(
        Object.keys(components),
        modifiedData.category || "",
        reservedNames,
        actionType === "edit",
        components,
        modifiedData.displayName || "",
        get(allDataSchema, [...pathToSchema, "uid"], null)
        // ctbFormsAPI
      );
    } else if (isCreatingCustomFieldAttribute) {
      schema = forms.customField.schema({
        schemaAttributes: get(allDataSchema, [...pathToSchema, "schema", "attributes"], []),
        attributeType: customField.type,
        reservedNames,
        schemaData: { modifiedData, initialData },
        ctbFormsAPI,
        customFieldValidator: customField.options?.validator
      });
    } else if (isComponentAttribute && isCreatingComponentFromAView && isInFirstComponentStep) {
      schema = forms.component.schema(
        Object.keys(components),
        get(modifiedData, "componentToCreate.category", ""),
        reservedNames,
        actionType === "edit",
        components,
        modifiedData.componentToCreate.displayName || ""
      );
    } else if (isCreatingAttribute && !isInFirstComponentStep) {
      const type = attributeType === "relation" ? "relation" : modifiedData.type;
      let alreadyTakenTargetContentTypeAttributes = [];
      if (type === "relation") {
        const targetContentTypeUID = get(modifiedData, ["target"], null);
        const targetContentTypeAttributes = get(
          contentTypes,
          [targetContentTypeUID, "schema", "attributes"],
          []
        );
        alreadyTakenTargetContentTypeAttributes = targetContentTypeAttributes.filter(
          ({ name: attrName }) => {
            if (actionType !== "edit") {
              return true;
            }
            return attrName !== initialData.targetAttribute;
          }
        );
      }
      schema = forms.attribute.schema(
        get(allDataSchema, pathToSchema, {}),
        type,
        reservedNames,
        alreadyTakenTargetContentTypeAttributes,
        { modifiedData, initialData },
        ctbFormsAPI
      );
    } else if (isEditingCategory) {
      schema = forms.editCategory.schema(allComponentsCategories, initialData);
    } else {
      if (isInFirstComponentStep && isCreatingComponentFromAView) {
        schema = forms.component.schema(
          Object.keys(components),
          get(modifiedData, "componentToCreate.category", ""),
          reservedNames,
          actionType === "edit",
          components,
          modifiedData.componentToCreate.displayName || ""
        );
      } else {
        return;
      }
    }
    await schema.validate(dataToValidate, { abortEarly: false });
  };
  const handleChange = React.useCallback(
    ({
      target: { name, value, type, ...rest }
    }) => {
      const namesThatCanResetToNullValue = [
        "enumName",
        "max",
        "min",
        "maxLength",
        "minLength",
        "regex",
        "default"
      ];
      let val;
      if (namesThatCanResetToNullValue.includes(name) && value === "") {
        val = null;
      } else {
        val = value;
      }
      const clonedErrors = Object.assign({}, formErrors);
      if (name === "max") {
        delete clonedErrors.min;
      }
      if (name === "maxLength") {
        delete clonedErrors.minLength;
      }
      delete clonedErrors[name];
      dispatch({
        type: SET_ERRORS,
        errors: clonedErrors
      });
      dispatch({
        type: ON_CHANGE,
        keys: name.split("."),
        value: val,
        ...rest
      });
    },
    [dispatch, formErrors]
  );
  const handleSubmit = async (e, shouldContinue = isCreating) => {
    e.preventDefault();
    try {
      await checkFormValidity();
      sendButtonAddMoreFieldEvent(shouldContinue);
      const ctTargetUid = forTarget === "components" ? targetUid : uid;
      if (isCreatingContentType) {
        if (isCreating) {
          createSchema({ ...modifiedData, kind }, modalType, uid);
          navigate({ pathname: `/plugins/${pluginId}/content-types/${uid}` });
          onNavigateToChooseAttributeModal({
            forTarget,
            targetUid: ctTargetUid
          });
        } else {
          if (canEditContentType(allDataSchema, modifiedData)) {
            onCloseModal();
            await submitData(modifiedData);
          } else {
            toggleNotification({
              type: "danger",
              message: formatMessage({ id: "notification.contentType.relations.conflict" })
            });
          }
          return;
        }
      } else if (modalType === "component") {
        if (isCreating) {
          const componentUid = createComponentUid(modifiedData.displayName, modifiedData.category);
          const { category, ...rest } = modifiedData;
          createSchema(rest, "component", componentUid, category);
          navigate({
            pathname: `/plugins/${pluginId}/component-categories/${category}/${componentUid}`
          });
          onNavigateToChooseAttributeModal({
            forTarget,
            targetUid: componentUid
          });
        } else {
          updateSchema(modifiedData, modalType, targetUid);
          onCloseModal();
          return;
        }
      } else if (isEditingCategory) {
        if (toLower(initialData.name) === toLower(modifiedData.name)) {
          onCloseModal();
          return;
        }
        editCategory(initialData.name, modifiedData);
        return;
      } else if (isCreatingCustomFieldAttribute) {
        const customFieldAttributeUpdate = {
          attributeToSet: { ...modifiedData, customField: customFieldUid },
          forTarget,
          targetUid,
          initialAttribute: initialData
        };
        if (actionType === "edit") {
          editCustomFieldAttribute(customFieldAttributeUpdate);
        } else {
          addCustomFieldAttribute(customFieldAttributeUpdate);
        }
        if (shouldContinue) {
          onNavigateToChooseAttributeModal({
            forTarget,
            targetUid: ctTargetUid
          });
        } else {
          onCloseModal();
        }
        return;
      } else if (isCreatingAttribute && !isCreatingComponentFromAView) {
        const isDynamicZoneAttribute = attributeType === "dynamiczone";
        if (isDynamicZoneAttribute) {
          addAttribute(modifiedData, forTarget, targetUid, actionType === "edit", initialData);
          if (isCreating) {
            dispatch({
              type: RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ
            });
            setActiveTab("basic");
            onNavigateToAddCompoToDZModal({ dynamicZoneTarget: modifiedData.name });
          } else {
            onCloseModal();
          }
          return;
        }
        if (!isComponentAttribute) {
          addAttribute(modifiedData, forTarget, targetUid, actionType === "edit", initialData);
          if (shouldContinue) {
            onNavigateToChooseAttributeModal({
              forTarget,
              targetUid: ctTargetUid
            });
          } else {
            onCloseModal();
          }
          return;
        }
        if (isInFirstComponentStep) {
          onNavigateToCreateComponentStep2();
          dispatch({
            type: RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO,
            forTarget
          });
          return;
        }
        addAttribute(
          modifiedData,
          forTarget,
          targetUid,
          // This change the dispatched type
          // either 'EDIT_ATTRIBUTE' or 'ADD_ATTRIBUTE' in the DataManagerProvider
          actionType === "edit",
          // This is for the edit part
          initialData,
          // Passing true will add the component to the components object
          // This way we can add fields to the added component (if it wasn't there already)
          true
        );
        if (shouldContinue) {
          onNavigateToChooseAttributeModal({
            forTarget,
            targetUid
          });
        } else {
          onCloseModal();
        }
      } else if (isCreatingAttribute && isCreatingComponentFromAView) {
        if (isInFirstComponentStep) {
          trackUsage("willCreateComponentFromAttributesModal");
          dispatch({
            type: RESET_PROPS_AND_SAVE_CURRENT_DATA,
            forTarget
          });
          onNavigateToCreateComponentStep2();
          return;
        }
        const { category, type, ...rest } = componentToCreate;
        const componentUid = createComponentUid(componentToCreate.displayName, category);
        createSchema(
          // Component data
          rest,
          // Type will always be component
          // It will dispatch the CREATE_COMPONENT_SCHEMA action
          // So the component will be added in the main components object
          // This might not be needed if we don't allow navigation between entries while editing
          type,
          componentUid,
          category,
          // This will add the created component in the datamanager modifiedData components key
          // Like explained above we will be able to modify the created component structure
          isCreatingComponentFromAView
        );
        addAttribute(modifiedData, forTarget, targetUid, false);
        dispatch({ type: RESET_PROPS });
        if (shouldContinue) {
          onNavigateToChooseAttributeModal({ forTarget: "components", targetUid: componentUid });
        } else {
          onCloseModal();
        }
        return;
      } else {
        if (isInFirstComponentStep) {
          if (isCreatingComponentFromAView) {
            const { category, type, ...rest } = modifiedData.componentToCreate;
            const componentUid = createComponentUid(
              modifiedData.componentToCreate.displayName,
              category
            );
            createSchema(
              // Component data
              rest,
              // Type will always be component
              // It will dispatch the CREATE_COMPONENT_SCHEMA action
              // So the component will be added in the main components object
              // This might not be needed if we don't allow navigation between entries while editing
              type,
              componentUid,
              category,
              // This will add the created component in the datamanager modifiedData components key
              // Like explained above we will be able to modify the created component structure
              isCreatingComponentFromAView
            );
            addCreatedComponentToDynamicZone(dynamicZoneTarget, [componentUid]);
            onNavigateToChooseAttributeModal({ forTarget: "components", targetUid: componentUid });
          } else {
            changeDynamicZoneComponents(dynamicZoneTarget, modifiedData.components);
            onCloseModal();
          }
        } else {
          console.error("This case is not handled");
        }
        return;
      }
      dispatch({
        type: RESET_PROPS
      });
    } catch (err) {
      const errors = getYupInnerErrors(err);
      dispatch({
        type: SET_ERRORS,
        errors
      });
    }
  };
  const handleConfirmClose = () => {
    const confirm = window.confirm(
      formatMessage({
        id: "window.confirm.close-modal.file",
        defaultMessage: "Are you sure? Your changes will be lost."
      })
    );
    if (confirm) {
      onCloseModal();
      dispatch({
        type: RESET_PROPS
      });
    }
  };
  const handleClosed = () => {
    if (!isEqual(modifiedData, initialData)) {
      handleConfirmClose();
    } else {
      onCloseModal();
      dispatch({
        type: RESET_PROPS
      });
    }
  };
  const sendAdvancedTabEvent = (tab) => {
    if (tab !== "advanced") {
      return;
    }
    if (isCreatingContentType) {
      trackUsage("didSelectContentTypeSettings");
      return;
    }
    if (forTarget === "contentType") {
      trackUsage("didSelectContentTypeFieldSettings");
    }
  };
  const sendButtonAddMoreFieldEvent = (shouldContinue) => {
    if (modalType === "attribute" && forTarget === "contentType" && attributeType !== "dynamiczone" && shouldContinue) {
      trackUsage("willAddMoreFieldToContentType");
    }
  };
  const shouldDisableAdvancedTab = () => {
    if (modalType === "editCategory") {
      return true;
    }
    if (modalType === "component") {
      return true;
    }
    if (has(modifiedData, "createComponent")) {
      return true;
    }
    return false;
  };
  const displayedAttributes = getAttributesToDisplay(
    forTarget,
    targetUid,
    // We need the nested components so we know when to remove the component option
    nestedComponents
  );
  if (!modalType) {
    return null;
  }
  const formToDisplay = get(forms, [modalType, "form"], {
    advanced: () => ({
      sections: []
    }),
    base: () => ({
      sections: []
    })
  });
  const isAddingAComponentToAnotherComponent = forTarget === "components" || forTarget === "component";
  const genericInputProps = {
    customInputs: {
      "allowed-types-select": AllowedTypesSelect,
      "boolean-radio-group": BooleanRadioGroup,
      "checkbox-with-number-field": CheckboxWithNumberField,
      "icon-picker": IconPicker,
      "content-type-radio-group": ContentTypeRadioGroup,
      "radio-group": CustomRadioGroup,
      relation: Relation,
      "select-category": SelectCategory,
      "select-component": SelectComponent,
      "select-components": SelectComponents,
      "select-default-boolean": BooleanDefaultValueSelect,
      "select-number": SelectNumber,
      "select-date": SelectDateType,
      "toggle-draft-publish": DraftAndPublishToggle,
      "text-plural": PluralName,
      "text-singular": SingularName,
      "textarea-enum": TextareaEnum,
      ...inputsFromPlugins
    },
    componentToCreate,
    dynamicZoneTarget,
    formErrors,
    isAddingAComponentToAnotherComponent,
    isCreatingComponentWhileAddingAField,
    mainBoxHeader: get(allDataSchema, [...pathToSchema, "schema", "displayName"], ""),
    modifiedData,
    naturePickerType: forTarget,
    isCreating,
    targetUid,
    forTarget
  };
  const advancedForm2 = formToDisplay.advanced({
    data: modifiedData,
    type: attributeType,
    step,
    actionType,
    attributes,
    extensions: ctbFormsAPI,
    forTarget,
    contentTypeSchema: allDataSchema.contentType || {},
    customField
  }).sections;
  const baseForm2 = formToDisplay.base({
    data: modifiedData,
    type: attributeType,
    step,
    actionType,
    attributes,
    extensions: ctbFormsAPI,
    forTarget,
    contentTypeSchema: allDataSchema.contentType || {},
    customField
  }).sections;
  const baseFormInputNames = getFormInputNames(baseForm2);
  const advancedFormInputNames = getFormInputNames(advancedForm2);
  const doesBaseFormHasError = Object.keys(formErrors).some(
    (key) => baseFormInputNames.includes(key)
  );
  const doesAdvancedFormHasError = Object.keys(formErrors).some(
    (key) => advancedFormInputNames.includes(key)
  );
  const schemaKind = get(contentTypes, [targetUid, "schema", "kind"]);
  const checkIsEditingFieldName = () => actionType === "edit" && attributes.every(({ name }) => name !== modifiedData?.name);
  const handleClickFinish = () => {
    if (checkIsEditingFieldName()) {
      trackUsage("didEditFieldNameOnContentType");
    }
  };
  return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: handleClosed, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsx(
      FormModalHeader,
      {
        actionType,
        attributeName,
        categoryName,
        contentTypeKind: kind,
        dynamicZoneTarget,
        modalType,
        forTarget,
        targetUid,
        attributeType,
        customFieldUid,
        showBackLink
      }
    ),
    isPickingAttribute && /* @__PURE__ */ jsx(
      AttributeOptions,
      {
        attributes: displayedAttributes,
        forTarget,
        kind: schemaKind || "collectionType"
      }
    ),
    !isPickingAttribute && /* @__PURE__ */ jsxs(FormComponent, { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(
        Tabs.Root,
        {
          variant: "simple",
          value: activeTab,
          onValueChange: (value) => {
            setActiveTab(value);
            sendAdvancedTabEvent(value);
          },
          hasError: doesBaseFormHasError ? "basic" : doesAdvancedFormHasError ? "advanced" : void 0,
          children: [
            /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
              /* @__PURE__ */ jsx(
                FormModalSubHeader,
                {
                  actionType,
                  forTarget,
                  kind,
                  step,
                  modalType,
                  attributeType,
                  attributeName,
                  customField
                }
              ),
              /* @__PURE__ */ jsxs(Tabs.List, { children: [
                /* @__PURE__ */ jsx(Tabs.Trigger, { value: "basic", children: formatMessage({
                  id: getTrad("popUpForm.navContainer.base"),
                  defaultMessage: "Basic settings"
                }) }),
                /* @__PURE__ */ jsx(Tabs.Trigger, { value: "advanced", disabled: shouldDisableAdvancedTab(), children: formatMessage({
                  id: getTrad("popUpForm.navContainer.advanced"),
                  defaultMessage: "Advanced settings"
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Divider, { marginBottom: 6 }),
            /* @__PURE__ */ jsx(Tabs.Content, { value: "basic", children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: /* @__PURE__ */ jsx(
              TabForm,
              {
                form: baseForm2,
                formErrors,
                genericInputProps,
                modifiedData,
                onChange: handleChange
              }
            ) }) }),
            /* @__PURE__ */ jsx(Tabs.Content, { value: "advanced", children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: /* @__PURE__ */ jsx(
              TabForm,
              {
                form: advancedForm2,
                formErrors,
                genericInputProps,
                modifiedData,
                onChange: handleChange
              }
            ) }) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: handleClosed, children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
        /* @__PURE__ */ jsx(
          FormModalEndActions,
          {
            deleteCategory,
            deleteContentType: deleteData,
            deleteComponent: deleteData,
            categoryName: initialData.name,
            isAttributeModal: modalType === "attribute",
            isCustomFieldModal: modalType === "customField",
            isComponentToDzModal: modalType === "addComponentToDynamicZone",
            isComponentAttribute: attributeType === "component",
            isComponentModal: modalType === "component",
            isContentTypeModal: modalType === "contentType",
            isCreatingComponent: actionType === "create",
            isCreatingDz: actionType === "create",
            isCreatingComponentAttribute: modifiedData.createComponent || false,
            isCreatingComponentInDz: modifiedData.createComponent || false,
            isCreatingComponentWhileAddingAField,
            isCreatingContentType: actionType === "create",
            isEditingAttribute: actionType === "edit",
            isDzAttribute: attributeType === "dynamiczone",
            isEditingCategory: modalType === "editCategory",
            isInFirstComponentStep: step === "1",
            onSubmitAddComponentAttribute: handleSubmit,
            onSubmitAddComponentToDz: handleSubmit,
            onSubmitCreateComponent: handleSubmit,
            onSubmitCreateContentType: handleSubmit,
            onSubmitCreateDz: handleSubmit,
            onSubmitEditAttribute: handleSubmit,
            onSubmitEditCategory: handleSubmit,
            onSubmitEditComponent: handleSubmit,
            onSubmitEditContentType: handleSubmit,
            onSubmitEditCustomFieldAttribute: handleSubmit,
            onSubmitEditDz: handleSubmit,
            onClickFinish: handleClickFinish
          }
        )
      ] })
    ] })
  ] }) });
};
const dataManagerProviderDomain = () => (state) => state[`${pluginId}_dataManagerProvider`] || initialState$1;
const makeSelectDataManagerProvider = () => createSelector(dataManagerProviderDomain(), (substate) => {
  return substate;
});
const getCreatedAndModifiedComponents = (allComponents, initialComponents) => {
  const componentUIDsToReturn = Object.keys(allComponents).filter((compoUid) => {
    const currentCompo = get(allComponents, compoUid, {});
    const initialCompo = get(initialComponents, compoUid, {});
    const hasComponentBeenCreated = get(currentCompo, ["isTemporary"], false);
    const hasComponentBeenModified = !isEqual(currentCompo, initialCompo);
    return hasComponentBeenCreated || hasComponentBeenModified;
  });
  return makeUnique(componentUIDsToReturn);
};
const formatComponent = (component, mainDataUID) => {
  const formattedAttributes = formatAttributes(
    get(component, "schema.attributes", []),
    mainDataUID
  );
  const compoUID = get(component, "isTemporary", false) ? { tmpUID: component.uid } : { uid: component.uid };
  const formattedComponent = Object.assign(
    {},
    compoUID,
    { category: component.category },
    // Omit the attributes since we want to format them
    omit(component.schema, "attributes"),
    // Add the formatted attributes
    { attributes: formattedAttributes }
  );
  return formattedComponent;
};
const formatMainDataType = (data, isComponent = false) => {
  const mainDataUID = get(data, "uid", null);
  const formattedAttributes = formatAttributes(get(data, "schema.attributes", []), mainDataUID);
  const initObj = isComponent ? { category: get(data, "category", "") } : {};
  const formattedContentType = Object.assign(initObj, omit(data.schema, "attributes"), {
    attributes: formattedAttributes
  });
  delete formattedContentType.uid;
  delete formattedContentType.isTemporary;
  delete formattedContentType.visible;
  delete formattedContentType.restrictRelationsTo;
  return formattedContentType;
};
const formatAttributes = (attributes, mainDataUID) => {
  return attributes.reduce((acc, { name, ...rest }) => {
    const currentAttribute = rest;
    const hasARelationWithMainDataUID = currentAttribute.target === mainDataUID;
    const isRelationType = currentAttribute.type === "relation";
    const currentTargetAttribute = get(currentAttribute, "targetAttribute", null);
    if (!hasARelationWithMainDataUID) {
      if (isRelationType) {
        const relationAttr = Object.assign({}, currentAttribute, {
          targetAttribute: formatRelationTargetAttribute(currentTargetAttribute)
        });
        acc[name] = removeNullKeys(relationAttr);
      } else {
        acc[name] = removeNullKeys(currentAttribute);
      }
    }
    if (hasARelationWithMainDataUID) {
      const target = currentAttribute.target;
      const formattedRelationAttribute = Object.assign({}, currentAttribute, {
        target,
        targetAttribute: formatRelationTargetAttribute(currentTargetAttribute)
      });
      acc[name] = removeNullKeys(formattedRelationAttribute);
    }
    if (currentAttribute.customField) {
      const customFieldAttribute = { ...currentAttribute, type: "customField" };
      acc[name] = removeNullKeys(customFieldAttribute);
    }
    return acc;
  }, {});
};
const formatRelationTargetAttribute = (targetAttribute) => targetAttribute === "-" ? null : targetAttribute;
const removeNullKeys = (obj) => Object.keys(obj).reduce((acc, current) => {
  if (obj[current] !== null && current !== "plugin") {
    acc[current] = obj[current];
  }
  return acc;
}, {});
const getComponentsToPost = (allComponents, initialComponents, mainDataUID) => {
  const componentsToFormat = getCreatedAndModifiedComponents(allComponents, initialComponents);
  const formattedComponents = componentsToFormat.map((compoUID) => {
    const currentCompo = get(allComponents, compoUID, {});
    const formattedComponent = formatComponent(currentCompo, mainDataUID);
    return formattedComponent;
  });
  return formattedComponents;
};
const sortContentType = (types) => sortBy(
  Object.keys(types).map((uid) => ({
    visible: types[uid].schema.visible,
    name: uid,
    title: types[uid].schema.displayName,
    plugin: types[uid].plugin || null,
    uid,
    to: `/plugins/${pluginId}/content-types/${uid}`,
    kind: types[uid].schema.kind,
    restrictRelationsTo: types[uid].schema.restrictRelationsTo
  })).filter((obj) => obj !== null),
  (obj) => camelCase(obj.title)
);
const createDataObject = (arr) => arr.reduce((acc, current) => {
  acc[current.uid] = current;
  return acc;
}, {});
const createModifiedDataSchema = (contentTypeSchema, retrievedComponents, allComponentsSchema, isInContentTypeView) => {
  const componentsAssociatedToContentType = retrievedComponents.reduce((acc, current) => {
    const componentSchema = get(allComponentsSchema, current, {});
    acc[current] = componentSchema;
    return acc;
  }, {});
  const keyName = isInContentTypeView ? "contentType" : "component";
  const schema = {
    [keyName]: contentTypeSchema,
    components: componentsAssociatedToContentType
  };
  return schema;
};
const formatSchemas = (schemas) => {
  return Object.keys(schemas).reduce((acc, current) => {
    const schema = schemas[current].schema;
    acc[current] = {
      ...schemas[current],
      schema: { ...schema, attributes: toAttributesArray(schema.attributes) }
    };
    return acc;
  }, {});
};
const toAttributesArray = (attributes) => {
  return Object.keys(attributes).reduce((acc, current) => {
    acc.push({ ...attributes[current], name: current });
    return acc;
  }, []);
};
const retrieveComponentsThatHaveComponents = (allComponents) => {
  const componentsThatHaveNestedComponents = Object.keys(allComponents).reduce(
    (acc, current) => {
      const currentComponent = get(allComponents, [current]);
      const compoWithChildren = getComponentWithChildComponents(currentComponent);
      if (compoWithChildren.childComponents.length > 0) {
        acc.push(compoWithChildren);
      }
      return acc;
    },
    []
  );
  return componentsThatHaveNestedComponents;
};
const getComponentWithChildComponents = (component) => {
  const attributes = get(component, ["schema", "attributes"], []);
  return {
    component: component.uid,
    childComponents: attributes.filter((attribute) => {
      const { type } = attribute;
      return type === "component";
    }).map((attribute) => {
      return {
        component: attribute.component
      };
    })
  };
};
const retrieveNestedComponents = (appComponents) => {
  const nestedComponents = Object.keys(appComponents).reduce((acc, current) => {
    const componentAttributes = appComponents?.[current]?.schema?.attributes ?? [];
    const currentComponentNestedCompos = getComponentsNestedWithinComponent(
      componentAttributes,
      current
    );
    return [...acc, ...currentComponentNestedCompos];
  }, []);
  return mergeComponents(nestedComponents);
};
const getComponentsNestedWithinComponent = (componentAttributes, parentCompoUid) => {
  return componentAttributes.reduce((acc, current) => {
    const { type, component } = current;
    if (type === "component") {
      acc.push({
        component,
        parentCompoUid
      });
    }
    return acc;
  }, []);
};
const mergeComponents = (originalComponents) => {
  const componentMap = /* @__PURE__ */ new Map();
  originalComponents.forEach(({ component, parentCompoUid }) => {
    if (!componentMap.has(component)) {
      componentMap.set(component, /* @__PURE__ */ new Set());
    }
    componentMap.get(component).add(parentCompoUid);
  });
  const transformedComponents = Array.from(componentMap.entries()).map(
    ([component, parentCompoUidSet]) => ({
      component,
      uidsOfAllParents: Array.from(parentCompoUidSet)
    })
  );
  return transformedComponents;
};
const retrieveSpecificInfoFromComponents = (allComponents, keysToRetrieve) => {
  const allData = Object.keys(allComponents).map((compo) => {
    return get(allComponents, [compo, ...keysToRetrieve], "");
  });
  return makeUnique(allData);
};
const SERVER_HAS_NOT_BEEN_KILLED_MESSAGE = "did-not-kill-server";
const SERVER_HAS_BEEN_KILLED_MESSAGE = "server is down";
function serverRestartWatcher(response, didShutDownServer) {
  return new Promise((resolve) => {
    fetch(`${window.strapi.backendURL}/_health`, {
      method: "HEAD",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Keep-Alive": "false"
      }
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error(SERVER_HAS_BEEN_KILLED_MESSAGE);
      }
      if (!didShutDownServer) {
        throw new Error(SERVER_HAS_NOT_BEEN_KILLED_MESSAGE);
      }
      resolve(response);
    }).catch((err) => {
      setTimeout(() => {
        return serverRestartWatcher(
          response,
          err.message !== SERVER_HAS_NOT_BEEN_KILLED_MESSAGE
        ).then(resolve);
      }, 100);
    });
  });
}
const validateSchema = (schema) => {
  const dynamicZoneAttributes = Object.values(schema.attributes).filter(
    (attribute) => attribute.type === "dynamiczone"
  );
  return dynamicZoneAttributes.every(
    (attribute) => Array.isArray(attribute.components) && attribute.components.length > 0
  );
};
const DataManagerProvider = ({ children }) => {
  const dispatch = useDispatch();
  const {
    components,
    contentTypes,
    isLoading,
    isLoadingForDataToBeSet,
    initialData,
    modifiedData,
    reservedNames
  } = useSelector(makeSelectDataManagerProvider());
  const { toggleNotification } = useNotification();
  const { lockAppWithAutoreload, unlockAppWithAutoreload } = useAutoReloadOverlayBlocker();
  const { setCurrentStep, setStepState } = useGuidedTour("DataManagerProvider", (state) => state);
  const getPlugin = useStrapiApp("DataManagerProvider", (state) => state.getPlugin);
  const plugin = getPlugin(pluginId);
  const autoReload = useAppInfo("DataManagerProvider", (state) => state.autoReload);
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const refetchPermissions = useAuth("DataManagerProvider", (state) => state.refetchPermissions);
  const { pathname } = useLocation();
  const { onCloseModal } = useFormModalNavigation();
  const contentTypeMatch = useMatch(`/plugins/${pluginId}/content-types/:uid`);
  const componentMatch = useMatch(
    `/plugins/${pluginId}/component-categories/:categoryUid/:componentUid`
  );
  const fetchClient = useFetchClient();
  const { put, post, del } = fetchClient;
  const formatMessageRef = useRef();
  formatMessageRef.current = formatMessage;
  const isInDevelopmentMode = autoReload;
  const isInContentTypeView = contentTypeMatch !== null;
  const firstKeyToMainSchema = isInContentTypeView ? "contentType" : "component";
  const currentUid = isInContentTypeView ? get(contentTypeMatch, "params.uid", null) : get(componentMatch, "params.componentUid", null);
  const getDataRef = useRef();
  const endPoint = isInContentTypeView ? "content-types" : "components";
  getDataRef.current = async () => {
    try {
      const [
        {
          data: { data: componentsArray }
        },
        {
          data: { data: contentTypesArray }
        },
        { data: reservedNames2 }
      ] = await Promise.all(
        ["components", "content-types", "reserved-names"].map((endPoint2) => {
          return fetchClient.get(`/${pluginId}/${endPoint2}`);
        })
      );
      const components2 = createDataObject(componentsArray);
      const formattedComponents = formatSchemas(components2);
      const contentTypes2 = createDataObject(contentTypesArray);
      const formattedContentTypes = formatSchemas(contentTypes2);
      dispatch({
        type: GET_DATA_SUCCEEDED,
        components: formattedComponents,
        contentTypes: formattedContentTypes,
        reservedNames: reservedNames2
      });
    } catch (err) {
      console.error({ err });
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  useEffect(() => {
    getDataRef.current();
    return () => {
      dispatch({ type: RELOAD_PLUGIN });
    };
  }, []);
  useEffect(() => {
    if (!isLoading && currentUid) {
      setModifiedData();
    }
  }, [isLoading, pathname, currentUid]);
  useEffect(() => {
    if (!autoReload) {
      toggleNotification({
        type: "info",
        message: formatMessage({ id: getTrad("notification.info.autoreaload-disable") })
      });
    }
  }, [autoReload, toggleNotification]);
  const addAttribute = (attributeToSet, forTarget, targetUid, isEditing = false, initialAttribute, shouldAddComponentToData = false) => {
    const actionType = isEditing ? EDIT_ATTRIBUTE : ADD_ATTRIBUTE;
    dispatch({
      type: actionType,
      attributeToSet,
      forTarget,
      targetUid,
      initialAttribute,
      shouldAddComponentToData
    });
  };
  const addCustomFieldAttribute = ({
    attributeToSet,
    forTarget,
    targetUid,
    initialAttribute
  }) => {
    dispatch({
      type: ADD_CUSTOM_FIELD_ATTRIBUTE,
      attributeToSet,
      forTarget,
      targetUid,
      initialAttribute
    });
  };
  const editCustomFieldAttribute = ({
    attributeToSet,
    forTarget,
    targetUid,
    initialAttribute
  }) => {
    dispatch({
      type: EDIT_CUSTOM_FIELD_ATTRIBUTE,
      attributeToSet,
      forTarget,
      targetUid,
      initialAttribute
    });
  };
  const addCreatedComponentToDynamicZone = (dynamicZoneTarget, componentsToAdd) => {
    dispatch({
      type: ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE,
      dynamicZoneTarget,
      componentsToAdd
    });
  };
  const createSchema = (data, schemaType, uid, componentCategory, shouldAddComponentToData = false) => {
    const type = schemaType === "contentType" ? CREATE_SCHEMA : CREATE_COMPONENT_SCHEMA;
    dispatch({
      type,
      data,
      componentCategory,
      schemaType,
      uid,
      shouldAddComponentToData
    });
  };
  const changeDynamicZoneComponents = (dynamicZoneTarget, newComponents) => {
    dispatch({
      type: CHANGE_DYNAMIC_ZONE_COMPONENTS,
      dynamicZoneTarget,
      newComponents
    });
  };
  const removeAttribute = (mainDataKey, attributeToRemoveName, componentUid = "") => {
    const type = mainDataKey === "components" ? REMOVE_FIELD_FROM_DISPLAYED_COMPONENT : REMOVE_FIELD;
    if (mainDataKey === "contentType") {
      trackUsage("willDeleteFieldOfContentType");
    }
    dispatch({
      type,
      mainDataKey,
      attributeToRemoveName,
      componentUid
    });
  };
  const deleteCategory = async (categoryUid) => {
    try {
      const requestURL = `/${pluginId}/component-categories/${categoryUid}`;
      const userConfirm = window.confirm(
        formatMessage({
          id: getTrad("popUpWarning.bodyMessage.category.delete")
        })
      );
      onCloseModal();
      if (userConfirm) {
        lockAppWithAutoreload?.();
        await del(requestURL);
        await serverRestartWatcher(true);
        unlockAppWithAutoreload?.();
        await updatePermissions();
      }
    } catch (err) {
      console.error({ err });
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    } finally {
      unlockAppWithAutoreload?.();
    }
  };
  const deleteData = async () => {
    try {
      const requestURL = `/${pluginId}/${endPoint}/${currentUid}`;
      const isTemporary = get(modifiedData, [firstKeyToMainSchema, "isTemporary"], false);
      const userConfirm = window.confirm(
        formatMessage({
          id: getTrad(
            `popUpWarning.bodyMessage.${isInContentTypeView ? "contentType" : "component"}.delete`
          )
        })
      );
      onCloseModal();
      if (userConfirm) {
        if (isTemporary) {
          dispatch({ type: DELETE_NOT_SAVED_TYPE });
          return;
        }
        lockAppWithAutoreload?.();
        await del(requestURL);
        await serverRestartWatcher(true);
        await unlockAppWithAutoreload?.();
        await updatePermissions();
      }
    } catch (err) {
      console.error({ err });
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    } finally {
      unlockAppWithAutoreload?.();
    }
  };
  const editCategory = async (categoryUid, body) => {
    try {
      const requestURL = `/${pluginId}/component-categories/${categoryUid}`;
      onCloseModal();
      lockAppWithAutoreload?.();
      await put(requestURL, body);
      await serverRestartWatcher(true);
      await unlockAppWithAutoreload?.();
      await updatePermissions();
    } catch (err) {
      console.error({ err });
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    } finally {
      unlockAppWithAutoreload?.();
    }
  };
  const getAllComponentsThatHaveAComponentInTheirAttributes = () => {
    const allCompos = Object.assign({}, components, modifiedData.components);
    if (!isInContentTypeView) {
      const currentEditedCompo = get(modifiedData, "component", {});
      set(allCompos, get(currentEditedCompo, ["uid"], ""), currentEditedCompo);
    }
    const composWithCompos = retrieveComponentsThatHaveComponents(allCompos);
    return composWithCompos;
  };
  const getAllNestedComponents = () => {
    const appNestedCompo = retrieveNestedComponents(components);
    return appNestedCompo;
  };
  const removeComponentFromDynamicZone = (dzName, componentToRemoveIndex) => {
    dispatch({
      type: REMOVE_COMPONENT_FROM_DYNAMIC_ZONE,
      dzName,
      componentToRemoveIndex
    });
  };
  const setModifiedData = () => {
    const currentSchemas = isInContentTypeView ? contentTypes : components;
    const schemaToSet = get(currentSchemas, currentUid ?? "", {
      schema: { attributes: [] }
    });
    const retrievedComponents = retrieveComponentsFromSchema(
      schemaToSet.schema.attributes,
      components
    );
    const newSchemaToSet = createModifiedDataSchema(
      schemaToSet,
      retrievedComponents,
      components,
      isInContentTypeView
    );
    const hasJustCreatedSchema = get(schemaToSet, "isTemporary", false) && size(get(schemaToSet, "schema.attributes", [])) === 0;
    dispatch({
      type: SET_MODIFIED_DATA,
      schemaToSet: newSchemaToSet,
      hasJustCreatedSchema
    });
  };
  const shouldRedirect = useMemo(() => {
    const dataSet = isInContentTypeView ? contentTypes : components;
    if (currentUid === "create-content-type") {
      return false;
    }
    return !Object.keys(dataSet).includes(currentUid || "") && !isLoading;
  }, [components, contentTypes, currentUid, isInContentTypeView, isLoading]);
  const redirectEndpoint = useMemo(() => {
    const allowedEndpoints = Object.keys(contentTypes).filter((uid) => get(contentTypes, [uid, "schema", "visible"], true)).sort();
    return get(allowedEndpoints, "0", "create-content-type");
  }, [contentTypes]);
  if (shouldRedirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: `/plugins/${pluginId}/content-types/${redirectEndpoint}` });
  }
  const submitData = async (additionalContentTypeData) => {
    try {
      const isCreating = get(modifiedData, [firstKeyToMainSchema, "isTemporary"], false);
      const body = {
        components: getComponentsToPost(
          modifiedData.components,
          components,
          currentUid
        )
      };
      if (isInContentTypeView) {
        const PluginForms = plugin?.apis?.forms;
        const contentType = PluginForms.mutateContentTypeSchema(
          {
            ...formatMainDataType(modifiedData.contentType),
            ...additionalContentTypeData
          },
          initialData.contentType
        );
        const isValidSchema = validateSchema(contentType);
        if (!isValidSchema) {
          toggleNotification({
            type: "danger",
            message: formatMessage({
              id: getTrad("notification.error.dynamiczone-min.validation"),
              defaultMessage: "At least one component is required in a dynamic zone to be able to save a content type"
            })
          });
          return;
        }
        body.contentType = contentType;
        trackUsage("willSaveContentType");
      } else {
        body.component = formatMainDataType(modifiedData.component, true);
        trackUsage("willSaveComponent");
      }
      lockAppWithAutoreload?.();
      const baseURL = `/${pluginId}/${endPoint}`;
      const requestURL = isCreating ? baseURL : `${baseURL}/${currentUid}`;
      if (isCreating) {
        await post(requestURL, body);
      } else {
        await put(requestURL, body);
      }
      if (isCreating && (initialData.contentType?.schema.kind === "collectionType" || initialData.contentType?.schema.kind === "singleType")) {
        setStepState("contentTypeBuilder.success", true);
        trackUsage("didCreateGuidedTourCollectionType");
        setCurrentStep(null);
      }
      if (isInContentTypeView) {
        trackUsage("didSaveContentType");
        const oldName = get(body, ["contentType", "schema", "name"], "");
        const newName = get(initialData, ["contentType", "schema", "name"], "");
        if (!isCreating && oldName !== newName) {
          trackUsage("didEditNameOfContentType");
        }
      } else {
        trackUsage("didSaveComponent");
      }
      await serverRestartWatcher(true);
      unlockAppWithAutoreload?.();
      await getDataRef.current();
      dispatch({ type: UPDATE_INITIAL_STATE });
      await updatePermissions();
    } catch (err) {
      if (!isInContentTypeView) {
        trackUsage("didNotSaveComponent");
      }
      console.error({ err: err.response });
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    } finally {
      unlockAppWithAutoreload?.();
    }
  };
  const updatePermissions = async () => {
    await refetchPermissions();
  };
  const updateSchema = (data, schemaType, componentUID) => {
    dispatch({
      type: UPDATE_SCHEMA,
      data,
      schemaType,
      uid: componentUID
    });
  };
  return /* @__PURE__ */ jsx(
    DataManagerContext.Provider,
    {
      value: {
        addAttribute,
        addCustomFieldAttribute,
        addCreatedComponentToDynamicZone,
        allComponentsCategories: retrieveSpecificInfoFromComponents(components, ["category"]),
        changeDynamicZoneComponents,
        components,
        componentsGroupedByCategory: groupBy(components, "category"),
        componentsThatHaveOtherComponentInTheirAttributes: getAllComponentsThatHaveAComponentInTheirAttributes(),
        contentTypes,
        createSchema,
        deleteCategory,
        deleteData,
        editCategory,
        editCustomFieldAttribute,
        isInDevelopmentMode,
        initialData,
        isInContentTypeView,
        modifiedData,
        nestedComponents: getAllNestedComponents(),
        removeAttribute,
        removeComponentFromDynamicZone,
        reservedNames,
        setModifiedData,
        sortedContentTypesList: sortContentType(contentTypes),
        submitData,
        updateSchema
      },
      children: isLoadingForDataToBeSet ? /* @__PURE__ */ jsx(Page.Loading, {}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
        children,
        isInDevelopmentMode && /* @__PURE__ */ jsx(FormModal, {})
      ] })
    }
  );
};
const DataManagerProvider$1 = memo(DataManagerProvider);
const INITIAL_STATE_DATA = {
  actionType: null,
  attributeName: null,
  attributeType: null,
  categoryName: null,
  dynamicZoneTarget: null,
  forTarget: null,
  modalType: null,
  isOpen: false,
  showBackLink: false,
  kind: null,
  step: null,
  targetUid: null,
  customFieldUid: null,
  activeTab: "basic"
};
const FormModalNavigationProvider = ({ children }) => {
  const [state, setFormModalNavigationState] = React.useState(INITIAL_STATE_DATA);
  const { trackUsage } = useTracking();
  const onClickSelectCustomField = ({ attributeType, customFieldUid }) => {
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        actionType: "create",
        modalType: "customField",
        attributeType,
        customFieldUid,
        activeTab: "basic"
      };
    });
  };
  const onClickSelectField = ({ attributeType, step }) => {
    if (state.forTarget === "contentType") {
      trackUsage("didSelectContentTypeFieldType", { type: attributeType });
    }
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        actionType: "create",
        modalType: "attribute",
        step,
        attributeType,
        showBackLink: true,
        activeTab: "basic"
      };
    });
  };
  const onOpenModalAddComponentsToDZ = ({ dynamicZoneTarget, targetUid }) => {
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        dynamicZoneTarget,
        targetUid,
        modalType: "addComponentToDynamicZone",
        forTarget: "contentType",
        step: "1",
        actionType: "edit",
        isOpen: true
      };
    });
  };
  const onOpenModalAddField = ({ forTarget, targetUid }) => {
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        actionType: "create",
        forTarget,
        targetUid,
        modalType: "chooseAttribute",
        isOpen: true,
        showBackLink: false,
        activeTab: "basic"
      };
    });
  };
  const onOpenModalCreateSchema = (nextState) => {
    setFormModalNavigationState((prevState) => {
      return { ...prevState, ...nextState, isOpen: true, activeTab: "basic" };
    });
  };
  const onOpenModalEditCategory = (categoryName) => {
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        categoryName,
        actionType: "edit",
        modalType: "editCategory",
        isOpen: true,
        activeTab: "basic"
      };
    });
  };
  const onOpenModalEditCustomField = ({
    forTarget,
    targetUid,
    attributeName,
    attributeType,
    customFieldUid
  }) => {
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        modalType: "customField",
        customFieldUid,
        actionType: "edit",
        forTarget,
        targetUid,
        attributeName,
        attributeType,
        isOpen: true,
        activeTab: "basic"
      };
    });
  };
  const onOpenModalEditField = ({
    forTarget,
    targetUid,
    attributeName,
    attributeType,
    step
  }) => {
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        modalType: "attribute",
        actionType: "edit",
        forTarget,
        targetUid,
        attributeName,
        attributeType,
        step,
        isOpen: true
      };
    });
  };
  const onOpenModalEditSchema = ({ modalType, forTarget, targetUid, kind }) => {
    setFormModalNavigationState((prevState) => {
      return {
        ...prevState,
        modalType,
        actionType: "edit",
        forTarget,
        targetUid,
        kind,
        isOpen: true,
        activeTab: "basic"
      };
    });
  };
  const onCloseModal = () => {
    setFormModalNavigationState(INITIAL_STATE_DATA);
  };
  const onNavigateToChooseAttributeModal = ({ forTarget, targetUid }) => {
    setFormModalNavigationState((prev) => {
      return {
        ...prev,
        forTarget,
        targetUid,
        modalType: "chooseAttribute",
        activeTab: "basic"
      };
    });
  };
  const onNavigateToCreateComponentStep2 = () => {
    setFormModalNavigationState((prev) => {
      return {
        ...prev,
        attributeType: "component",
        modalType: "attribute",
        step: "2",
        activeTab: "basic"
      };
    });
  };
  const onNavigateToAddCompoToDZModal = ({ dynamicZoneTarget }) => {
    setFormModalNavigationState((prev) => {
      return {
        ...prev,
        dynamicZoneTarget,
        modalType: "addComponentToDynamicZone",
        actionType: "create",
        step: "1",
        attributeType: null,
        attributeName: null,
        activeTab: "basic"
      };
    });
  };
  const setActiveTab = (value) => {
    setFormModalNavigationState((prev) => {
      return {
        ...prev,
        activeTab: value
      };
    });
  };
  return /* @__PURE__ */ jsx(
    FormModalNavigationContext.Provider,
    {
      value: {
        ...state,
        onClickSelectField,
        onClickSelectCustomField,
        onCloseModal,
        onNavigateToChooseAttributeModal,
        onNavigateToAddCompoToDZModal,
        onOpenModalAddComponentsToDZ,
        onNavigateToCreateComponentStep2,
        onOpenModalAddField,
        onOpenModalCreateSchema,
        onOpenModalEditCategory,
        onOpenModalEditField,
        onOpenModalEditCustomField,
        onOpenModalEditSchema,
        setFormModalNavigationState,
        setActiveTab
      },
      children
    }
  );
};
const ListView$1 = lazy(() => import("./ListView-DPzmWFi5.mjs"));
const RecursivePath = () => {
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Page.Loading, {}), children: /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(Route, { path: `/:componentUid`, element: /* @__PURE__ */ jsx(ListView$1, {}) }) }) });
};
const ListView = lazy(() => import("./ListView-DPzmWFi5.mjs"));
const App = () => {
  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: `${pluginId}.plugin.name`,
    defaultMessage: "Content Types Builder"
  });
  const startSection = useGuidedTour("App", (state) => state.startSection);
  const startSectionRef = useRef(startSection);
  useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("contentTypeBuilder");
    }
  }, []);
  return /* @__PURE__ */ jsxs(Page.Protect, { permissions: PERMISSIONS.main, children: [
    /* @__PURE__ */ jsx(Page.Title, { children: title }),
    /* @__PURE__ */ jsx(AutoReloadOverlayBlockerProvider, { children: /* @__PURE__ */ jsx(FormModalNavigationProvider, { children: /* @__PURE__ */ jsx(DataManagerProvider$1, { children: /* @__PURE__ */ jsx(Layouts.Root, { sideNav: /* @__PURE__ */ jsx(ContentTypeBuilderNav, {}), children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Page.Loading, {}), children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "content-types/:uid", element: /* @__PURE__ */ jsx(ListView, {}) }),
      /* @__PURE__ */ jsx(Route, { path: `component-categories/:categoryUid/*`, element: /* @__PURE__ */ jsx(RecursivePath, {}) })
    ] }) }) }) }) }) })
  ] });
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
export {
  AttributeIcon as A,
  COMPONENT_ICONS as C,
  useFormModalNavigation as a,
  getTrad as g,
  index as i,
  useDataManager as u
};
//# sourceMappingURL=index-OzcYkX5o.mjs.map
