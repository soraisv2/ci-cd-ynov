import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form Component", () => {
    test("renders all input fields", () => {
        render(<Form />);
        expect(screen.getByLabelText(/Nom:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Prénom:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date de naissance:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Ville:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Code postal:/i)).toBeInTheDocument();
    });

    test("disables the submit button if fields are empty", () => {
        render(<Form />);
        const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
        expect(submitButton).toBeDisabled();
    });

    test("shows error messages for invalid inputs", () => {
        render(<Form />);
        fireEvent.change(screen.getByLabelText(/Nom:/i), { target: { value: "123" } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "invalid-email" } });
        fireEvent.change(screen.getByLabelText(/Date de naissance:/i), { target: { value: "2020-01-01" } });
        fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

        expect(screen.getByText(/Nom invalide./i)).toBeInTheDocument();
        expect(screen.getByText(/Email invalide./i)).toBeInTheDocument();
        expect(screen.getByText(/Vous devez avoir plus de 18 ans./i)).toBeInTheDocument();
    });

    test("saves valid data to localStorage and clears fields", () => {
        render(<Form />);
        fireEvent.change(screen.getByLabelText(/Nom:/i), { target: { value: "Jean" } });
        fireEvent.change(screen.getByLabelText(/Prénom:/i), { target: { value: "Dupont" } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "jean.dupont@example.com" } });
        fireEvent.change(screen.getByLabelText(/Date de naissance:/i), { target: { value: "2000-01-01" } });
        fireEvent.change(screen.getByLabelText(/Ville:/i), { target: { value: "Paris" } });
        fireEvent.change(screen.getByLabelText(/Code postal:/i), { target: { value: "75001" } });

        const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
        fireEvent.click(submitButton);

        expect(localStorage.getItem("userData")).toBeTruthy();
        expect(screen.getByLabelText(/Nom:/i).value).toBe("");
        expect(screen.getByLabelText(/Prénom:/i).value).toBe("");
        expect(screen.getByLabelText(/Email:/i).value).toBe("");
        expect(screen.getByLabelText(/Date de naissance:/i).value).toBe("");
        expect(screen.getByLabelText(/Ville:/i).value).toBe("");
        expect(screen.getByLabelText(/Code postal:/i).value).toBe("");
    });

    test("shows success toaster on valid submission", () => {
        render(<Form />);
        fireEvent.change(screen.getByLabelText(/Nom:/i), { target: { value: "Jean" } });
        fireEvent.change(screen.getByLabelText(/Prénom:/i), { target: { value: "Dupont" } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "jean.dupont@example.com" } });
        fireEvent.change(screen.getByLabelText(/Date de naissance:/i), { target: { value: "2000-01-01" } });
        fireEvent.change(screen.getByLabelText(/Ville:/i), { target: { value: "Paris" } });
        fireEvent.change(screen.getByLabelText(/Code postal:/i), { target: { value: "75001" } });

        const submitButton = screen.getByRole("button", { name: /sauvegarder/i });
        fireEvent.click(submitButton);

        expect(screen.getByText(/Enregistrement réussi !/i)).toBeInTheDocument();
    });

    test("shows error toaster on invalid submission", () => {
        render(<Form />);
        fireEvent.change(screen.getByLabelText(/Nom:/i), { target: { value: "123" } });
        fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

        expect(screen.getByText(/Erreur dans le formulaire./i)).toBeInTheDocument();
    });
});