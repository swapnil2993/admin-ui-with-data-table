import { Pencil, Save, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import Checkbox from "../checkbox";
import EditableCell, { EditableSelectCell } from "./EditableCell";

const options = [
  { name: "Admin", value: "admin" },
  { name: "Member", value: "member" },
];

const Row = ({
  user,
  handleDelete,
  handleSelect,
  isSelected,
  updateUser,
}: RowDataProps) => {
  const [edit, setEdit] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  const handleCheckboxChange = useCallback(
    (e) => {
      handleSelect(user.id, e.target.checked);
    },
    [handleSelect, user.id]
  );

  const handleInputChange = useCallback((e) => {
    setEditableUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSave = useCallback(() => {
    updateUser(editableUser);
    setEdit(false);
  }, [editableUser, updateUser]);

  return (
    <tr className="record">
      <td className="checked-cell">
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </td>
      <EditableCell
        isEditable={edit}
        classes="name-cell"
        value={editableUser.name}
        inputProps={{
          value: editableUser.name,
          onChange: handleInputChange,
          className: "input-cell",
          required: true,
          name: "name",
        }}
      />
      <EditableCell
        isEditable={edit}
        classes="email-cell"
        value={editableUser.email}
        inputProps={{
          value: editableUser.email,
          onChange: handleInputChange,
          className: "input-cell",
          required: true,
          name: "email",
        }}
      />

      <EditableSelectCell
        isEditable={edit}
        classes="role-cell"
        value={editableUser.role}
        selectProps={{
          role: editableUser.role,
          handleChange: handleInputChange,
          options: options,
        }}
      />
      <td className="actions-cell">
        <div className="actions">
          {edit ? (
            <button onClick={handleSave}>
              <Save size={20} strokeWidth={1} absoluteStrokeWidth />
            </button>
          ) : (
            <button onClick={() => setEdit(true)}>
              <Pencil size={20} strokeWidth={1} absoluteStrokeWidth />
            </button>
          )}
          <button onClick={() => handleDelete([user.id])}>
            <Trash size={20} strokeWidth={1} absoluteStrokeWidth />
          </button>
        </div>
      </td>
    </tr>
  );
};

export const EmptyRow = () => {
  return (
    <tr className="record">
      <td className="no-data-cell" colSpan={5}>
        No related data found
      </td>
    </tr>
  );
};

export default Row;
