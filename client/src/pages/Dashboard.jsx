import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';
import {
  useNavigate
} from 'react-router-dom';

function Dashboard() {
  const [data, setData] =
    useState(null);

  const navigate =
    useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem(
        'token'
      );

    if (!token) {
      navigate('/');
    } else {
      fetchProfile();
    }
  }, []);

  const fetchProfile =
    async () => {
      try {
        const token =
          localStorage.getItem(
            'token'
          );

        const res =
          await axios.get(
            'http://localhost:5000/profile',
            {
              headers: {
                Authorization:
                  token
              }
            }
          );

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  const logout = () => {
    localStorage.removeItem(
      'token'
    );

    navigate('/');
  };

  return (
    <div className="container">
      <h1>Dashboard 🔐</h1>

      {data ? (
        <>
          <p>
            {data.message}
          </p>

          <p>
            User ID:
            {data.user.id}
          </p>

          <button
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;