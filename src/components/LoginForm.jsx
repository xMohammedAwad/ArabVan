import React from "react";

function LoginForm({ loginFormData, status, handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit} className="login-form">
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
      <button disabled={status === "submitting"}>
        {status === "submitting" ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default LoginForm;
