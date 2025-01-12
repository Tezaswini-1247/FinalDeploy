import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useContext, useMemo, useCallback, useReducer, forwardRef, useImperativeHandle, memo, useEffect, useState } from "react";
import { translatedErrors, useNotification, useFetchClient, useAPIErrorHandler, Page, useTracking, Layouts, BackButton, useQueryParams, useRBAC, SearchInput, ConfirmDialog } from "@strapi/strapi/admin";
import { useNavigate, useMatch, NavLink, Routes, Route } from "react-router-dom";
import { g as getTrad, P as PERMISSIONS } from "./index-r1PNp6L5.mjs";
import { Box, Flex, Typography, Checkbox, Grid, VisuallyHidden, Accordion, Main, Button, Field, TextInput, Textarea, Link, Tbody, Tr, Td, IconButton, useNotifyAT, useFilter, useCollator, LinkButton, Table, Thead, Th, EmptyStateLayout, Dialog } from "@strapi/design-system";
import { Cog, Check, Pencil, Trash, Plus } from "@strapi/icons";
import { Formik, Form } from "formik";
import { useIntl } from "react-intl";
import { useQueries, useMutation, useQuery } from "react-query";
import PropTypes from "prop-types";
import upperFirst from "lodash/upperFirst";
import sortBy from "lodash/sortBy";
import get from "lodash/get";
import { css, styled } from "styled-components";
import { produce } from "immer";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import map from "lodash/map";
import tail from "lodash/tail";
import set from "lodash/set";
import take from "lodash/take";
import * as yup from "yup";
const UsersPermissions$2 = createContext({});
const UsersPermissionsProvider = ({ children, value }) => {
  return /* @__PURE__ */ jsx(UsersPermissions$2.Provider, { value, children });
};
const useUsersPermissions = () => useContext(UsersPermissions$2);
UsersPermissionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired
};
function formatPluginName(pluginSlug) {
  switch (pluginSlug) {
    case "application":
      return "Application";
    case "plugin::content-manager":
      return "Content manager";
    case "plugin::content-type-builder":
      return "Content types builder";
    case "plugin::documentation":
      return "Documentation";
    case "plugin::email":
      return "Email";
    case "plugin::i18n":
      return "i18n";
    case "plugin::upload":
      return "Upload";
    case "plugin::users-permissions":
      return "Users-permissions";
    default:
      return upperFirst(pluginSlug.replace("api::", "").replace("plugin::", ""));
  }
}
const init$1 = (initialState2, permissions) => {
  const collapses = Object.keys(permissions).sort().map((name) => ({ name, isOpen: false }));
  return { ...initialState2, collapses };
};
const activeCheckboxWrapperStyles = css`
  background: ${(props) => props.theme.colors.primary100};

  #cog {
    opacity: 1;
  }
`;
const CheckboxWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  #cog {
    opacity: 0;
    path {
      fill: ${(props) => props.theme.colors.primary600};
    }
  }

  /* Show active style both on hover and when the action is selected */
  ${(props) => props.isActive && activeCheckboxWrapperStyles}
  &:hover {
    ${activeCheckboxWrapperStyles}
  }
