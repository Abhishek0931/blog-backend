import bcrypt from 'bcrypt';
import userRepo from '../Repository/userRepo.js';


class UserService {
    async register (userData) {
        const { username, email, password, role, profilepic } = userData;
        const existingemail = await userRepo.getUserByEmail(email);
        if (existingemail) {
            throw new Error('Email already exists');
        }
        const existingUsername = await userRepo.getUserByUsername(username);
        if (existingUsername) {
            throw new Error('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password,10);  
        return await userRepo.createUser({
            username,
            email,
            password: hashedPassword,
            role,
            profilepic,
        })
    }

    async login (email, password) {
        const user = await userRepo.getUserByEmail(email);
        if(!user) {
            throw new Error('Invalid credentials');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            throw new Error('Invalid credentials');
        }

        return user;
    }

    async existsByEmailOrUsername(email, username) {
        return await userRepo.existsByEmailorUsername(email, username);
    }
}

export default new UserService();           
// This code defines a UserService class that provides methods for user registration and login, including password hashing and JWT token generation.
// It uses bcrypt for password hashing and jwt for token generation, and interacts with the user repository for database operations.