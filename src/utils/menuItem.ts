import { BarChartIcon, LogOut } from "lucide-react";
import { IRole, ISideItem } from "../types";

const getMenuItem = (role: IRole) => {
  const roleMenu: ISideItem[] = [];

  switch (role) {
    case "SUPER_ADMIN":
      roleMenu.push(
        {
          id: "1",
          name: "Dashboard",
          icon: BarChartIcon,
          route: "/dashboard/superadmin",
        },
        {
          id: "12",
          name: "Log Out",
          icon: LogOut,
        },
      );
      break;

    case "ADMIN":
      roleMenu.push(
        {
          id: "1",
          name: "Dashboard",
          icon: BarChartIcon,
          route: "/dashboard/admin",
        },
        {
          id: "12",
          name: "Log Out",
          icon: LogOut,
        },
      );
      break;
    default:
      roleMenu.push(
        {
          id: "1",
          name: "Dashboard",
          icon: BarChartIcon,
          route: "/dashboard",
        },
        {
          id: "2",
          type: "DIVIDER",
        },
        {
          id: "4",
          name: "Log Out",
          icon: LogOut,
        },
      );
      break;
  }

  return [...roleMenu];
};

export default getMenuItem;
