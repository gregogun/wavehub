export const abbreviateAddress = (address: string | undefined) => {
  if (!address) return address;
  const firstFive = address.substring(0, 5);
  const lastFour = address.substring(address.length - 4);
  return `${firstFive}..${lastFour}`;
};
