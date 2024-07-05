import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../store";
import Login from "../Login";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";

const static_email = "pokhrelhari1111@gmail.com";

jest.mock("react-hot-toast", () => ({
  ...jest.requireActual("react-hot-toast"),
  success: jest.fn(),
  error: jest.fn(),
}));

test("should load the form properly", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("should successfully login", async () => {
  store.dispatch = jest.fn(() => ({
    unwrap: jest.fn(() =>
      Promise.resolve({ user: { name: "Test User" }, token: "test-token" })
    ),
  }));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const emailInput = screen.getByTestId("email");
  const testEmail = static_email;
  userEvent.type(emailInput, testEmail);
  await waitFor(() => expect(emailInput).toHaveValue(testEmail));

  const passwordInput = screen.getByTestId("password");
  const testPassword = "0000";
  userEvent.type(passwordInput, testPassword);
  await waitFor(() => expect(passwordInput).toHaveValue(testPassword));

  const submitButton = screen.getByTestId("loginBtn");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith("Logged in successfully");
  });
});

test("should fail login", async () => {
  store.dispatch = jest.fn(() => ({
    unwrap: jest.fn(() => Promise.reject({ error: "Invalid credentials" })),
  }));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const emailInput = screen.getByTestId("email");
  const testEmail = static_email;
  userEvent.type(emailInput, testEmail);
  await waitFor(() => expect(emailInput).toHaveValue(testEmail));

  const passwordInput = screen.getByTestId("password");
  const testPassword = "00000";
  userEvent.type(passwordInput, testPassword);
  await waitFor(() => expect(passwordInput).toHaveValue(testPassword));

  const submitButton = screen.getByTestId("loginBtn");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      "Username or Password is incorrect"
    );
  });
});
