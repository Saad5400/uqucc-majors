import React from 'react';
import Link from '@docusaurus/Link';
import {
  LuCpu,
  LuNetwork,
  LuCode,
  LuDatabase,
  LuShieldCheck,
  LuBrainCircuit,
  LuMousePointerClick,
  LuArrowLeft,
} from 'react-icons/lu';
import styles from './styles.module.css';

type Major = {
  id: string;
  label: string;
  description: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;
  accent: string;
};

const majors: Major[] = [
  {
    id: 'cs',
    label: 'علوم الحاسب الآلي',
    description: 'البرمجة، الخوارزميات، وتطوير حلول رقمية لمشكلات متنوعة.',
    href: '/cs',
    Icon: LuCpu,
    accent: '#1c1917',
  },
  {
    id: 'cne',
    label: 'هندسة الحاسب والشبكات',
    description: 'تصميم الأجهزة والأنظمة المدمجة وبنية الشبكات.',
    href: '/cne',
    Icon: LuNetwork,
    accent: '#292524',
  },
  {
    id: 'se',
    label: 'هندسة البرمجيات',
    description: 'بناء أنظمة برمجية متكاملة بمنهجية ومعايير جودة.',
    href: '/se',
    Icon: LuCode,
    accent: '#3f3f46',
  },
  {
    id: 'ds',
    label: 'علم البيانات',
    description: 'تحليل البيانات الضخمة واستخراج رؤى ذكية منها.',
    href: '/ds',
    Icon: LuDatabase,
    accent: '#44403c',
  },
  {
    id: 'sec',
    label: 'الأمن السيبراني',
    description: 'حماية الأنظمة والشبكات من الاختراق والهجمات.',
    href: '/sec',
    Icon: LuShieldCheck,
    accent: '#52525b',
  },
  {
    id: 'ai',
    label: 'الذكاء الاصطناعي',
    description: 'تعلم الآلة والشبكات العصبية وبناء أنظمة ذكية.',
    href: '/ai',
    Icon: LuBrainCircuit,
    accent: '#57534e',
  },
  {
    id: 'hci',
    label: 'تفاعل الإنسان مع الحاسب',
    description: 'تصميم تجارب وواجهات استخدام تركّز على المستخدم.',
    href: '/hci',
    Icon: LuMousePointerClick,
    accent: '#71717a',
  },
];

export default function MajorList() {
  return (
    <ul className={styles.list}>
      {majors.map(({ id, label, description, href, Icon }) => (
        <li key={id} className={styles.item}>
          <Link to={href} className={styles.link}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon size={26} />
            </span>
            <span className={styles.text}>
              <span className={styles.label}>{label}</span>
              <span className={styles.desc}>{description}</span>
            </span>
            <span className={styles.chevron} aria-hidden="true">
              <LuArrowLeft size={20} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
