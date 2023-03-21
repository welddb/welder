const { User } = require("@/models/user.model");
const { default: ResponseWraper } = require("@/utils/response_helper");
const bcrypt = require('bcrypt');

class UserController {
    static async getUsersController(req, res, email) {
        const response = new ResponseWraper(res);
        try {
            const user = await User.find({ $or: [{ role: 'supervisor' }, { role: 'operator' }], $and: [{ email: { $ne: email } }] });
            if (user) {

                return response.ok(user);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            console.log('here', error);
            return response.internalServerError();
        }
    }
    static async getUserDetailsController(req, res) {
        const response = new ResponseWraper(res);
        try {
            console.log(req.query);
            const { id } = req.query;
            const user = await User.findById(id);
            if (user) {
                return response.ok(user);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            console.log(error);
            return response.internalServerError();
        }
    }
    static async getProfileController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { decodedEmail } = req.body;
            const user = await User.findOne({ email: decodedEmail });
            if (user) {
                return response.ok(user);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async editProfileController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { decodedEmail } = req.body;
            const { userName, role, joinnedDate } = req.body;
            // return 
            // return response.unauthorized('Profile not found');
            const user = await User.findOneAndUpdate({ email: decodedEmail }, {
                userName,
                role,
                joinnedDate
            });
            if (user) {
                return response.ok(user);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async addUsersController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { email, userName, role, password, joinnedDate } = req.body;
            const user = await User.find({ email });
            if (user && user?.length > 0) {
                console.log(user);
                return response.badRequest('User already exist');
            } else {
                const userD = await User.create({
                    email,
                    userName,
                    password,
                    role,
                    joinnedDate
                });

                return response.created(userD);
            }
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async editUsersController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { userName, role, joinnedDate } = req.body;
            const { id } = req.query;

            // return response.internalServerError();
            const userD = await User.findByIdAndUpdate(id, {
                userName,
                role,
                joinnedDate
            });

            return response.ok(userD);

        } catch (error) {
            return response.internalServerError();
        }
    }
    static async editUsersPasswordController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { password } = req.body;
            const { id } = req.query;

            const pass = await bcrypt.hash(password, bcrypt.genSaltSync(Number(process.env.SALT_SECRET)));
            // return response.internalServerError();
            const userD = await User.findByIdAndUpdate(id, {
                password: pass
            });

            return response.ok(userD);

        } catch (error) {
            return response.internalServerError();
        }
    }
    static async deleteUsersController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { id } = req.query;
            const userD = await User.findByIdAndDelete(id);
            return response.ok(userD);

        } catch (error) {
            return response.internalServerError();
        }
    }
}

export default UserController;