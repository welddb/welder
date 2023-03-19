const { default: ResponseWraper } = require("@/utils/response_helper");
const { getServerSession } = require("next-auth");
const { NextResponse } = require("next/server")

const verifyUser = async(req)=>{
    // const response = new ResponseWraper();
    try {
        const session = await getServerSession(req, {}, authOtpion);
        if(session){
            return NextResponse.next();
        }else{
            return new NextResponse(
                JSON.stringify({success:false,data:{},error:{message:'User is not verified'}}),
                { status: 401, headers: { 'content-type': 'application/json' } }
            );
        }
        
    } catch (error) {
        return new NextResponse(
            JSON.stringify({success:false,data:{},error:{message:'User is not verified'}}),
            { status: 401, headers: { 'content-type': 'application/json' } }
        );
    }
}