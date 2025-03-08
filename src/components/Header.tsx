import { memo, useMemo } from "react";
import { useLocation } from "react-router";

function Sidebar() {
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    let title = "";
    if (pathname === "/") title = "Dashboard";
    if (pathname === "/assets") title = "Assets";
    if (pathname.includes("/assets/")) {
      title = pathname.split("/assets/")[1];
    }
    return title;
  }, [pathname]);

  return (
    <header className="h-16 border-solid p-4 pl-8">
      <h2 className="text-2xl font-bold">{pageTitle}</h2>
    </header>
  );
}

export default memo(Sidebar);
