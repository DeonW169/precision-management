import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="text" placeholder="Email" className="input input-bordered w-full mb-3" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-3" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
