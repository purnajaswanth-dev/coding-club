import { Link } from 'react-router-dom';
import { ArrowIcon } from './Icons';

/**
 * Reference-style button with the square icon tile.
 * variant: 'dark' | 'red' | 'white'   ·   pass `to` for internal links, `href` for external, else renders <button>.
 */
export default function Button({ to, href, variant = 'dark', icon, children, className = '', ...rest }) {
  const cls = `btn ${variant === 'red' ? 'btn-red' : variant === 'white' ? 'btn-white' : ''} ${className}`;
  const inner = (
    <>
      <span className="sq">{icon || <ArrowIcon />}</span>
      {children}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
