import { addReview } from "../api";
import { useAsync } from "../hooks/useAsync";
import FormInput from "./FormInput";
import Swal from "sweetalert2";
import { useCallback, useState, useEffect } from "react";
export default function AddVan({ vanId, hostId }) {
  const [formData, setFormData] = useState({
    rating: "",
    name: "",
    date: new Date().toLocaleDateString(),
    review: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const formFields = [
    { type: "number", name: "rating", placeholder: "Rating", min: 1, max: 5 },
    { type: "text", name: "name", placeholder: "Name" },
  ];

  const {
    execute: addReviewAsync,
    status,
    error,
  } = useAsync(
    () => addReview(vanId, hostId, formData),
    false // do not immediately execute
  );

  function handleSubmit(e) {
    setFormData({
      rating: "",
      name: "",
      date: new Date().toLocaleDateString(),
      review: "",
    });
    e.preventDefault();
    addReviewAsync();
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      {formFields.map((field, i) => (
        <FormInput
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          name={field.name}
          id={field.name}
          onChange={handleChange}
          value={formData[field.name]}
          min={field.min}
          max={field.max}
        />
      ))}
      <label htmlFor="review">Review</label>
      <textarea
        name="review"
        id="review"
        cols="30"
        rows="5"
        placeholder="Write your Review"
        value={formData.review}
        onChange={handleChange}
      ></textarea>
      <button type="submit" disabled={status === "pending"}>
        Add Van
      </button>
      {status === "pending" && <h4>Loading...</h4>}

      {error && <h4 className="error">Error: {error.message}</h4>}
    </form>
  );
}
