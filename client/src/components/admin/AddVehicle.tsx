import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useGetDriverID } from "@/hooks/useGetDriverID";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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

  const [validationErrors, setValidationErrors] = useState({
    vehicleID: "",
    model: "",
    year: "",
    plateNumber: "",
    color: "",
    latitude: "",
    longitude: "",
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

    setValidationErrors({
      vehicleID: "",
      model: "",
      year: "",
      plateNumber: "",
      color: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVehicleInfo({ ...vehicleInfo, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const errors: any = {};

    Object.entries(vehicleInfo).forEach(([key, value]) => {
      if (!value) {
        errors[key] = `Please enter a valid ${
          key === "plateNumber" ? "Plate Number" : key
        }.`;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all the required fields correctly.");
      return;
    }

    try {
      await axios.post(`${serverUrl}/vehicle/info`, vehicleInfo);
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
              required
              value={vehicleInfo.vehicleID}
              id="vehicleID"
              type="text"
              placeholder="0001"
              name="vehicleID"
              onChange={handleChange}
            />
            <span className="text-red-500">{validationErrors.vehicleID}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Input
              required
              value={vehicleInfo.model}
              id="model"
              type="text"
              placeholder="Toyota Hiace"
              name="model"
              onChange={handleChange}
            />
            <span className="text-red-500">{validationErrors.model}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              required
              value={vehicleInfo.year}
              id="year"
              type="number"
              placeholder="2022"
              name="year"
              onChange={handleChange}
            />
            <span className="text-red-500">{validationErrors.year}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plateNumber">Plate Number</Label>
            <Input
              required
              value={vehicleInfo.plateNumber}
              id="plateNumber"
              type="text"
              placeholder="KA 19 AB 1234"
              name="plateNumber"
              onChange={handleChange}
            />
            <span className="text-red-500">{validationErrors.plateNumber}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <Input
              required
              value={vehicleInfo.color}
              id="color"
              type="text"
              placeholder="White"
              name="color"
              onChange={handleChange}
            />
            <span className="text-red-500">{validationErrors.color}</span>
          </div>

          <div className="gap-2 grid">
            <Label htmlFor="latitude">Parking Location</Label>
            <div className="flex gap-4">
              <Input
                required
                value={vehicleInfo.latitude}
                id="latitude"
                type="text"
                placeholder="Latitude"
                name="latitude"
                onChange={handleChange}
              />
              <Input
                required
                value={vehicleInfo.longitude}
                id="longitude"
                type="text"
                placeholder="Longitude"
                name="longitude"
                onChange={handleChange}
              />
            </div>
            <span className="text-red-500">{validationErrors.latitude}</span>
            <span className="text-red-500">{validationErrors.longitude}</span>
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
