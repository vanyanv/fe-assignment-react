// Function to format revenue with commas and two decimal places
const formatRevenue = (num: number) => {
  // Check if the input is invalid
  if (num == null || Number.isNaN(num) || num < 0) {
    return `-`; // Return a dash for invalid values
  }

  // Convert cents to dollars
  const dollars = num / 100;

  //check for invalid dollar vaules
  if (dollars == null || Number.isNaN(dollars) || dollars < 0) {
    return `-`; // Return a dash for invalid values
  }

  // Check for Infinity
  if (!isFinite(dollars)) {
    return `-`; // Return a dash for Infinity
  }

  // Format to currency string with two decimal places
  return `$${dollars.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export { formatRevenue };
