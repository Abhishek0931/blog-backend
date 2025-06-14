import bcrypt from 'bcrypt';
import adminService from '../services/adminService.js';
import { generateTokens } from '../utils/tokenUtil.js';

class AdminController {
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const exists = await adminService.getByEmail(email);
            if (exists) return res.status(400).json({ message: 'Admin already exists' });
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = await adminService.createAdmin({ username, email, password: hashedPassword });
            res.status(201).json({ message: 'Admin registered', admin: { id: admin._id, username, email } });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const admin = await adminService.getByEmail(email);
            if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
            const tokens = generateTokens(admin);
            res.json({
                message: 'Admin login successful',
                tokens,
                admin: { id: admin._id, username: admin.username, email: admin.email }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new AdminController();