import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'تخصصات كلية الحاسبات',
  tagline: 'تعرف ع تخصصات كلية الحاسبات بجامعة أم القرى',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'http://uqucis-majors.sb.sa',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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
    navbar: {
      title: 'تخصصات كلية الحاسبات',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.png',
        href: '/',
      },
    },
    blog: {
      sidebar: {
        groupByYear: false,
      },
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
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
