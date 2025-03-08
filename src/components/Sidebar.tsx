import { memo, useMemo } from "react";
import MenuLink from "./MenuLink";
import DashboardIcon from "../assets/DashboardIcon";
import MyAssetsIcon from "../assets/MyAssetsIcon";
import { useLocation } from "react-router";

function Sidebar() {
  const { pathname } = useLocation();

  const isDashboardActive = useMemo(() => pathname === "/", [pathname]);
  const isAssetsActive = useMemo(
    () => pathname.includes("/assets"),
    [pathname]
  );

  return (
    <aside id="default-sidebar" className="w-64" aria-label="Sidebar">
      <div className="text-2xl font-bold px-4 py-4">StockApp</div>
      <ul className="space-y-2 font-medium pr-4 py-4">
        <MenuLink
          icon={<DashboardIcon isActive={isDashboardActive} />}
          label="Dashboard"
          path="/"
          isActive={isDashboardActive}
        />
        <MenuLink
          icon={<MyAssetsIcon isActive={isAssetsActive} />}
          label="Assets"
          path="/assets"
          isActive={isAssetsActive}
        />
      </ul>
    </aside>
  );
}

export default memo(Sidebar);
