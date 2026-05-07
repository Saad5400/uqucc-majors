import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'تخصصات الحاسب',
  tagline: 'تعرف ع تخصصات الحاسب',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'http://uqucis-majors.sb.sa',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Saad5400', // Usually your GitHub org/user name.
  projectName: 'uqucis-majors', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar'],
  },

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'حملة اختيار التخصص',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.png',
        href: '/',
      },
      items: [
        {
          to: '/',
          label: 'الرئيسية',
          position: 'right',
        },
        {
          to: '/#majors',
          label: 'استكشف التخصصات',
          position: 'right',
        },
        {
          to: '/blog',
          label: 'تجارب الطلاب',
          position: 'right',
        },
        {
          to: '/contribute',
          label: 'ساهم معنا',
          position: 'right',
        },
      ],
    },
    blog: {
      sidebar: {
        groupByYear: false,
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} حملة اختيار التخصص — جميع الحقوق محفوظة`,
      style: 'light',
      links: [
        {
          title: 'ابدأ هنا',
          items: [
            { label: 'الرئيسية', to: '/' },
            { label: 'تجارب الطلاب', to: '/blog' },
            { label: 'كنز طلاب الحاسب', to: '/blog/other/students-kit' },
            { label: 'ساهم معنا', to: '/contribute' },
          ],
        },
        {
          title: 'المحتوى',
          items: [
            { label: 'المساهمون', to: '/contributors' },
            { label: 'دليل المساهمة', to: '/contribute' },
            { label: 'الرئيسية', to: '/' },
            { label: 'تجارب الطلاب', to: '/blog' },
          ],
        },
        {
          title: 'المجتمع',
          items: [
            { label: 'قروب المناقشة العام', href: 'https://t.me/uqucc_chat' },
            { label: 'قناة الحملة', href: 'https://t.me/uquccmajors' },
            { label: 'دليل طالب الحاسبات', href: 'https://uqucc.sb.sa/' },
            { label: 'ساهم بالمشروع', to: '/contribute' },
          ],
        },
      ],
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
          routeBasePath: '/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom', 'json'],
            xslt: true,
          },
          postsPerPage: 'ALL',
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarTitle: 'آخر المقالات',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-Q3PPGDZQP1',
          anonymizeIP: true,
        }
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        docsRouteBasePath: '/',
        hashed: true,
        language: ["en", "ar"],
      }),
    ],
  ],
};

export default config;
