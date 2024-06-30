export type SelectProps = {
  role: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { name: string; value: string }[];
};

const Select = ({ role, handleChange, options }: SelectProps) => {
  return (
    <select
      className="select-cell"
      onChange={handleChange}
      name="role"
      value={role}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
