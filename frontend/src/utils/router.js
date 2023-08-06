import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Dashboard = lazy(() => import("../pages/dashboard")) ;

export const Router = createBrowserRouter([
    { path: "/", element: <Dashboard /> }
]);