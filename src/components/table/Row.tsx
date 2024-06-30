import { Pencil, Save, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { User } from "../../types";
import Checkbox from "../checkbox";
import EditableCell, { EditableSelectCell } from "./EditableCell";

type RowDataProps = {
  user: User;
  handleDelete: (ids: string[]) => void;
  handleSelect: (id: string, checked: boolean) => void;
  isSelected: boolean;
  updateUser: (updatedUser: User) => void;
};

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
  const [edit, setEdit] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<User>(user);

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSelect(user.id, e.target.checked);
    },
    [handleSelect, user.id]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditableUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleSave = useCallback(() => {
    updateUser(editableUser);
    setEdit(false);
  }, [editableUser, updateUser]);

  return (
    <tr className={`record ${isSelected ? "selected" : ""}`}>
      <td className="checked-cell">
        <Checkbox
          checked={isSelected}
          onChange={handleCheckboxChange}
          disabled={edit}
        />
      </td>
      <EditableCell
        isEditable={edit}
        classes="name-cell"
        value={editableUser.name}
        inputProps={{
          "aria-label": "name",
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
          "aria-label": "email",
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
            <button onClick={handleSave} aria-label="save" className="save">
              <Save size={20} strokeWidth={1} absoluteStrokeWidth />
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              aria-label="edit"
              className="edit"
            >
              <Pencil size={20} strokeWidth={1} absoluteStrokeWidth />
            </button>
          )}
          <button
            onClick={() => handleDelete([user.id])}
            aria-label="delete"
            className="delete"
            disabled={edit}
          >
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
