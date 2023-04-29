import { useAuth0 } from "@auth0/auth0-react";
import "../../styles/Verify.css";
import { useNavigate } from "react-router-dom";
import { resendVerification } from "../../services/auth.service";
import { useEffect, useState } from "react";

export default function Verify() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    getAccessTokenSilently,
    user,
    logout,
    getIdTokenClaims,
  } = useAuth0();
  const [message, setMessage] = useState("");

  const handleCheckVerified = async () => {
    setMessage("Checking...");
    // Check if the user is already verified
    if (user?.email_verified) {
      navigate(`/`);
    }

    try {
      // Get the latest user object from Auth0
      await getAccessTokenSilently({ ignoreCache: true });
      const tokenClaims = await getIdTokenClaims();
      const updatedUser = { ...tokenClaims };

      if (updatedUser?.email_verified) {
        navigate(`/`);
      } else {
        setMessage("Email is not verified yet!");
      }
    } catch (error) {
      alert("There was an error verifying your email.");
    }
  };

  const handleResendClick = async () => {
    if (!isAuthenticated || !user?.sub) return;

    const accessToken = await getAccessTokenSilently();
    const { data, error } = await resendVerification(accessToken, user.sub);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage(data.message);
    }
  };

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div className="verify">
      <h1>Please verify your email to access the website</h1>
      <h2 className="verify-message">{message}</h2>
      <div className="verify-buttons">
        <button className="btn-dark" onClick={handleLogout}>
          Logout
        </button>
        <button className="btn-dark" onClick={handleResendClick}>
          Resend email
        </button>
        <button className="btn-dark" onClick={handleCheckVerified}>
          I have verified!
        </button>
      </div>
    </div>
  );
}
