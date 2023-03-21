import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiUsers } from "react-icons/hi";
import { MdEngineering } from "react-icons/md";
import Button_Component from "./button_component";

const Sidebar_Links = [
  {
    text: "Welder",
    icon: <MdEngineering size={20} />,
    url: "/welder",
  },
  {
    text: "User",
    icon: <HiUsers size={20} />,
    url: "/user",
  },
  {
    text: "Profile",
    icon: <CgProfile size={20} />,
    url: "/profile",
  },
];

const Sidebar = () => {
  const router = useRouter();

  // console.log("/" + router.asPath.split("/")[1]);

  return (
    <div className="bg-blue-900 pr-12 py-4 text-white flex gap-14 flex-col">
      <h3
        className="font-bold text-xl pl-12 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Admin
      </h3>

      <div className="flex flex-col gap-6">
        {Sidebar_Links.map((link, i) => (
          <span
            onClick={() => router.push(link.url)}
            key={i}
            className={`flex items-center gap-2 py-2 pl-12 pr-10 rounded-r-lg cursor-pointer  ${
              "/" + router.asPath.split("/")[1] === link.url
                ? "bg-blue-800"
                : "hover:bg-blue-700"
            }`}
          >
            {link.icon}
            <p>{link.text}</p>
          </span>
        ))}
      </div>
      <div className="flex-1"></div>

      <Button_Component
        onClick={() => signOut()}
        buttonText="Logout"
        buttonClass="!bg-blue-500 hover:!bg-blue-600 ml-12"
      />
    </div>
  );
};

export default Sidebar;
