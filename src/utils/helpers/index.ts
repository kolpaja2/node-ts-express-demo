import crypto from 'crypto';

const SECRET = process.env.SECRET;

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    return String(
        crypto
            .createHmac('sha256', [salt, password].join('/'))
            .update(SECRET as string)
            .digest()
    );
};
