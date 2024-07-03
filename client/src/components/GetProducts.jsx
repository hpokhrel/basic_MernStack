import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const GetProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProcucts = async () => {
      await axios
        .get("http://localhost:4321/api/getproducts")
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products:", error));
    };
    getProcucts();
  }, []);

  const deleteProducts = async (id) => {
    await axios
      .delete(`http://localhost:4321/api/deleteproducts/${id}`)
      .then((response) => {
        setProducts((prevProduct) =>
          prevProduct.filter((product) => product._id !== id)
        );
        toast.success(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container m-5 flex justify-end w-full">
        <a
          href="/post"
          className="rounded bg-green-800 py-1 px-3 text-md mx-2 text-white"
        >
          Add New Products
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
            {products.map((product, index) => {
              return (
                <tr
                  key={product._id}
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
                      href={`/update/` + product._id}
                      className="rounded bg-blue-400 py-1 px-3 text-md mx-2 text-white"
                    >
                      Update
                    </a>
                    <a
                      href="#"
                      onClick={() => deleteProducts(product._id)}
                      className="rounded bg-red-400 py-1 px-3 text-md mx-2 text-white"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default GetProducts;
