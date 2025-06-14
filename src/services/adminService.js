import adminRepo from '../Repository/adminRepo.js';

class AdminService {
    async register (adminData) {
        const { username, email, password, profilePic } = adminData;
        const existingEmail = await adminRepo.getAdminByEmail(email);
        if (existingEmail) {
            throw new Error('Email already exists');
        }

        const existingUsername = await adminRepo.getAdminByUsername(username);
        if (existingUsername) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return await adminRepo.createAdmin({
            username,
            email,
            password: hashedPassword,
            profilePic,
        });
    }   

    async login (email, password) {
        const admin = await adminRepo.getAdminByEmail(email);
        if (!admin) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return admin;
    }

    async existsByEmailOrUsername(email, username) {
        return await adminRepo.existsByEmailOrUsername(email, username);
    }
}

export default new AdminService();