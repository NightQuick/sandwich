import bcrypt from 'bcryptjs';

console.log(await bcrypt.hash('12345678', 10));
