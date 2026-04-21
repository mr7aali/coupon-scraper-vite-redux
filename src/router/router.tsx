import { createBrowserRouter } from "react-router";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardOverview from "../components/DashboardOverview";
import UserManagementPage from "../pages/Dashboard/UserManagementPage";
import SubscriptionsPage from "../pages/Dashboard/SubscriptionsPage";
import PartnerStoresPage from "../pages/Dashboard/PartnerStoresPage";
import PromoCodesPage from "../pages/Dashboard/PromoCodesPage";
import CategoriesManagementPage from "../pages/Dashboard/CategoriesManagementPage";
import ReferralsProgramPage from "../pages/Dashboard/ReferralsProgramPage";
import ContentManagement from "../pages/ContentManagement/ContentManagement";
import AdminRoles from "../pages/AdminRoles/AdminRoles";
import Notifications from "../pages/Notifications/Notifications";
import Payments from "../pages/Payments/Payments";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "users", element: <UserManagementPage /> },
      { path: "subscriptions", element: <SubscriptionsPage /> },
      { path: "partners", element: <PartnerStoresPage /> },
      { path: "deals", element: <PromoCodesPage /> },
      { path: "categories", element: <CategoriesManagementPage /> },
      { path: "referrals", element: <ReferralsProgramPage /> },
      { path: "content", element: <ContentManagement /> },
      { path: "notifications", element: <Notifications /> },
      { path: "payments", element: <Payments /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
      { path: "admin-roles", element: <AdminRoles /> },
    ],
  },
]);
