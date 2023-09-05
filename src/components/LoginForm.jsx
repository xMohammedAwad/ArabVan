import { useLoginForm } from "../hooks/useLoginForm";
import FormError from "./FormError";

function LoginForm() {
  const { loginFormData, status, error, handleLogin, location, handleChange } =
    useLoginForm();

  return (
    <form onSubmit={handleLogin} className="login-form">
      <input
        name="email"
        onChange={handleChange}
        type="email"
        placeholder="Email address"
        value={loginFormData.email}
      />
      <input
        name="password"
        onChange={handleChange}
        type="password"
        placeholder="Password"
        value={loginFormData.password}
      />

      <FormError location={location} error={error} />

      <button disabled={status === "submitting"}>
        {status === "submitting" ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default LoginForm;
