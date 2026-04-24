"use client"
import { Auth } from "@/src/components/auth/Auth";
import { store } from "@/src/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store} >
          <Auth>
              <Toaster />
                {children}
          </Auth>
        </Provider>
    );
};

export default Providers;