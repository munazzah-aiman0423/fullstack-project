import UserCard from './UserCard';

function UserList({
  users,
  setEditId,
  setName,
  setEmail,
  deleteUser
}) {
  return (
    <>
      <h2>Users</h2>

      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          setEditId={setEditId}
          setName={setName}
          setEmail={setEmail}
          deleteUser={deleteUser}
        />
      ))}
    </>
  );
}

export default UserList;