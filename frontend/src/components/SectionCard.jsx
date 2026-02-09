export default function SectionCard({ title, children, action }) {
  return (
    <section className="card section-card">
      <div className="section-header">
        <h3>{title}</h3>
        {action}
      </div>
      <div>{children}</div>
    </section>
  );
}
