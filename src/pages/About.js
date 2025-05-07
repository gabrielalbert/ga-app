import React, { useState } from 'react';

const About = () => {
  // Sample JSON data
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com', city: 'London' },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', city: 'Paris' },
    { id: 4, name: 'Alice Brown', age: 22, email: 'alice@example.com', city: 'Tokyo' }
  ]);

  // Get table headers dynamically from the first object's keys
  const headers = Object.keys(data[0] || {});

  return (
    <div className="page">
      <div className='page-container'>
      <h1>Question Bank</h1>
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={`${item.id}-${header}`} data-label={header}>
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default About;
