import React, { useState } from 'react';
import './App.css'; // Import the CSS
import AddPort from './components/AddCIP'; // Import AddPort Component
import DisplayPort from './components/DisplayCIP'; // Import DisplayPort Component
import axios from 'axios';

function App() {
  const [ports, setPorts] = useState([]); // Store the list of ports
  const [view, setView] = useState(''); // Toggle between 'cen' and 'cip'
  const [showMessageForm, setShowMessageForm] = useState(false); // Toggle for CEN message form
  const [cipView, setCipView] = useState(null); // Toggle between 'add' and 'display' for CIP
  const [selectedPort, setSelectedPort] = useState(''); // Store selected port in CEN view
  const [message, setMessage] = useState(''); // Store message to send in CEN view

  // Function to add a new port
  const addPort = async (port) => {
    try {
      let obj = {
        id: port.portId,
        name: port.name,
        port: port.portNumber,
      };
      const res = await axios.post('http://localhost:3001/cips', obj);
      setPorts(res.data);
      console.log('res', res);
    } catch (error) {
      console.log('error');
    }
  };

  const sendMessage = async () => {
    try {
      setMessage('');
    } catch (error) {
      console.log('Error sending message');
    }
  };

  return (
    <div className="app-container">
      <h2>Central Equipment Network</h2>
      <h4>{view === 'cip' ? 'CIP' : view === 'cen' ? 'CEN' : 'Select an Option'}</h4>

      <div className="button-group">
        <button className="btn" onClick={() => { setView('cip'); setCipView(null); setShowMessageForm(false); }}>CIP</button>
        <button className="btn" onClick={() => { setView('cen'); setShowMessageForm(false); setCipView(null); }}>CEN</button>
      </div>

      <div className="content-container">
        {view === 'cip' && (
          <div style={{display:'flex',flexDirection:'column',width:'40%'}}>
            <div className="button-group">
              <button className="btn" onClick={() => setCipView('add')}>Add CIP</button>
              <button className="btn" onClick={() => setCipView('display')}>CIP Details</button>
            </div>

            {cipView === 'add' && <AddPort addPort={addPort} />}

            {cipView === 'display' && <DisplayPort ports={ports} />}
          </div>
        )}

        {view === 'cen' && (
           <div style={{display:'flex',flexDirection:'column',width:'30%'}}>
            {!showMessageForm && (
              <button className="btn" onClick={() => setShowMessageForm(true)}>Send Message</button>
            )}

            {showMessageForm && (
              <div className="cen-view">
                <h2>Send Message to CIP</h2>
                <div>
                  <label>Select CIP:</label>
                  <select
                    value={selectedPort}
                    onChange={(e) => setSelectedPort(e.target.value)}
                  >
                    <option value="">Select a port</option>
                    {ports.map((port) => (
                      <option key={port.id} value={port.id}>
                        {port.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div  style={{display:'flex',flexDirection:'column'}}>
                  <label>Message:</label>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  </div>
                </div>
                <button className="btn" onClick={sendMessage}>Send Message</button>
              </div>
            )}
       </div>
        )}
      </div>
    </div>
  );
}
export default App;