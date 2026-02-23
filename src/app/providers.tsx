import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import CssBaseline from "@mui/material/CssBaseline";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <CssBaseline />
      {children}
    </Provider>
  );
}
