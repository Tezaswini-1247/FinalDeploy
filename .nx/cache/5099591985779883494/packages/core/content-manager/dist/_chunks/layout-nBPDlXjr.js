"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const reactDnd = require("react-dnd");
const CardDragPreview = require("./CardDragPreview-C0QyJgRA.js");
const Icons = require("@strapi/icons");
const styledComponents = require("styled-components");
const index = require("./index-BN1pPa5v.js");
const Relations = require("./Relations-CkECnBOd.js");
const qs = require("qs");
const hooks = require("./hooks-BAaaKPS_.js");
const useDragAndDrop = require("./useDragAndDrop-BMtgCYzL.js");
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
function getStyle(initialOffset, currentOffset, mouseOffset) {
  if (!initialOffset || !currentOffset || !mouseOffset) {
    return { display: "none" };
  }
  const { x, y } = mouseOffset;
  return {
    transform: `translate(${x}px, ${y}px)`
  };
}
const DragLayer = ({ renderItem }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, mouseOffset } = reactDnd.useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      mouseOffset: monitor.getClientOffset()
    })
  );
  if (!isDragging) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      height: "100%",
      left: 0,
      position: "fixed",
      pointerEvents: "none",
      top: 0,
      zIndex: 100,
      width: "100%",
      children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { style: getStyle(initialOffset, currentOffset, mouseOffset), children: renderItem({ type: itemType, item }) })
    }
  );
};
const ComponentDragPreview = ({ displayedValue }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      background: "neutral0",
      borderColor: "neutral200",
      justifyContent: "space-between",
      gap: 3,
      padding: 3,
      width: "30rem",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ToggleButton, { type: "button", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 6, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            DropdownIconWrapper,
            {
              alignItems: "center",
              justifyContent: "center",
              background: "neutral200",
              height: "3.2rem",
              width: "3.2rem",
              children: /* @__PURE__ */ jsxRuntime.jsx(Icons.CaretDown, {})
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { maxWidth: "15rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral700", ellipsis: true, children: displayedValue }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { withTooltip: false, label: "", variant: "ghost", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {}) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { withTooltip: false, label: "", variant: "ghost", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {}) })
        ] })
      ]
    }
  );
};
const DropdownIconWrapper = styledComponents.styled(designSystem.Flex)`
  border-radius: 50%;

  svg {
    height: 0.6rem;
    width: 1.1rem;
    > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
const ToggleButton = styledComponents.styled.button`
  border: none;
  background: transparent;
  display: block;
  width: 100%;
  text-align: unset;
  padding: 0;
