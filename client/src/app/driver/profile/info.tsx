import axios from "axios";
import { useEffect, useState } from "react";

export const SavedInfo = () => {
  const [information, setInformation] = useState<DriverInfo[]>([]); // Specify the type here

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/driver/info");
        setInformation(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div>
      <h1>Driver Info</h1>
      <ul>
        {information.map((info) => (
          <li key={info._id}>
            <div>
              <p>{info.name}</p>
            </div>
            <div>
              <p>{info.phone}</p>
            </div>
            <div>
              <img src={info.imageUrl} alt={info.name} />
            </div>
          </li>
        ))}
        ,
      </ul>
    </div>
  );
};

// Define the type for DriverInfo
interface DriverInfo {
  _id: string;
  name: string;
  phone: string;
  imageUrl: string;
  // Add other properties as needed
}
