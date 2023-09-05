import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

export default function Login() {

  return (
    <div className="login-container">
      <LoginForm />
    </div>
  );
}
