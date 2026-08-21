import { useCallback, useEffect, useState } from "react";
import "./AdminDashboard.css";

const API_BASE_URL = "http://localhost:5000";

const ENDPOINTS = {
  pendingHospitals: `${API_BASE_URL}/admin/hospitals/pending`,
  users: `${API_BASE_URL}/admin/users`,
  approveHospital: (id) => `${API_BASE_URL}/admin/hospitals/${id}/approve`,
  rejectHospital: (id) => `${API_BASE_URL}/admin/hospitals/${id}/reject`,
  suspendUser: (id) => `${API_BASE_URL}/admin/users/${id}/suspend`,
};

function getAuthToken() {
  const tokenKeys = ["token", "accessToken", "access_token"];

  for (const key of tokenKeys) {
    const token = localStorage.getItem(key);

    if (token) {
      return token;
    }
  }

  return null;
}

async function apiRequest(url, options = {}) {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      errorMessage = errorData?.message || errorData?.error || errorMessage;
    } catch {
      // The server did not return a JSON error body.
    }

    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function extractArray(data, keys = []) {
  if (Array.isArray(data)) {
    return data;
  }

  for (const key of keys) {
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  return [];
}

function getId(item) {
  return item?.id || item?._id;
}

function getHospitalName(hospital) {
  return (
    hospital?.hospitalName ||
    hospital?.name ||
    hospital?.hospital?.name ||
    "Hospital"
  );
}

function getHospitalLocation(hospital) {
  return (
    hospital?.location ||
    hospital?.address ||
    hospital?.hospitalAddress ||
    "Location not provided"
  );
}

function getHospitalEmail(hospital) {
  return (
    hospital?.email ||
    hospital?.hospitalEmail ||
    hospital?.hospital?.email ||
    "No email provided"
  );
}

function getUserName(user) {
  if (user?.name) {
    return user.name;
  }

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return fullName || "User";
}

function getUserRole(user) {
  return user?.role || "Unknown";
}

function getUserStatus(user) {
  if (user?.isSuspended || user?.status === "suspended") {
    return "Suspended";
  }

  return user?.status || "Active";
}

function AdminDashboard() {
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [hospitalError, setHospitalError] = useState("");
  const [userError, setUserError] = useState("");

  const [actionLoading, setActionLoading] = useState(null);

  const fetchPendingHospitals = useCallback(async () => {
    setLoadingHospitals(true);
    setHospitalError("");

    try {
      const data = await apiRequest(ENDPOINTS.pendingHospitals);

      const hospitals = extractArray(data, [
        "hospitals",
        "pendingHospitals",
        "data",
      ]);

      setPendingHospitals(hospitals);
    } catch (error) {
      console.error("Fetch pending hospitals error:", error);

      setHospitalError(
        error?.message || "Unable to load hospital registrations.",
      );
    } finally {
      setLoadingHospitals(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    setUserError("");

    try {
      const data = await apiRequest(ENDPOINTS.users);

      const fetchedUsers = extractArray(data, ["users", "data"]);

      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Fetch users error:", error);

      setUserError(error?.message || "Unable to load users.");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAdminDashboard() {
      if (cancelled) {
        return;
      }

      await Promise.allSettled([fetchPendingHospitals(), fetchUsers()]);
    }

    loadAdminDashboard();

    return () => {
      cancelled = true;
    };
  }, [fetchPendingHospitals, fetchUsers]);

  const refreshDashboard = async () => {
    await Promise.all([fetchPendingHospitals(), fetchUsers()]);
  };

  const handleHospitalAction = async (hospitalId, action) => {
    if (!hospitalId) {
      return;
    }

    const actionKey = `${action}-${hospitalId}`;

    setActionLoading(actionKey);
    setHospitalError("");

    try {
      const endpoint =
        action === "approve"
          ? ENDPOINTS.approveHospital(hospitalId)
          : ENDPOINTS.rejectHospital(hospitalId);

      await apiRequest(endpoint, {
        method: "PATCH",
      });

      setPendingHospitals((currentHospitals) =>
        currentHospitals.filter((hospital) => getId(hospital) !== hospitalId),
      );
    } catch (error) {
      console.error(`Hospital ${action} error:`, error);

      setHospitalError(error?.message || `Unable to ${action} hospital.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSuspendUser = async (userId) => {
    if (!userId) {
      return;
    }

    const actionKey = `suspend-${userId}`;

    setActionLoading(actionKey);
    setUserError("");

    try {
      await apiRequest(ENDPOINTS.suspendUser(userId), {
        method: "PATCH",
      });

      setUsers((currentUsers) =>
        currentUsers.map((user) => {
          if (getId(user) !== userId) {
            return user;
          }

          return {
            ...user,
            status: "suspended",
            isSuspended: true,
          };
        }),
      );
    } catch (error) {
      console.error("Suspend user error:", error);

      setUserError(error?.message || "Unable to suspend user.");
    } finally {
      setActionLoading(null);
    }
  };

  const activeUsers = users.filter(
    (user) => user?.status !== "suspended" && !user?.isSuspended,
  );

  const suspendedUsers = users.filter(
    (user) => user?.status === "suspended" || user?.isSuspended,
  );

  return (
    <main className="admin-dashboard">
      <section id="dashboard" className="admin-dashboard__header">
        <div>
          <p className="admin-dashboard__eyebrow">ADMIN DASHBOARD</p>

          <h1>Platform overview</h1>

          <p className="admin-dashboard__intro">
            Review hospital registrations, manage users, and monitor PulsePoint
            activity.
          </p>
        </div>

        <button
          type="button"
          className="admin-dashboard__refresh"
          onClick={refreshDashboard}
          disabled={loadingHospitals || loadingUsers}
        >
          {loadingHospitals || loadingUsers ? "Refreshing..." : "Refresh data"}
        </button>
      </section>

      <section
        className="admin-dashboard__stats"
        aria-label="Platform statistics"
      >
        <article className="admin-stat-card">
          <span>Pending hospitals</span>

          <strong>{loadingHospitals ? "—" : pendingHospitals.length}</strong>

          <small>Awaiting review</small>
        </article>

        <article className="admin-stat-card">
          <span>Total users</span>

          <strong>{loadingUsers ? "—" : users.length}</strong>

          <small>Registered accounts</small>
        </article>

        <article className="admin-stat-card">
          <span>Active users</span>

          <strong>{loadingUsers ? "—" : activeUsers.length}</strong>

          <small>Currently active</small>
        </article>

        <article className="admin-stat-card">
          <span>Suspended users</span>

          <strong>{loadingUsers ? "—" : suspendedUsers.length}</strong>

          <small>Account status</small>
        </article>
      </section>

      <section id="requests" className="admin-dashboard__section">
        <div className="admin-dashboard__section-header">
          <div>
            <p className="admin-dashboard__eyebrow">HOSPITAL VERIFICATION</p>

            <h2>Pending hospital registrations</h2>

            <p>
              Review hospitals waiting for approval before they can create blood
              requests.
            </p>
          </div>

          <span className="admin-count">
            {loadingHospitals ? "—" : pendingHospitals.length}
          </span>
        </div>

        {loadingHospitals && (
          <div className="admin-state">
            <div className="admin-spinner" />

            <p>Loading hospital registrations...</p>
          </div>
        )}

        {!loadingHospitals && hospitalError && (
          <div className="admin-state admin-state--error">
            <strong>Unable to load hospital registrations.</strong>

            <p>{hospitalError}</p>

            <button type="button" onClick={fetchPendingHospitals}>
              Try again
            </button>
          </div>
        )}

        {!loadingHospitals &&
          !hospitalError &&
          pendingHospitals.length === 0 && (
            <div className="admin-state">
              <div className="admin-state__icon">✓</div>

              <strong>No pending hospitals</strong>

              <p>
                There are currently no hospital registrations waiting for
                approval.
              </p>
            </div>
          )}

        {!loadingHospitals && !hospitalError && pendingHospitals.length > 0 && (
          <div className="admin-hospital-list">
            {pendingHospitals.map((hospital) => {
              const hospitalId = getId(hospital);

              const approveKey = `approve-${hospitalId}`;

              const rejectKey = `reject-${hospitalId}`;

              return (
                <article className="admin-hospital-card" key={hospitalId}>
                  <div className="admin-hospital-card__main">
                    <div className="admin-hospital-card__badge">H</div>

                    <div>
                      <h3>{getHospitalName(hospital)}</h3>

                      <p>{getHospitalLocation(hospital)}</p>

                      <small>{getHospitalEmail(hospital)}</small>
                    </div>
                  </div>

                  <div className="admin-hospital-card__actions">
                    <button
                      type="button"
                      className="admin-button admin-button--approve"
                      disabled={actionLoading !== null}
                      onClick={() =>
                        handleHospitalAction(hospitalId, "approve")
                      }
                    >
                      {actionLoading === approveKey
                        ? "Approving..."
                        : "Approve"}
                    </button>

                    <button
                      type="button"
                      className="admin-button admin-button--reject"
                      disabled={actionLoading !== null}
                      onClick={() => handleHospitalAction(hospitalId, "reject")}
                    >
                      {actionLoading === rejectKey ? "Rejecting..." : "Reject"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section id="profile" className="admin-dashboard__section">
        <div className="admin-dashboard__section-header">
          <div>
            <p className="admin-dashboard__eyebrow">USER MANAGEMENT</p>

            <h2>Platform users</h2>

            <p>View registered users and suspend accounts when necessary.</p>
          </div>

          <span className="admin-count">
            {loadingUsers ? "—" : users.length}
          </span>
        </div>

        {loadingUsers && (
          <div className="admin-state">
            <div className="admin-spinner" />

            <p>Loading users...</p>
          </div>
        )}

        {!loadingUsers && userError && (
          <div className="admin-state admin-state--error">
            <strong>Unable to load users.</strong>

            <p>{userError}</p>

            <button type="button" onClick={fetchUsers}>
              Try again
            </button>
          </div>
        )}

        {!loadingUsers && !userError && users.length === 0 && (
          <div className="admin-state">
            <div className="admin-state__icon">✓</div>

            <strong>No users returned</strong>

            <p>
              There are currently no users available from the users endpoint.
            </p>
          </div>
        )}

        {!loadingUsers && !userError && users.length > 0 && (
          <div className="admin-user-table-wrapper">
            <table className="admin-user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => {
                  const userId = getId(user);
                  const userName = getUserName(user);
                  const status = getUserStatus(user);

                  const isSuspended = status.toLowerCase() === "suspended";

                  return (
                    <tr key={userId}>
                      <td>
                        <div className="admin-user">
                          <div className="admin-user__avatar">
                            {userName.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <strong>{userName}</strong>

                            <span>{user?.email || "No email provided"}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-role">{getUserRole(user)}</span>
                      </td>

                      <td>
                        <span
                          className={`admin-status ${
                            isSuspended
                              ? "admin-status--suspended"
                              : "admin-status--active"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td>
                        {isSuspended ? (
                          <span className="admin-disabled-action">
                            Suspended
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="admin-text-button"
                            disabled={actionLoading !== null}
                            onClick={() => handleSuspendUser(userId)}
                          >
                            {actionLoading === `suspend-${userId}`
                              ? "Suspending..."
                              : "Suspend"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section
        id="notifications"
        className="admin-dashboard__section admin-dashboard__section--info"
      >
        <div>
          <p className="admin-dashboard__eyebrow">ADMIN RESPONSIBILITIES</p>

          <h2>Keep the platform trusted</h2>

          <p>
            Hospital verification and account management help keep the
            PulsePoint matching workflow reliable.
          </p>
        </div>

        <div className="admin-info-list">
          <div>
            <span>01</span>

            <p>Review hospital registration information.</p>
          </div>

          <div>
            <span>02</span>

            <p>Approve or reject hospital accounts.</p>
          </div>

          <div>
            <span>03</span>

            <p>Monitor registered users and account status.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
