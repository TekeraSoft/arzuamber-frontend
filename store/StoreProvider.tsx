"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import {SessionProvider} from "next-auth/react";

function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
      <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
      </SessionProvider>
  )
}

export default StoreProvider;
