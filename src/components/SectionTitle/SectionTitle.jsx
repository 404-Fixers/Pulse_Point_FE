import "./SectionTitle.css";

function SectionTitle({ title, text }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>

      {text && <p>{text}</p>}
    </div>
  );
}

export default SectionTitle;
