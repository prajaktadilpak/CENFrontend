import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS
import AddPort from './components/AddCIP'; // Import AddPort Component
import DisplayPort from './components/DisplayCIP'; // Import DisplayPort Component
import axios from 'axios';
import { w3cwebsocket } from 'websocket';
const client = new w3cwebsocket('ws://127.0.0.1:8081'); 
function App() {
  const [selectedPortId, setSelectedPortId] = useState('');
  const [ports, setPorts] = useState([]); // Store the list of ports
  const [cipView, setCipView] = useState(null); // Toggle between 'add' and 'display' for CIP
  const[selectedPort1,setSelectedPort1]=useState()
  const[addNodeType,setAddNodeType]=useState('')
  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket client connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('Received message:', dataFromServer,selectedPortId);
      if(dataFromServer?.id===selectedPortId){
      let obj={
        id:dataFromServer.id,
        name:dataFromServer.name,
        port:dataFromServer.port,
        equipmentDetails:dataFromServer?.equipment?.equipmentname??[]
        }
      setSelectedPort1(obj)
      }
      if(selectedPortId===''){
        console.log("data2")
        setSelectedPort1()
      }
    };
  }, [selectedPortId]);
  // Function to add a new port
  const addPort = async (port) => {
    try {
      let obj = {
        id: port.portId,
        name: port.name,
        port: port.portNumber,
        ipAddress:port.ipAddress
      };
      const res = await axios.post('http://localhost:3001/cips', obj);
      setPorts(res.data);
      console.log('res', res);
      if (client.readyState === WebSocket.OPEN) {
        client.send(
         addNodeType
        );
        setSelectedPort1()
        setSelectedPortId('')

      } else {
        console.log('WebSocket is not open. Unable to send message.');
      }
    } catch (error) {
      console.log('error');
    }
  };
const getAllPorts=async()=>{
const res=await axios.get('http://localhost:3001/cips')
setPorts(res?.data??[])
}
  return (
    <div className="app-container">
      <h2>Central Equipment Network</h2>
      <div className="content-container">
          <div style={{display:'flex',flexDirection:'column'}}>
            <div className="button-group">
              <button className="btn" onClick={() => {setCipView('add')}}>Add Node</button>
              <button className="btn" onClick={ getAllPorts}>Get All CIPS</button>
            </div>
            {cipView === 'add'&& <AddPort  addNodeType={addNodeType}addPort={addPort} />}
            {ports?.length!==0 && <DisplayPort ports={ports} selectedPort1={selectedPort1} setSelectedPort1={setSelectedPort1} selectedPortId={selectedPortId} setSelectedPortId={setSelectedPortId} />}
          </div>
      </div>
    </div>
  );
}
export default App;