import protectedRoute from "@/components/protected";
import User_Form from "@/components/user_form";
import { useSession } from "next-auth/react";
import React from "react";

const HomePage = () => {
  const { status, data: sessionData } = useSession();

  console.log(sessionData, "session");
  return <div className="p-8 flex flex-col gap-2">Dashboard</div>;
};

export default protectedRoute(HomePage);
