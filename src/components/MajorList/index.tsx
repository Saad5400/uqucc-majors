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
    accent: '#e85d04',
  },
  {
    id: 'cne',
    label: 'هندسة الحاسب والشبكات',
    description: 'تصميم الأجهزة والأنظمة المدمجة وبنية الشبكات.',
    href: '/cne',
    Icon: LuNetwork,
    accent: '#2563eb',
  },
  {
    id: 'se',
    label: 'هندسة البرمجيات',
    description: 'بناء أنظمة برمجية متكاملة بمنهجية ومعايير جودة.',
    href: '/se',
    Icon: LuCode,
    accent: '#16a34a',
  },
  {
    id: 'ds',
    label: 'علم البيانات',
    description: 'تحليل البيانات الضخمة واستخراج رؤى ذكية منها.',
    href: '/ds',
    Icon: LuDatabase,
    accent: '#9333ea',
  },
  {
    id: 'sec',
    label: 'الأمن السيبراني',
    description: 'حماية الأنظمة والشبكات من الاختراق والهجمات.',
    href: '/sec',
    Icon: LuShieldCheck,
    accent: '#dc2626',
  },
  {
    id: 'ai',
    label: 'الذكاء الاصطناعي',
    description: 'تعلم الآلة والشبكات العصبية وبناء أنظمة ذكية.',
    href: '/ai',
    Icon: LuBrainCircuit,
    accent: '#0891b2',
  },
  {
    id: 'hci',
    label: 'تفاعل الإنسان مع الحاسب',
    description: 'تصميم تجارب وواجهات استخدام تركّز على المستخدم.',
    href: '/hci',
    Icon: LuMousePointerClick,
    accent: '#db2777',
  },
];

export default function MajorList() {
  return (
    <ul className={styles.list}>
      {majors.map(({ id, label, description, href, Icon, accent }) => (
        <li key={id} className={styles.item}>
          <Link to={href} className={styles.link} style={{ ['--accent' as any]: accent }}>
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
