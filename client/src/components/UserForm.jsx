function UserForm({
  name,
  setName,
  email,
  setEmail,
  addUser,
  updateUser,
  editId,
  loading
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button
        onClick={
          editId
            ? updateUser
            : addUser
        }
        disabled={loading}
      >
        {loading
          ? 'Loading...'
          : editId
          ? 'Update User'
          : 'Add User'}
      </button>
    </>
  );
}

export default UserForm;