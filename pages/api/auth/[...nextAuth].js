import { User } from "@/models/user.model";
import dbConnect from "@/utils/db_connect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOtpion = {
    secret: process.env.AUTH_SECRET.toString(),
    session:{
        strategy:"jwt",
    },
    providers:[
        CredentialsProvider({
            type:'credentials',
            credentials:{},
            async authorize(credentials,req) {
                    const { email, password } = credentials;
                    console.log(email,password);
                    const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    // throw new Error("Please provide credentials");
                    
                    if(email == null || password == null || !String(email).match(re) || String(password).length <= 0){
                        console.log('here');
                        throw new Error("Please provide credentials");
                    }
                    await dbConnect();
                    // console.log(await bcrypt.hash(password, bcrypt.genSaltSync(Number(process.env.SALT_SECRET))));
                    // user not found condition
                    const user = await User.findOne({email});
                    if(user){
                        // password validation condition
                        const isAuthenticate = await user.authenticate(password);
                        if(!isAuthenticate){
                            throw new Error("Password is invalid");
                        }
                        return user;
                    }else{
                        throw new Error("User not found");
                    }
            }
        })
    ],
    pages: {
        signIn: "/signin",
        // error: '/auth/error',
        // signOut: '/auth/signout'
      },
      callbacks: {
        jwt(params) {
          // update token
          if (params.user?.role) {
            params.token.role = params.user.role;
          }
          // return final_token
          return params.token;
        },
      },
};

export default NextAuth(authOtpion);