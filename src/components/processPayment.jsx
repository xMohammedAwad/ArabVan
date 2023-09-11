
export default function processPayment(cardInfo, amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Payment successful");
    }, 500);
  });
}
