import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('/api/user-data')
      .then(response => response.json())
      .then(data => setUserData(data));
  }, []);

  return (
    <div>
      <h1>Results</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}
