// This function is pretty simple, just adds a zero to a single digit, and nothing else.
// This will be used to format our date to be read properly by a VX Chart

const trailingZero = num => {
  if (num.toString().length === 1) {
    return `0${num}`;
  }
  return num;
};

export default trailingZero;
