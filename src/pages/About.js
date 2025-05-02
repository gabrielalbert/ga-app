
import React, { useState } from 'react';

const About = () => {
// Initial sample JSON data
const initialData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
];

// State management
const [data, setData] = useState(initialData);
const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({});

// Handle edit button click
const handleEdit = (item) => {
  setEditingId(item.id);
  setEditForm({ ...item });
};

// Handle input changes
const handleChange = (e) => {
  setEditForm({
    ...editForm,
    [e.target.name]: e.target.value
  });
};

// Save edited data
const handleSave = () => {
  const updatedData = data.map(item => 
    item.id === editingId ? { ...editForm } : item
  );
  setData(updatedData);
  setEditingId(null);
};

// Export to JSON file
const exportToJson = () => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  link.click();
  URL.revokeObjectURL(url);
};

return (
  <div className="page">
      <div className='page-container'>  
    <h1>Editable JSON Table</h1>
    
    <table className="editable-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              {editingId === item.id ? (
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                />
              ) : (
                item.name
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                />
              ) : (
                item.email
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleChange}
                >
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              ) : (
                item.role
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => handleEdit(item)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="export-section">
      <button onClick={exportToJson} className="export-button">
        Export to JSON
      </button>
    </div>
  </div>
  </div>
);
};

// CSS Styles
const styles = `
.container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.editable-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.editable-table th, .editable-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.editable-table th {
  background-color: #f8f9fa;
}

.editable-table tr:hover {
  background-color: #f1f1f1;
}

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
}

button:hover {
  background-color: #45a049;
}

.export-button {
  background-color: #008CBA;
  padding: 12px 24px;
}

.export-button:hover {
  background-color: #007399;
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default About;
