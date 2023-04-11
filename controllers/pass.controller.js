const { Pass } = require("@/models/pass.model");
const { Welder } = require("@/models/welder.model");
const { default: ResponseWraper } = require("@/utils/response_helper");

class PassController {
    static async createPass(req, res) {
        const response = new ResponseWraper(res)

        try {
            const { welderId, ...request } = req.body

            console.log(welderId, "welderId");

            const welder = await Welder.findById(welderId)

            console.log(welder, "welder");

            if (welder) {

                const pass = await Pass.create({ ...request, seamId: welderId })

                return response.created(pass)
            } else {
                return response.badRequest("No welder found")
            }

        } catch (error) {
            console.log(error);
            return response.internalServerError()
        }
    };

    static async getPasses(req, res) {
        const response = new ResponseWraper(res)

        try {
            const { welderId } = req.query

            console.log(welderId);

            const pass = await Pass.find({ seamId: welderId }).populate("seamId");

            console.log(pass);

            // if (pass.length > 0) {
            return response.ok(pass)
            // } else {
            //     return response.badRequest("No passes found")
            // }

        } catch (error) {
            console.log(error);
            return response.internalServerError()
        }
    }

    static async editPass(req, res) {
        const response = new ResponseWraper(res)

        try {
            const { passId, ...request } = req.body;
            // console.log(request);
            const pass = await Pass.findByIdAndUpdate(passId, request)

            // console.log(pass);
            return response.ok(pass)
        } catch (error) {
            console.log(error);

            return response.internalServerError()
        }
    }
}

module.exports = { PassController }