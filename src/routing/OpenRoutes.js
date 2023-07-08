import {Navigate} from "react-router-dom";

export const OpenRoutes = ({children}) => {
  const getTokenFromsessionStorage = JSON.parse(
    sessionStorage.getItem("customer")
  );
  return getTokenFromsessionStorage?.token === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
