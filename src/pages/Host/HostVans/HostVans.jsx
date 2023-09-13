import "./HostVans.css";
import { FetchHostVans } from "../../../components/index";
import AddVan from "../../../components/AddVan";

export default function HostVans() {
  return (
    <>
      <FetchHostVans />
      <AddVan />
    </>
  );
}
