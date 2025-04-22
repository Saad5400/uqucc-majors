import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'تخصصات كلية الحاسبات',
  tagline: 'تعرف على تخصصات كلية الحاسبات بجامعة أم القرى',
  favicon: 'img/favicon.png',

  url: 'http://uqucc-majors.sb.sa',  // رابط الموقع
  baseUrl: '/',
  organizationName: 'Saad5400',
  projectName: 'uqucis-majors',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ar',
    locales: ['ar'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),  // مسار السايدبار هنا
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
        },
        blog: {
          blogSidebarTitle: 'كل المقالات',  // عنوان السايدبار
          blogSidebarCount: 'ALL',  // عرض جميع المقالات في السايدبار
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'تخصصات كلية الحاسبات',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.png',
        href: '/docs/intro',
      },
      items: [
        {to: '/blog', label: 'المدونة', position: 'left'},
        {href: 'https://github.com/Saad5400/uqucis-majors', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      copyright: `جميع الحقوق محفوظة © ${new Date().getFullYear()} فريق مبادرة اختيار التخصص`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    sidebar: {
      position: 'right',  // تعيين السايدبار ليتواجد على اليمين
    },
  },
};

export default config;
