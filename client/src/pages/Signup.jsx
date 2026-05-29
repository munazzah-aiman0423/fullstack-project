import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const signup = async () => {
    try {
      const res =
        await axios.post(
          'http://localhost:5000/users',
          {
            name,
            email,
            password
          }
        );

      alert(
        res.data.message ||
        'Signup successful'
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Signup 🚀</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={signup}>
        Signup
      </button>

      <p>
  Already have account?
  <Link to="/">
    Login
  </Link>
</p>
    </div>
  );
}

export default Signup;