import React, { useState, useEffect } from "react";
import { allDivision, districtsOf } from "@bangladeshi/bangladesh-address";

export default function DistrictSelector({
  division,
  setDivisions,
  districts,
  setDistricts,
  selectedDivision,
  selectedDistrict,
  setSelectedDistrict,
  setSelectedDivision,
  divisions,
}) {
  useEffect(() => {
    const allDivisionsList = allDivision();
    setDivisions(allDivisionsList);
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      const districtList = districtsOf(selectedDivision);
      setDistricts(districtList);
    }
  }, [selectedDivision]);

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div>
      <label>*Select Your Division</label>
      <select
        className="w-100 h-8 "
        name="division"
        id="division"
        value={selectedDivision}
        onChange={handleDivisionChange}
        style={{
          fontSize: "16px", // Adjust the font size as needed
          border: "1px solid #ccc", // Set the border style and color
          borderRadius: "5px", // Optionally, set border radius for rounded corners
          padding: "8px", // Optionally, adjust the padding
        }}
      >
        <option value="">Select Division</option>
        {divisions &&
          divisions.map((division, index) => (
            <option key={index} value={division}>
              {division}
            </option>
          ))}
      </select>
      <br />
      <label>*Select Your District</label>
      <select
        className="mt-2  w-100"
        name="districts"
        id="districts"
        value={selectedDistrict}
        onChange={handleDistrictChange}
        style={{
          fontSize: "16px", // Adjust the font size as needed
          border: "1px solid #ccc", // Set the border style and color
          borderRadius: "5px", // Optionally, set border radius for rounded corners
          padding: "8px", // Optionally, adjust the padding
        }}
      >
        <option value="">Select District</option>
        {districts &&
          districts.map((d, index) => (
            <option key={index} value={d}>
              {d}
            </option>
          ))}
      </select>
      <br />
    </div>
  );
}
