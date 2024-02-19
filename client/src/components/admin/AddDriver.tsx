// "use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useGetDriverID } from "@/hooks/useGetDriverID";
import { useCookies } from "react-cookie";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function AddDriver() {
  const driverID = useGetDriverID();
  const [cookies] = useCookies(["access_token"]);

  const [information, setInformation] = useState({
    name: "",
    birthdate: "",
    blood: "",
    phone: "",
    imageUrl: "",
    license: "",
    busID: "",
    routeID: "",
    from: "",
    to: "",
    experience: "",
    bio: "",
    email: "",
    username: "",
    password: "",
    time: "",
    userOwner: driverID,
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    phone: "",
    email: "",
    birthdate: "",
    blood: "",
    license: "",
    experience: "",
    imageUrl: "",
    busID: "",
    routeID: "",
    from: "",
    to: "",
    time: "",
  });

  const clearForm = () => {
    setInformation({
      name: "",
      birthdate: "",
      blood: "",
      phone: "",
      imageUrl: "",
      license: "",
      busID: "",
      routeID: "",
      from: "",
      to: "",
      experience: "",
      bio: "",
      email: "",
      username: "",
      password: "",
      time: "",
      userOwner: driverID,
    });
    setValidationErrors({
      name: "",
      phone: "",
      email: "",
      birthdate: "",
      blood: "",
      license: "",
      experience: "",
      imageUrl: "",
      busID: "",
      routeID: "",
      from: "",
      to: "",
      time: "",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInformation({ ...information, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };
  const validateForm = () => {
    let isValid = true;

    if (information.name.length < 2) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name must be at least 2 characters long.",
      }));
      isValid = false;
      alert("Name must be at least 2 characters long.");
    }

    if (!/^\d{10}$/.test(information.phone)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid 10-digit phone number.",
      }));
      isValid = false;
      alert("Please enter a valid 10-digit phone number.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(information.email)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
      alert("Please enter a valid email address.");
    }

    if (!/^\d{2}-\d{2}-\d{4}$/.test(information.birthdate)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        birthdate: "Please enter a valid date in DD-MM-YYYY format.",
      }));
      isValid = false;
      alert("Please enter a valid date in DD-MM-YYYY format.");
    }

    if (!/^https?:\/\//.test(information.imageUrl)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        imageUrl: "Please enter a valid URL for the image.",
      }));
      isValid = false;
      alert("Please enter a valid URL for the image.");
    }

    if (!information.blood) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        blood: "Blood Group must be filled.",
      }));
      isValid = false;
      alert("Blood Group must be filled.");
    }

    if (!information.license) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        license: "License Number must be filled.",
      }));
      isValid = false;
      alert("License Number must be filled.");
    }

    // Add more validations for other fields...

    return isValid;
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await axios.post(
          `${serverUrl}/driver/info`,
          information
          // {
          //   headers: {
          //     authorization: cookies.access_token,
          //   },
          // }
        );
        alert("Driver Information Added");
        clearForm();
        console.log(information);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex pb-20 justify-center">
      <div className="flex flex-col w-full lg:px-40">
        <div className="text-2xl font-bold py-10">Add Driver</div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              required
              value={information.name}
              id="name"
              type="text"
              placeholder="Chiara Rossi"
              name="name"
              onChange={handleChange}
            />
            {validationErrors.name && (
              <div className="text-red-500">{validationErrors.name}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              required
              value={information.phone}
              id="phone"
              type="number"
              placeholder="9998887777"
              name="phone"
              onChange={handleChange}
            />
            {validationErrors.phone && (
              <div className="text-red-500">{validationErrors.phone}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={information.email}
              id="email"
              type="email"
              placeholder="chiara.rossi@example.com"
              name="email"
              onChange={handleChange}
            />
            {validationErrors.email && (
              <div className="text-red-500">{validationErrors.email}</div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              value={information.birthdate}
              id="birthdate"
              type="text"
              placeholder="DD-MM-YYYY"
              name="birthdate"
              onChange={handleChange}
            />
            {validationErrors.birthdate && (
              <div className="text-red-500">{validationErrors.birthdate}</div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="blood">Blood Group</Label>
            <Input
              value={information.blood}
              id="blood"
              type="text"
              placeholder="A-"
              name="blood"
              onChange={handleChange}
            />
            {validationErrors.blood && (
              <div className="text-red-500">{validationErrors.blood}</div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              value={information.license}
              id="license"
              type="text"
              placeholder="DL876543"
              name="license"
              onChange={handleChange}
            />
            {validationErrors.license && (
              <div className="text-red-500">{validationErrors.license}</div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="experience">Experience (in years)</Label>
            <Input
              value={information.experience}
              id="experience"
              type="number"
              placeholder="6"
              name="experience"
              onChange={handleChange}
            />
            {validationErrors.experience && (
              <div className="text-red-500">{validationErrors.experience}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              value={information.bio}
              id="bio"
              placeholder="Chiara Rossi is an experienced bus driver with 6 years of service in the industry. She takes pride in her safe and reliable driving and is dedicated to providing passengers with a comfortable and secure journey."
              name="bio"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              required
              value={information.imageUrl}
              id="imageUrl"
              type="text"
              placeholder="https://example.com/chiara_rossi.jpg"
              name="imageUrl"
              onChange={handleChange}
            />
            {validationErrors.imageUrl && (
              <div className="text-red-500">{validationErrors.imageUrl}</div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="busID">Vehicle ID</Label>
            <Input
              required
              value={information.busID}
              id="busID"
              type="text"
              placeholder="0001"
              name="busID"
              onChange={handleChange}
            />
            {validationErrors.busID && (
              <div className="text-red-500">{validationErrors.busID}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="routeID">Route ID</Label>
            <Input
              required
              value={information.routeID}
              id="routeID"
              type="text"
              placeholder="3A"
              name="routeID"
              onChange={handleChange}
            />
            {validationErrors.routeID && (
              <div className="text-red-500">{validationErrors.routeID}</div>
            )}
          </div>

          <div className="gap-2 grid">
            <Label htmlFor="latitude">Route</Label>
            <div className="flex gap-4">
              <Input
                required
                value={information.from}
                id="from"
                type="text"
                placeholder="From"
                name="from"
                onChange={handleChange}
              />
              <Input
                required
                value={information.to}
                id="to"
                type="text"
                placeholder="To"
                name="to"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time">Timings</Label>
            <Input
              required
              value={information.time}
              id="time"
              type="text"
              placeholder="9:00 - 10:30"
              name="time"
              onChange={handleChange}
            />
            {validationErrors.time && (
              <div className="text-red-500">{validationErrors.time}</div>
            )}
          </div>

          <div className="grid gap-2">
            <Button className="w-full" type="submit">
              Add Driver
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
