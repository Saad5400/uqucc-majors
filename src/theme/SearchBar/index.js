import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import { Search } from 'lucide-react';

export default function SearchBarWrapper(props) {
  return (
    <div className="custom-search-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Search size={18} className="search-icon-lucide" />
      <SearchBar {...props} />
    </div>
  );
}
