import React, { useEffect, useState } from 'react';
import '../DisplayCip.css'; // Import CSS specific to DisplayPort component
import axios from 'axios';

function DisplayCIP({ ports ,selectedPort1,setSelectedPort1,selectedPortId, setSelectedPortId}) {
  useEffect(()=>{
    async function getCipDetails(){
if(selectedPortId!==""){
const res=await axios.get('http://localhost:3001/test',{params:{id:selectedPortId}})
let obj={
id:res.data.id,
name:res.data.name,
port:res.data.port,
equipmentDetails:res.data?.equipment?.equipmentname??[]
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
      <h4>CIP List</h4>
   
     <div style={{display:'flex',paddingRight:'2px'
     }}>
      {ports?.length === 0 ? (
        <p>No cips available.</p>
      ) : (
        <>
          <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{backgroundColor:"lightblue"}}>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ports?.length!==0&&ports?.map((item) => (
          <tr key={item.id} style={{backgroundColor:"white"}}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><button type="submit" className="btn-submit" onClick={()=>setSelectedPortId(item.id)}>View Details</button></td>
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
              <p><strong>Port Number:</strong> {selectedPort1.port}</p>
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
        </>
      )}
      </div>
    </div>
  );
}

export default DisplayCIP;