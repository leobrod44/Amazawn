import React from "react";

const FormRowWithDropdown = ({
  labelText,
  inputType,
  inputName,
  inputValue,
  onInputChange,
  dropdownOptions,
  dropdownName,
  dropdownValue,
  onDropdownChange,
}) => {
  const showDropdown = dropdownOptions.length > 1; // Check if there is more than one option

  return (
    <div className="form-row">
      <label className="form-label">{labelText}</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type={inputType}
          className="form-input"
          name={inputName}
          value={inputValue}
          onChange={onInputChange}
          style={{width:"35%"}}
        />
        {showDropdown ? (
        <select
          name={dropdownName}
          value={dropdownValue}
          onChange={onDropdownChange}
          style={{ marginLeft: "5px",
          width: "60px",
          color: "#024f35",
          borderRadius: "var(--borderRadius)",
          background: "rgba(16, 94, 33, 0.102)",
          border: "1px solid #CED3C2",
          height: "2.2rem"
           }}
        >
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        ):(
          <div className="form-select" style={{ marginLeft: "5px" , width:"60px"}}>In</div>
        )}
      </div>
    </div>
  );
};

export default FormRowWithDropdown;