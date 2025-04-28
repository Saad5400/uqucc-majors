import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

type Button = {
  size?: 'sm' | 'lg' | 'small' | 'medium' | 'large' | null;
  outline?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | string;
  block?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  link: string | null;
  label: string;
  imageSrc?: string;
  dimming?: number;
};

export default function Button({
  size = 'large',
  outline = false,
  variant = 'link',
  block = true,
  disabled = false,
  className,
  style,
  link,
  label,
  imageSrc,
  dimming = 0.8,
}: Button) {
  const sizeMap = { sm: 'sm', small: 'sm', lg: 'lg', large: 'lg', medium: null };
  const buttonSize = size ? sizeMap[size] : '';
  const sizeClass = buttonSize ? `button--${buttonSize}` : '';
  const outlineClass = outline ? 'button--outline' : '';
  const variantClass = variant ? `button--${variant}` : '';
  const blockClass = block ? 'button--block' : '';
  const disabledClass = disabled ? 'disabled' : '';
  const destination = disabled ? null : link;

  // If an imageSrc is provided, layer a black overlay of alpha=dimming on top of it
  const backgroundStyle: CSSProperties = imageSrc
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,${dimming}), rgba(0,0,0,${dimming})), url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <Link to={destination}>
      <button
        className={clsx(
          'button',
          sizeClass,
          outlineClass,
          variantClass,
          blockClass,
          disabledClass,
          className
        )}
        style={{ height: '5rem', ...backgroundStyle, ...style }}
        role="button"
        aria-disabled={disabled}
      >
        {label}
      </button>
    </Link>
  );
}
