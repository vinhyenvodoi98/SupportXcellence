export function shortenAddress(address: string) {
  try {
    const shortened =
      address.substring(0, 5) + '...' + address.substring(address.length - 4);
    return shortened;
  } catch (error) {
    console.error('Unable to shorten invalid address', address, error);
    return null;
  }
}

export function capitalizeAddress(address: string) {
  return '0x' + address.substring(2).toUpperCase();
}

export function trimLeading0x(input: string) {
  return input.startsWith('0x') ? input.substring(2) : input;
}

export function ensureLeading0x(input: string) {
  return input.startsWith('0x') ? input : `0x${input}`;
}

const txHashRegex = /^0x([A-Fa-f0-9]{64})$/;
export function isValidTransactionHash(input: string) {
  return txHashRegex.test(input);
}
