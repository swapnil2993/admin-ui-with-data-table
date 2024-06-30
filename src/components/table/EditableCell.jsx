import Select from "./Select";

const EditableInputCell = ({ classes, isEditable, value, inputProps }) => {
  return (
    <td className={classes}>
      {isEditable ? <input {...inputProps} /> : value || "-"}
    </td>
  );
};

export const EditableSelectCell = ({
  classes,
  isEditable,
  value,
  selectProps,
}) => {
  return (
    <td className={classes}>
      {isEditable ? <Select {...selectProps} /> : value || "-"}
    </td>
  );
};

export default EditableInputCell;
