import HDKey from 'hdkey';

enum SupportedCurves {
  secp256k1 = 'secp256k1',
  secp256r1 = 'secp256r1',
  ed25519 = 'ed25519',
}

export default (
  xpub: string,
  indexArr: number[] = [],
  curve: SupportedCurves = SupportedCurves.secp256k1,
): Buffer => {
  switch (curve) {
    case SupportedCurves.secp256k1: {
      const childIndex: string = indexArr.reduce((acc: string, cur: number) => {
        return acc + `/${cur}`;
      }, 'm');

      const hdkey = HDKey.fromExtendedKey(xpub);
      return hdkey.derive(childIndex).publicKey;
    }
    default:
      throw new Error('curve not support yet');
  }
};
