import axios from "axios";
import { useEffect, useState } from "react";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

interface SavedInfoProps {
  userName: string;
}

export const SavedInfo: React.FC<SavedInfoProps> = ({ userName }) => {
  // Decode the userName to remove %20
  userName = decodeURIComponent(userName);

  const [information, setInformation] = useState<DriverInfo[]>([]);
  const [displayedInfo, setDisplayedInfo] = useState<DriverInfo | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`${serverUrl}/driver/info`);
        setInformation(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    // Find the first occurrence of information for the userName
    const firstInfo = information.find((info) => info.name === userName);

    if (firstInfo) {
      setDisplayedInfo(firstInfo);
    }
  }, [information, userName]);

  return (
    <div>
      {displayedInfo && (
        <div className="flex items-center space-x-10 px-20">
          <div className="w-1/2">
            <img
              src={displayedInfo.imageUrl}
              className="rounded-full w-52"
              alt={displayedInfo.name}
            />
          </div>
          <div className="w-1/2 flex-col flex space-y-2">
            <p>Name: {displayedInfo.name}</p>
            <p>Blood: {displayedInfo.blood}</p>
            <p>Phone: {displayedInfo.phone}</p>
            <p>Date of Birth: {displayedInfo.birthdate}</p>
            <p>License Number: {displayedInfo.license}</p>
            <p>Experience: {displayedInfo.experience}</p>
            {/* <p>{displayedInfo.bio}</p> */}
          </div>
        </div>
      )}
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
