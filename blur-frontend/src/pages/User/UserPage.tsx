import { Link } from "react-router-dom";
import Layout from "../Layout";
import mockUserImg from "../../test-data/mockUserImg.jpg";
import "../../styles/UserPage.css";

interface UserPageProps {
  username: string;
}

export default function UserPage(props: UserPageProps) {
//   const previousQuestions = [
//     {
//       id: 1,
//       title: "What is your favorite color?",
//       answerCount: 2,
//     },
//     {
//       id: 2,
//       title: "What is your favorite food?",
//       answerCount: 5,
//     },
//     {
//       id: 3,
//       title: "What is your favorite hobby?",
//       answerCount: 1,
//     },
//   ];

  return (
        <Layout isEditing={false} handleEdit={() => {}}>
            <div className="user-page">
                <div className="back-btn">
                    <Link to="/main">
                        <button>Go Back</button>
                    </Link>
                </div>

                <h1 className="user-page-title">Welcome, {props.username}!</h1>
                <div className="user-info">
                    <img src={mockUserImg} alt="User profile" className="user-img" />
                    <p className="user-name">{props.username}</p>
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
