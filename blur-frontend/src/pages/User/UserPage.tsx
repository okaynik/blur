import { Link } from "react-router-dom";
import Layout from "../Layout";
import mockUserImg from "../../test-data/mockUserImg.jpg";
import "../../styles/UserPage.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserPage() {
  const { user } = useAuth0();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="user-page">
        <div className="back-btn">
          <Link to="/main">
            <button>Go Back</button>
          </Link>
        </div>

        <h1 className="user-page-title">Welcome, {user.nickname}!</h1>
        <div className="user-info">
          <img src={mockUserImg} alt="User profile" className="user-img" />
          <p className="user-name">{user.nickname}</p>
        </div>
        {/* <h2 className="previous-questions-title">Previous Questions</h2>
                <ul className="previous-questions-list">
                    {previousQuestions.map((question) => (
                        <li key={question.id} className="previous-question">
                            <Link to={`/main/question/${question.id}`} className="question-link">
                                {question.title} ({question.answerCount})
                            </Link>
                        </li>
                ))}
                </ul> */}
      </div>
    </Layout>
  );
}
