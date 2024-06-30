const Select = ({ role, handleChange, options }) => {
  return (
    <select className="select-cell" onChange={handleChange} name="role">
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={role === option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
