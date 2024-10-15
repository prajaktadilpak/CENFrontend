import React, { useState } from 'react';
import '../AddCip.css'; // Import CSS specific to AddPort component

function AddCIP({ addPort }) {
  const [portId, setPortId] = useState('');
  const [name, setName] = useState('');
  const [portNumber, setPortNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (portId && name) {
      addPort({ portId, name,portNumber }); // Call parent method to add the port

      setPortId('');
      setName(''); // Clear the form after submission
      setPortNumber('')
    }
  };

  return (
    <div className="form-container">
      <h4>Add New CIP</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="portId"> ID: </label>
        <input
          type="text"
          id="portId"
          value={portId}
          onChange={(e) => setPortId(e.target.value)}
          placeholder="Enter ID"
        />

        <label htmlFor="name"> Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter  name"
        />
        <label htmlFor="port"> Port: </label>
        <input
          type="text"
          id="name"
          value={portNumber}
          onChange={(e) => setPortNumber(e.target.value)}
          placeholder="Enter port number"
        />

        <button type="submit" className="btn-submit">Add CIP</button>
      </form>
    </div>
  );
}

export default AddCIP;