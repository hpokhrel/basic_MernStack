import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchProducts,
  deleteProductAction,
} from "../features/products/productSlice.js";
import { useDispatch, useSelector } from "react-redux";

const GetProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteProduct = async (id) => {
    try {
      await dispatch(deleteProductAction(id)).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="container m-5 flex justify-end w-full">
        <a
          href="/post"
          className="rounded bg-green-800 py-1 px-3 text-md mx-2 text-white"
        >
          Add New Products
        </a>
        <a
          href="/filtered"
          className="rounded bg-green-800 py-1 px-3 text-md mx-2 text-white"
        >
          Filter Products
        </a>
      </div>
      <div className="container mx-auto ">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                S.No
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Product Name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Description
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Price
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Stock
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map &&
              products.map((product, index) => (
                <tr
                  key={`${product.name}-${product.price}`}
                  className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                >
                  <td className="w-full lg:w-auto text-center p-3 text-gray-800 border border-b block lg:table-cell relative lg:static">
                    {index + 1}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    {product.name}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    {product.description}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    ${product.price}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    {product.stock}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    <a
                      href={`/update/${product._id}`}
                      className="rounded bg-blue-400 py-1 px-3 text-md mx-2 text-white"
                    >
                      Update
                    </a>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="rounded bg-red-400 py-1 px-3 text-md mx-2 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default GetProducts;
