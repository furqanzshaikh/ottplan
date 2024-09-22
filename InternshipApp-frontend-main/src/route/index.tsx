import { EditRole } from "../components/internForm/subComponent/EditRole";
import DashboardSelector from "../components/DashboardSelector";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/index";
import Loading from "../components/common/Loading";
import RoleTable from "../components/internForm/subComponent/RoleTable";
import { Dashboard } from "@mui/icons-material";
import {EditItem} from '../components/dataTable/EditEmp'
import ClientForm from "../components/client/ClientForm";
import ClientTable from "../components/client/ClientTable";
import {EditClient} from "../components/client/EditClient";

import Profile from "./Profile";


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
const EmpForm = lazy(() => import("../components/form")); 

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

const appRouter: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated()}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardSelector />
          </Suspense>
        ),
      },
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
            <EditRole />
          </Suspense>
        ),
      },
      {
        path: "/edit-client/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <EditClient />
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
      {
        path: "/client-form",
        element: (
          <Suspense fallback={<Loading />}>
            <ClientForm />
          </Suspense>
        ),
      },
      {
        path: "/client-table",
        element: (
          <Suspense fallback={<Loading />}>
            <ClientTable />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
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
