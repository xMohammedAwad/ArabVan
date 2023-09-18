export default function FormInput(props) {
  return (
    <>
      <label {...props}>{props.placeholder}</label>
      <input {...props} required />
    </>
  );
}
