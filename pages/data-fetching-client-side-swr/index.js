import User from '../../components/user';
import { useState, useEffect } from 'react';

export default function UserListFromClientSide({ users }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUserData(data);
      setIsLoading(false);
    }
    fetchUserData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>User</h1>
      <h2>fake data from jsonplaceholder</h2>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            <User user={user}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
