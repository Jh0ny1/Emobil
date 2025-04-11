
/**
 * Formata um número para o formato de moeda brasileira (R$)
 */
export function formatCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return 'R$ 0,00';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);
}

/**
 * Formata um número para o formato brasileiro com separadores de milhar
 */
export function formatNumber(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '0';
  }
  
  return new Intl.NumberFormat('pt-BR').format(numValue);
}

/**
 * Remove a formatação de moeda para conversão em número
 */
export function parseCurrency(formattedValue: string): number {
  // Remove o símbolo da moeda e outros caracteres não numéricos
  const numericString = formattedValue
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');
  
  return parseFloat(numericString);
}
