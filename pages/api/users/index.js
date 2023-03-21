import UserController from "@/controllers/user.controller";
import dbConnect from "@/utils/db_connect";
import ResponseWraper from "@/utils/response_helper";
import { getServerSession } from "next-auth";
import { authOtpion } from "../auth/[...nextauth]";

const usersApi = async (req, res) => {
    const response = new ResponseWraper(res);
    const session = await getServerSession(req, res, authOtpion);
    if (session) {
        console.log('session', session);
        await dbConnect();
        switch (req.method) {
            case 'GET':
                return await UserController.getUsersController(req, res, session.email);
            case 'POST':
                return await UserController.addUsersController(req, res);
            default:
                return response.badRequest('method not allowed');
        }
    } else {
        return response.unauthorized('Not allowed');
    }

}

export default usersApi;