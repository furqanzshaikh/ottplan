import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import App from "../App";
import Loading from "../components/common/Loading";
import Dashboard from "../components/dashboard";
//import FormComponent from "../components/form/index";
import ProtectedRoute from "./ProtectedRoute";
import { EditItem } from "../components/dataTable/EditIEmp";
import RoleTable from "../components/internForm/subComponent/RoleTable";
import { EditIntern } from "../components/internForm/subComponent/EditRole";
import EmployeeDashboard from "./EmployeeDashboard";
import axios from "axios";

const DataTable = lazy(() => import("../components/dataTable"));
const Login = lazy(() => import("../components/login"));
const Signup = lazy(() => import("../components/login/subComponents/Signup"));
const ForgotPassword = lazy(
  () => import("../components/login/subComponents/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("../components/login/subComponents/ResetPassword")
);
const VerifyUser = lazy(
  () => import("../components/login/subComponents/VerifyUser")
);
const RoleForm = lazy(() => import("../components/internForm/RoleForm"));
const EmpForm = lazy(() => import("../components/form")); // Lazy load the TrainerForm component

const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};


const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};


  
  
 
// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const checkAdminStatus = async () => {
    const token = getAccessToken();
    try {
      const response = await axios.get("http://localhost:3000/auth/check-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      console.error("Failed to check admin status", error);
      setIsAdmin(false); // Assume non-admin if there's an error
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);
  
  if (isAdmin === null) {
    return <Loading />; // Show loading while checking admin status
  }

  return isAdmin ? <App /> : <EmployeeDashboard />
  
};

const appRouter: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute  isAuthenticated={isAuthenticated()}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/table",
        element: (
          <Suspense fallback={<Loading />}>
            <DataTable />
          </Suspense>
        ),
      },
      {
        path: "/employee-form",
        element: (
          <Suspense fallback={<Loading />}>
            <EmpForm />
          </Suspense>
        ),
      },
      {
        path: "/role-table",
        element: (
          <Suspense fallback={<Loading />}>
            <RoleTable />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/edit-role/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <EditIntern />
          </Suspense>
        ),
      },
      {
        path: "/edit-employee/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <EditItem />
          </Suspense>
        ),
      },
      {
        path: "/role-form",
        element: (
          <Suspense fallback={<Loading />}>
            <RoleForm />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/verify-user",
    element: (
      <Suspense fallback={<Loading />}>
        <VerifyUser />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(appRouter);

export default router;
