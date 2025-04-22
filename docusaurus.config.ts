import {themes as prismThemes} from 'prism-react-renderer';
 import type {Config} from '@docusaurus/types';
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
 
   presets: [
     [
       'classic',
       {
         docs: {
           sidebarPath: './sidebars.ts',
           // Please change this to your repo.
           // Remove this to remove the "edit this page" links.
           editUrl:
             'https://github.com/Saad5400/uqucis-majors/tree/main/',
         },
         blog: {
           blogSidebarTitle: 'كل المقالات', 
           blogSidebarCount: 'ALL',  
           showReadingTime: true,
           feedOptions: {
             type: ['rss', 'atom'],
             xslt: true,
 
           },
           // Please change this to your repo.
           // Remove this to remove the "edit this page" links.
           editUrl:
             'https://github.com/Saad5400/uqucis-majors/tree/main/',
           // Useful options to enforce blogging best practices
           onInlineTags: 'warn',
           onInlineAuthors: 'warn',
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
 };

export default config;
