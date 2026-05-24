function UserCard({
  user,
  setEditId,
  setName,
  setEmail,
  deleteUser
}) {
  return (
    <div>
      <p>
        {user.name} - {user.email}
      </p>

      <button
        onClick={() => {
          setEditId(user._id);
          setName(user.name);
          setEmail(user.email);
        }}
      >
        Edit
      </button>

      <button
        onClick={() =>
          deleteUser(user._id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default UserCard;