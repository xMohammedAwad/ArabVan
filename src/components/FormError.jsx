import React from "react";

export default function FormError({ location, error }) {
  const locationState = location && location.state?.message;
  console.log();
  return (
    <>
      {locationState && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      {error?.message && (
        <h3 className="login-error">{error.message.slice(9, -1)}</h3>
      )}
    </>
  );
}
