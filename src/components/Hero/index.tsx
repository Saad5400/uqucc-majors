import React from 'react';
import Link from '@docusaurus/Link';
import { LuGraduationCap, LuArrowDown, LuUsers } from 'react-icons/lu';
import styles from './styles.module.css';

type HeroProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function Hero({
  badge = 'مبادرة طلابية غير رسمية',
  title,
  subtitle,
  primaryCtaLabel = 'استكشف التخصصات',
  primaryCtaHref = '#majors',
  secondaryCtaLabel = 'تجارب الطلاب',
  secondaryCtaHref = '/blog',
}: HeroProps) {
  return (
    <section className={styles.hero} aria-label="hero">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.heroInner}>
        {badge && (
          <span className={styles.badge}>
            <LuGraduationCap aria-hidden="true" />
            {badge}
          </span>
        )}

        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <div className={styles.actions}>
          <Link to={primaryCtaHref} className={styles.primaryBtn}>
            <LuArrowDown aria-hidden="true" />
            {primaryCtaLabel}
          </Link>
          <Link to={secondaryCtaHref} className={styles.secondaryBtn}>
            <LuUsers aria-hidden="true" />
            {secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
