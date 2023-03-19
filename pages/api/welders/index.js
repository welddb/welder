import WelderController from "@/controllers/welder.controller";
import dbConnect from "@/utils/db_connect";
import ResponseWraper from "@/utils/response_helper";
import { getServerSession } from "next-auth";
import { authOtpion } from "../auth/[...nextauth]";

const welderApi = async (req, res) => {
    const response = new ResponseWraper(res);
    const session = await getServerSession(req,res,authOtpion);
    if(session){
        await dbConnect();
            switch (req.method) {
                case 'GET':
                    return await WelderController.getWeldersController(req,res);
                case 'POST':
                    return await WelderController.addWelderController(req,res);
                default:
                    return response.badRequest('method not allowed');
            }
    }else{
        return response.unauthorized('Not allowed');
    }
}

export default welderApi;