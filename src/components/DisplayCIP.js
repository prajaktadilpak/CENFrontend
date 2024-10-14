import React, { useEffect, useState } from 'react';
import '../DisplayCip.css'; // Import CSS specific to DisplayPort component
import axios from 'axios';

function DisplayCIP({ ports }) {
  const [selectedPortId, setSelectedPortId] = useState('');
  // const selectedPort = ports.find((port) => port.id === selectedPortId);
  const[selectedPort,setSelectedPort]=useState()
  useEffect(()=>{
    async function getCipDetails(){
if(selectedPortId!==""){
const res=await axios.get('http://localhost:3001/test',{params:{id:selectedPortId}})
// let equipment=res.data?.equipment.equipmentname?.map(data=>{
//   return data.name
// });
console.log("equipemnt details",res.data)
let obj={
id:res.data.id,
name:res.data.name,
port:res.data.port,
equipmentDetails:res.data?.equipment?.equipmentname??[]
}
console.log(res,"grateful",obj)
setSelectedPort(obj)

return res;
}
    }
    getCipDetails();
    const interval=setInterval(getCipDetails,6000);
    return ()=>clearInterval(interval);
  },[selectedPortId])

  return (
    <div className="display-container">
      <h2>Display CIP Information</h2>

      {ports.length === 0 ? (
        <p>No cips available.</p>
      ) : (
        <>
          <label htmlFor="port-select">Select Port ID:</label>
          <select
            id="port-select"
            value={selectedPortId}
            onChange={(e) => setSelectedPortId(e.target.value)}
          >
            <option value="">-- Select Port --</option>
            {ports.map((port, index) => (
              <option key={index} value={port.id}>
                {port.id}
              </option>
            ))}
          </select>

          {selectedPort && (
            <div className="port-info">
              <h3>CIP Information</h3>
              <p><strong> ID:</strong> {selectedPort.id}</p>
              <p><strong> Name:</strong> {selectedPort.name}</p>
              <p><strong>Port Number:</strong> {selectedPort.port}</p>
              <p><strong>Equipment Details:</strong></p>
              <>
              <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{backgroundColor:"lightblue"}}>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {selectedPort?.equipmentDetails?.map((item) => (
          <tr key={item.name} style={{backgroundColor:"white"}}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
              </>

            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DisplayCIP;