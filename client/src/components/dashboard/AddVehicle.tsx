import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useGetDriverID } from "@/hooks/useGetDriverID";

export default function AddVehicle() {
  const driverID = useGetDriverID();
  const [vehicleInfo, setVehicleInfo] = useState({
    vehicleID: "",
    model: "",
    year: "",
    plateNumber: "",
    color: "",
    longitude: "",
    latitude: "",
    owner: driverID,
  });

  const clearForm = () => {
    setVehicleInfo({
      vehicleID: "",
      model: "",
      year: "",
      plateNumber: "",
      color: "",
      longitude: "",
      latitude: "",
      owner: driverID,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVehicleInfo({ ...vehicleInfo, [name]: value });
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/vehicle/info", vehicleInfo);
      alert("Vehicle Information Added");
      clearForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex pb-20 justify-center">
      <div className="flex flex-col w-full lg:px-40">
        <div className="text-2xl font-bold py-10">Add Vehicle</div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="vehicleID">Vehicle ID</Label>
            <Input
              id="vehicleID"
              type="text"
              placeholder="Vehicle ID"
              name="vehicleID"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              type="text"
              placeholder="Vehicle Model"
              name="model"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              placeholder="Vehicle Year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plateNumber">Plate Number</Label>
            <Input
              id="plateNumber"
              type="text"
              placeholder="Vehicle Plate Number"
              name="plateNumber"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="text"
              placeholder="Vehicle Color"
              name="color"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="text"
              placeholder="Latitude"
              name="latitude"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="text"
              placeholder="Longitude"
              name="longitude"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Button className="w-full" type="submit">
              Add Vehicle
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
