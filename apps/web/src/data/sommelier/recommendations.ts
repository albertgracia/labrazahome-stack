/**
 * Simula la lógica de recomendación y maridaje basada en reglas predefinidas.
 */

export function getMockPairingRules(): { [key: string]: string } {
  return {
    "carne roja":
      "Los taninos presentes en los vinos tintos potentes (como el Reserva del Alto Ebro) se equilibran perfectamente con la grasa y la proteína de las carnes rojas.",
    "pescado azul":
      "La acidez vibrante de un blanco como Blanco de Viura complementa la riqueza marina, limpiando el paladar entre bocados.",
    setas:
      "Los terroirs húmedos y los sabores terrosos se maridan excelentemente con vinos que tienen notas minerales o crianza en roble.",
  };
}
