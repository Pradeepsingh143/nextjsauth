// utils/generatePassword.ts
import crypto from 'crypto';

function generatePassword(length: number): string {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const hash = crypto.createHash('sha256').update(randomBytes).digest('hex');
  return hash.slice(0, length);
}

export default generatePassword;