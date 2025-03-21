export const validateName = (name) => /^[a-zA-ZÀ-ÿ' -]+$/.test(name);

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePostalCode = (postalCode) => /^[0-9]{5}$/.test(postalCode);

export const validateAge = (birthDate) => {
  if (!birthDate) return false;
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // Vérifie si l'utilisateur a 18 ans ou plus
  return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
};