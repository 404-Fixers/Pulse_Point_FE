import "./Button.css";

function Button({ children, variant = "primary", href = "#" }) {
  return (
    <a href={href} className={`button button--${variant}`}>
      {children}
    </a>
  );
}

export default Button;
