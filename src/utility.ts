// Function to format revenue with commas and two decimal places
const formatRevenue = (num: number) => {
  // Convert cents to dollars
  const dollars = num / 100;
  // Format to currency string with two decimal places
  return `$${dollars.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export { formatRevenue };
