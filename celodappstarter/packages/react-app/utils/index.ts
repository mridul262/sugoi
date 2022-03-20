export function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(38)}`;
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const integerToHexNumber = (value: number) => {
  return (value * 1e18).toString();
}

export const hexNumberToInteger = (value: string) => {
  return parseFloat(value) / 1e18;
}