import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Table, Thead, Tr, Th, Typography, Tbody, Td, Flex, IconButton, EmptyStateLayout, Dialog, LinkButton } from "@strapi/design-system";
import { Eye, ArrowClockwise, Trash } from "@strapi/icons";
import { useNotification, useAPIErrorHandler, useRBAC, Page, Layouts, ConfirmDialog } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import { styled } from "styled-components";
import { P as PERMISSIONS } from "./index-YnqsO7ap.mjs";
import { u as useGetInfoQuery, a as useRegenerateDocMutation, b as useDeleteVersionMutation, g as getTrad } from "./getTrad-BCVqzyys.mjs";
const App = () => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const { data, isLoading: isLoadingInfo, isError } = useGetInfoQuery();
  const [regenerate] = useRegenerateDocMutation();
  const [deleteVersion] = useDeleteVersionMutation();
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [versionToDelete, setVersionToDelete] = React.useState();
  const { allowedActions, isLoading: isLoadingRBAC } = useRBAC(PERMISSIONS);
  const isLoading = isLoadingInfo || isLoadingRBAC;
  const colCount = 4;
  const rowCount = (data?.docVersions?.length || 0) + 1;
  const handleRegenerateDoc = (version) => {
    regenerate({ version }).unwrap().then(() => {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("notification.generate.success"),
          defaultMessage: "Successfully generated documentation"
        })
      });
    }).catch((err) => {
      toggleNotification({
        type: "warning",
        message: formatAPIError(err)
      });
    });
  };
  const handleConfirmDelete = async () => {
    if (!versionToDelete) {
      return;
    }
    await deleteVersion({ version: versionToDelete }).unwrap().then(() => {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("notification.delete.success"),
          defaultMessage: "Successfully deleted documentation"
        })
      });
    }).catch((err) => {
      toggleNotification({
        type: "warning",
        message: formatAPIError(err)
      });
    });
    setShowConfirmDelete(!showConfirmDelete);
  };
  const handleClickDelete = (version) => {
    setVersionToDelete(version);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const title = formatMessage({
    id: getTrad("plugin.name"),
    defaultMessage: "Documentation"
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (isError) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsxs(Layouts.Root, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: title }),
    /* @__PURE__ */ jsxs(Page.Main, { children: [
      /* @__PURE__ */ jsx(
        Layouts.Header,
        {
          title,
          subtitle: formatMessage({
            id: getTrad("pages.PluginPage.header.description"),
            defaultMessage: "Configure the documentation plugin"
          }),
          primaryAction: /* @__PURE__ */ jsx(
            OpenDocLink,
            {
              disabled: !allowedActions.canRead || !data?.currentVersion || !data?.prefix,
              href: createDocumentationHref(`${data?.prefix}/v${data?.currentVersion}`),
              startIcon: /* @__PURE__ */ jsx(Eye, {}),
              children: formatMessage({
                id: getTrad("pages.PluginPage.Button.open"),
                defaultMessage: "Open Documentation"
              })
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(Layouts.Content, { children: data?.docVersions.length ? /* @__PURE__ */ jsxs(Table, { colCount, rowCount, children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
            id: getTrad("pages.PluginPage.table.version"),
            defaultMessage: "Version"
          }) }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
            id: getTrad("pages.PluginPage.table.generated"),
            defaultMessage: "Last Generated"
          }) }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: data.docVersions.slice(0).sort((a, b) => a.generatedDate < b.generatedDate ? 1 : -1).map((doc) => /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Td, { width: "50%", children: /* @__PURE__ */ jsx(Typography, { children: doc.version }) }),
          /* @__PURE__ */ jsx(Td, { width: "50%", children: /* @__PURE__ */ jsx(Typography, { children: doc.generatedDate }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "end", onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ jsx(
              IconButton,
              {
                tag: "a",
                disabled: !allowedActions.canRead,
                href: createDocumentationHref(`${data.prefix}/v${doc.version}`),
                variant: "ghost",
                target: "_blank",
                rel: "noopener noreferrer",
                label: formatMessage(
                  {
                    id: getTrad("pages.PluginPage.table.icon.show"),
                    defaultMessage: "Open {target}"
                  },
                  { target: `${doc.version}` }
                ),
                children: /* @__PURE__ */ jsx(Eye, {})
              }
            ),
            allowedActions.canRegenerate ? /* @__PURE__ */ jsx(
              IconButton,
              {
                onClick: () => handleRegenerateDoc(doc.version),
                variant: "ghost",
                label: formatMessage(
                  {
                    id: getTrad("pages.PluginPage.table.icon.regenerate"),
                    defaultMessage: "Regenerate {target}"
                  },
                  { target: `${doc.version}` }
                ),
                children: /* @__PURE__ */ jsx(ArrowClockwise, {})
              }
            ) : null,
            allowedActions.canUpdate && doc.version !== data.currentVersion ? /* @__PURE__ */ jsx(
              IconButton,
              {
                onClick: () => handleClickDelete(doc.version),
                variant: "ghost",
                label: formatMessage(
                  {
                    id: "global.delete-target",
                    defaultMessage: "Delete {target}"
                  },
                  { target: `${doc.version}` }
                ),
                children: /* @__PURE__ */ jsx(Trash, {})
              }
            ) : null
          ] }) })
        ] }, doc.version)) })
      ] }) : /* @__PURE__ */ jsx(EmptyStateLayout, { content: "", icon: null }) }),
      /* @__PURE__ */ jsx(Dialog.Root, { open: showConfirmDelete, onOpenChange: setShowConfirmDelete, children: /* @__PURE__ */ jsx(ConfirmDialog, { onConfirm: handleConfirmDelete }) })
    ] })
  ] });
};
const OpenDocLink = styled(LinkButton)`
  text-decoration: none;
`;
const createDocumentationHref = (path) => {
  if (path.startsWith("http")) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${window.strapi.backendURL}${path}`;
  }
  return `${window.strapi.backendURL}/${path}`;
};
export {
  App
};
