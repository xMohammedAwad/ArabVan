import { getHostVans, getVan, getVans } from "../api";
import withFetchData from "./withFetchData";
import RenderHostVan from "./RenderHostVan";
import RenderHostVans from "./RenderHostVans";
import RenderVan from "./RenderVan";
import RenderVans from "./RenderVans";

export const FetchHostVan = withFetchData(RenderHostVan, getVan);
export const FetchHostVans = withFetchData(RenderHostVans, getHostVans);
export const FetchVan = withFetchData(RenderVan, getVan);
export const FetchVans = withFetchData(RenderVans, getVans);
