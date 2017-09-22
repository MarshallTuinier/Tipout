//Helper function to add suffixes to dates

const suffixer = day => {
  if (day === 1) {
    return '1st';
  }

  if (day === 2) {
    return '2nd';
  }

  if (day === 3) {
    return '3rd';
  }

  if (day === 21) {
    return '21st';
  }

  if (day === 22) {
    return '22nd';
  }

  if (day === 23) {
    return '23rd';
  }

  if (day === 31) {
    return '31st';
  }

  return `${day}th`;
};

export default suffixer;
