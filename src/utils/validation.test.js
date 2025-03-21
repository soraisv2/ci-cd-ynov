import { validateName, validateEmail, validatePostalCode, validateAge } from "./validation";

describe("Validation Functions", () => {
    test("validateName - valid names", () => {
        expect(validateName("Jean")).toBe(true);
        expect(validateName("Jean-Pierre")).toBe(true);
        expect(validateName("Éléonore")).toBe(true);
    });

    test("validateName - invalid names", () => {
        expect(validateName("Jean123")).toBe(false);
        expect(validateName("Jean@")).toBe(false);
        expect(validateName("")).toBe(false);
    });

    test("validateEmail - valid emails", () => {
        expect(validateEmail("test@example.com")).toBe(true);
        expect(validateEmail("user.name+tag+sorting@example.com")).toBe(true);
    });

    test("validateEmail - invalid emails", () => {
        expect(validateEmail("plainaddress")).toBe(false);
        expect(validateEmail("@missingusername.com")).toBe(false);
    });

    test("validatePostalCode - valid postal codes", () => {
        expect(validatePostalCode("75001")).toBe(true);
        expect(validatePostalCode("13000")).toBe(true);
    });

    test("validatePostalCode - invalid postal codes", () => {
        expect(validatePostalCode("7500")).toBe(false);
        expect(validatePostalCode("ABCDE")).toBe(false);
    });

    test("validateAge - valid ages", () => {
        expect(validateAge("2000-01-01")).toBe(true); // > 18 years
        expect(validateAge("2005-03-21")).toBe(false); // < 18 years
    });

    test("validateAge - invalid dates", () => {
        expect(validateAge("")).toBe(false);
        expect(validateAge("2025-01-01")).toBe(false); // Future date
    });
});