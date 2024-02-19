import User from '../../components/user';

export default function UserListFromGetServerSideProps({ users }) {
  return (
    <div>
      <h1>User</h1>
      <h2>fake data from jsonplaceholder</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <User user={user}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}
