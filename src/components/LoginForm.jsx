import { useLoginForm } from "../hooks/useLoginForm";
import FormError from "./FormError";
import FormInput from "./FormInput";

function LoginForm() {
  const { formData, loading, error, handleSubmit, handleChange, location } =
    useLoginForm("Login", { email: "", password: "" });

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <FormError error={error} location={location} />

      <button disabled={loading}>{loading ? `wait...` : `Login`}</button>
    </form>
  );
}

export default LoginForm;
