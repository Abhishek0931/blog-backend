import Admin from '../models/admin.js';

class AdminRepository {
    async getAdminByEmail(email) {
        return Admin.findOne({ email });
    }

    async getAdminByUsername(username) {
        return Admin.findOne({ username });
    }

    async createAdmin(data) {
        return  Admin.create(data);
    }

    async getAllAdmins() {
        return Admin.find();
    }

    async getAdminById(adminId) {
        return Admin.findById(adminId);
    }

    async updateAdmin(adminId, updateData) {
        return Admin.findByIdAndUpdate(adminId, updateData, { new: true });
    }

    async deleteAdmin(adminId) {
        return Admin.findByIdAndDelete(adminId);
    }

    async existsByEmailOrUsername(email, username) {
        return Admin.exists({ $or: [{ email }, { username }] });
    }
}

export default new AdminRepository();
// This code defines an AdminRepository class that interacts with the Admin model to perform CRUD operations on admin data.