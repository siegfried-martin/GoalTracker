import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Bootstrap CSS & JS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Components imports
import Home from "./components/Home";
import Tasklist from "./components/Tasklist";

//const userName = { name: "" };
//const setUserName = (name) => (userName.name = name);

// Components imports
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/user/:userid/tasks",
        element: <Tasklist />,
    },
]);
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home setUsername={setUserName} />,
//     },
//     {
//         path: "/user/:userid/tasks",
//         element: <Tasklist username={userName} setUsername={setUserName} />,
//     },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
