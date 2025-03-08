import clsx from "clsx";
import { memo } from "react";
import { NavLink } from "react-router";

type MenuLinkProps = {
  icon: React.ReactNode;
  label: string;
  end?: React.ReactNode;
  path: string;
  isActive: boolean;
};

function MenuLink({ icon, label, end, path, isActive }: MenuLinkProps) {
  return (
    <li>
      <NavLink
        to={path}
        className={clsx(
          "flex items-center p-4 text-foreground-muted rounded-r-lg group hover:bg-layer-primary hover:text-primary",
          {
            "bg-layer-primary text-primary": isActive,
          }
        )}
        end
      >
        {icon}
        <span className="ms-3">{label}</span>
        {end}
      </NavLink>
    </li>
  );
}

export default memo(MenuLink);
