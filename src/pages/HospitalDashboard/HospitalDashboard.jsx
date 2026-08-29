import { useEffect, useState } from "react";
import "./HospitalDashboard.css";
import BloodRequestModal from "../../components/BloodRequestModal/BloodRequestModal";
function HospitalDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [requestError, setRequestError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  // Load blood requests belonging to the logged-in hospital
  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      setRequestError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setRequestError("You are not logged in.");
        return;
      }
      const response = await fetch(`${API_URL}/requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to load blood requests.");
      }
      setRequests(data.data || []);
    } catch (error) {
      console.error("Error loading blood requests:", error);
      setRequestError(error.message || "Unable to load blood requests.");
    } finally {
      setLoadingRequests(false);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  // Create a new blood request
  const handleCreateRequest = async (formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are not logged in.");
    }
    const response = await fetch(`${API_URL}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bloodType: formData.bloodType,
        unitsRequired: Number(formData.units),
        urgency: formData.urgency,
        location: formData.hospital,
        reason: formData.notes,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create blood request.");
    }
    // Load the updated requests after successful creation
    await fetchRequests();
    return data;
  };
  const activeRequests = requests.filter(
    (request) =>
      request.status !== "fulfilled" &&
      request.status !== "cancelled" &&
      request.status !== "expired",
  );
  const completedRequests = requests.filter(
    (request) => request.status === "fulfilled",
  );
  const pendingRequests = requests.filter(
    (request) => request.status === "pending" || request.status === "open",
  );
  const totalUnits = requests.reduce(
    (total, request) => total + Number(request.unitsRequired || 0),
    0,
  );
  return (
    <main className="hospital-dashboard">
      <header className="hospital-dashboard__header">
        <div>
          <p className="hospital-dashboard__eyebrow">HOSPITAL DASHBOARD</p>
          <h1>Welcome back, Hospital.</h1>
          <p>Manage your blood requests and track donor activity.</p>
        </div>
        <button
          type="button"
          className="hospital-dashboard__create"
          onClick={() => setIsModalOpen(true)}
        >
          + Create Blood Request
        </button>
      </header>
      {/* Dashboard Statistics */}
      <section className="hospital-dashboard__stats">
        <article className="hospital-stat-card">
          <span>Active Requests</span>
          <strong>{activeRequests.length}</strong>
        </article>
        <article className="hospital-stat-card">
          <span>Completed Requests</span>
          <strong>{completedRequests.length}</strong>
        </article>
        <article className="hospital-stat-card">
          <span>Pending Requests</span>
          <strong>{pendingRequests.length}</strong>
        </article>
        <article className="hospital-stat-card">
          <span>Units Requested</span>
          <strong>{totalUnits}</strong>
        </article>
      </section>
      {/* Active Blood Requests */}
      <section className="hospital-dashboard__section">
        <div className="hospital-dashboard__section-header">
          <p className="hospital-dashboard__eyebrow">CURRENT REQUESTS</p>
          <h2>Active Blood Requests</h2>
        </div>
        {requestError && (
          <p className="hospital-request-error">{requestError}</p>
        )}
        <div className="hospital-request-list">
          {loadingRequests ? (
            <p>Loading blood requests...</p>
          ) : activeRequests.length === 0 ? (
            <p>No active blood requests yet.</p>
          ) : (
            activeRequests.map((request) => (
              <article className="hospital-request-card" key={request.id}>
                <div>
                  <span className="hospital-request-card__blood">
                    {request.bloodType}
                  </span>
                  <div>
                    <h3>{request.reason || "Blood Request"}</h3>
                    <p>
                      {request.unitsRequired} units required
                      {" • "}
                      {request.location}
                    </p>
                  </div>
                </div>
                <div className="hospital-request-card__details">
                  <span className={`urgency urgency--${request.urgency}`}>
                    {request.urgency}
                  </span>
                  <span className="request-status">{request.status}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
      {/* Request History */}
      <section className="hospital-dashboard__section">
        <div className="hospital-dashboard__section-header">
          <p className="hospital-dashboard__eyebrow">HISTORY</p>
          <h2>Request History</h2>
        </div>
        <div className="hospital-history">
          {requests.filter(
            (request) =>
              request.status === "fulfilled" ||
              request.status === "cancelled" ||
              request.status === "expired",
          ).length === 0 ? (
            <p>No request history yet.</p>
          ) : (
            requests
              .filter(
                (request) =>
                  request.status === "fulfilled" ||
                  request.status === "cancelled" ||
                  request.status === "expired",
              )
              .map((request) => (
                <div className="hospital-history__row" key={request.id}>
                  <div>
                    <strong>{request.bloodType} Blood Request</strong>
                    <span>
                      {request.unitsRequired} units • {request.status}
                    </span>
                  </div>
                  <span>
                    {request.createdAt
                      ? new Date(request.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              ))
          )}
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
            <span>+</span>
            <div>
              <strong>Blood request activity</strong>
              <p>Your blood request activity will appear here.</p>
              <small>Recent</small>
            </div>
          </div>
          <div className="hospital-activity__item">
            <span>✓</span>
            <div>
              <strong>Donor matching</strong>
              <p>Donor matching updates will appear here.</p>
              <small>Recent</small>
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
            <p>Updates about your blood requests will appear here.</p>
          </div>
        </div>
      </section>
      {/* Blood Request Modal */}
      <BloodRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRequest}
      />
    </main>
  );
}
export default HospitalDashboard;
