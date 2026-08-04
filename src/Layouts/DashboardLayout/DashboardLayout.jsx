import { useState } from "react";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [menuOpen, setMenuOpen] = useState(false);

    return (

    <div className="dashboard-layout">
      <button
  className="menu-button"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2 className="logo">PulsePoint</h2>

        <nav>
  {["Dashboard", "Profile", "Requests", "Notifications"].map((item) => (
    <a
      key={item}
      href="#"
      className={activeItem === item ? "active" : ""}
      onClick={() => setActiveItem(item)}
    >
      {item}
    </a>
  ))}
</nav>
      </aside>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}

export default DashboardLayout;
