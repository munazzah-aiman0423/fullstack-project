import { useState } from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

    const navigate =
  useNavigate();
    
  const login = async () => {
    try {
      const res =
        await axios.post(
          'http://localhost:5000/login',
          {
            email,
            password
          }
        );

      localStorage.setItem(
        'token',
        res.data.token
      );

      alert(
        res.data.message
      );
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Login 🔐</h1>

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

      <button onClick={login}>
        Login
      </button>
      <p>
        New user?
        <Link to="/signup">
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;