export function formatPrice(price, status) {
  if (status === 'Rent') {
    return '₹' + price.toLocaleString('en-IN') + '/mo';
  }
  if (price >= 10000000) {
    return '₹' + (price / 10000000).toFixed(2).replace(/\.?0+$/, '') + ' Cr';
  }
  if (price >= 100000) {
    return '₹' + (price / 100000).toFixed(2).replace(/\.?0+$/, '') + ' L';
  }
  return '₹' + price.toLocaleString('en-IN');
}
