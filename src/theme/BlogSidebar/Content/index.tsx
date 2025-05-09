import React, { memo, type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { groupBlogSidebarItemsByYear, useBlogPost } from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';
import type { Props } from '@theme/BlogSidebar/Content';

function BlogSidebarYearGroup({
  year,
  yearGroupHeadingClassName,
  children,
}: {
  year: string;
  yearGroupHeadingClassName?: string;
  children: ReactNode;
}) {
  return (
    <div role="group">
      <Heading as="h3" className={yearGroupHeadingClassName}>
        {year}
      </Heading>
      {children}
    </div>
  );
}

function BlogSidebarContent({
  items,
  yearGroupHeadingClassName,
  ListComponent,
}: Props): ReactNode {

  const itemsByYear: any[] = [
    ['منشورات عامة', []],
    ['علوم الحاسب', []],
    ['هندسة البرمجيات', []],
    ['هندسة الحاسب', []],
    ['الذكاء الاصطناعي', []],
    ['تفاعل الانسان مع الحاسب', []],
    ['علم البيانات', []],
    ['الأمن السيبراني', []],
  ];

  items.forEach((item) => {
    const folder = item.permalink.split('/')[2];
    switch (folder) {
      case 'cs-exp':
        itemsByYear[1][1].push(item);
        break;
      case 'se-exp':
        itemsByYear[2][1].push(item);
        break;
      case 'cne-exp':
        itemsByYear[3][1].push(item);
        break;
      case 'ai-exp':
        itemsByYear[4][1].push(item);
        break;
      case 'hci-exp':
        itemsByYear[5][1].push(item);
        break;
      case 'ds-exp':
        itemsByYear[6][1].push(item);
        break;
      case 'sec-exp':
        itemsByYear[7][1].push(item);
        break;
      default:
        itemsByYear[0][1].push(item);
    }
  });


  return (
    <>
      {itemsByYear.map(([year, yearItems]) => {

        if (yearItems.length === 0) {
          return null;
        }

        return (
          <BlogSidebarYearGroup
            key={year}
            year={year}
            yearGroupHeadingClassName={yearGroupHeadingClassName}>
            <ListComponent items={yearItems} />
          </BlogSidebarYearGroup>
        );
      })}
    </>
  );
}

export default memo(BlogSidebarContent);
