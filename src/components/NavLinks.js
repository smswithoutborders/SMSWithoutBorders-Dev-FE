import React, { forwardRef } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import clsx from "clsx";

export const NavLink = forwardRef(({ className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center p-4 outline-none appearance-none",
          isActive && "font-medium border-b-2 border-blue-600 text-blue-600",
          className
        )
      }
    />
  );
});

export const SideNavLink = forwardRef(({ className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center px-4 py-6 lg:py-4 font-medium outline-none appearance-none",
          isActive && "bg-blue-800 text-white",
          className
        )
      }
    />
  );
});

export const ExternalLink = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={clsx(
          "flex outline-none font-medium p-4 items-center appearance-none active:font-bold",
          className
        )}
      >
        {children}
      </a>
    );
  }
);
