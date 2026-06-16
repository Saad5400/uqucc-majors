import React from 'react';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import clsx from 'clsx';
export default function BlogPostItemContainer({ children, className, }) {
    const { isBlogPostPage } = useBlogPost();
    return (<article className={clsx(className, !isBlogPostPage && 'blog-list-item')} itemProp="blogPost" itemScope itemType="https://schema.org/BlogPosting">
      {children}
    </article>);
}
