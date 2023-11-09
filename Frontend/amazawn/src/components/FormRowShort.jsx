const FormRowShort = ({ type, name, value, onChange, labelText, err }) => {
  
    return (
      <div className="form-row-short">
        <label className="form-label">{labelText || name}</label>
        <input
          type={type}
          className={`form-input ${err && !value ? "error" : ""}`}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  export default FormRowShort;