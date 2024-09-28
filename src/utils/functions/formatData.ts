export function formatDateToDDMMYYYY(dateString: string) {
  // Cria um novo objeto Date a partir da string
  const date = new Date(dateString);

  // Extrai o dia, mês e ano
  const day = String(date.getDate()).padStart(2, "0"); // Adiciona zero à esquerda se necessário
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês é zero-indexado, então somamos 1
  const year = date.getFullYear();

  // Retorna no formato DD/MM/YYYY
  return `${day}/${month}/${year}`;
}

// Exemplo de uso
console.log(formatDateToDDMMYYYY("2023-09-21T14:30:00")); // Saída: "21/09/2023"
