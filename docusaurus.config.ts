module.exports = {
  title: 'تخصصات كلية الحاسبات',
  tagline: 'تعرف على تخصصات كلية الحاسبات بجامعة أم القرى',
  favicon: 'img/favicon.png',

  url: 'https://uqucc-majors.sb.sa',
  baseUrl: '/',
  
  organizationName: 'Saad5400',
  projectName: 'uqucis-majors',
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),  // تأكد من المسار الصحيح للسايدبار
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
        },
        blog: {
          blogSidebarTitle: 'كل المقالات',
          blogSidebarCount: 'ALL',
          editUrl: 'https://github.com/Saad5400/uqucis-majors/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'تخصصات كلية الحاسبات',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.png',
      },
      items: [
        { to: '/blog', label: 'المدونة', position: 'left' },
        { href: 'https://github.com/Saad5400/uqucis-majors', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'light',
      copyright: `جميع الحقوق محفوظة © ${new Date().getFullYear()} فريق مبادرة اختيار التخصص`,
    },
  },
};
