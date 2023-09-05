import React from "react";

export default function FormError({ location, error }) {
  const locationState = location.state?.message;
  return (
    <>
      {locationState && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      {error?.message && <h3 className="login-error">{error.message}</h3>}
    </>
  );
}
