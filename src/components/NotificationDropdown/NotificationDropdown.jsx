import { useState } from "react";
import "./NotificationDropdown.css";

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "A hospital needs O+ blood urgently.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Your donation request has been received.",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const handleOpen = () => {
    setIsOpen((current) => !current);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  return (
    <div className="notification-dropdown">
      <button
        type="button"
        className="notification-dropdown__button"
        onClick={handleOpen}
        aria-label="Open notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-dropdown__badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown__menu">
          <div className="notification-dropdown__header">
            <h3>Notifications</h3>
          </div>

          {loading ? (
            <div className="notification-dropdown__empty">
              <p>Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="notification-dropdown__empty">
              <p>No new notifications.</p>
            </div>
          ) : (
            <div className="notification-dropdown__list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-dropdown__item ${
                    notification.read ? "read" : "unread"
                  }`}
                >
                  <p>{notification.message}</p>

                  <span>{notification.time}</span>

                  {!notification.read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
