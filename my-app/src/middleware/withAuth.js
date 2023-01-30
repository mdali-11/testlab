import {useSelector} from "react-redux"
import Login from "@/pages/login";
export const ProtectRoute = ({ children }) => {

  const user = useSelector((state) => state.user);
  console.log(user)
  if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')){
    return <Login />; 
  }
  return children;
};