import React, { useState, useEffect } from "react";
import axios from "axios";

const DriverInfo = () => {
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    // Fetch driver information from the backend
    axios
      .get("http://localhost:3001/driver/info")
      .then((response) => {
        setDriverData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching driver information:", error);
      });
  }, []);

  if (!driverData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="driver-info">
      <h2 className="text-2xl font-bold">Driver Information</h2>
      <div>
        <label>Name:</label>
        <p>{driverData.name}</p>
      </div>
      <div>
        <label>Birthdate:</label>
        <p>{driverData.birthdate}</p>
      </div>
      <div>
        <label>Phone:</label>
        <p>{driverData.phone}</p>
      </div>
      <div>
        <label>Image URL:</label>
        <p>{driverData.imageUrl}</p>
      </div>
      <div>
        <label>License Number:</label>
        <p>{driverData.license}</p>
      </div>
      <div>
        <label>Bus ID:</label>
        <p>{driverData.busID}</p>
      </div>
      <div>
        <label>Route ID:</label>
        <p>{driverData.routeID}</p>
      </div>
      <div>
        <label>Experience:</label>
        <p>{driverData.experience} years</p>
      </div>
      <div>
        <label>Bio:</label>
        <p>{driverData.bio}</p>
      </div>
    </div>
  );
};

export default DriverInfo;
