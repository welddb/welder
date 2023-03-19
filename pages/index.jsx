import protectedRoute from "@/components/protected";
import User_Form from "@/components/user_form";
import React from "react";

const HomePage = () => {
  return <div className="p-8 flex flex-col gap-2">{/* <User_Form /> */}</div>;
};

export default protectedRoute(HomePage);
