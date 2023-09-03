import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

export default function Login() {
  const location = useLocation();
  const from = location.state?.from || "/host";

  const { loginFormData, status, error, handleSubmit, handleChange } =
    useLoginForm(from);

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {error?.message && <h3 className="login-error">{error.message}</h3>}

      <LoginForm
        loginFormData={loginFormData}
        status={status}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
