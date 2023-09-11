import { useLoginForm } from "../hooks/useLoginForm";
import FormError from "./FormError";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

function LoginForm() {
  const { formData, status, error, handleSubmit, handleChange, location } =
    useLoginForm("Login");

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <FormInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormInput
        type="password"
        name="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
      />
      <FormError error={error} location={location} />

      <SubmitButton status={status} label={"Log in"} />
    </form>
  );
}

export default LoginForm;
