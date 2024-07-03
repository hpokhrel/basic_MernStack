import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GetProducts from "./components/GetProducts.jsx";
import PostProducts from "./components/PostProducts.jsx";
import UpdateProducts from "./components/UpdateProducts.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <GetProducts />,
    },
    {
      path: "/post",
      element: <PostProducts />,
    },
    {
      path: "/update/:id",
      element: <UpdateProducts />,
    },
  ]);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
