import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Online Voting</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-xl">
        Participate in elections securely and easily. Cast your vote and view results in real time.
      </p>
      <div className="flex space-x-4">
        <Link to="/elections" className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition">
          View Elections
        </Link>
        <Link to="/login" className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 transition">
          Login
        </Link>
        <Link to="/register" className="bg-yellow-500 text-white py-2 px-6 rounded-lg shadow hover:bg-yellow-600 transition">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;