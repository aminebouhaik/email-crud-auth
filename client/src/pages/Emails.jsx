import { useState, useEffect } from "react";
import API from "../services/api";

function Emails() {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingEmail, setEditingEmail] = useState("");

  const API_URL = "/emails";

  // 🔥 Fetch emails when page loads
  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get(API_URL);
      setEmails(res.data);
    } catch (err) {
      setError("Failed to load emails");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Create Email
  const createEmail = async () => {
    if (!newEmail.trim()) {
      setError("Please enter an email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await API.post(API_URL, { email: newEmail });
      setNewEmail("");
      fetchEmails();
    } catch (err) {
      setError("Failed to add email");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Delete Email
  const deleteEmail = async (id) => {
    try {
      setLoading(true);
      setError("");
      await API.delete(`${API_URL}/${id}`);
      fetchEmails();
    } catch (err) {
      setError("Failed to delete email");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Open Edit Modal
  const updateEmail = (id) => {
    const email = emails.find((e) => e.id === id);
    setEditingId(id);
    setEditingEmail(email.email);
    setShowEditModal(true);
  };

  // 🔥 Save Edited Email
  const saveEditEmail = async () => {
    if (!editingEmail.trim()) {
      setError("Please enter an email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editingEmail)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await API.put(`${API_URL}/${editingId}`, {
        email: editingEmail,
      });

      setShowEditModal(false);
      fetchEmails();
    } catch (err) {
      setError("Failed to update email");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1 className="dashboard-title">📧 Email Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {error && (
          <div className="error-alert">
            <span className="error-icon">⚠️</span>
            <p className="error-message">{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        )}

        <div className="email-card">
          <div className="email-input-form">
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter email address"
              disabled={loading}
              className="email-input"
            />
            <button className="add-email-btn" onClick={createEmail} disabled={loading}>
              ➕ Add
            </button>
          </div>
        </div>

        <div className="email-list">
          {emails.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-text">No emails yet. Add one to get started!</p>
            </div>
          ) : (
            <ul>
              {emails.map((item) => (
                <li key={item.id} className="email-item">
                  <span className="email-address">{item.email}</span>
                  <div className="email-actions">
                    <button className="email-btn edit-btn" onClick={() => updateEmail(item.id)} disabled={loading}>
                      ✏️ Edit
                    </button>
                    <button className="email-btn delete-btn" onClick={() => deleteEmail(item.id)} disabled={loading}>
                      🗑️ Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">✏️ Edit Email</h2>
            </div>

            <input
              type="text"
              value={editingEmail}
              onChange={(e) => setEditingEmail(e.target.value)}
              placeholder="Enter new email"
              disabled={loading}
              className="modal-input"
            />

            <div className="modal-actions">
              <button className="modal-btn modal-cancel" onClick={() => setShowEditModal(false)} disabled={loading}>
                Cancel
              </button>
              <button className="modal-btn modal-save" onClick={saveEditEmail} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Emails;