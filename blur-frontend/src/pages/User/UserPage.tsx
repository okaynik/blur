import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import "../../styles/UserPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useMakeRequest } from "../../services/useMakeRequest";
import { getUserPosts } from "../../services/posts.service";
import { Post } from "../../models/post";
import ReactTimeAgo from "react-time-ago";

import { ApiResponse } from "../../models/api-response";
import { useCallback} from "react";
import { AppError } from "../../models/app-error";
import  InfiniteScroll  from '../../components/InfiniteScroll';


export default function UserPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  // const posts = useMakeRequest<Post[]>(getUserPosts);
    const fetchPosts = useCallback(async (page: number): Promise<ApiResponse<Post[]>> => {
      try {
        const accessToken = await getAccessTokenSilently();
        // console.log("fetchPosts: ", page, "brrrr why is this so hard"); 
        return  getUserPosts(accessToken, page);
      } catch (error) {
        console.log("error fetching data: ", error);
        return { error: error as AppError, data: [] };
      }
    }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  function renderPost({ item }: { item: Post }): JSX.Element {
    return (
      <div className="post" key={item.id}>
      <Link to={`/posts/${item.id}`}>
        <h2>{item.title}</h2>
        <p>
          <span className="author">{item.author}:</span>{" "}
          {item.body.length > 280
            ? item.body.slice(0, 280) + "..."
            : item.body}
        </p>
        <div className="response-meta bottom-post">
          <ReactTimeAgo date={new Date(item.createdAt)} locale="en-US" />
        </div>
      </Link>
    </div>
    );
  }
  

  return (
    <Layout>
      <div className="user-page">
        <button
          className="back-btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>

        <h1 className="user-page-title">Welcome, {user.username}!</h1>
        <div className="user-info">
          <img src={user.picture} alt="User profile" className="user-img" />
          <p className="user-name">{user.username}</p>
        </div>
      </div>
      <div className="user-posts">
        <h2 className="your-posts">Your recent posts</h2>
        <div>
          <InfiniteScroll<Post>
          fetchData={fetchPosts}
          renderItem={renderPost}
        />
        </div>
          
      </div>
    </Layout>
  );
}
