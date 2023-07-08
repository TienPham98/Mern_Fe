import {Navigate} from "react-router-dom";

export const PrivateRoutes = ({children}) => {
  const getTokenFromsessionStorage = JSON.parse(
    sessionStorage.getItem("customer")
  );
  return getTokenFromsessionStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
