'use strict';

const jsxRuntime = require('react/jsx-runtime');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const styledComponents = require('styled-components');
const index = require('./index-EeNFKp50.js');
const React = require('react');
const dateFns = require('date-fns');
const Theme = require('./Theme-B3Vl7PO-.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
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

const React__namespace = /*#__PURE__*/_interopNamespace(React);

const intervals = ["years", "months", "days", "hours", "minutes", "seconds"];
const RelativeTime = React__namespace.forwardRef(
  ({ timestamp, customIntervals = [], ...restProps }, forwardedRef) => {
    const { formatRelativeTime, formatDate, formatTime } = reactIntl.useIntl();
    const interval = dateFns.intervalToDuration({
      start: timestamp,
      end: Date.now()
      // see https://github.com/date-fns/date-fns/issues/2891 – No idea why it's all partial it returns it every time.
    });
    const unit = intervals.find((intervalUnit) => {
      return interval[intervalUnit] > 0 && Object.keys(interval).includes(intervalUnit);
    });
    const relativeTime = dateFns.isPast(timestamp) ? -interval[unit] : interval[unit];
    const customInterval = customIntervals.find(
      (custom) => interval[custom.unit] < custom.threshold
    );
    const displayText = customInterval ? customInterval.text : formatRelativeTime(relativeTime, unit, { numeric: "auto" });
    return /* @__PURE__ */ jsxRuntime.jsx(
      "time",
      {
        ref: forwardedRef,
        dateTime: timestamp.toISOString(),
        role: "time",
        title: `${formatDate(timestamp)} ${formatTime(timestamp)}`,
        ...restProps,
        children: displayText
      }
    );
  }
);

const Table = ({
  permissions,
  headers = [],
  isLoading = false,
  tokens = [],
  onConfirmDelete,
  tokenType
}) => {
  const [{ query }] = Theme.useQueryParams();
  const { formatMessage, locale } = reactIntl.useIntl();
  const [, sortOrder] = query && query.sort ? query.sort.split(":") : [void 0, "ASC"];
  const navigate = reactRouterDom.useNavigate();
  const { trackUsage } = Theme.useTracking();
  const formatter = designSystem.useCollator(locale);
  const sortedTokens = [...tokens].sort((a, b) => {
    return sortOrder === "DESC" ? formatter.compare(b.name, a.name) : formatter.compare(a.name, b.name);
  });
  const { canDelete, canUpdate, canRead } = permissions;
  const handleRowClick = (id) => () => {
    if (canRead) {
      trackUsage("willEditTokenFromList", {
        tokenType
      });
      navigate(id.toString());
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(index.Table.Root, { headers, rows: sortedTokens, isLoading, children: /* @__PURE__ */ jsxRuntime.jsxs(index.Table.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(index.Table.Head, { children: headers.map((header) => /* @__PURE__ */ jsxRuntime.jsx(index.Table.HeaderCell, { ...header }, header.name)) }),
    /* @__PURE__ */ jsxRuntime.jsx(index.Table.Empty, {}),
    /* @__PURE__ */ jsxRuntime.jsx(index.Table.Loading, {}),
    /* @__PURE__ */ jsxRuntime.jsx(index.Table.Body, { children: sortedTokens.map((token) => /* @__PURE__ */ jsxRuntime.jsxs(index.Table.Row, { onClick: handleRowClick(token.id), children: [
      /* @__PURE__ */ jsxRuntime.jsx(index.Table.Cell, { maxWidth: "25rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", fontWeight: "bold", ellipsis: true, children: token.name }) }),
      /* @__PURE__ */ jsxRuntime.jsx(index.Table.Cell, { maxWidth: "25rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", ellipsis: true, children: token.description }) }),
      /* @__PURE__ */ jsxRuntime.jsx(index.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: /* @__PURE__ */ jsxRuntime.jsx(RelativeTime, { timestamp: new Date(token.createdAt) }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(index.Table.Cell, { children: token.lastUsedAt && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: /* @__PURE__ */ jsxRuntime.jsx(
        RelativeTime,
        {
          timestamp: new Date(token.lastUsedAt),
          customIntervals: [
            {
              unit: "hours",
              threshold: 1,
              text: formatMessage({
                id: "Settings.apiTokens.lastHour",
                defaultMessage: "last hour"
              })
            }
          ]
        }
      ) }) }),
      canUpdate || canRead || canDelete ? /* @__PURE__ */ jsxRuntime.jsx(index.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", children: [
        canUpdate && /* @__PURE__ */ jsxRuntime.jsx(UpdateButton, { tokenName: token.name, tokenId: token.id }),
        canDelete && /* @__PURE__ */ jsxRuntime.jsx(
          DeleteButton,
          {
            tokenName: token.name,
            onClickDelete: () => onConfirmDelete?.(token.id),
            tokenType
          }
        )
      ] }) }) : null
    ] }, token.id)) })
  ] }) });
};
const MESSAGES_MAP = {
  edit: {
    id: "app.component.table.edit",
    defaultMessage: "Edit {target}"
  },
  read: {
    id: "app.component.table.read",
    defaultMessage: "Read {target}"
  }
};
const DefaultButton = ({
  tokenName,
  tokenId,
  buttonType = "edit",
  children
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    LinkButtonStyled,
    {
      tag: reactRouterDom.NavLink,
      to: tokenId.toString(),
      onClick: (e) => e.stopPropagation(),
      title: formatMessage(MESSAGES_MAP[buttonType], { target: tokenName }),
      variant: "ghost",
      size: "S",
      children
    }
  );
};
const LinkButtonStyled = styledComponents.styled(designSystem.LinkButton)`
  padding: 0.7rem;

  & > span {
    display: flex;
  }
`;
const DeleteButton = ({ tokenName, onClickDelete, tokenType }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = Theme.useTracking();
  const handleClickDelete = () => {
    trackUsage("willDeleteToken", {
      tokenType
    });
    onClickDelete();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 1, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        label: formatMessage(
          {
            id: "global.delete-target",
            defaultMessage: "Delete {target}"
          },
          { target: `${tokenName}` }
        ),
        name: "delete",
        variant: "ghost",
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(index.ConfirmDialog, { onConfirm: handleClickDelete })
  ] }) });
};
const UpdateButton = ({ tokenName, tokenId }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(DefaultButton, { tokenName, tokenId, children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}) });
};

exports.Table = Table;
//# sourceMappingURL=Table-DzAeKb71.js.map
