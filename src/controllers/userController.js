import userService from '../services/userServices.js';
import { generateTokens } from '../utils/tokenUtil.js';

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
}

const userController = new UserController();
export default userController;
// This code defines a UserController class that handles user-related operations such as registration, login, token refresh, and profile retrieval.