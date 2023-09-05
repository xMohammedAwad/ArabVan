import React from "react";

export default function FormError({ location, error }) {
  const location = location.state?.message;
  return (
    <>
      {location && <h3 className="login-error">{location.state.message}</h3>}
      {error?.message && <h3 className="login-error">{error.message}</h3>}
    </>
  );
}
