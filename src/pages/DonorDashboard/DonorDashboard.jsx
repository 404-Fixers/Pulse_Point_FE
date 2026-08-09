import { useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import "./DonorDashboard.css";

function DonorDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <DashboardLayout>
      <div className="donor-dashboard">
        {/* Dashboard Header */}
        <section id="dashboard" className="donor-dashboard__header">
          <div>
            <p className="donor-dashboard__eyebrow">DONOR DASHBOARD</p>

            <h1>Welcome back, Temitope.</h1>

            <p>Thank you for being willing to help save lives.</p>
          </div>

          <button
            type="button"
            className={`donor-dashboard__status ${
              isAvailable ? "available" : "unavailable"
            }`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            {isAvailable ? "Available to Donate" : "Currently Unavailable"}
          </button>
        </section>

        {/* Donor Stats */}
        <section className="donor-dashboard__stats">
          <article className="donor-dashboard__card">
            <span>Blood Group</span>
            <strong>O+</strong>
          </article>

          <article className="donor-dashboard__card">
            <span>Last Donation</span>
            <strong>12 Jun 2026</strong>
          </article>

          <article className="donor-dashboard__card">
            <span>Next Eligible Date</span>
            <strong>12 Aug 2026</strong>
          </article>
        </section>

        {/* Profile */}
        <section
          id="profile"
          className="donor-dashboard__section donor-dashboard__profile"
        >
          <div className="donor-dashboard__section-header">
            <div>
              <p className="donor-dashboard__eyebrow">YOUR PROFILE</p>
              <h2>Profile</h2>
            </div>
          </div>

          <div className="donor-dashboard__profile-card">
            <div>
              <span>Full Name</span>
              <strong>Temitope</strong>
            </div>

            <div>
              <span>Email Address</span>
              <strong>Not added yet</strong>
            </div>

            <div>
              <span>Phone Number</span>
              <strong>Not added yet</strong>
            </div>

            <div>
              <span>Blood Group</span>
              <strong>O+</strong>
            </div>
          </div>
        </section>

        {/* Blood Requests */}
        <section
          id="requests"
          className="donor-dashboard__section donor-dashboard__requests"
        >
          <div className="donor-dashboard__section-header">
            <div>
              <p className="donor-dashboard__eyebrow">NEARBY</p>
              <h2>Blood Requests</h2>
            </div>
          </div>

          <div className="donor-dashboard__request-list">
            <article className="donor-dashboard__request">
              <div className="donor-dashboard__request-info">
                <span className="donor-dashboard__urgency">URGENT</span>

                <h3>O+ Blood Needed</h3>

                <p>Lagos University Teaching Hospital</p>

                <span>2.4 km away</span>
              </div>

              <button type="button">Respond</button>
            </article>

            <article className="donor-dashboard__request">
              <div className="donor-dashboard__request-info">
                <span className="donor-dashboard__urgency">URGENT</span>

                <h3>O+ Blood Needed</h3>

                <p>National Hospital, Lagos</p>

                <span>5.1 km away</span>
              </div>

              <button type="button">Respond</button>
            </article>
          </div>
        </section>

        {/* Notifications */}
        <section
          id="notifications"
          className="donor-dashboard__section donor-dashboard__notifications"
        >
          <div className="donor-dashboard__section-header">
            <div>
              <p className="donor-dashboard__eyebrow">UPDATES</p>
              <h2>Notifications</h2>
            </div>
          </div>

          <div className="donor-dashboard__empty">
            <h3>No new notifications.</h3>

            <p>
              Important updates about blood requests, donations, and your
              account will appear here.
            </p>
          </div>
        </section>

        {/* Donation History */}
        <section className="donor-dashboard__section donor-dashboard__history">
          <div className="donor-dashboard__section-header">
            <div>
              <p className="donor-dashboard__eyebrow">YOUR ACTIVITY</p>
              <h2>Donation History</h2>
            </div>
          </div>

          <div className="donor-dashboard__empty">
            <h3>No donation history yet.</h3>

            <p>
              Every donation you make through PulsePoint will be recorded here.
            </p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default DonorDashboard;
