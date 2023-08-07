import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "@slices/auth";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return logoutUser;
};

export default useLogout;
