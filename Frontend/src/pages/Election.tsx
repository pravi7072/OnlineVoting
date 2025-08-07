import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export interface Election{
    id:number
    title:string;
}
const Elections = () => {
  const [elections, setElections] = useState<Election[]>([]);

  useEffect(() => {
   axios.get("http://localhost:3000/api/v1/elections/all")
      .then(response => setElections(response.data.elections))
      .catch(error => console.error("Error fetching elections", error));
  }, []); 

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Elections</h2>
      <ul className="space-y-4">
        {elections.map((election) => (
          <li key={election.id} className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">{election.title}</h3>
            <Link to={`/elections/${election.id}`} className="text-blue-600 hover:underline">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Elections;