import "./Badge.css";

function Badge({ children, type = "default" }) {
  return <span className={`badge ${type}`}>{children}</span>;
}

export default Badge;
