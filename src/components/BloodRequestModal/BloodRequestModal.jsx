import { useState } from "react";
import "./BloodRequestModal.css";

function BloodRequestModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    bloodType: "",
    unitsRequired: "",
    urgency: "",
    location: "",
    reason: "",
    hospital: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.bloodType) {
      newErrors.bloodType = "Please select a blood type.";
    }

    if (!formData.unitsRequired) {
      newErrors.unitsRequired = "Please enter the number of units needed.";
    } else if (Number(formData.units) < 1) {
      newErrors.unitsRequired = "Units needed must be at least 1.";
    }

    if (!formData.urgency) {
      newErrors.urgency = "Please select the urgency level.";
    }

    if (!formData.hospital.trim()) {
      newErrors.hospital = "Please enter the hospital name.";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please enter the hospital name.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Please enter the hospital name.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setStatus("success");

      setTimeout(() => {
        setFormData({
          bloodType: "",
          unitsRequired: "",
          urgency: "",
          hospital: "",
          notes: "",
          location: "",
          reason: ""
        });

        setStatus("idle");
        onClose();
      }, 1500);
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    if (status === "loading") {
      return;
    }

    setErrors({});
    setStatus("idle");
    onClose();
  }

  return (
    <div className="blood-modal__overlay" onMouseDown={handleClose}>
      <div
        className="blood-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blood-request-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="blood-modal__header">
          <div>
            <p className="blood-modal__eyebrow">Blood request</p>

            <h2 id="blood-request-title">Create blood request</h2>

            <p>Submit the details needed to request blood for a patient.</p>
          </div>

          <button
            type="button"
            className="blood-modal__close"
            onClick={handleClose}
            aria-label="Close blood request form"
          >
            ×
          </button>
        </div>

        {status === "success" && (
          <div className="blood-modal__message blood-modal__message--success">
            Blood request submitted successfully.
          </div>
        )}

        {status === "error" && (
          <div className="blood-modal__message blood-modal__message--error">
            Something went wrong. Please try again.
          </div>
        )}

        <form className="blood-modal__form" onSubmit={handleSubmit}>
          <div className="blood-modal__field">
            <label htmlFor="bloodType">Blood type</label>

            <select
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              disabled={status === "loading"}
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {errors.bloodType && (
              <span className="blood-modal__error">{errors.bloodType}</span>
            )}
          </div>

          <div className="blood-modal__field">
            <label htmlFor="unitsRequired">Units needed</label>

            <input
              id="unitsRequired"
              name="unitsRequired"
              type="number"
              min="1"
              placeholder="e.g. 2"
              value={formData.unitsRequired}
              onChange={handleChange}
              disabled={status === "loading"}
            />

            {errors.unitsRequired && (
              <span className="blood-modal__error">{errors.unitsRequired}</span>
            )}
          </div>

          <div className="blood-modal__field">
            <label htmlFor="urgency">Urgency</label>

            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              disabled={status === "loading"}
            >
              <option value="">Select urgency</option>
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>

            {errors.urgency && (
              <span className="blood-modal__error">{errors.urgency}</span>
            )}
          </div>

          <div className="blood-modal__field">
            <label htmlFor="location">location</label>

            <input
              id="location"
              name="location"
              rows="4"
              placeholder="Closest landmark to your hospital"
              value={formData.location}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>

          <div className="blood-modal__field">
            <label htmlFor="reason">reason</label>

            <input
              id="reason"
              name="reason"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>

          <div className="blood-modal__field">
            <label htmlFor="hospital">Hospital</label>

            <input
              id="hospital"
              name="hospital"
              type="text"
              placeholder="Enter hospital name"
              value={formData.hospital}
              onChange={handleChange}
              disabled={status === "loading"}
            />

            {errors.hospital && (
              <span className="blood-modal__error">{errors.hospital}</span>
            )}
          </div>

          <div className="blood-modal__field">
            <label htmlFor="notes">
              Notes <span>(optional)</span>
            </label>

            <textarea
              id="notes"
              name="notes"
              rows="4"
              placeholder="Add any additional information..."
              value={formData.notes}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>



          <div className="blood-modal__actions">
            <button
              type="button"
              className="blood-modal__cancel"
              onClick={handleClose}
              disabled={status === "loading"}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="blood-modal__submit"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading"
                ? "Submitting..."
                : status === "success"
                  ? "Submitted"
                  : "Submit request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BloodRequestModal;
