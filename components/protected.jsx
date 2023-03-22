import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const protectedRoute = (Component) => {
  const Func = (props) => {
    const { status, data } = useSession();

    useEffect(() => {
      // console.log(data, "hello session data");
      if (status === "unauthenticated") Router.replace("/signin");
    }, [status]);

    if (status === "authenticated") return <Component {...props} />;

    return <div className="px-4">Loading...</div>;
  };
  return Func;
};
export default protectedRoute;
