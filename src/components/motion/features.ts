import { domMax } from "framer-motion";

// Loaded lazily by <MotionProvider> so the animation engine stays out of the
// initial JS bundle. domMax includes layout + drag, which the grids and tabs use.
export default domMax;
