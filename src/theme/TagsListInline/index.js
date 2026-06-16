import React from 'react';
import clsx from 'clsx';
import Tag from '@theme/Tag';
import styles from './styles.module.css';
export default function TagsListInline({ tags }) {
    return (<>
      <ul className={clsx(styles.tags, 'padding--none', 'margin-left--sm')}>
        {tags.map((tag) => (<li key={tag.permalink} className={styles.tag}>
            <Tag {...tag}/>
          </li>))}
      </ul>
    </>);
}
