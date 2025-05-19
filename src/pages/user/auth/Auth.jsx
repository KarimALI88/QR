import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      // console.log("Token:", token);
      // Store the token or handle authentication
      localStorage.setItem("tn", token)
      setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  }, [location]);

  return <div>Processing authentication...</div>;
};

export default Auth;
