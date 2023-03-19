import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOtpion = {
    session:{
        strategy:"jwt",
    },
    providers:[
        CredentialsProvider({
            type:'credentials',
            credentials:{},
            authorize(credentials,req){
                const { email, password } = credentials;
                const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if(email != null || password != null || !String(email).match(re) || String(password).length <= 0){
                    throw new Error("Please provide credentials");
                }
                // user not found condition

                // password validation condition

                return {
                    id: "1234",
                    name: "John Doe",
                    email: "john@gmail.com",
                    role: "admin",
                };
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
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