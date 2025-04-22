import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'تخصصات كلية الحاسبات',
  tagline: 'تعرف على تخصصات كلية الحاسبات بجامعة أم القرى',
  favicon: 'img/favicon.png',
  url: 'http://uqucis-majors.sb.sa',
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
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          postsPerPage: 4,
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
          blogSidebarTitle: 'التخصصات الأكاديمية',
          blogSidebarCount: 'ALL',
          // إعدادات التصنيفات الجديدة
          tags: {
            path: 'src/pages/tags', // مسار صفحات التصنيفات
            allTagsPath: '/tags', // الصفحة الرئيسية للتصنيفات
          },
          // إعدادات إضافية للتحسين
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // إضافة التخصصات للشريط العلوي
    navbar: {
      title: 'كلية الحاسبات',
      items: [
        {
          to: '/tags/علوم-الحاسب',
          label: 'علوم الحاسب',
          position: 'left',
        },
        {
          to: '/tags/هندسة-البرمجيات',
          label: 'هندسة البرمجيات',
          position: 'left',
        },
        {
          to: '/tags/hci',
          label: 'HCI',
          position: 'left',
        },
        {
          href: 'https://github.com/Saad5400/uqucis-majors',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // إعدادات إضافية للتصميم
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'python'], // إضافة لغات برمجة
    },
  },
};

export default config;
