import { useState } from "react";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
    },
    {
      id: "profile",
      label: "Profile",
    },
    {
      id: "requests",
      label: "Requests",
    },
    {
      id: "notifications",
      label: "Notifications",
    },
  ];

  function handleNavigation(id) {
    setActiveItem(id);
    setMenuOpen(false);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className="dashboard-layout">
      <button
        className="menu-button"
        type="button"
        aria-label="Open dashboard menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar__brand">
          <h2>PulsePoint</h2>
        </div>

        <nav className="sidebar__nav" aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeItem === item.id ? "active" : ""}
              onClick={() => handleNavigation(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}

export default DashboardLayout;
