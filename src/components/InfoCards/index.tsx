import React from 'react';
import Link from '@docusaurus/Link';
import { LuInfo, LuMessageCircle, LuExternalLink, LuArrowLeft } from 'react-icons/lu';
import styles from './styles.module.css';

type Card = {
  id: string;
  Icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  external?: boolean;
};

const cards: Card[] = [
  {
    id: 'unofficial',
    Icon: LuInfo,
    title: 'مبادرة طلابية غير رسمية',
    description:
      'هذه المبادرة مقدمة من الطلاب فقط بشكل غير رسمي وليست مرتبطة بالجامعة.',
  },
  {
    id: 'telegram',
    Icon: LuMessageCircle,
    title: 'انضم إلى قروب المناقشة العام',
    description: 'مجتمع طلاب كلية الحاسبات للنقاش وتبادل الخبرات والأسئلة.',
    href: 'https://t.me/uqucc_chat',
    ctaLabel: 'انضم الآن',
    external: true,
  },
  {
    id: 'guide',
    Icon: LuExternalLink,
    title: 'دليل طالب كلية الحاسبات',
    description: 'كل ما تحتاجه كطالب في الكلية في مكان واحد منظّم.',
    href: 'https://uqucc.sb.sa/',
    ctaLabel: 'افتح الدليل',
    external: true,
  },
];

export default function InfoCards() {
  return (
    <div className={styles.grid}>
      {cards.map(({ id, Icon, title, description, href, ctaLabel, external }) => {
        const isLink = !!href;
        const Wrapper = (isLink ? Link : 'div') as React.ElementType;
        const wrapperProps = isLink
          ? {
              to: href,
              ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
            }
          : {};

        return (
          <Wrapper
            key={id}
            className={`${styles.card} ${isLink ? styles.cardLink : ''}`}
            {...wrapperProps}
          >
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className={styles.body}>
              <span className={styles.title}>{title}</span>
              <span className={styles.desc}>{description}</span>
              {ctaLabel && (
                <span className={styles.cta}>
                  {ctaLabel}
                  <LuArrowLeft size={14} aria-hidden="true" />
                </span>
              )}
            </span>
          </Wrapper>
        );
      })}
    </div>
  );
}
