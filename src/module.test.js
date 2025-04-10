import { calculateAge } from './module';
let person;

beforeEach(() => {
    const currentYear = new Date().getFullYear();
    person = {
        birth: new Date(currentYear - 20, 0, 1) // Définit une date de naissance au 1er janvier
    };
});

describe('calculateAge', () => {
    it('calcule correctement l\'âge d\'une personne', () => {
        expect(calculateAge(person)).toBe(20);
    });

    describe('Cas d\'erreur', () => {
        it('devrait lever une erreur quand aucun argument n\'est fourni', () => {
            expect(() => calculateAge()).toThrow('Argument requis');
        });

        it('devrait lever une erreur quand l\'argument n\'est pas un objet', () => {
            const invalidInputs = [42, 'string', true, null, undefined];

            invalidInputs.forEach(input => {
                expect(() => calculateAge(input)).toThrow('L\'argument doit être un objet');
            });
        });

        it('devrait lever une erreur quand l\'objet ne contient pas un champ birth', () => {
            const invalidPerson = { name: 'John', age: 30 };

            expect(() => calculateAge(invalidPerson)).toThrow('L\'objet doit contenir une propriété birth');
        });

        it('devrait lever une erreur quand birth n\'est pas un objet Date', () => {
            const invalidBirthTypes = [
                { birth: '2000-01-01' },
                { birth: 946684800000 },
                { birth: { year: 2000, month: 1, day: 1 } },
                { birth: null },
                { birth: undefined }
            ];

            invalidBirthTypes.forEach(person => {
                expect(() => calculateAge(person)).toThrow('La propriété birth doit être un objet Date');
            });
        });

        it('devrait lever une erreur pour des dates invalides', () => {
            const invalidDates = [
                { birth: new Date('invalid') },
                { birth: new Date('2000-13-45') },
                { birth: new Date(NaN) }
            ];

            invalidDates.forEach(person => {
                expect(() => calculateAge(person)).toThrow('La date fournie est invalide');
            });
        });
    });
});