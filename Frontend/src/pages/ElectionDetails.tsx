import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export interface Election {
  id: number;
  title: string;
  options: string[];
}

const ElectionDetails = () => {
  const { id } = useParams();
  const [election, setElection] = useState<Election | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/elections/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => setElection(response.data))
      .catch((error) => console.error("Error fetching election details", error));
  }, [id]);

  const handleVote = async (vote: string) => {
    if (!election) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/elections/vote`,
        { electionId: election.id, option: vote },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.msg === "Your vote added casted successfully") {
        alert("Vote cast successfully!");
      } else if (response.data.msg === "You have already voted") {
        alert("You have already voted!");
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error casting vote", error);
      alert("Error casting vote. Please try again later.");
    }
  };

  if (!election) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{election.title}</h2>
      <h3 className="text-lg font-semibold mt-4">Candidates</h3>
      <ul className="space-y-4">
        {election.options.map((candidate, index) => (
          <li key={index} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <p className="text-lg">{candidate}</p>
            <button
              onClick={() => handleVote(candidate)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
      <Link
        to={`/results/${id}`}
        className="block mt-6 bg-green-600 text-white py-2 px-6 rounded text-center hover:bg-green-700 transition"
      >
        View Results
      </Link>
    </div>
  );
};

export default ElectionDetails;
