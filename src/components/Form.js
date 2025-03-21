import React, { useState } from "react";
import { validateName, validateEmail, validatePostalCode, validateAge } from "../utils/validation";
import Toaster from "./toastr/Toastr";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        city: "",
        postalCode: "",
    });

    const [errors, setErrors] = useState({});
    const [toaster, setToaster] = useState({ message: "", type: "" });

    const isFormValid = () => {
        const newErrors = {};
        if (!validateName(formData.firstName)) newErrors.firstName = "Nom invalide.";
        if (!validateName(formData.lastName)) newErrors.lastName = "Prénom invalide.";
        if (!validateEmail(formData.email)) newErrors.email = "Email invalide.";
        if (!validateAge(formData.birthDate)) newErrors.birthDate = "Vous devez avoir plus de 18 ans.";
        if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = "Code postal invalide.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            localStorage.setItem("userData", JSON.stringify(formData));
            setToaster({ message: "Enregistrement réussi !", type: "success" });
            setFormData({ firstName: "", lastName: "", email: "", birthDate: "", city: "", postalCode: "" });
        } else {
            setToaster({ message: "Erreur dans le formulaire.", type: "error" });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toaster message={toaster.message} type={toaster.type} />
            <div>
                <label htmlFor="firstName">Nom:</label>
                <input
                    data-testid="firstName"
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <span data-testid="error-firstName" className="error">{errors.firstName}</span>
            </div>
            <div>
                <label htmlFor="lastName">Prénom:</label>
                <input data-testid="lastName" id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    data-testid="email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span data-testid="error-email" className="error">{errors.email}</span>}
            </div>
            <div>
                <label htmlFor="birthDate">Date de naissance:</label>
                <input
                    data-testid="birthDate"
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
                {errors.birthDate && <span data-testid="error-birthDate" className="error">{errors.birthDate}</span>}
            </div>
            <div>
                <label htmlFor="city">Ville:</label>
                <input data-testid="city" id="city" type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="postalCode">Code postal:</label>
                <input data-testid="postalCode" id="postalCode" type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                {errors.postalCode && <span className="error">{errors.postalCode}</span>}
            </div>
            <button type="submit" disabled={!Object.values(formData).every((field) => field)}>
                Sauvegarder
            </button>
        </form>
    );
};

export default Form;