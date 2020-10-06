import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@exaple.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Kyle Walker',
        email: 'kyle@exaple.com',
        password: bcrypt.hashSync('1234567', 10),
        isAdmin: true
    },
    {
        name: 'Jane User',
        email: 'jane@exaple.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: true
    }
]
export default users;