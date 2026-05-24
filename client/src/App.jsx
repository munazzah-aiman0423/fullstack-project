import { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // GET USERS
  const fetchUsers = async () => {
    const res = await axios.get(
      'http://localhost:5000/users'
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // UPDATE USER
  const updateUser = async () => {
    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/users/${editId}`,
        {
          name,
          email
        }
      );

      setName('');
      setEmail('');
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    await axios.delete(
      `http://localhost:5000/users/${id}`
    );

    fetchUsers();
  };

  // ADD USER
  const addUser = async () => {
    try {
      setLoading(true);

      await axios.post(
        'http://localhost:5000/users',
        {
          name,
          email
        }
      );

      setName('');
      setEmail('');
      fetchUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>User CRUD App 🚀</h1>

      <UserForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        addUser={addUser}
        updateUser={updateUser}
        editId={editId}
        loading={loading}
      />

      <UserList
        users={users}
        setEditId={setEditId}
        setName={setName}
        setEmail={setEmail}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;