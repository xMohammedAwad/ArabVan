import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rentVan } from "../api";
import processPayment from "./processPayment";
import Swal from "sweetalert2";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export default function RentVanForm() {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vanId = searchParams.get("vanId");
  const hostId = searchParams.get("hostId");

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const handleDateChange = (value) => {
    setDateRange(value);
  };
  const onSubmit = async (data) => {
    const { cardNumber, cardExpiry, cardCVV } = data;
    // Process payment
    try {
      const paymentResult = await processPayment(
        { cardNumber, cardExpiry, cardCVV },
        60
      );
      console.log(paymentResult);

      // If payment is successful, rent the van
      if (paymentResult) {
        setStatus("pending");
        console.log(vanId, hostId, dateRange[0], dateRange[1]);
        try {
          await rentVan(vanId, hostId, dateRange[0], dateRange[1]);
          Swal.fire({
            title: "Good job",
            text: "Your van has been rented successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          setStatus("success");
        } catch (error) {
          console.error("Error renting van:", error);
          setError(error);
          setStatus("error");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="checkout-form">
      <h1>Rental Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={dateRange}
            selectRange={true}
          />
        </div>
        <div className="form-control">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" {...register("cardNumber")} />
        </div>

        <div className="form-control">
          <label htmlFor="cardExpiry">Card Expiry Date</label>
          <input type="text" id="cardExpiry" {...register("cardExpiry")} />
        </div>

        <div className="form-control">
          <label htmlFor="cardCVV">Card CVV</label>
          <input type="text" id="cardCVV" {...register("cardCVV")} />
        </div>

        <button className="checkout-submit" type="submit" disabled={status === "pending"}>
          Submit
        </button>
      </form>
      {status === "pending" && <h4>Loading...</h4>}

      {error && <h4 className="error">Error: {error.message}</h4>}
    </div>
  );
}
