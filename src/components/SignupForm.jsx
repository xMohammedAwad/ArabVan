import { useLoginForm } from "../hooks/useLoginForm";
import FormError from "./FormError";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

function SignupForm() {
  const { formData, status, error, handleSubmit, handleChange, location } =
    useLoginForm("Signup");

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
        value={formData.password}
        onChange={handleChange}
      />
      <FormError error={error} location={location} />

      <SubmitButton status={status} label={"Sign up"} />
    </form>
  );
}

export default SignupForm;
