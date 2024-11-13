"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { NextUIProvider } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>{children}</NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
