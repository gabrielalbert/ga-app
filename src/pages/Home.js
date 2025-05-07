import React, { useState ,useEffect,useRef} from 'react';
import * as XLSX from 'xlsx';
import '../pages/Home.css';

const Home = () => {
  
  const [data, setData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Get table headers dynamically from the first object's keys
  const headers = Object.keys({id:0, sheetName: '', pageTitle: '', qaType:'',actions:''}); 
  
  const [fileName, setFileName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const savedData = localStorage.getItem('qabank');
      setData(savedData ? JSON.parse(savedData) : []);
    };
    fetchData();
  }, []);
  
  const handleFile = (file) => {
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const removeFile = () => {
    setFileName('');
    fileInputRef.current.value = '';
  };

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
// Notification component
const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.notification}>
      <span>{message}</span>
      <button style={styles.closeButton} onClick={onClose}>×</button>
    </div>
  );
};
const exportToJson= ()=> { 
  setShowNotification(true);
  localStorage.setItem('qabank', JSON.stringify(data));
   //alert('Data saved');
};
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      let allSheetsData = {};
      let allSheets = [];
      let i=1;
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        let allExcelSheets = {};
        allSheetsData[sheetName] = jsonData;
        allExcelSheets['id']= i++;
        allExcelSheets['sheetName'] = sheetName;
        allExcelSheets['pageTitle'] = sheetName;
        allExcelSheets['qaType'] = '';
        allExcelSheets['actions'] = '';
        allSheets.push(allExcelSheets);
      });
      setData(allSheets);
      console.log('allSheets', allSheets);
      localStorage.setItem('qabankdata', JSON.stringify(allSheetsData));      
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="page">
      <div className='page-container'>
      <h1>Question Bank</h1>
      <div style={styles.container}>
      <div 
        style={{...styles.dropZone, ...(dragActive ? styles.dropZoneActive : {})}}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx, .xls"
          style={styles.hiddenInput}
          id="file-upload"
        />
        
        <div style={styles.content}>
          
        <svg 
        style={styles.icon} 
        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#169154" d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"></path><path fill="#18482a" d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"></path><path fill="#0c8045" d="M14 15.003H29V24.005000000000003H14z"></path><path fill="#17472a" d="M14 24.005H29V33.055H14z"></path><g><path fill="#29c27f" d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"></path><path fill="#27663f" d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"></path><path fill="#19ac65" d="M29 15.003H44V24.005000000000003H29z"></path><path fill="#129652" d="M29 24.005H44V33.055H29z"></path></g><path fill="#0c7238" d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"></path><path fill="#fff" d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"></path>
</svg>
          
          
          <label htmlFor="file-upload" style={styles.label}>
            <span style={styles.browseLink}>Click to upload </span> 
            or drag and drop
          </label>
          
        </div>
      </div>

      {fileName && (
        <div style={styles.filePreview}>
          <span style={styles.fileName}>{fileName}</span>
          <button style={styles.removeButton} onClick={removeFile}>
            ×
          </button>
        </div>
      )}
    </div>
      
      <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            {(data.length>0) && headers.map((header) => (
              (header !== 'id') && ( 
                <th key={header}>{header.toUpperCase()}</th>
              )
            ))}                      
          </tr>
        </thead>
        <tbody>
        {(data.length>0) && (data?.map((item) => (
          <tr key={item.id}>
            <td data-label="sheetName">
              {editingId === item.id ? (
                <input
                  type="text"
                  name="sheetName"
                  value={editForm.sheetName}                  
                />
              ) : (
                item.sheetName
              )}
            </td>
            <td data-label="pageTitle">
              {editingId === item.id ? (
                <input
                  type="text"
                  name="pageTitle"                  
                  value={editForm.pageTitle}                  
                  onChange={handleChange}
                />
              ) : (
                item.pageTitle
              )}
            </td>
            <td data-label="qaType">
              {editingId === item.id ? (
                <select
                  name="qaType"
                  value={editForm.qaType}
                  onChange={handleChange}
                >
                  <option value="">-Select-</option>
                  <option value="FillIn">Fill In</option>
                  <option value="Match">Match</option>                  
                </select>
              ) : (
                item.qaType
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
        )))}
        </tbody>
      </table>
      {(data.length>0) && (
              <div className="export-section">
              <button onClick={exportToJson} className="export-button">
                Save Question Bank
              </button>
            </div>          
          )}   
      {showNotification && (
        <Notification
          message="Data saved successfully!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
      </div>
    </div>
  );
};

const styles = {
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',    
    color: 'white',
    padding: '15px 25px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: "0 0 10px #234db5, 0 0 20px #234db5",
    backgroundColor: '#234db5',
    
    animation: 'slideIn 0.3s ease-out'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '10px'
  },
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  dropZone: {
    border: '2px dashed #cccccc',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer'
  },
  dropZoneActive: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd'
  },
  hiddenInput: {
    display: 'none'
  },
  content: {
    color: '#666666'
  },
  icon: {
    width: '48px',
    height: '48px',
    marginBottom: '1rem',
    color: '#2196F3'
  },
  label: {
    fontSize: '1.1rem',
    display: 'block',
    marginBottom: '0.5rem'
  },
  browseLink: {
    color: '#2196F3',
    fontWeight: '600',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  subText: {
    fontSize: '0.9rem',
    color: '#999999'
  },
  filePreview: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fileName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '80%'
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#ff4444',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0 0.5rem',
    '&:hover': {
      color: '#cc0000'
    }
  }
};

export default Home;