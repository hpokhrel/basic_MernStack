import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../store";
import Register from "../Register";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";

const static_email = "pokhrelhari11111@gmail.com";

jest.mock("react-hot-toast", () => ({
  ...jest.requireActual("react-hot-toast"),
  success: jest.fn(),
  error: jest.fn(),
}));

test("load register form", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("register successfully", async () => {
  store.dispatch = jest.fn(() => ({
    unwrap: jest.fn(() =>
      Promise.resolve({ message: `${testEmail} created successfully` })
    ),
  }));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );

  const nameInput = screen.getByTestId("name");
  const testName = "Test User";
  userEvent.type(nameInput, testName);
  await waitFor(() => expect(nameInput).toHaveValue(testName));

  const emailInput = screen.getByTestId("email");
  const testEmail = static_email;
  userEvent.type(emailInput, testEmail);
  await waitFor(() => expect(emailInput).toHaveValue(testEmail));

  const passwordInput = screen.getByTestId("password");
  const testPassword = "test1234";
  userEvent.type(passwordInput, testPassword);
  await waitFor(() => expect(passwordInput).toHaveValue(testPassword));

  const submitButton = screen.getByTestId("registerBtn");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith(
      `${testEmail} created successfully`
    );
  });
});

test("register should fail for already exist email", async () => {
  store.dispatch = jest.fn(() => ({
    unwrap: jest.fn(() =>
      Promise.reject({ error: `${static_email} has been already registered` })
    ),
  }));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );

  const nameInput = screen.getByTestId("name");
  const testName = "Test User";
  userEvent.type(nameInput, testName);
  await waitFor(() => expect(nameInput).toHaveValue(testName));

  const emailInput = screen.getByTestId("email");
  const testEmail = static_email;
  userEvent.type(emailInput, testEmail);
  await waitFor(() => expect(emailInput).toHaveValue(testEmail));

  const passwordInput = screen.getByTestId("password");
  const testPassword = "1111";
  userEvent.type(passwordInput, testPassword);
  await waitFor(() => expect(passwordInput).toHaveValue(testPassword));

  const submitButton = screen.getByTestId("registerBtn");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      `${static_email} has been already registered`
    );
  });
});
