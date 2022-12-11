import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { MdOutlineDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { InfosGerais } from "../pages/InfosGerais";

export const menu = [
  {
    path: "/",
    element: <Dashboard />,
    name: "Dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    path: "/detalhes",
    element: <InfosGerais />,
    name: "Dados Gerais",
    icon: <RiUserSettingsLine />,
  },
];

export const routes = createBrowserRouter(menu);
