import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SavedInfoProps {
  userName: string;
}

export const SavedInfo: React.FC<SavedInfoProps> = ({ userName }) => {
  // Decode the userName to remove %20
  userName = decodeURIComponent(userName);

  const [information, setInformation] = useState<DriverInfo[]>([]);

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
      <ul>
        {information
          .filter((info) => info.name === userName)
          .map((info) => (
            <li key={info._id} className="flex items-center space-x-10 px-20">
              <div className="w-1/2">
                <img
                  src={info.imageUrl}
                  className="rounded-full w-52"
                  alt={info.name}
                />
              </div>
              <div className="w-1/2 flex-col flex space-y-2">
                <p>Name: {info.name}</p>
                <p>Blood: {info.blood}</p>
                <p>Phone: {info.phone}</p>
                <p>Date of Birth: {info.birthdate}</p>
                <p>License Number: {info.license}</p>
                <p>Experience: {info.experience}</p>
                <p>{info.bio}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

// Define the type for DriverInfo
interface DriverInfo {
  _id: string;
  name: string;
  blood: string;
  phone: string;
  imageUrl: string;
  birthdate: string;
  license: string;
  busID: string;
  routeID: string;
  from: string;
  to: string;
  experience: string;
  bio: string;
  // Add other properties as needed
}