`;
const RelationDragPreview = ({ status, displayedValue, width }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { style: { width }, children: /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingRight: 4,
      hasRadius: true,
      borderWidth: 1,
      background: "neutral0",
      borderColor: "neutral200",
      justifyContent: "space-between",
      gap: 4,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(Relations.FlexWrapper, { gap: 1, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { withTooltip: false, label: "", variant: "ghost", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {}) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { width: "100%", minWidth: 0, justifyContent: "space-between", children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { minWidth: 0, paddingTop: 1, paddingBottom: 1, paddingRight: 4, children: /* @__PURE__ */ jsxRuntime.jsx(Relations.LinkEllipsis, { href: "", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "primary600", ellipsis: true, children: displayedValue }) }) }),
            status ? /* @__PURE__ */ jsxRuntime.jsx(index.DocumentStatus, { status }) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(Relations.DisconnectButton, { type: "button", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cross, { width: "12px" }) })
      ]
    }
  ) });
};
const SubNavLinkCustom = styledComponents.styled(designSystem.SubNavLink)`
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
const LeftMenu = () => {
  const [search, setSearch] = React__namespace.useState("");
  const [{ query }] = strapiAdmin.useQueryParams();
  const { formatMessage, locale } = reactIntl.useIntl();
  const collectionTypeLinks = hooks.useTypedSelector(
    (state) => state["content-manager"].app.collectionTypeLinks
  );
  const singleTypeLinks = hooks.useTypedSelector((state) => state["content-manager"].app.singleTypeLinks);
  const { schemas } = index.useContentTypeSchema();
  const { startsWith } = designSystem.useFilter(locale, {
    sensitivity: "base"
  });
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const menu = React__namespace.useMemo(
    () => [
      {
        id: "collectionTypes",
        title: formatMessage({
          id: index.getTranslation("components.LeftMenu.collection-types"),
          defaultMessage: "Collection Types"
        }),
        searchable: true,
        links: collectionTypeLinks
      },
      {
        id: "singleTypes",
        title: formatMessage({
          id: index.getTranslation("components.LeftMenu.single-types"),
          defaultMessage: "Single Types"
        }),
        searchable: true,
        links: singleTypeLinks
      }
    ].map((section) => ({
      ...section,
      links: section.links.filter((link) => startsWith(link.title, search)).sort((a, b) => formatter.compare(a.title, b.title)).map((link) => {
        return {
          ...link,
          title: formatMessage({ id: link.title, defaultMessage: link.title })
        };
      })
    })),
    [collectionTypeLinks, search, singleTypeLinks, startsWith, formatMessage, formatter]
  );
  const handleClear = () => {
    setSearch("");
  };
  const handleChangeSearch = ({ target: { value } }) => {
    setSearch(value);
  };
  const label = formatMessage({
    id: index.getTranslation("header.name"),
    defaultMessage: "Content Manager"
  });
  const getPluginsParamsForLink = (link) => {
    const schema = schemas.find((schema2) => schema2.uid === link.uid);
    const isI18nEnabled = Boolean(schema?.pluginOptions?.i18n?.localized);
    if (query.plugins && "i18n" in query.plugins) {
      const { i18n, ...restPlugins } = query.plugins;
      if (!isI18nEnabled) {
        return restPlugins;
      }
      return { i18n, ...restPlugins };
    }
    return query.plugins;
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SubNav, { "aria-label": label, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SubNavHeader,
      {
        label,
        searchable: true,
        value: search,
        onChange: handleChangeSearch,
        onClear: handleClear,
        searchLabel: formatMessage({
          id: "content-manager.components.LeftMenu.Search.label",
          defaultMessage: "Search for a content type"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.SubNavSections, { children: menu.map((section) => {
      return /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.SubNavSection,
        {
          label: section.title,
          badgeLabel: section.links.length.toString(),
          children: section.links.map((link) => {
            return /* @__PURE__ */ jsxRuntime.jsx(
              SubNavLinkCustom,
              {
                tag: reactRouterDom.NavLink,
                to: {
                  pathname: link.to,
                  search: qs.stringify({
                    ...qs.parse(link.search ?? ""),
                    plugins: getPluginsParamsForLink(link)
                  })
                },
                width: "100%",
                children: link.title
              },
              link.uid
            );
          })
        },
        section.id
      );
    }) })
  ] });
};
const { MUTATE_COLLECTION_TYPES_LINKS, MUTATE_SINGLE_TYPES_LINKS } = index.HOOKS;
const useContentManagerInitData = () => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const dispatch = hooks.useTypedDispatch();
  const runHookWaterfall = strapiAdmin.useStrapiApp(
    "useContentManagerInitData",
    (state2) => state2.runHookWaterfall
  );
  const { notifyStatus } = designSystem.useNotifyAT();
  const { formatMessage } = reactIntl.useIntl();
  const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler(index.getTranslation);
  const checkUserHasPermissions = strapiAdmin.useAuth(
    "useContentManagerInitData",
    (state2) => state2.checkUserHasPermissions
  );
  const state = hooks.useTypedSelector((state2) => state2["content-manager"].app);
  const initialDataQuery = index.useGetInitialDataQuery(void 0, {
    /**
     * TODO: remove this when the CTB has been refactored to use redux-toolkit-query
     * and it can invalidate the cache on mutation
     */
    refetchOnMountOrArgChange: true
  });
  React.useEffect(() => {
    if (initialDataQuery.data) {
      notifyStatus(
        formatMessage({
          id: index.getTranslation("App.schemas.data-loaded"),
          defaultMessage: "The schemas have been successfully loaded."
        })
      );
    }
  }, [formatMessage, initialDataQuery.data, notifyStatus]);
  React.useEffect(() => {
    if (initialDataQuery.error) {
      toggleNotification({ type: "danger", message: formatAPIError(initialDataQuery.error) });
    }
  }, [formatAPIError, initialDataQuery.error, toggleNotification]);
  const contentTypeSettingsQuery = index.useGetAllContentTypeSettingsQuery();
  React.useEffect(() => {
    if (contentTypeSettingsQuery.error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(contentTypeSettingsQuery.error)
      });
    }
  }, [formatAPIError, contentTypeSettingsQuery.error, toggleNotification]);
  const formatData = async (components, contentTypes, fieldSizes, contentTypeConfigurations) => {
    const { collectionType: collectionTypeLinks, singleType: singleTypeLinks } = contentTypes.reduce(
      (acc, model) => {
        acc[model.kind].push(model);
        return acc;
      },
      {
        collectionType: [],
        singleType: []
      }
    );
    const collectionTypeSectionLinks = generateLinks(
      collectionTypeLinks,
      "collectionTypes",
      contentTypeConfigurations
    );
    const singleTypeSectionLinks = generateLinks(singleTypeLinks, "singleTypes");
    const collectionTypeLinksPermissions = await Promise.all(
      collectionTypeSectionLinks.map(({ permissions }) => checkUserHasPermissions(permissions))
    );
    const authorizedCollectionTypeLinks = collectionTypeSectionLinks.filter(
      (_, index2) => collectionTypeLinksPermissions[index2].length > 0
    );
    const singleTypeLinksPermissions = await Promise.all(
      singleTypeSectionLinks.map(({ permissions }) => checkUserHasPermissions(permissions))
    );
    const authorizedSingleTypeLinks = singleTypeSectionLinks.filter(
      (_, index2) => singleTypeLinksPermissions[index2].length > 0
    );
    const { ctLinks } = runHookWaterfall(MUTATE_COLLECTION_TYPES_LINKS, {
      ctLinks: authorizedCollectionTypeLinks,
      models: contentTypes
    });
    const { stLinks } = runHookWaterfall(MUTATE_SINGLE_TYPES_LINKS, {
      stLinks: authorizedSingleTypeLinks,
      models: contentTypes
    });
    dispatch(
      index.setInitialData({
        authorizedCollectionTypeLinks: ctLinks,
        authorizedSingleTypeLinks: stLinks,
        components,
        contentTypeSchemas: contentTypes,
        fieldSizes
      })
    );
  };
  React.useEffect(() => {
    if (initialDataQuery.data && contentTypeSettingsQuery.data) {
      formatData(
        initialDataQuery.data.components,
        initialDataQuery.data.contentTypes,
        initialDataQuery.data.fieldSizes,
        contentTypeSettingsQuery.data
      );
    }
  }, [initialDataQuery.data, contentTypeSettingsQuery.data]);
  return { ...state };
};
const generateLinks = (links, type, configurations = []) => {
  return links.filter((link) => link.isDisplayed).map((link) => {
    const collectionTypesPermissions = [
      { action: "plugin::content-manager.explorer.create", subject: link.uid },
      { action: "plugin::content-manager.explorer.read", subject: link.uid }
    ];
    const singleTypesPermissions = [
      { action: "plugin::content-manager.explorer.read", subject: link.uid }
    ];
    const permissions = type === "collectionTypes" ? collectionTypesPermissions : singleTypesPermissions;
    const currentContentTypeConfig = configurations.find(({ uid }) => uid === link.uid);
    let search = null;
    if (currentContentTypeConfig) {
      const searchParams = {
        page: 1,
        pageSize: currentContentTypeConfig.settings.pageSize,
        sort: `${currentContentTypeConfig.settings.defaultSortBy}:${currentContentTypeConfig.settings.defaultSortOrder}`
      };
      search = qs.stringify(searchParams, { encode: false });
    }
    return {
      permissions,
      search,
      kind: link.kind,
      title: link.info.displayName,
      to: `/content-manager/${link.kind === "collectionType" ? index.COLLECTION_TYPES : index.SINGLE_TYPES}/${link.uid}`,
      uid: link.uid,
      // Used for the list item key in the helper plugin
      name: link.uid,
      isDisplayed: link.isDisplayed
    };
  });
};
const Layout = () => {
  const contentTypeMatch = reactRouterDom.useMatch("/content-manager/:kind/:uid/*");
  const { isLoading, collectionTypeLinks, models, singleTypeLinks } = useContentManagerInitData();
  const authorisedModels = [...collectionTypeLinks, ...singleTypeLinks].sort(
    (a, b) => a.title.localeCompare(b.title)
  );
  const { pathname } = reactRouterDom.useLocation();
  const { formatMessage } = reactIntl.useIntl();
  const startSection = strapiAdmin.useGuidedTour("Layout", (state) => state.startSection);
  const startSectionRef = React__namespace.useRef(startSection);
  React__namespace.useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("contentManager");
    }
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: formatMessage({
        id: index.getTranslation("plugin.name"),
        defaultMessage: "Content Manager"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {})
    ] });
  }
  const supportedModelsToDisplay = models.filter(({ isDisplayed }) => isDisplayed);
  if (authorisedModels.length === 0 && supportedModelsToDisplay.length > 0 && pathname !== "/content-manager/403") {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: "/403" });
  }
  if (supportedModelsToDisplay.length === 0 && pathname !== "/no-content-types") {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: "/no-content-types" });
  }
  if (!contentTypeMatch && authorisedModels.length > 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Navigate,
      {
        to: {
          pathname: authorisedModels[0].to,
          search: authorisedModels[0].search ?? ""
        },
        replace: true
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: formatMessage({
      id: index.getTranslation("plugin.name"),
      defaultMessage: "Content Manager"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Layouts.Root, { sideNav: /* @__PURE__ */ jsxRuntime.jsx(LeftMenu, {}), children: [
      /* @__PURE__ */ jsxRuntime.jsx(DragLayer, { renderItem: renderDraglayerItem }),
      /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Outlet, {})
    ] })
  ] });
};
function renderDraglayerItem({ type, item }) {
  if (!type || type && typeof type !== "string") {
    return null;
  }
  const [actualType] = type.split("_");
  switch (actualType) {
    case useDragAndDrop.ItemTypes.EDIT_FIELD:
    case useDragAndDrop.ItemTypes.FIELD:
      return /* @__PURE__ */ jsxRuntime.jsx(CardDragPreview.CardDragPreview, { label: item.label });
    case useDragAndDrop.ItemTypes.COMPONENT:
    case useDragAndDrop.ItemTypes.DYNAMIC_ZONE:
      return /* @__PURE__ */ jsxRuntime.jsx(ComponentDragPreview, { displayedValue: item.displayedValue });
    case useDragAndDrop.ItemTypes.RELATION:
      return /* @__PURE__ */ jsxRuntime.jsx(RelationDragPreview, { ...item });
    default:
      return null;
  }
}
exports.Layout = Layout;
//# sourceMappingURL=layout-nBPDlXjr.js.map
