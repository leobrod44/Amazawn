import React from "react";
import { useRef, useEffect } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import "../styling/index.css";

const AddressSelectionComponent = ({
  name,
  labelText,
  value,
  onChange,
  setFormData,
}) => {
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();

    if (place) {
      const formattedAddress = place.formatted_address;
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      // Update the value in the parent component's state
      onChange({
        target: {
          name,
          value: formattedAddress, // Set the address as the value
        },
      });

      // Additionally, update latitude and longitude in the form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`${name}Latitude`]: latitude,
        [`${name}Longitude`]: longitude,
      }));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addListener("places_changed", handlePlaceChanged);
    }
  }, [inputRef, onChange, setFormData, name]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAYuDG3MNvaW57ZS70yBI3hhkogT9e1ygg"
      libraries={["places"]}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <div className="form-row">
          <label className="form-label">{labelText || name}</label>
          <input
            type="text"
            className="form-input"
            placeholder=""
            name={name}
            value={value} // Set the value here
            onChange={onChange}
          />
        </div>
      </StandaloneSearchBox>
    </LoadScript>
  );
};
export default AddressSelectionComponent;
