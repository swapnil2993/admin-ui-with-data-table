import { useCallback, useMemo } from "react";
import Checkbox from "../checkbox";
import Row, { EmptyRow } from "./Row";
import "./table.scss";

const Table = ({
  data,
  handleDelete,
  handleRowSelect,
  selectedUsers,
  updateUser,
}) => {
  const allUserIds = useMemo(() => data.map((user) => user.id), [data]);
  const isAllSelected = useMemo(
    () =>
      allUserIds.every((userId) => selectedUsers.includes(userId)) &&
      selectedUsers.length > 0,
    [allUserIds, selectedUsers]
  );

  const handleUserSelect = useCallback(
    (id: string, isSelected: boolean) => {
      const updatedSelectedUsers = isSelected
        ? [...selectedUsers, id]
        : selectedUsers.filter((userId) => userId !== id);
      handleRowSelect(updatedSelectedUsers);
    },
    [handleRowSelect, selectedUsers]
  );

  const toggleAllUsers = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      const updatedSelectedUsers = checked
        ? Array.from(new Set([...selectedUsers, ...allUserIds]))
        : selectedUsers.filter((userId) => !allUserIds.includes(userId));
      handleRowSelect(updatedSelectedUsers);
    },
    [allUserIds, handleRowSelect, selectedUsers]
  );

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th className="checked-cell">
              <Checkbox checked={isAllSelected} onChange={toggleAllUsers} />
            </th>
            <th className="name-cell">Name</th>
            <th className="email-cell">Email</th>
            <th className="role-cell">Role</th>
            <th className="actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            <>
              {data.map((user) => (
                <Row
                  handleDelete={handleDelete}
                  handleSelect={handleUserSelect}
                  isSelected={selectedUsers?.includes(user.id) || false}
                  user={user}
                  key={user.id}
                  updateUser={updateUser}
                />
              ))}
            </>
          ) : (
            <EmptyRow />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
