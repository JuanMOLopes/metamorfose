// Fatores de ml por kg, por faixa etária
// Fonte: https://www.tuasaude.com/calculadora/consumo-de-agua-diario/
const DEFAULT_GOAL_ML = 2000;

function factorForAge(age) {
  if (age < 18) return 40;
  if (age <= 55) return 35;
  if (age <= 65) return 30;
  return 25;
}

export function calculateWaterGoal(weight, age) {
  if (!weight || weight <= 0) return DEFAULT_GOAL_ML;
  if (age === null || age === undefined) return Math.round(weight * 35);

  const factor = factorForAge(age);
  return Math.round(weight * factor);
}
