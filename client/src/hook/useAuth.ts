import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
// It makes dispatch TypeScript safe, so Redux actions and thunks work correctly without type errors.
export const useAppDispatch= () => useDispatch<AppDispatch>();
