import User from "../../components/user";
import useSWR from "swr";

const fetcher = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
};

export default function UserListFromClientSideSWR({ users }) {
  const { data, error } = useSWR("user", fetcher);

  if (error) {
    return <h1>An error has occured</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>User</h1>
      <h2>fake data from jsonplaceholder</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <User user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
