import * as forge from "node-forge";

const saltLength = 32;
const iterations = 10000;
const keyLength = 32;

export const hashPassword = (password: string): string => {
    const salt = forge.random.getBytesSync(saltLength);
    const derivedKey = forge.pkcs5.pbkdf2(password, salt, iterations, keyLength);
    const saltBase64 = forge.util.encode64(salt);
    const derivedKeyBase64 = forge.util.encode64(derivedKey);
    return `${saltBase64}:${derivedKeyBase64}`;
};

export const verifyPassword = (password: string, storedHash: string): boolean => {
    if (!storedHash || typeof storedHash !== 'string') {
        console.error("Stored hash is invalid");
        return false;
    }

    const [saltBase64, derivedKeyBase64] = storedHash.split(':');
    if (!saltBase64 || !derivedKeyBase64) {
        console.error("Invalid stored hash format");
        return false;
    }

    const salt = forge.util.decode64(saltBase64);
    const newDerivedKey = forge.pkcs5.pbkdf2(password, salt, iterations, keyLength);
    const newDerivedKeyBase64 = forge.util.encode64(newDerivedKey);

    return newDerivedKeyBase64 === derivedKeyBase64;
};

