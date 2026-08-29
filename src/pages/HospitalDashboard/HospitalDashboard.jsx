import { useState } from "react";
import "./HospitalDashboard.css";
import BloodRequestModal from "../../components/BloodRequestModal/BloodRequestModal"

function HospitalDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCreateRequest(formData) {
    console.log("Submitting blood request:", formData);
    const token = localStorage.getItem("token");

    return fetch(`${import.meta.env.VITE_API_URL}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create blood request.");
      }
      return response.json();
    });
  }

  return (
    <main className="hospital-dashboard">
      <header className="hospital-dashboard__header">
        <div>
          <p className="hospital-dashboard__eyebrow">HOSPITAL DASHBOARD</p>
          <h1>Welcome back, Hospital.</h1>
          <p>Manage your blood requests and track donor activity.</p>
        </div>

        <button type="button" className="hospital-dashboard__create" onClick={() => setIsModalOpen(true)}>
          + Create Blood Request
        </button>
      </header>

      {/* Dashboard Statistics */}
      <section className="hospital-dashboard__stats">
        <article className="hospital-stat-card">
          <span>Active Requests</span>
          <strong>4</strong>
        </article>

        <article className="hospital-stat-card">
          <span>Completed Requests</span>
          <strong>12</strong>
        </article>

        <article className="hospital-stat-card">
          <span>Pending Requests</span>
          <strong>2</strong>
        </article>

        <article className="hospital-stat-card">
          <span>Units Received</span>
          <strong>28</strong>
        </article>
      </section>

      {/* Active Blood Requests */}
      <section className="hospital-dashboard__section">
        <div className="hospital-dashboard__section-header">
          <p className="hospital-dashboard__eyebrow">CURRENT REQUESTS</p>
          <h2>Active Blood Requests</h2>
        </div>

        <div className="hospital-request-list">
          <article className="hospital-request-card">
            <div>
              <span className="hospital-request-card__blood">O+</span>

              <div>
                <h3>Emergency Surgery</h3>
                <p>4 units required • Lekki</p>
              </div>
            </div>

            <div className="hospital-request-card__details">
              <span className="urgency urgency--critical">Critical</span>
              <span className="request-status">Matched</span>
            </div>
          </article>

          <article className="hospital-request-card">
            <div>
              <span className="hospital-request-card__blood">A+</span>

              <div>
                <h3>Patient Treatment</h3>
                <p>2 units required • Ikeja</p>
              </div>
            </div>

            <div className="hospital-request-card__details">
              <span className="urgency urgency--urgent">Urgent</span>
              <span className="request-status">Pending</span>
            </div>
          </article>
        </div>
      </section>

      {/* Request History */}
      <section className="hospital-dashboard__section">
        <div className="hospital-dashboard__section-header">
          <p className="hospital-dashboard__eyebrow">HISTORY</p>
          <h2>Request History</h2>
        </div>

        <div className="hospital-history">
          <div className="hospital-history__row">
            <div>
              <strong>O- Blood Request</strong>
              <span>6 units • Completed</span>
            </div>

            <span>15 Aug 2026</span>
          </div>

          <div className="hospital-history__row">
            <div>
              <strong>B+ Blood Request</strong>
              <span>3 units • Completed</span>
            </div>

            <span>10 Aug 2026</span>
          </div>

          <div className="hospital-history__row">
            <div>
              <strong>AB+ Blood Request</strong>
              <span>2 units • Completed</span>
            </div>

            <span>04 Aug 2026</span>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="hospital-dashboard__section">
        <div className="hospital-dashboard__section-header">
          <p className="hospital-dashboard__eyebrow">ACTIVITY</p>
          <h2>Recent Activity</h2>
        </div>

        <div className="hospital-activity">
          <div className="hospital-activity__item">
            <span>✓</span>

            <div>
              <strong>Donor matched</strong>
              <p>A donor has been matched to your O+ request.</p>
              <small>10 minutes ago</small>
            </div>
          </div>

          <div className="hospital-activity__item">
            <span>+</span>

            <div>
              <strong>Request created</strong>
              <p>Your A+ blood request was successfully created.</p>
              <small>1 hour ago</small>
            </div>
          </div>

          <div className="hospital-activity__item">
            <span>✓</span>

            <div>
              <strong>Donation confirmed</strong>
              <p>2 units have been confirmed for your hospital.</p>
              <small>Yesterday</small>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="hospital-dashboard__section">
        <div className="hospital-dashboard__section-header">
          <p className="hospital-dashboard__eyebrow">UPDATES</p>
          <h2>Notifications</h2>
        </div>

        <div className="hospital-notifications">
          <div className="hospital-notification">
            <span>!</span>
            <p>Your critical O+ request has been matched with a donor.</p>
          </div>

          <div className="hospital-notification">
            <span>!</span>
            <p>You have 2 active blood requests that need attention.</p>
          </div>

          <div className="hospital-notification">
            <span>✓</span>
            <p>Your recent donation request has been completed.</p>
          </div>
        </div>
      </section>
      <BloodRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRequest}
      />
    </main>
  );
}

export default HospitalDashboard;
