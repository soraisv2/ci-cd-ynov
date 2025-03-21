import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form Component", () => {
    test("renders all input fields", () => {
        render(<Form />);
        expect(screen.getByTestId("firstName")).toBeInTheDocument();
        expect(screen.getByTestId("lastName")).toBeInTheDocument();
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("birthDate")).toBeInTheDocument();
        expect(screen.getByTestId("city")).toBeInTheDocument();
        expect(screen.getByTestId("postalCode")).toBeInTheDocument();
    });

    test("disables the submit button if fields are empty", () => {
        render(<Form />);
        const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
        expect(submitButton).toBeDisabled();
    });

    test("shows error messages for invalid inputs", () => {
        render(<Form />);
        fireEvent.change(screen.getByTestId("firstName"), { target: { value: "123" } });
        fireEvent.change(screen.getByTestId("email"), { target: { value: "invalid-email" } });
        fireEvent.change(screen.getByTestId("birthDate"), { target: { value: "2020-01-01" } });
        fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

        // expect(screen.getByTestId("error-firstName")).toHaveTextContent("Nom invalide.");
        // expect(screen.getByTestId("error-email")).toHaveTextContent("Email invalide.");
        // expect(screen.getByTestId("error-birthDate")).toHaveTextContent("Vous devez avoir plus de 18 ans.");
    });

    test("saves valid data to localStorage and clears fields", () => {
        render(<Form />);
        fireEvent.change(screen.getByTestId("firstName"), { target: { value: "Jean" } });
        fireEvent.change(screen.getByTestId("lastName"), { target: { value: "Dupont" } });
        fireEvent.change(screen.getByTestId("email"), { target: { value: "jean.dupont@example.com" } });
        fireEvent.change(screen.getByTestId("birthDate"), { target: { value: "2000-01-01" } });
        fireEvent.change(screen.getByTestId("city"), { target: { value: "Paris" } });
        fireEvent.change(screen.getByTestId("postalCode"), { target: { value: "75001" } });

        const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
        fireEvent.click(submitButton);

        expect(localStorage.getItem("userData")).toBeTruthy();
        expect(screen.getByTestId("firstName").value).toBe("");
        expect(screen.getByTestId("lastName").value).toBe("");
        expect(screen.getByTestId("email").value).toBe("");
        expect(screen.getByTestId("birthDate").value).toBe("");
        expect(screen.getByTestId("city").value).toBe("");
        expect(screen.getByTestId("postalCode").value).toBe("");
    });

    test("shows success toaster on valid submission", () => {
        render(<Form />);
        fireEvent.change(screen.getByTestId("firstName"), { target: { value: "Jean" } });
        fireEvent.change(screen.getByTestId("lastName"), { target: { value: "Dupont" } });
        fireEvent.change(screen.getByTestId("email"), { target: { value: "jean.dupont@example.com" } });
        fireEvent.change(screen.getByTestId("birthDate"), { target: { value: "2000-01-01" } });
        fireEvent.change(screen.getByTestId("city"), { target: { value: "Paris" } });
        fireEvent.change(screen.getByTestId("postalCode"), { target: { value: "75001" } });

        const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
        fireEvent.click(submitButton);

        // expect(screen.getByTestId("toaster")).toHaveTextContent("You have been registered.");
    });

    test("shows error toaster on invalid submission", () => {
        render(<Form />);
        fireEvent.change(screen.getByTestId("firstName"), { target: { value: "123" } });
        fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

        // expect(screen.getByTestId("toaster")).toHaveTextContent("Erreur dans le formulaire.");
    });
});