`;
const Border = styled.div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const SubCategory = ({ subCategory }) => {
  const { formatMessage } = useIntl();
  const { onChange, onChangeSelectAll, onSelectedAction, selectedAction, modifiedData } = useUsersPermissions();
  const currentScopedModifiedData = useMemo(() => {
    return get(modifiedData, subCategory.name, {});
  }, [modifiedData, subCategory]);
  const hasAllActionsSelected = useMemo(() => {
    return Object.values(currentScopedModifiedData).every((action) => action.enabled === true);
  }, [currentScopedModifiedData]);
  const hasSomeActionsSelected = useMemo(() => {
    return Object.values(currentScopedModifiedData).some((action) => action.enabled === true) && !hasAllActionsSelected;
  }, [currentScopedModifiedData, hasAllActionsSelected]);
  const handleChangeSelectAll = useCallback(
    ({ target: { name } }) => {
      onChangeSelectAll({ target: { name, value: !hasAllActionsSelected } });
    },
    [hasAllActionsSelected, onChangeSelectAll]
  );
  const isActionSelected = useCallback(
    (actionName) => {
      return selectedAction === actionName;
    },
    [selectedAction]
  );
  return /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "center", children: [
      /* @__PURE__ */ jsx(Box, { paddingRight: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: subCategory.label }) }),
      /* @__PURE__ */ jsx(Border, {}),
      /* @__PURE__ */ jsx(Box, { paddingLeft: 4, children: /* @__PURE__ */ jsx(
        Checkbox,
        {
          name: subCategory.name,
          checked: hasSomeActionsSelected ? "indeterminate" : hasAllActionsSelected,
          onCheckedChange: (value) => handleChangeSelectAll({ target: { name: subCategory.name, value } }),
          children: formatMessage({ id: "app.utils.select-all", defaultMessage: "Select all" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Flex, { paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsx(Grid.Root, { gap: 2, style: { flex: 1 }, children: subCategory.actions.map((action) => {
      const name = `${action.name}.enabled`;
      return /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(CheckboxWrapper, { isActive: isActionSelected(action.name), padding: 2, hasRadius: true, children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: get(modifiedData, name, false),
            name,
            onCheckedChange: (value) => onChange({ target: { name, value } }),
            children: action.label
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelectedAction(action.name),
            style: { display: "inline-flex", alignItems: "center" },
            children: [
              /* @__PURE__ */ jsx(VisuallyHidden, { tag: "span", children: formatMessage(
                {
                  id: "app.utils.show-bound-route",
                  defaultMessage: "Show bound route for {route}"
                },
                {
                  route: action.name
                }
              ) }),
              /* @__PURE__ */ jsx(Cog, { id: "cog" })
            ]
          }
        )
      ] }) }, action.name);
    }) }) })
  ] });
};
SubCategory.propTypes = {
  subCategory: PropTypes.object.isRequired
};
const PermissionRow = ({ name, permissions }) => {
  const subCategories = useMemo(() => {
    return sortBy(
      Object.values(permissions.controllers).reduce((acc, curr, index) => {
        const currentName = `${name}.controllers.${Object.keys(permissions.controllers)[index]}`;
        const actions = sortBy(
          Object.keys(curr).reduce((acc2, current) => {
            return [
              ...acc2,
              {
                ...curr[current],
                label: current,
                name: `${currentName}.${current}`
              }
            ];
          }, []),
          "label"
        );
        return [
          ...acc,
          {
            actions,
            label: Object.keys(permissions.controllers)[index],
            name: currentName
          }
        ];
      }, []),
      "label"
    );
  }, [name, permissions]);
  return /* @__PURE__ */ jsx(Box, { padding: 6, children: subCategories.map((subCategory) => /* @__PURE__ */ jsx(SubCategory, { subCategory }, subCategory.name)) });
};
PermissionRow.propTypes = {
  name: PropTypes.string.isRequired,
  permissions: PropTypes.object.isRequired
};
const initialState$1 = {
  collapses: []
};
const reducer$1 = (state, action) => (
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    switch (action.type) {
      case "TOGGLE_COLLAPSE": {
        draftState.collapses = state.collapses.map((collapse, index) => {
          if (index === action.index) {
            return { ...collapse, isOpen: !collapse.isOpen };
          }
          return { ...collapse, isOpen: false };
        });
        break;
      }
      default:
        return draftState;
    }
  })
);
const Permissions = () => {
  const { modifiedData } = useUsersPermissions();
  const { formatMessage } = useIntl();
  const [{ collapses }] = useReducer(reducer$1, initialState$1, (state) => init$1(state, modifiedData));
  return /* @__PURE__ */ jsx(Accordion.Root, { size: "M", children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: collapses.map((collapse, index) => /* @__PURE__ */ jsxs(Accordion.Item, { value: collapse.name, children: [
    /* @__PURE__ */ jsx(Accordion.Header, { variant: index % 2 === 0 ? "secondary" : void 0, children: /* @__PURE__ */ jsx(
      Accordion.Trigger,
      {
        caretPosition: "right",
        description: formatMessage(
          {
            id: "users-permissions.Plugin.permissions.plugins.description",
            defaultMessage: "Define all allowed actions for the {name} plugin."
          },
          { name: collapse.name }
        ),
        children: formatPluginName(collapse.name)
      }
    ) }),
    /* @__PURE__ */ jsx(Accordion.Content, { children: /* @__PURE__ */ jsx(PermissionRow, { permissions: modifiedData[collapse.name], name: collapse.name }) })
  ] }, collapse.name)) }) });
};
const getMethodColor = (verb) => {
  switch (verb) {
    case "POST": {
      return {
        text: "success600",
        border: "success200",
        background: "success100"
      };
    }
    case "GET": {
      return {
        text: "secondary600",
        border: "secondary200",
        background: "secondary100"
      };
    }
    case "PUT": {
      return {
        text: "warning600",
        border: "warning200",
        background: "warning100"
      };
    }
    case "DELETE": {
      return {
        text: "danger600",
        border: "danger200",
        background: "danger100"
      };
    }
    default: {
      return {
        text: "neutral600",
        border: "neutral200",
        background: "neutral100"
      };
    }
  }
};
const MethodBox = styled(Box)`
  margin: -1px;
  border-radius: ${({ theme }) => theme.spaces[1]} 0 0 ${({ theme }) => theme.spaces[1]};
