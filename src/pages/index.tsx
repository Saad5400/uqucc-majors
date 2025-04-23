import {useEffect} from 'react';

export default function Home(): null {
  useEffect(() => {
    window.location.href = '/intro';
  }, []);

  return null;
}
