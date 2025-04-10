import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Utility functions to reduce duplication
const fillInput = (testId, value) => {
  fireEvent.change(screen.getByTestId(testId), { target: { value } });
  fireEvent.blur(screen.getByTestId(testId));
};

const submitForm = () => {
  const registrationForm = screen.getByTestId('registration-form');
  fireEvent.submit(registrationForm);
};

describe('Success tests', () => {
  test('renders Toastr component when registration is successful', () => {
    render(<App />);
    // Fill out the form fields with valid data
    fillInput('input-firstName', 'John');
    fillInput('input-lastName', 'Doe');
    fillInput('input-email', 'john.doe@example.com');
    fillInput('input-birthDate', '2000-01-01');
    fillInput('input-city', 'Paris');
    fillInput('input-postalCode', '75000');

    // Enable the submit button by ensuring all fields are valid
    const submitButton = screen.getByRole('button', { name: /sauvegarder/i });
    expect(submitButton).not.toBeDisabled();

    // Submit the form
    submitForm();

    // Check if Toastr component is rendered
    const toastrElement = screen.getByTestId('toast-success');
    expect(toastrElement).toBeInTheDocument();
  });

  test('does not render Toastr component initially', () => {
    render(<App />);
    // Ensure Toastr is not rendered on initial load
    const toastrElement = screen.queryByText(/success/i);
    expect(toastrElement).not.toBeInTheDocument();
  });
});

describe('Error tests', () => {
  describe('Validation des champs', () => {
    beforeEach(() => {
      render(<App />);
    });

    test('affiche une erreur quand le prénom est invalide', () => {
      fillInput('input-firstName', '123');
      submitForm();

      const errorMessage = screen.getByText('Le prénom n\'est pas valide');
      expect(errorMessage).toBeInTheDocument();
    });

    test('affiche une erreur quand le nom est invalide', () => {
      fillInput('input-lastName', '123');
      submitForm();

      const errorMessage = screen.getByText('Le nom n\'est pas valide');
      expect(errorMessage).toBeInTheDocument();
    });

    test('affiche une erreur quand l\'email est invalide', () => {
      fillInput('input-email', 'invalid-email');
      submitForm();

      const errorMessage = screen.getByText('L\'email n\'est pas valide');
      expect(errorMessage).toBeInTheDocument();
    });

    test('affiche une erreur quand l\'utilisateur a moins de 18 ans', () => {
      const today = new Date();
      const minorDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate()).toISOString().split('T')[0];
      fillInput('input-birthDate', minorDate);
      submitForm();

      const errorMessage = screen.getByText('Vous devez avoir au moins 18 ans');
      expect(errorMessage).toBeInTheDocument();
    });

    test('affiche une erreur quand la ville est vide', () => {
      fillInput('input-city', '');
      submitForm();

      const errorMessage = screen.getByText('La ville est requise');
      expect(errorMessage).toBeInTheDocument();
    });

    test('affiche une erreur quand le code postal est invalide', () => {
      fillInput('input-postalCode', 'abc');
      submitForm();

      const errorMessage = screen.getByText('Le code postal n\'est pas valide');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});