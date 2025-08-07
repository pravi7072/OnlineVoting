import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/user/register", { username, password, role });
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/elections");
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Email" className="border p-2 w-full mb-2" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select className="border p-2 w-full mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
        <p className="mt-2 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
