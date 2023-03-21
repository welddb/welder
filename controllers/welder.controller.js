const { Welder } = require("@/models/welder.model");
const { default: ResponseWraper } = require("@/utils/response_helper");

class WelderController {
    static async getWeldersController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const welder = await Welder.find();
            if (welder) {
                return response.ok(welder);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            console.log('here', error);
            return response.internalServerError();
        }
    }
    static async getWelderDetailsController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { id } = req.query;
            const welder = await Welder.findById(id);
            if (welder) {
                return response.ok(welder);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            console.log('here', error);
            return response.internalServerError();
        }
    }
    static async addWelderController(req, res) {
        const response = new ResponseWraper(res);
        try {
            console.log(req.body, "req.body");
            const welder = await Welder.create({ ...req.body });
            if (welder) {
                return response.created(welder);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            console.log('here', error);
            return response.internalServerError();
        }
    }
    static async editWelderController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { id } = req.query;
            const welder = await Welder.findByIdAndUpdate(id, { ...req.body });
            if (welder) {
                return response.ok(welder);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            console.log('here', error);
            return response.internalServerError();
        }
    }
    static async deleteWelderDetailsController(req, res) {
        const response = new ResponseWraper(res);
        try {
            const { id } = req.query;
            const welder = await Welder.findByIdAndDelete(id);
            if (welder) {
                return response.ok(welder);
            } else {
                return response.unauthorized('Profile not found');
            }
        } catch (error) {
            console.log('here', error);
            return response.internalServerError();
        }
    }
}

export default WelderController;