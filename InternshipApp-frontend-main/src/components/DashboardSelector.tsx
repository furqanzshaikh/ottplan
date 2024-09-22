import  { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import axios from "axios";
import AdminDashboard from "../route/AdminDashboard";
import EmployeeDashboard from "../route/EmployeeDashboard";

const DashboardSelector = () => {
  const [role, setRole] = useState<String | null>('');
  const checkAdminUrl=import.meta.env.VITE_API_URL + "auth/check-admin";
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3000/auth/check-admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(response.data);
      } catch (error) {
        console.error("Failed to check admin status", error);
        setRole(''); // Assume non-admin if there's an error
      }
    };

    checkAdminStatus();
  }, []);

  if (role === 'admin') {
    return <Loading />; 
  }

  return role ? <AdminDashboard /> : <EmployeeDashboard />;
};

export default DashboardSelector;
