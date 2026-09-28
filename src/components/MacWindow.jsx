/** A macOS-style window frame used for videos, screenshots and code. */
export default function MacWindow({ label, children, className = '', style }) {
  return (
    <div className={`win ${className}`} style={style}>
      <div className="win-bar">
        <i /><i /><i />
        {label && <span className="label">{label}</span>}
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}
