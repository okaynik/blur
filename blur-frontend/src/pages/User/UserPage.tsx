import { Link } from "react-router-dom";
import Layout from "../Layout";
import "../../styles/UserPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useMakeRequest } from "../../services/useMakeRequest";
import { getUserPosts } from "../../services/posts.service";
import { Post } from "../../models/post";
import ReactTimeAgo from "react-time-ago";

export default function UserPage() {
  const { user } = useAuth0();
  const posts = useMakeRequest<Post[]>(getUserPosts);

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <Layout>
      <div className="user-page">
        <div className="back-btn">
          <Link to="/main">
            <button>Go Back</button>
          </Link>
        </div>

        <h1 className="user-page-title">Welcome, {user.username}!</h1>
        <div className="user-info">
          <img src={user.picture} alt="User profile" className="user-img" />
          <p className="user-name">{user.username}</p>
        </div>
      </div>
      <div className="user-posts">
        <h2 className="your-posts">Your recent posts</h2>
        {posts?.map((post) => (
          <div className="post" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>
                <span className="author">{post.author}:</span>{" "}
                {post.body.length > 280
                  ? post.body.slice(0, 280) + "..."
                  : post.body}
              </p>
              <div className="response-meta bottom-post">
                <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
