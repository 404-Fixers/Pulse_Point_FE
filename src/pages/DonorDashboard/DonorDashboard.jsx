import { useState } from "react";
import "./donorDashboard.css";

const API_BASE_URL = "http://localhost:5000";

function DonorDashboard() {
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchRequests = async () => {
    if (!token) {
      window.location.href = "/";
      return;
    }

    setLoadingRequests(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load blood requests.");
        return;
      }

      setRequests(data.data || []);
    } catch (error) {
      console.error("Fetch requests error:", error);

      setError(
        "Unable to connect to the server. Please check your connection and try again.",
      );
    } finally {
      setLoadingRequests(false);
    }
  };

  const respondToRequest = async (requestId, responseType) => {
    setActionLoading(`${requestId}-${responseType}`);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/requests/${requestId}/respond`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            response: responseType,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setError(
            data.message ||
              "Invalid response. Please choose accept or decline.",
          );
        } else if (response.status === 401) {
          setError(
            data.message || "Your session has expired. Please log in again.",
          );
        } else if (response.status === 403) {
          setError(
            data.message ||
              "You do not have permission to respond to this request.",
          );
        } else if (response.status === 404) {
          setError(data.message || "Blood request not found.");
        } else if (response.status === 409) {
          setError(
            data.message || "You have already responded to this blood request.",
          );
        } else {
          setError(data.message || "Something went wrong. Please try again.");
        }

        return;
      }

      setSuccess(
        data.message ||
          `Request ${
            responseType === "accepted" ? "accepted" : "declined"
          } successfully.`,
      );

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId
            ? {
                ...request,
                donorResponse: responseType,
              }
            : request,
        ),
      );
    } catch (error) {
      console.error("Response error:", error);

      setError(
        "Unable to connect to the server. Please check your connection and try again.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const confirmDonation = async (requestId) => {
    setActionLoading(`${requestId}-donate`);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/requests/${requestId}/donate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setError(
            data.message ||
              "You must accept the blood request before confirming a donation.",
          );
        } else if (response.status === 401) {
          setError(
            data.message || "Your session has expired. Please log in again.",
          );
        } else if (response.status === 403) {
          setError(
            data.message ||
              "You do not have permission to confirm this donation.",
          );
        } else if (response.status === 404) {
          setError(data.message || "Blood request or donor not found.");
        } else {
          setError(data.message || "Something went wrong. Please try again.");
        }

        return;
      }

      setSuccess(data.message || "Donation confirmed successfully.");

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: data.data?.status || request.status,
                unitsFulfilled:
                  data.data?.unitsFulfilled ?? request.unitsFulfilled,
                donationConfirmed: true,
              }
            : request,
        ),
      );
    } catch (error) {
      console.error("Donation confirmation error:", error);

      setError(
        "Unable to connect to the server. Please check your connection and try again.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  return (
    <div className="donor-dashboard">
      <header className="donor-dashboard__header">
        <div>
          <h1>PulsePoint</h1>
          <p>Welcome, {user?.fullName || "Donor"}</p>
        </div>

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="donor-dashboard__content">
        <h2>Blood Requests</h2>

        <button
          type="button"
          onClick={fetchRequests}
          disabled={loadingRequests}
        >
          {loadingRequests ? "Loading..." : "Load Blood Requests"}
        </button>

        {error && <div className="message message--error">{error}</div>}

        {success && <div className="message message--success">{success}</div>}

        {requests.length === 0 && !loadingRequests ? (
          <div className="empty-state">
            <h3>No blood requests loaded</h3>
            <p>Click "Load Blood Requests" to check for available requests.</p>
          </div>
        ) : (
          <div className="request-list">
            {requests.map((request) => {
              const acceptLoading = actionLoading === `${request.id}-accepted`;

              const declineLoading = actionLoading === `${request.id}-declined`;

              const donationLoading = actionLoading === `${request.id}-donate`;

              const alreadyAccepted = request.donorResponse === "accepted";

              const alreadyDeclined = request.donorResponse === "declined";

              return (
                <div className="request-card" key={request.id}>
                  <h3>Blood Type: {request.bloodType}</h3>

                  <p>
                    <strong>Units Required:</strong> {request.unitsRequired}
                  </p>

                  <p>
                    <strong>Urgency:</strong> {request.urgency}
                  </p>

                  <p>
                    <strong>Location:</strong> {request.location}
                  </p>

                  <p>
                    <strong>Reason:</strong> {request.reason}
                  </p>

                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>

                  {alreadyAccepted ? (
                    <>
                      <div className="response-status">
                        You accepted this blood request.
                      </div>

                      {!request.donationConfirmed && (
                        <button
                          type="button"
                          onClick={() => confirmDonation(request.id)}
                          disabled={actionLoading !== null}
                        >
                          {donationLoading
                            ? "Confirming..."
                            : "Confirm Donation"}
                        </button>
                      )}

                      {request.donationConfirmed && (
                        <div className="response-status">
                          Donation confirmed.
                        </div>
                      )}
                    </>
                  ) : alreadyDeclined ? (
                    <div className="response-status">
                      You declined this blood request.
                    </div>
                  ) : (
                    <div className="request-actions">
                      <button
                        type="button"
                        onClick={() => respondToRequest(request.id, "accepted")}
                        disabled={actionLoading !== null}
                      >
                        {acceptLoading ? "Accepting..." : "Accept"}
                      </button>

                      <button
                        type="button"
                        onClick={() => respondToRequest(request.id, "declined")}
                        disabled={actionLoading !== null}
                      >
                        {declineLoading ? "Declining..." : "Decline"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default DonorDashboard;
