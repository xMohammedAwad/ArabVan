import React from "react";

export default function SubmitButton({ status, label }) {
  return (
    <button disabled={status === "submitting"}>
      {status === "submitting" ? `wait...` : `${label}`}
    </button>
  );
}
