// We no longer support light ("bright") mode. The site is dark-only via the
// `colorMode` config (defaultMode: 'dark', disableSwitch: true). However,
// Docusaurus's color-mode init script still honors a `theme` value persisted
// in localStorage, so returning users who once selected light mode stay stuck
// on it. Wipe that stale preference and force the dark theme.
if (typeof window !== 'undefined') {
  try {
    if (localStorage.getItem('theme') !== null) {
      localStorage.removeItem('theme');
    }
  } catch {
    // localStorage may be unavailable (private mode, blocked cookies); ignore.
  }
  document.documentElement.setAttribute('data-theme', 'dark');
}
