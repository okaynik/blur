import { useEffect, useState } from "react";
import "../../styles/Posts.css";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import { getProtectedResource } from "../../services/message.service";
// import { Post } from "../../models/post";
import { Post_Preview } from "../../models/post_preview";

import data from "../../test-data/mockPreview.json";

const Posts: React.FC = () => {
  const [posts, setLikes] = useState<Post_Preview[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getPosts = async () => {
      // const accessToken = await getAccessTokenSilently();
      // const { data, error } = await getProtectedResource(accessToken);
      // data?.forEach((post: Post) => {
      //   console.log(post);
      // });

      if (!isMounted) {
        return;
      }

      if (data) {
        setLikes(data.previews);
      }

      // if (error) {
      //   console.log(error);
      // }
    };

    getPosts();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const handleLike = (id: number, like: boolean) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        if (like) {
          return { ...post, likes: post.likes + 1 };
        } else {
          return { ...post, likes: post.likes - 1 };
        }
      }
      return post;
    });
    setLikes(updatedPosts);
  };

  return (
    <div>
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`}>
          <div className="post" key={post.id}>
            <h2>{post.question}</h2>
            <p>
              {post.author}: {post.hot_response}
            </p>
            <button onClick={() => handleLike(post.id, true)}>
              <FontAwesomeIcon icon={faChevronUp} color="" />
              {post.likes}
            </button>
            <button onClick={() => handleLike(post.id, false)}>
              <FontAwesomeIcon icon={faChevronDown} color="blue" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
