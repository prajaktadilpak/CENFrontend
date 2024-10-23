import React, { useEffect, useState } from 'react';
import '../DisplayCip.css'; // Import CSS specific to DisplayPort component
import axios from 'axios';
import { Checkbox } from '@mui/material';
import LinearProgressWithLabel from './linerProgressWithLabel';
import { Button } from '@mui/material'


function DownloadBag() {
    const [progress, setProgress] = React.useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }, []);

    const downloadBag =
        [
            {
                "bagId": "1",
                "downloadStatus": "Downloading..",
                "percentageDownload": "50%",
                "link": "192.168.60:30/bag1"
            },
            {
                "bagId": "2",
                "downloadStatus": "Downloading..",
                "percentageDownload": "70%",
                "link": "192.168.60:30/bag2"
            },
        ]

    // useEffect(() => {
    //     async function getCipDetails() {
    //         if (selectedPortId !== "") {
    //             const res = await axios.get('http://localhost:3001/test', { params: { id: selectedPortId } })
    //             let obj = {
    //                 id: res.data.id,
    //                 name: res.data.name,
    //                 ipAddress: res.data.ip,
    //                 equipmentDetails: res.data?.equipment?.equipmentname ?? []
    //             }
    //             console.log(res, "grateful", obj)
    //             setSelectedPort1(obj)

    //             return res;
    //         }
    //     }
    //     getCipDetails();
    // }, [selectedPortId])

    return (
        <div className="display-container">

            <Button variant="contained" sx={{marginBottom:'10px'}}>Download Bag</Button>

            <div style={{
                display: 'flex', paddingRight: '2px', width: '100%'
            }}>


                {downloadBag?.length === 0 ? (
                    <p>No Bags available.</p>
                ) : (
                    <>

                        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ backgroundColor: "lightblue" }}>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {downloadBag?.length !== 0 && downloadBag?.map((item) => (
                                    <tr key={item.bagId} style={{ backgroundColor: "white" }}>
                                        <td><Checkbox /></td>
                                        <td>Bag {item.bagId}</td>
                                        <td>{item.downloadStatus}</td>
                                        <td><LinearProgressWithLabel value={item.percentageDownload} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}

export default DownloadBag;