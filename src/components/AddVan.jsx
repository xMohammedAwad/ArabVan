import { addVan } from "../api";
import { useAsync } from "../hooks/useAsync";
import FormInput from "./FormInput";
import Swal from "sweetalert2";
import { useCallback, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";

export default function AddVan() {
  const [formData, setFormData] = useState({
    description: "",
    imageUrl: "",
    name: "",
    price: "",
    type: "",
    isRented: false,
    hostId: "123",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      if (user) {
        setFormData((prev) => ({
          ...prev,
          hostId: user.uid,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const formFields = [
    { type: "url", name: "imageUrl", placeholder: "Image URL" },
    { type: "text", name: "name", placeholder: "Name" },
    { type: "number", name: "price", placeholder: "Price" },
    { type: "text", name: "type", placeholder: "Type" },
    { type: "text", name: "description", placeholder: "Description" },
  ];

  const {
    execute: addVanAsync,
    status,
    error,
  } = useAsync(
    () => addVan(formData),
    false // do not immediately execute
  );

  function handleSubmit(e) {
    e.preventDefault();
    addVanAsync();
    console.log(formData.hostId);
  }

  return (
    <form className="add-van" onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div className="form-input" key={field.placeholder}>
          <FormInput
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            onChange={handleChange}
            value={formData[field.name]}
          />
        </div>
      ))}
      <button type="submit" disabled={status === "pending"}>
        Add Van
      </button>
      {status === "pending" && <h4>Loading...</h4>}

      {error && <h4 className="error">Error: {error.message}</h4>}
    </form>
  );
}
