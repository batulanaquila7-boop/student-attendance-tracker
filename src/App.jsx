import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [records, setRecords] = useState([]);

  const addRecord = (e) => {
    e.preventDefault();

    if (!name || !status) {
      return;
    }

    const newRecord = {
      id: Date.now(),
      name: name,
      status: status,
    };

    setRecords([...records, newRecord]);
    setName("");
    setStatus("");
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const presentCount = records.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = records.filter(
    (record) => record.status === "Absent"
  ).length;

  return (
    <div className="app">
      <div className="card">
        <h1>Student Attendance Tracker</h1>

        <p className="subtitle">
          Record and monitor student attendance.
        </p>

        <form onSubmit={addRecord}>
          <label htmlFor="name">Student Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="status">Attendance Status</label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button type="submit">Add Attendance</button>
        </form>

        <div className="summary">
          <div>
            <strong>Present</strong>
            <span>{presentCount}</span>
          </div>

          <div>
            <strong>Absent</strong>
            <span>{absentCount}</span>
          </div>
        </div>

        <h2>Attendance Records</h2>

        {records.length === 0 ? (
          <p className="empty">No attendance records yet.</p>
        ) : (
          <div className="records">
            {records.map((record) => (
              <div className="record" key={record.id}>
                <div>
                  <strong>{record.name}</strong>
                  <p>{record.status}</p>
                </div>

                <button
                  className="delete"
                  onClick={() => deleteRecord(record.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;