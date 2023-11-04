import React from "react";

const FormRowSideBySide = ({ type1, name1, value1, onChange1, labelText1, err1, type2, name2, value2, onChange2, labelText2, err2 }) => {
    return (
      <div className="form-row-side-by-side">
        <div className="form-row">
          <label className="form-label">{labelText1 || name1}</label>
          <input
            type={type1}
            className={`form-input ${err1 && !value1 ? "error" : ""}`}
            name={name1}
            value={value1}
            onChange={onChange1}
          />
        </div>
        <div className="form-row">
          <label className="form-label">{labelText2 || name2}</label>
          <input
            type={type2}
            className={`form-input ${err2 && !value2 ? "error" : ""}`}
            name={name2}
            value={value2}
            onChange={onChange2}
          />
        </div>
      </div>
    );
  };

export default FormRowSideBySide;