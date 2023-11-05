import React from "react";
import {useRef} from "react";
import {StandaloneSearchBox,LoadScript} from "@react-google-maps/api";
import "../styling/index.css"

const AddressSelectionComponent=(  { name,labelText, }) => {
  
  const inputRef=useRef();

  const handlePlaceChanged =() => {
    const [place] = inputRef.current.getPlaces();

    if(place){
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };
  
  return (
    <LoadScript
    googleMapsApiKey="AIzaSyAYuDG3MNvaW57ZS70yBI3hhkogT9e1ygg"
    libraries={["places"]}>

    <StandaloneSearchBox
    onLoad={ref=> (inputRef.current=ref)}
    onPlacesChanged={handlePlaceChanged}
    >
      <div className="form-row">
      <label className="form-label">{labelText || name}</label>
      <input
      type="text"
      className="form-input"
      placeholder=""
      />
      </div>
    </StandaloneSearchBox>
    </LoadScript>
  );
}
export default AddressSelectionComponent;