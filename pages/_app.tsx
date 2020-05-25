import "reset.css/reset.css";
import "@/main.css";

import React from "react";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

import { AppLayout } from "@/ui/AppLayout";
import { AppHeader } from "@/ui/AppHeader";

const BeerApp: React.FC<AppProps> = ({ Component, pageProps, router }) => (
  <AppLayout>
    <AppHeader />

    <main>
      <AnimatePresence>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </main>
  </AppLayout>
);

export default BeerApp;
