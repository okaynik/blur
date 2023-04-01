import Layout from "../Layout";

interface UserPageProps {
  username: string;
}

export default function UserPage(props: UserPageProps) {
  return (
    <Layout isEditing={false} handleEdit={() => {}}>
      <div>
        <h1>Welcome, {props.username}!</h1>
        <p>This is your user page.</p>
      </div>
    </Layout>
  );
}
