"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const Form = require("./Form-aTchNxab.js");
const index = require("./index-BN1pPa5v.js");
const hooks = require("./hooks-BAaaKPS_.js");
const objects = require("./objects-BcXOv6_9.js");
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
const componentsApi = index.contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getComponentConfiguration: builder.query({
      query: (uid) => `/content-manager/components/${uid}/configuration`,
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, uid) => [{ type: "ComponentConfiguration", id: uid }]
    }),
    updateComponentConfiguration: builder.mutation({
      query: ({ uid, ...body }) => ({
        url: `/content-manager/components/${uid}/configuration`,
        method: "PUT",
        data: body
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (_result, _error, { uid }) => [
        { type: "ComponentConfiguration", id: uid },
        // otherwise layouts already fetched will have stale component configuration data.
        { type: "ContentTypeSettings", id: "LIST" }
      ]
    })
  })
});
const { useGetComponentConfigurationQuery, useUpdateComponentConfigurationMutation } = componentsApi;
const ComponentConfigurationPage = () => {
  const { slug: model } = reactRouterDom.useParams();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler();
  const {
    components,
    fieldSizes,
    schema,
    error: errorSchema,
    isLoading: isLoadingSchema,
    isFetching: isFetchingSchema
  } = index.useGetInitialDataQuery(void 0, {
    selectFromResult: (res) => {
      const schema2 = res.data?.components.find((ct) => ct.uid === model);
      const componentsByKey = res.data?.components.reduce(
        (acc, component) => {
          acc[component.uid] = component;
          return acc;
        },
        {}
      );
      const components2 = index.extractContentTypeComponents(schema2?.attributes, componentsByKey);
      const fieldSizes2 = Object.entries(res.data?.fieldSizes ?? {}).reduce((acc, [attributeName, { default: size }]) => {
        acc[attributeName] = size;
        return acc;
      }, {});
      return {
        isFetching: res.isFetching,
        isLoading: res.isLoading,
        error: res.error,
        components: components2,
        schema: schema2,
        fieldSizes: fieldSizes2
      };
    }
  });
  React__namespace.useEffect(() => {
    if (errorSchema) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(errorSchema)
      });
    }
  }, [errorSchema, formatAPIError, toggleNotification]);
  const {
    data,
    isLoading: isLoadingConfig,
    isFetching: isFetchingConfig,
    error
  } = useGetComponentConfigurationQuery(model ?? "");
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const isLoading = isLoadingConfig || isLoadingSchema || isFetchingConfig || isFetchingSchema;
  const editLayout = React__namespace.useMemo(
    () => data && !isLoading ? formatEditLayout(data, { schema, components }) : {
      layout: [],
      components: {},
      metadatas: {},
      options: {},
      settings: index.DEFAULT_SETTINGS
    },
    [data, isLoading, schema, components]
  );
  const [updateConfiguration] = useUpdateComponentConfigurationMutation();
  const handleSubmit = async (formData) => {
    try {
      const meta = Object.entries(data?.component.metadatas ?? {}).reduce(
        (acc, [name, { edit, list }]) => {
          const {
            __temp_key__,
            size: _size,
            name: _name,
            ...editedMetadata
          } = formData.layout.flatMap((row) => row.children).find((field) => field.name === name) ?? {};
          acc[name] = {
            edit: {
              ...edit,
              ...editedMetadata
            },
            list
          };
          return acc;
        },
        {}
      );
      const res = await updateConfiguration({
        layouts: {
          edit: formData.layout.map(
            (row) => row.children.reduce((acc, { name, size }) => {
              if (name !== Form.TEMP_FIELD_NAME) {
                return [...acc, { name, size }];
              }
              return acc;
            }, [])
          ),
          list: data?.component.layouts.list
        },
        settings: objects.setIn(formData.settings, "displayName", void 0),
        metadatas: meta,
        uid: model
      });
      if ("data" in res) {
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
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (error || errorSchema || !schema) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: `Configure ${editLayout.settings.displayName} Edit View` }),
    /* @__PURE__ */ jsxRuntime.jsx(
      Form.ConfigurationForm,
      {
        onSubmit: handleSubmit,
        attributes: schema.attributes,
        fieldSizes,
        layout: editLayout
      }
    )
  ] });
};
const formatEditLayout = (data, { schema, components }) => {
  const editAttributes = index.convertEditLayoutToFieldLayouts(
    data.component.layouts.edit,
    schema?.attributes,
    data.component.metadatas,
    { configurations: data.components, schemas: components }
  );
  const componentEditAttributes = Object.entries(data.components).reduce(
    (acc, [uid, configuration]) => {
      acc[uid] = {
        layout: index.convertEditLayoutToFieldLayouts(
          configuration.layouts.edit,
          components[uid].attributes,
          configuration.metadatas
        ),
        settings: {
          ...configuration.settings,
          icon: components[uid].info.icon,
          displayName: components[uid].info.displayName
        }
      };
      return acc;
    },
    {}
  );
  const editMetadatas = Object.entries(data.component.metadatas).reduce(
    (acc, [attribute, metadata]) => {
      return {
        ...acc,
        [attribute]: metadata.edit
      };
    },
    {}
  );
  return {
    layout: [editAttributes],
    components: componentEditAttributes,
    metadatas: editMetadatas,
    options: {
      ...schema?.options,
      ...schema?.pluginOptions
    },
    settings: {
      ...data.component.settings,
      displayName: schema?.info.displayName
    }
  };
};
const ProtectedComponentConfigurationPage = () => {
  const permissions = hooks.useTypedSelector(
    (state) => state.admin_app.permissions.contentManager?.componentsConfigurations
  );
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ComponentConfigurationPage, {}) });
};
exports.ComponentConfigurationPage = ComponentConfigurationPage;
exports.ProtectedComponentConfigurationPage = ProtectedComponentConfigurationPage;
//# sourceMappingURL=ComponentConfigurationPage-DHV8IFbd.js.map
