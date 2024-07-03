import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GetProducts from "./components/GetProducts.jsx";
import PostProducts from "./components/PostProducts.jsx";
import UpdateProducts from "./components/UpdateProducts.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import FilteredProducts from "./components/FilteredProducts.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <GetProducts />
        </ProtectedRoute>
      ),
    },
    {
      path: "/post",
      element: (
        <ProtectedRoute>
          <PostProducts />
        </ProtectedRoute>
      ),
    },
    {
      path: "/update/:id",
      element: (
        <ProtectedRoute>
          <UpdateProducts />
        </ProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/filtered",
      element: (
        <ProtectedRoute>
          <FilteredProducts />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
