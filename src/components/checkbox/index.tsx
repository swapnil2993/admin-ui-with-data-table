import "./checkbox.scss";

interface Props extends React.HTMLProps<HTMLInputElement> {}

const Checkbox = (inputProps: Props) => {
  return <input type="checkbox" className="checkbox" {...inputProps} />;
};

export default Checkbox;
