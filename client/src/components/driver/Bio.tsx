import axios from "axios";
import { useEffect, useState } from "react";

interface BioProps {
  userName: string;
}

export const Bio: React.FC<BioProps> = ({ userName }) => {
  userName = decodeURIComponent(userName);

  const [information, setInformation] = useState<DriverInfo[]>([]);
  const [displayedInfo, setDisplayedInfo] = useState<DriverInfo | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(
          "https://novu.onrender.com/driver/info"
        );
        setInformation(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const firstInfo = information.find((info) => info.name === userName);

    if (firstInfo) {
      setDisplayedInfo(firstInfo);
    }
  }, [information, userName]);

  return (
    <div>
      {displayedInfo && (
        <div className="flex items-center">
          <div className="flex-col flex space-y-2">
            <p>{displayedInfo.bio}</p>
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
  bio: string;
}
