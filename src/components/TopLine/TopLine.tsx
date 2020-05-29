import React, { useEffect, useState } from "react";
import Router from "next/router";

import { Line } from "./styles";

export const TopLine: React.FC = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const startLoadingIndicator = () => setLoading(true);
    const stopLoadingIndicator = () => setLoading(false);

    Router.events.on("routeChangeStart", startLoadingIndicator);
    Router.events.on("routeChangeError", stopLoadingIndicator);
    Router.events.on("routeChangeComplete", stopLoadingIndicator);

    return () => {
      Router.events.off("routeChangeStart", startLoadingIndicator);
      Router.events.off("routeChangeError", stopLoadingIndicator);
      Router.events.off("routeChangeComplete", stopLoadingIndicator);
    };
  }, []);

  return <Line animate={isLoading} />;
};
