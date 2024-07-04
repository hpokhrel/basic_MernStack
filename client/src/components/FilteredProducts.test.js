import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import FilteredProducts from "./FilteredProducts";

jest.mock("axios");

describe("FilteredProducts", () => {
  it("filters products by minimum price", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          _id: "1",
          name: "Product 1",
          description: "Description 1",
          price: 100,
          stock: 10,
        },
      ],
    });

    render(<FilteredProducts />);

    fireEvent.change(screen.getByPlaceholderText("Minimum Price"), {
      target: { value: "50" },
    });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });
  });

  it("displays no products found message", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<FilteredProducts />);

    fireEvent.change(screen.getByPlaceholderText("Minimum Price"), {
      target: { value: "100" },
    });

    await waitFor(() => {
      expect(screen.getByText("No products found")).toBeInTheDocument();
    });
  });
});
