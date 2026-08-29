import { useState } from "react";
import "./BloodRequestModal.css";
function BloodRequestModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    bloodType: "",
    units: "",
    urgency: "",
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
    if (!formData.units) {
      newErrors.units = "Please enter the number of units needed.";
    } else if (Number(formData.units) < 1) {
      newErrors.units = "Units needed must be at least 1.";
    }
    if (!formData.urgency) {
      newErrors.urgency = "Please select the urgency level.";
    }
    if (!formData.hospital.trim()) {
      newErrors.hospital = "Please enter the hospital name.";
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
      }
      setStatus("success");
      setTimeout(() => {
        setFormData({
          bloodType: "",
          units: "",
          urgency: "",
          hospital: "",
          notes: "",
        });
        setStatus("idle");
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Blood request submission error:", error);
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
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }
  return (
    <div className="blood-modal__overlay" onClick={handleOverlayClick}>
      <div
        className="blood-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blood-request-title"
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
            <label htmlFor="units">Units needed</label>
            <input
              id="units"
              name="units"
              type="number"
              min="1"
              placeholder="e.g. 2"
              value={formData.units}
              onChange={handleChange}
              disabled={status === "loading"}
            />
            {errors.units && (
              <span className="blood-modal__error">{errors.units}</span>
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
