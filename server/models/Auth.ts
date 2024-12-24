// @ts-ignore
import jwt from "jsonwebtoken";

// Simulated users database
const users: User[] = [];

interface User {
    username: string;
    password: string;
    name: string;
}

class Auth {
    constructor(
        public username: string,
        public password: string,
        public name: string
    ) {}

    // Register method to add a new user
    static register(username: string, password: string, name: string) {
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            throw new Error('User already exists.');
        }

        const newUser = new Auth(username, password, name);
        users.push(newUser);
        return { message: 'User registered successfully' };
    }

    // Login method to authenticate user and return a token
    static login(username: string, password: string) {
        const user = users.find((user) => user.username === username && user.password === password);
        if (!user) {
            throw new Error('Invalid username or password.');
        }

        // Create a token with jwt
        const token = Auth.createToken(user);
        return { message: 'Login successful', token };
    }

    // Method to create a token
    static createToken(user: User) {
        const payload = {
            username: user.username,
            name: user.name
        };

        const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
        return token;
    }

    // Get all registered users (for testing purposes)
    static getUsers() {
        return users;
    }
}

// Example usage:
// Register a new user
try {
    const registerResponse = Auth.register('johnDoe', 'password123', 'John Doe');
    console.log(registerResponse);
} catch (error:any) {
    console.error(error.message);
}

// Login an existing user
try {
    const loginResponse = Auth.login('johnDoe', 'password123');
    console.log(loginResponse);
} catch (error:any) {
    console.error(error.message);
}

export default Auth;
