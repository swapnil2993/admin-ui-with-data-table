import Select, { SelectProps } from "./Select";

interface Props {
  classes: string;
  isEditable: boolean;
  value: string;
  inputProps: React.HTMLProps<HTMLInputElement>;
}

interface SelectCellProps {
  classes: string;
  isEditable: boolean;
  value: string;
  selectProps: SelectProps;
}

const EditableInputCell = ({
  classes,
  isEditable,
  value,
  inputProps,
}: Props) => {
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
}: SelectCellProps) => {
  return (
    <td className={classes}>
      {isEditable ? <Select {...selectProps} /> : value || "-"}
    </td>
  );
};

export default EditableInputCell;
