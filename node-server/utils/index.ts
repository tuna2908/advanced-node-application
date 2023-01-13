import Crypto from 'crypto';

export function doHash() {
    const hashString = Crypto.pbkdf2Sync('a', 'b', 500000, 512, 'sha512');
    return hashString;
}

export const slowDownFunction = (duration: number) => {
    const start = Date.now();
    while (Date.now() - start < duration) { }
}
