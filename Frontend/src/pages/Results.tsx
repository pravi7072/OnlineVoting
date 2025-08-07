import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
type ResultType = {
    option: string;
    _count: {
      option: number;
    };
  };
const Results = () => {
  const { id } = useParams();
  const [results, setResults] = useState<ResultType[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/elections/results/${id}`)
      .then(response => setResults(response.data))
      .catch(error => console.error("Error fetching results", error));
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Election Results</h2>
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index} className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Option: {result.option}</h3>
            <p>Votes: {result._count.option}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
