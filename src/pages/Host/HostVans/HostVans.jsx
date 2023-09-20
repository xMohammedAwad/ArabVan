import { FetchHostVans } from "../../../components/index";
import AddVan from "../../../components/AddVan";
import "./HostVans.css";

export default function HostVans() {
  return (
    <>
      <AddVan />
        <FetchHostVans />
    </>
  );
}
