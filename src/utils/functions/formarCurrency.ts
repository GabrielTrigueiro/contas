export function formatCurrency(numero?: number): string {
  if (numero === undefined || numero === null || isNaN(numero)) {
    return "R$ 0,00";
  }

  // Formatando o número com duas casas decimais
  const numeroFormatado = numero.toFixed(2);

  // Substituindo o ponto por vírgula
  numeroFormatado.replace(".", ",");
  return `R$ ${numeroFormatado}`;
}
