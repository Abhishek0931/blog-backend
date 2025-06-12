import userService from '../services/userServices.js';
import { generateTokens } from '../utils/tokenUtil.js';
import fs from 'fs';
import {parse} from 'csv-parse';
import xlsx from 'xlsx';
import bcrypt from 'bcrypt';

class UserController {
    async register(req, res) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json({message: 'User registered Successfully', user});
        }
        catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);
            const { accessToken, refreshToken } = generateTokens(user);
            res.json({
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                profilePic: user.profilePic
            }
            });
        }
        catch (err) {
            res.status(400).json({ message:'Login Failed', error: err.message});
        }
    }

    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const { accessToken } = await userService.refreshToken(refreshToken);
            res.json({ accessToken });
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    }

    async getProfile(req, res) {
        try {
            res.json({ user: req.user});
        }
        catch (err) {
            res.status(500).json({ message: 'Internal server error'});
        }
    }

    async logout (req, res) {
        try {
            // Invalidate the refresh token logic can be implemented here
            res.status(200).json({ message: 'User logged out successfully' });
        }
        catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    //CRUD Operations

    // Get all users (admin only operation)
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ message: err.message});
        }
    }

    // Get user by ID
    async getUserById(req, res) {
        try {
            //Allow only admin
            if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Update user by ID
    async updateUser(req, res) {
        try {
            //Allow only admin or the user themselves
            if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            let updateData = req.body;
            if (req.file && req.file.path) {
                updateData.profilePic = req.file,path;
            }
            const updatedUser = await userService.updateUser(req.params.id, updatreData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found'});
            }
            res.json(updatedUser);
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Delete user by ID
    async deleteUser(req, res) {
        try {
            const deleteUser = await userService.deleteUser(req.params.id);
            if (!deleteUser) {
                return res.status(404).json({ message: 'User not found' });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async bulkImport(req, res) {
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const ext = req.file.originalname.split('.').pop().toLowerCase();

        const imported = [];
        const skipped = [];

        let rows = [];

        if (ext === 'csv'){
            // Parse CSV file
            const parser = fs.createReadStream(req.file.path).pipe(parse({ columns: true, trim: true}));
            for await (const row of parser) {
                rows.push(row);
            }
        }
        else if (ext === 'xlsx' || ext === 'xls') {
            // Parse Excel file
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        }
        else {
            return res.status(400).json({ message: 'Unsupported file format' });
        }

        for (const row of rows) {
            const { username, email, password, role, profilePic } = row;

            // Skip if user already exists
            const exists = await userService.existsByEmailOrUsername(email, username);
            if (exists) {
                skipped.push({ username, email });
                continue;
            }

            // Hash password if not already hashed (simple check : bcrypt hashes start with $2)
            let hashedPassword = password;
            if (!password.startsWith('$2')) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            // Create user (you may want to hash the password here)
            await userService.register({  username, email, password: hashedPassword, role, profilePic});
            imported.push({ username, email });
        }
        res.json({
            message: 'Bulk import completed',
            imported,
            skipped
        });
    }

}

const userController = new UserController();
export default userController;
// This code defines a UserController class that handles user-related operations such as registration, login, token refresh, and profile retrieval.