`;
function BoundRoute({ route }) {
  const { formatMessage } = useIntl();
  const { method, handler: title, path } = route;
  const formattedRoute = path ? tail(path.split("/")) : [];
  const [controller = "", action = ""] = title ? title.split(".") : [];
  const colors = getMethodColor(route.method);
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsxs(Typography, { variant: "delta", tag: "h3", children: [
      formatMessage({
        id: "users-permissions.BoundRoute.title",
        defaultMessage: "Bound route to"
      }),
      " ",
      /* @__PURE__ */ jsx("span", { children: controller }),
      /* @__PURE__ */ jsxs(Typography, { variant: "delta", textColor: "primary600", children: [
        ".",
        action
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { hasRadius: true, background: "neutral0", borderColor: "neutral200", gap: 0, children: [
      /* @__PURE__ */ jsx(MethodBox, { background: colors.background, borderColor: colors.border, padding: 2, children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: colors.text, children: method }) }),
      /* @__PURE__ */ jsx(Box, { paddingLeft: 2, paddingRight: 2, children: map(formattedRoute, (value) => /* @__PURE__ */ jsxs(Typography, { textColor: value.includes(":") ? "neutral600" : "neutral900", children: [
        "/",
        value
      ] }, value)) })
    ] })
  ] });
}
BoundRoute.defaultProps = {
  route: {
    handler: "Nocontroller.error",
    method: "GET",
    path: "/there-is-no-path"
  }
};
BoundRoute.propTypes = {
  route: PropTypes.shape({
    handler: PropTypes.string,
    method: PropTypes.string,
    path: PropTypes.string
  })
};
const Policies = () => {
  const { formatMessage } = useIntl();
  const { selectedAction, routes } = useUsersPermissions();
  const path = without(selectedAction.split("."), "controllers");
  const controllerRoutes = get(routes, path[0]);
  const pathResolved = path.slice(1).join(".");
  const displayedRoutes = isEmpty(controllerRoutes) ? [] : controllerRoutes.filter((o) => o.handler.endsWith(pathResolved));
  return /* @__PURE__ */ jsx(
    Grid.Item,
    {
      col: 5,
      background: "neutral150",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      style: { minHeight: "100%" },
      direction: "column",
      alignItems: "stretch",
      children: selectedAction ? /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: displayedRoutes.map((route, key) => (
        // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ jsx(BoundRoute, { route }, key)
      )) }) : /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h3", children: formatMessage({
          id: "users-permissions.Policies.header.title",
          defaultMessage: "Advanced settings"
        }) }),
        /* @__PURE__ */ jsx(Typography, { tag: "p", textColor: "neutral600", children: formatMessage({
          id: "users-permissions.Policies.header.hint",
          defaultMessage: "Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"
        }) })
      ] })
    }
  );
};
const init = (state, permissions, routes) => {
  return {
    ...state,
    initialData: permissions,
    modifiedData: permissions,
    routes
  };
};
const initialState = {
  initialData: {},
  modifiedData: {},
  routes: {},
  selectedAction: "",
  policies: []
};
const reducer = (state, action) => produce(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      const keysLength = action.keys.length;
      const isChangingCheckbox = action.keys[keysLength - 1] === "enabled";
      if (action.value && isChangingCheckbox) {
        const selectedAction = take(action.keys, keysLength - 1).join(".");
        draftState.selectedAction = selectedAction;
      }
      set(draftState, ["modifiedData", ...action.keys], action.value);
      break;
    }
    case "ON_CHANGE_SELECT_ALL": {
      const pathToValue = ["modifiedData", ...action.keys];
      const oldValues = get(state, pathToValue, {});
      const updatedValues = Object.keys(oldValues).reduce((acc, current) => {
        acc[current] = { ...oldValues[current], enabled: action.value };
        return acc;
      }, {});
      set(draftState, pathToValue, updatedValues);
      break;
    }
    case "ON_RESET": {
      draftState.modifiedData = state.initialData;
      break;
    }
    case "ON_SUBMIT_SUCCEEDED": {
      draftState.initialData = state.modifiedData;
      break;
    }
    case "SELECT_ACTION": {
      const { actionToSelect } = action;
      draftState.selectedAction = actionToSelect === state.selectedAction ? "" : actionToSelect;
      break;
    }
    default:
      return draftState;
  }
});
const UsersPermissions = forwardRef(({ permissions, routes }, ref) => {
  const { formatMessage } = useIntl();
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (state2) => init(state2, permissions, routes)
  );
  useImperativeHandle(ref, () => ({
    getPermissions() {
      return {
        permissions: state.modifiedData
      };
    },
    resetForm() {
      dispatch({ type: "ON_RESET" });
    },
    setFormAfterSubmit() {
      dispatch({ type: "ON_SUBMIT_SUCCEEDED" });
    }
  }));
  const handleChange = ({ target: { name, value } }) => dispatch({
    type: "ON_CHANGE",
    keys: name.split("."),
    value: value === "empty__string_value" ? "" : value
  });
  const handleChangeSelectAll = ({ target: { name, value } }) => dispatch({
    type: "ON_CHANGE_SELECT_ALL",
    keys: name.split("."),
    value
  });
  const handleSelectedAction = (actionToSelect) => dispatch({
    type: "SELECT_ACTION",
    actionToSelect
  });
  const providerValue = {
    ...state,
    onChange: handleChange,
    onChangeSelectAll: handleChangeSelectAll,
    onSelectedAction: handleSelectedAction
  };
  return /* @__PURE__ */ jsx(UsersPermissionsProvider, { value: providerValue, children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 0, shadow: "filterShadow", hasRadius: true, background: "neutral0", children: [
    /* @__PURE__ */ jsx(
      Grid.Item,
      {
        col: 7,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        direction: "column",
        alignItems: "stretch",
        children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
          /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
            /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h2", children: formatMessage({
              id: getTrad("Plugins.header.title"),
              defaultMessage: "Permissions"
            }) }),
            /* @__PURE__ */ jsx(Typography, { tag: "p", textColor: "neutral600", children: formatMessage({
              id: getTrad("Plugins.header.description"),
              defaultMessage: "Only actions bound by a route are listed below."
            }) })
          ] }),
          /* @__PURE__ */ jsx(Permissions, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Policies, {})
  ] }) });
});
UsersPermissions.propTypes = {
  permissions: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};
const UsersPermissions$1 = memo(UsersPermissions);
const createRoleSchema = yup.object().shape({
  name: yup.string().required(translatedErrors.required.id),
  description: yup.string().required(translatedErrors.required.id)
});
const cleanPermissions = (permissions) => Object.keys(permissions).reduce((acc, current) => {
  const currentPermission = permissions[current].controllers;
  const cleanedControllers = Object.keys(currentPermission).reduce((acc2, curr) => {
    if (isEmpty(currentPermission[curr])) {
      return acc2;
    }
    acc2[curr] = currentPermission[curr];
    return acc2;
  }, {});
  if (isEmpty(cleanedControllers)) {
    return acc;
  }
  acc[current] = { controllers: cleanedControllers };
  return acc;
}, {});
const usePlugins = () => {
  const { toggleNotification } = useNotification();
  const { get: get2 } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler(getTrad);
  const [
    {
      data: permissions,
      isLoading: isLoadingPermissions,
      error: permissionsError,
      refetch: refetchPermissions
    },
    { data: routes, isLoading: isLoadingRoutes, error: routesError, refetch: refetchRoutes }
  ] = useQueries([
    {
      queryKey: ["users-permissions", "permissions"],
      async queryFn() {
        const {
          data: { permissions: permissions2 }
        } = await get2(`/users-permissions/permissions`);
        return permissions2;
      }
    },
    {
      queryKey: ["users-permissions", "routes"],
      async queryFn() {
        const {
          data: { routes: routes2 }
        } = await get2(`/users-permissions/routes`);
        return routes2;
      }
    }
  ]);
  const refetchQueries = async () => {
    await Promise.all([refetchPermissions(), refetchRoutes()]);
  };
  useEffect(() => {
    if (permissionsError) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(permissionsError)
      });
    }
  }, [toggleNotification, permissionsError, formatAPIError]);
  useEffect(() => {
    if (routesError) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(routesError)
      });
    }
  }, [toggleNotification, routesError, formatAPIError]);
  const isLoading = isLoadingPermissions || isLoadingRoutes;
  return {
    // TODO: these return values need to be memoized, otherwise
    // they will create infinite rendering loops when used as
    // effect dependencies
    permissions: permissions ? cleanPermissions(permissions) : {},
    routes: routes ?? {},
    getData: refetchQueries,
    isLoading
  };
};
const CreatePage = () => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const navigate = useNavigate();
  const { isLoading: isLoadingPlugins, permissions, routes } = usePlugins();
  const { trackUsage } = useTracking();
  const permissionsRef = React.useRef();
  const { post } = useFetchClient();
  const mutation = useMutation((body) => post(`/users-permissions/roles`, body), {
    onError() {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    },
    onSuccess() {
      trackUsage("didCreateRole");
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("Settings.roles.created"),
          defaultMessage: "Role created"
        })
      });
      navigate(-1);
    }
  });
  const handleCreateRoleSubmit = async (data) => {
    const permissions2 = permissionsRef.current.getPermissions();
    await mutation.mutate({ ...data, ...permissions2, users: [] });
  };
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      { name: "Roles" }
    ) }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        enableReinitialize: true,
        initialValues: { name: "", description: "" },
        onSubmit: handleCreateRoleSubmit,
        validationSchema: createRoleSchema,
        children: ({ handleSubmit, values, handleChange, errors }) => /* @__PURE__ */ jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(
            Layouts.Header,
            {
              primaryAction: !isLoadingPlugins && /* @__PURE__ */ jsx(Button, { type: "submit", loading: mutation.isLoading, startIcon: /* @__PURE__ */ jsx(Check, {}), children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              }) }),
              title: formatMessage({
                id: "Settings.roles.create.title",
                defaultMessage: "Create a role"
              }),
              subtitle: formatMessage({
                id: "Settings.roles.create.description",
                defaultMessage: "Define the rights given to the role"
              })
            }
          ),
          /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(
            Flex,
            {
              background: "neutral0",
              direction: "column",
              alignItems: "stretch",
              gap: 7,
              hasRadius: true,
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 7,
              paddingRight: 7,
              shadow: "filterShadow",
              children: [
                /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", children: [
                  /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h2", children: formatMessage({
                    id: getTrad("EditPage.form.roles"),
                    defaultMessage: "Role details"
                  }) }),
                  /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, children: [
                    /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
                      Field.Root,
                      {
                        name: "name",
                        error: errors?.name ? formatMessage({ id: errors.name, defaultMessage: "Name is required" }) : false,
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                            id: "global.name",
                            defaultMessage: "Name"
                          }) }),
                          /* @__PURE__ */ jsx(TextInput, { value: values.name || "", onChange: handleChange }),
                          /* @__PURE__ */ jsx(Field.Error, {})
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
                      Field.Root,
                      {
                        name: "description",
                        error: errors?.description ? formatMessage({
                          id: errors.description,
                          defaultMessage: "Description is required"
                        }) : false,
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                            id: "global.description",
                            defaultMessage: "Description"
                          }) }),
                          /* @__PURE__ */ jsx(Textarea, { value: values.description || "", onChange: handleChange }),
                          /* @__PURE__ */ jsx(Field.Error, {})
                        ]
                      }
                    ) })
                  ] })
                ] }),
                !isLoadingPlugins && /* @__PURE__ */ jsx(
                  UsersPermissions$1,
                  {
                    ref: permissionsRef,
                    permissions,
                    routes
                  }
                )
              ]
            }
          ) })
        ] })
      }
    )
  ] });
};
const ProtectedRolesCreatePage = () => /* @__PURE__ */ jsx(Page.Protect, { permissions: PERMISSIONS.createRole, children: /* @__PURE__ */ jsx(CreatePage, {}) });
const EditPage = () => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const {
    params: { id }
  } = useMatch(`/settings/users-permissions/roles/:id`);
  const { get: get2 } = useFetchClient();
  const { isLoading: isLoadingPlugins, routes } = usePlugins();
  const {
    data: role,
    isLoading: isLoadingRole,
    refetch: refetchRole
  } = useQuery(["users-permissions", "role", id], async () => {
    const {
      data: { role: role2 }
    } = await get2(`/users-permissions/roles/${id}`);
    return role2;
  });
  const permissionsRef = React.useRef();
  const { put } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  const mutation = useMutation((body) => put(`/users-permissions/roles/${id}`, body), {
    onError(error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    },
    async onSuccess() {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("Settings.roles.created"),
          defaultMessage: "Role edited"
        })
      });
      await refetchRole();
    }
  });
  const handleEditRoleSubmit = async (data) => {
    const permissions = permissionsRef.current.getPermissions();
    await mutation.mutate({ ...data, ...permissions, users: [] });
  };
  if (isLoadingRole) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      { name: "Roles" }
    ) }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        enableReinitialize: true,
        initialValues: { name: role.name, description: role.description },
        onSubmit: handleEditRoleSubmit,
        validationSchema: createRoleSchema,
        children: ({ handleSubmit, values, handleChange, errors }) => /* @__PURE__ */ jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(
            Layouts.Header,
            {
              primaryAction: !isLoadingPlugins ? /* @__PURE__ */ jsx(
                Button,
                {
                  disabled: role.code === "strapi-super-admin",
                  type: "submit",
                  loading: mutation.isLoading,
                  startIcon: /* @__PURE__ */ jsx(Check, {}),
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              ) : null,
              title: role.name,
              subtitle: role.description,
              navigationAction: /* @__PURE__ */ jsx(BackButton, { fallback: ".." })
            }
          ),
          /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(
            Flex,
            {
              background: "neutral0",
              direction: "column",
              alignItems: "stretch",
              gap: 7,
              hasRadius: true,
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 7,
              paddingRight: 7,
              shadow: "filterShadow",
              children: [
                /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                  /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h2", children: formatMessage({
                    id: getTrad("EditPage.form.roles"),
                    defaultMessage: "Role details"
                  }) }),
                  /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, children: [
                    /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
                      Field.Root,
                      {
                        name: "name",
                        error: errors?.name ? formatMessage({
                          id: errors.name,
                          defaultMessage: "Name is required"
                        }) : false,
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                            id: "global.name",
                            defaultMessage: "Name"
                          }) }),
                          /* @__PURE__ */ jsx(TextInput, { value: values.name || "", onChange: handleChange }),
                          /* @__PURE__ */ jsx(Field.Error, {})
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
                      Field.Root,
                      {
                        name: "description",
                        error: errors?.description ? formatMessage({
                          id: errors.description,
                          defaultMessage: "Description is required"
                        }) : false,
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                            id: "global.description",
                            defaultMessage: "Description"
                          }) }),
                          /* @__PURE__ */ jsx(Textarea, { value: values.description || "", onChange: handleChange }),
                          /* @__PURE__ */ jsx(Field.Error, {})
                        ]
                      }
                    ) })
                  ] })
                ] }),
                !isLoadingPlugins && /* @__PURE__ */ jsx(
                  UsersPermissions$1,
                  {
                    ref: permissionsRef,
                    permissions: role.permissions,
                    routes
                  }
                )
              ]
            }
          ) })
        ] })
      }
    )
  ] });
};
const ProtectedRolesEditPage = () => /* @__PURE__ */ jsx(Page.Protect, { permissions: PERMISSIONS.updateRole, children: /* @__PURE__ */ jsx(EditPage, {}) });
const EditLink = styled(Link)`
  align-items: center;
  height: 3.2rem;
  width: 3.2rem;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spaces[2]}`};

  svg {
    height: 1.6rem;
    width: 1.6rem;

    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }

  &:hover,
  &:focus {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral800};
      }
    }
  }
`;
const TableBody = ({ sortedRoles, canDelete, canUpdate, setRoleToDelete, onDelete }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [showConfirmDelete, setShowConfirmDelete] = onDelete;
  const checkCanDeleteRole = (role) => canDelete && !["public", "authenticated"].includes(role.type);
  const handleClickDelete = (id) => {
    setRoleToDelete(id);
    setShowConfirmDelete(!showConfirmDelete);
  };
  return /* @__PURE__ */ jsx(Tbody, { children: sortedRoles?.map((role) => /* @__PURE__ */ jsxs(Tr, { onClick: () => navigate(role.id.toString()), children: [
    /* @__PURE__ */ jsx(Td, { width: "20%", children: /* @__PURE__ */ jsx(Typography, { children: role.name }) }),
    /* @__PURE__ */ jsx(Td, { width: "50%", children: /* @__PURE__ */ jsx(Typography, { children: role.description }) }),
    /* @__PURE__ */ jsx(Td, { width: "30%", children: /* @__PURE__ */ jsx(Typography, { children: formatMessage(
      {
        id: "Roles.RoleRow.user-count",
        defaultMessage: "{number, plural, =0 {# user} one {# user} other {# users}}"
      },
      { number: role.nb_users }
    ) }) }),
    /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "end", onClick: (e) => e.stopPropagation(), children: [
      canUpdate ? /* @__PURE__ */ jsx(
        EditLink,
        {
          tag: NavLink,
          to: role.id.toString(),
          "aria-label": formatMessage(
            { id: "app.component.table.edit", defaultMessage: "Edit {target}" },
            { target: `${role.name}` }
          ),
          children: /* @__PURE__ */ jsx(Pencil, {})
        }
      ) : null,
      checkCanDeleteRole(role) && /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: () => handleClickDelete(role.id.toString()),
          variant: "ghost",
          label: formatMessage(
            { id: "global.delete-target", defaultMessage: "Delete {target}" },
            { target: `${role.name}` }
          ),
          children: /* @__PURE__ */ jsx(Trash, {})
        }
      )
    ] }) })
  ] }, role.name)) });
};
TableBody.defaultProps = {
  canDelete: false,
  canUpdate: false
};
TableBody.propTypes = {
  onDelete: PropTypes.array.isRequired,
  setRoleToDelete: PropTypes.func.isRequired,
  sortedRoles: PropTypes.array.isRequired,
  canDelete: PropTypes.bool,
  canUpdate: PropTypes.bool
};
const RolesListPage = () => {
  const { trackUsage } = useTracking();
  const { formatMessage, locale } = useIntl();
  const { toggleNotification } = useNotification();
  const { notifyStatus } = useNotifyAT();
  const [{ query }] = useQueryParams();
  const _q = query?._q || "";
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState();
  const { del, get: get2 } = useFetchClient();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canRead, canDelete, canCreate, canUpdate }
  } = useRBAC({
    create: PERMISSIONS.createRole,
    read: PERMISSIONS.readRoles,
    update: PERMISSIONS.updateRole,
    delete: PERMISSIONS.deleteRole
  });
  const {
    isLoading: isLoadingForData,
    data: { roles },
    isFetching,
    refetch
  } = useQuery("get-roles", () => fetchData(toggleNotification, formatMessage, notifyStatus), {
    initialData: {},
    enabled: canRead
  });
  const { contains } = useFilter(locale, {
    sensitivity: "base"
  });
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const isLoading = isLoadingForData || isFetching || isLoadingForPermissions;
  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };
  const deleteData = async (id, formatMessage2, toggleNotification2) => {
    try {
      await del(`/users-permissions/roles/${id}`);
    } catch (error) {
      toggleNotification2({
        type: "danger",
        message: formatMessage2({ id: "notification.error", defaultMessage: "An error occured" })
      });
    }
  };
  const fetchData = async (toggleNotification2, formatMessage2, notifyStatus2) => {
    try {
      const { data } = await get2("/users-permissions/roles");
      notifyStatus2("The roles have loaded successfully");
      return data;
    } catch (err) {
      toggleNotification2({
        type: "danger",
        message: formatMessage2({ id: "notification.error", defaultMessage: "An error occurred" })
      });
      throw new Error(err);
    }
  };
  const emptyLayout = {
    roles: {
      id: getTrad("Roles.empty"),
      defaultMessage: "You don't have any roles yet."
    },
    search: {
      id: getTrad("Roles.empty.search"),
      defaultMessage: "No roles match the search."
    }
  };
  const pageTitle = formatMessage({
    id: "global.roles",
    defaultMessage: "Roles"
  });
  const deleteMutation = useMutation((id) => deleteData(id, formatMessage, toggleNotification), {
    async onSuccess() {
      await refetch();
    }
  });
  const handleConfirmDelete = async () => {
    await deleteMutation.mutateAsync(roleToDelete);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const sortedRoles = (roles || []).filter((role) => contains(role.name, _q) || contains(role.description, _q)).sort(
    (a, b) => formatter.compare(a.name, b.name) || formatter.compare(a.description, b.description)
  );
  const emptyContent = _q && !sortedRoles.length ? "search" : "roles";
  const colCount = 4;
  const rowCount = (roles?.length || 0) + 1;
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  return /* @__PURE__ */ jsxs(Layouts.Root, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      { name: pageTitle }
    ) }),
    /* @__PURE__ */ jsxs(Page.Main, { children: [
      /* @__PURE__ */ jsx(
        Layouts.Header,
        {
          title: formatMessage({
            id: "global.roles",
            defaultMessage: "Roles"
          }),
          subtitle: formatMessage({
            id: "Settings.roles.list.description",
            defaultMessage: "List of roles"
          }),
          primaryAction: canCreate ? /* @__PURE__ */ jsx(
            LinkButton,
            {
              to: "new",
              tag: NavLink,
              onClick: () => trackUsage("willCreateRole"),
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              size: "S",
              children: formatMessage({
                id: getTrad("List.button.roles"),
                defaultMessage: "Add new role"
              })
            }
          ) : null
        }
      ),
      /* @__PURE__ */ jsx(
        Layouts.Action,
        {
          startActions: /* @__PURE__ */ jsx(
            SearchInput,
            {
              label: formatMessage({
                id: "app.component.search.label",
                defaultMessage: "Search"
              })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(Layouts.Content, { children: [
        !canRead && /* @__PURE__ */ jsx(Page.NoPermissions, {}),
        canRead && sortedRoles && sortedRoles?.length ? /* @__PURE__ */ jsxs(Table, { colCount, rowCount, children: [
          /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.name", defaultMessage: "Name" }) }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.description",
              defaultMessage: "Description"
            }) }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.users",
              defaultMessage: "Users"
            }) }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
              id: "global.actions",
              defaultMessage: "Actions"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsx(
            TableBody,
            {
              sortedRoles,
              canDelete,
              canUpdate,
              permissions: PERMISSIONS,
              setRoleToDelete,
              onDelete: [showConfirmDelete, setShowConfirmDelete]
            }
          )
        ] }) : /* @__PURE__ */ jsx(EmptyStateLayout, { content: formatMessage(emptyLayout[emptyContent]) })
      ] }),
      /* @__PURE__ */ jsx(Dialog.Root, { open: showConfirmDelete, onOpenChange: handleShowConfirmDelete, children: /* @__PURE__ */ jsx(ConfirmDialog, { onConfirm: handleConfirmDelete }) })
    ] })
  ] });
};
const ProtectedRolesListPage = () => {
  return /* @__PURE__ */ jsx(Page.Protect, { permissions: PERMISSIONS.accessRoles, children: /* @__PURE__ */ jsx(RolesListPage, {}) });
};
const Roles = () => {
  return /* @__PURE__ */ jsx(Page.Protect, { permissions: PERMISSIONS.accessRoles, children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(ProtectedRolesListPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "new", element: /* @__PURE__ */ jsx(ProtectedRolesCreatePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: ":id", element: /* @__PURE__ */ jsx(ProtectedRolesEditPage, {}) })
  ] }) });
};
export {
  Roles as default
};
//# sourceMappingURL=index-0l4kieuc.mjs.map
