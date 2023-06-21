export default function formatCurrency(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return '';
  }

  return '$' + num.toFixed(1).toLocaleString() + '';
}
