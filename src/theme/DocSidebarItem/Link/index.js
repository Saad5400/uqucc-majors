import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import { LuHouse, LuCpu, LuNetwork, LuCode, LuDatabase, LuShieldCheck, LuBrainCircuit, LuMousePointerClick, LuUsers, LuHeart, } from 'react-icons/lu';
import styles from './styles.module.css';
const ICONS_BY_HREF = {
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
function pickIcon(href, docId) {
    if (!href)
        return null;
    const normalized = href.replace(/\/+$/, '') || '/';
    if (ICONS_BY_HREF[normalized])
        return ICONS_BY_HREF[normalized];
    const id = (docId ?? '').toLowerCase();
    if (id && ICONS_BY_HREF[`/${id}`])
        return ICONS_BY_HREF[`/${id}`];
    return null;
}
export default function DocSidebarItemLink({ item, onItemClick, activePath, level, index, ...props }) {
    const { href, label, className, autoAddBaseUrl } = item;
    const docId = item.docId;
    const isActive = isActiveSidebarItem(item, activePath);
    const isInternalLink = isInternalUrl(href);
    const Icon = pickIcon(href, docId);
    return (<li className={clsx(ThemeClassNames.docs.docSidebarItemLink, ThemeClassNames.docs.docSidebarItemLinkLevel(level), 'menu__list-item', className)} key={label}>
      <Link className={clsx('menu__link', !isInternalLink && styles.menuExternalLink, {
            'menu__link--active': isActive,
        })} autoAddBaseUrl={autoAddBaseUrl} aria-current={isActive ? 'page' : undefined} to={href} {...(isInternalLink && {
        onClick: onItemClick ? () => onItemClick(item) : undefined,
    })} {...props}>
        {Icon && (<span className={styles.icon} aria-hidden="true">
            <Icon size={18}/>
          </span>)}
        <span className={styles.label}>{label}</span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>);
}
