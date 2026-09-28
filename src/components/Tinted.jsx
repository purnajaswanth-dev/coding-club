/** Photo card with the reference's colour tint fading up from the bottom. */
export default function Tinted({ image, alt = '', tint = 'red', className = '', style, children }) {
  return (
    <div className={`tinted t-${tint} ${className}`} style={style}>
      {image && <img src={image} alt={alt} loading="lazy" />}
      {children}
    </div>
  );
}
