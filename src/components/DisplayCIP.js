import React, { useEffect, useState } from 'react';
import '../DisplayCip.css'; // Import CSS specific to DisplayPort component
import axios from 'axios';

function DisplayCIP({ ports ,selectedPort1,setSelectedPort1,selectedPortId, setSelectedPortId}) {
  let cipsData=[{
    "id": 1,
    "name":"Ottawa_CIP1",
    "status": "online",
    "type": "CIP",
    "ipaddress":"127.0.0.1",
    "port": "5000",
    "lastUpdated":"10/10/2024"
    },
    {
    "id": 2,
    "name":"Ottawa_CIP2",
    "status": "online",
    "type": "CIP",
    "ipaddress":"127.0.0.1",
    "port": "5002",
    "lastUpdated":"10/10/2024"
    }]
  useEffect(()=>{
    async function getCipDetails(){
if(selectedPortId!==""){
const res=await axios.get('http://localhost:3001/test',{params:{id:selectedPortId}})
let i=cipsData?.findIndex(data=>data?.id===selectedPortId)
let equipmentData={
  "nodeId":1,
  "equipmentList":
  [{
      "id":1,
      "type":"PVS",
      "name":"PVS1",
      "status":"online"
  },
  {
      "id":2,
      "type":"SVS",
      "name":"SVS1",
      "status":"online"
  },
  {
      "id":3,
      "type":"Scanner",
      "name":"Scanner1",
      "status":"online"
  }]
}

let obj={
id:cipsData[i].id,
name:cipsData[i].name,
ipAddress:cipsData[i].ipaddress,
equipmentDetails:equipmentData?.equipmentList??[]
}
console.log(res,"grateful",obj)
setSelectedPort1(obj)

return res;
}
    }
    getCipDetails();
  },[selectedPortId])
  

  return (
    <div className="display-container">
      {/* <h4>CIP List</h4> */}
   
     <div style={{display:'flex',paddingRight:'2px',width:'100%'
     }}>
      {ports?.length === 0 ? (
        <p>No cips available.</p>
      ) : (
        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
        <button  style={{marginRight:"1%"}} type="submit" className="btn-tip" >Browse Tip</button>
        <button type="submit" className="btn-tip" >Send Tip</button>
        </div>
    <div style={{display:"flex"}}>
          <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{backgroundColor:"lightblue"}}>
        <th><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></th>
          <th>ID</th>
          <th>Name</th>
          <th>IP Address</th>
          <th>View Details</th>
          <th>Get Bag List</th>
          <th>Bag Download/Status</th>
        </tr>
      </thead>
      <tbody>
        {ports?.length!==0&&cipsData?.map((item) => (
          <tr key={item.id} style={{backgroundColor:"white"}}>
              <th><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></th>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.ipaddress}</td>
            <td><button type="submit" className="btn-submit" onClick={()=>setSelectedPortId(item.id)}>View Details</button></td>
            <td><button type="submit" className="btn-submit" >Bag List</button></td>
            <td><button type="submit" className="btn-submit" >Download Bag</button></td>
          </tr>
        ))}
      </tbody>
    </table>
          {selectedPort1 && (
            <div className="port-info">
              <div style={{width:'100%',display:'flex',justifyContent:'flex-end',padding:'0px'}}>
              <button  onClick={() => {setSelectedPortId('')}} style={{ color:'black', background: 'transparent', border: 'black', cursor: 'pointer', fontSize: '12px',width:'10%' }}> &#x2715; </button>
              </div>
              <h4>CIP Information</h4>
              <p><strong> ID:</strong> {selectedPort1.id}</p>
              <p><strong> Name:</strong> {selectedPort1.name}</p>
              <p><strong> IP Address:</strong> {selectedPort1.ipaddress}</p>
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
        {selectedPort1?.equipmentDetails?.map((item) => (
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
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default DisplayCIP;