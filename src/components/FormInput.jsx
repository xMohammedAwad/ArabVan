

export default function FormInput(props) {
  return (
    <>
      <label style={{ paddingBlock: "10px" }} {...props}>
        {props.name}
      </label>
      <input {...props} required />
    </>
  );
}
