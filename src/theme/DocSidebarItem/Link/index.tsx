import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/DocSidebarItem/Link';
import {
  LuHouse,
  LuCpu,
  LuNetwork,
  LuCode,
  LuDatabase,
  LuShieldCheck,
  LuBrainCircuit,
  LuMousePointerClick,
  LuUsers,
  LuHeart,
} from 'react-icons/lu';
import styles from './styles.module.css';

type IconCmp = React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;

const ICONS_BY_HREF: Record<string, IconCmp> = {
  '/': LuHouse,
  '/cs': LuCpu,
  '/cne': LuNetwork,
  '/se': LuCode,
  '/ds': LuDatabase,
  '/sec': LuShieldCheck,
  '/ai': LuBrainCircuit,
  '/hci': LuMousePointerClick,
  '/contributors': LuUsers,
  '/contribute': LuHeart,
};

function pickIcon(href?: string, docId?: string): IconCmp | null {
  if (!href) return null;
  const normalized = href.replace(/\/+$/, '') || '/';
  if (ICONS_BY_HREF[normalized]) return ICONS_BY_HREF[normalized];

  const id = (docId ?? '').toLowerCase();
  if (id && ICONS_BY_HREF[`/${id}`]) return ICONS_BY_HREF[`/${id}`];

  return null;
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const { href, label, className, autoAddBaseUrl } = item;
  const docId = (item as unknown as { docId?: string }).docId;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const Icon = pickIcon(href, docId);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        {Icon && (
          <span className={styles.icon} aria-hidden="true">
            <Icon size={18} />
          </span>
        )}
        <span className={styles.label}>{label}</span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
