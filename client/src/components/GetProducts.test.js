import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import GetProducts from "./GetProducts";

jest.mock("axios");

describe("GetProducts", () => {
  it("renders products", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          _id: "1",
          name: "Product 1",
          description: "Description 1",
          price: 100,
          stock: 10,
        },
        {
          _id: "2",
          name: "Product 2",
          description: "Description 2",
          price: 200,
          stock: 20,
        },
      ],
    });

    render(<GetProducts />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("handles error", async () => {
    axios.get.mockRejectedValue(new Error("Error fetching products"));

    render(<GetProducts />);

    await waitFor(() => {
      expect(screen.getByText("Error fetching products")).toBeInTheDocument();
    });
  });
});
