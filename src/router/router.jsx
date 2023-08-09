import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { SignIn } from "../Components/SignIn";
import Baccarat from "../Components/Baccarat";

const router = createBrowserRouter([
  { element: <PageNotFound />, path: "*" },
  {
    path: "/",
    element: <SignIn />,
  },
  { path: "baccarat", element: <Baccarat /> },
]);

export default router;
