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
    title: 'مبادرة طلابية',
    description: 'دليل معرفي مقدم من الطلاب بشكل مستقل، يهدف لنقل التجارب الواقعية بكل شفافية وبدون قيود أكاديمية.'
  },
  {
    id: 'student-kit',
    Icon: LuExternalLink, 
    title: 'كنز طلاب الحاسب',
    description: 'مجموعة متكاملة من المصادر، الأدوات، والمواقع المساعدة التي يحتاجها كل طالب خلال مسيرته الدراسية.',
    href: '/blog/other/students-kit',
    ctaLabel: 'تصفح المصادر',
    external: false
  },
  {
    id: 'contribute',
    Icon: LuMessageCircle,
    title: 'ساهم في إثراء المحتوى',
    description: 'لأن المعرفة تتطور بالتعاون؛ نرحب بمشاركتك لتجربتك أو إضافة وتعديل أي معلومات لإفادة زملائك الطلاب.',
    href: '/contribute',
    ctaLabel: 'شاركنا تجربتك',
    external: false
  }
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
