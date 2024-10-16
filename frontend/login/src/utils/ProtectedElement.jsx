import { Outlet, Navigate } from "react-router-dom";
const ProtectedElement = ({ children }) => {
    const user = localStorage.getItem('token');
    // console.log('Current user token:', user); // Debug line

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedElement;