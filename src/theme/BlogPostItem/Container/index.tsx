import React, {type ReactNode} from 'react';
import type {Props} from '@theme/BlogPostItem/Container';

export default function BlogPostItemContainer({
  children,
  className,
}: Props): ReactNode {
  return (
    <article
      className={className}
      itemProp="blogPost"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {children}
    </article>
  );
}
