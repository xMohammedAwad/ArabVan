import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rentVan } from "../api";

import processPayment from "./processPayment";
import { useAsync } from "../hooks/useAsync";

export default function CheckoutForm() {
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vanId = searchParams.get("vanId");
  const hostId = searchParams.get("hostId");

  const {
    execute: rentVanAsync,
    status,
    error,
  } = useAsync(
    () => rentVan(vanId, hostId, startDate.value, endDate.value),
    false // do not immediately execute
  );

  const onSubmit = async (data) => {
    const { startDate, endDate, cardNumber, cardExpiry, cardCVV } = data;

    // Process payment
    try {
      const paymentResult = await processPayment(
        { cardNumber, cardExpiry, cardCVV },
        60
      );
      console.log(paymentResult);

      // If payment is successful, rent the van
      if (paymentResult) {
        await rentVanAsync();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div>
      <h1>Rental Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" {...register("startDate")} />

        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" {...register("endDate")} />

        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" {...register("cardNumber")} />

        <label htmlFor="cardExpiry">Card Expiry Date</label>
        <input type="text" id="cardExpiry" {...register("cardExpiry")} />

        <label htmlFor="cardCVV">Card CVV</label>
        <input type="text" id="cardCVV" {...register("cardCVV")} />

        <button type="submit" disabled={status === "pending"}>
          Submit
        </button>
      </form>
      {status === "pending" && <h4>Loading...</h4>}

      {error && <h4 className="error">Error: {error.message}</h4>}
    </div>
  );
}
