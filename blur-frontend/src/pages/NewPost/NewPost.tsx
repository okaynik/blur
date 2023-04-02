import { useState } from "react";
import Layout from "../Layout";

export default function NewPost(){

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");


    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const submitPost = () => {
        fetch("http://localhost:9000/api/posts/add", {
        method: "POST",
        headers: {
            "Content-Type": "applicati   on/json",
        },
        body: JSON.stringify({
            title: title,
            body: body,
            author: "spicyshrimp",
        }),
        });
        setIsEditing(false);
    };
    

    return (
       <Layout >
            <div className="Create-box">
              <div className="Create form-group mt-3">
                <label>Your Question</label>
                <input
                  type="username"
                  className="form-control mt-1"
                  placeholder="Enter question"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="form-control mt-1"
                  placeholder="Enter description of your question"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <div className="ButtonGroup">
                <button className="btn btn-dark" onClick={submitPost}>
                  Submit
                </button>
              </div>
            </div>
        </Layout>
    )

}