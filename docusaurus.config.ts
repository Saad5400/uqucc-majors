import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'تخصصات كلية الحاسبات',
  tagline: 'تعرف ع تخصصات كلية الحاسبات بجامعة أم القرى',
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
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarTitle: 'آخر المقالات',
          blogSidebarCount: 5,
          categories: [
            {
              name: 'علوم الحاسب الآلي',
              path: '/blog/category/علوم-الحاسب-الآلي',
            },
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
};

export default config;
