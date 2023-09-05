import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import "./Login.css";
export default function Login() {
  return (
    <div className="login-container">
      <LoginForm />
      <br />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
