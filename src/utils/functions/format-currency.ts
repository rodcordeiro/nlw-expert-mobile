export function formatCurrency(value: number) {
  return value.toLocaleString('pt-br', {
    currency: 'BRL',
    style: 'currency',
  });
}
