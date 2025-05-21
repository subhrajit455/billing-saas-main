import {
    LayoutDashboard,
    UsersRound,
    ChevronDown,
    ReceiptText,
    Boxes,
  } from "lucide-react";
  import React, { useState } from "react";
  import { NavLink, useLocation } from "react-router";
  import { MdOutlineCategory } from "react-icons/md";
  const sidebarItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="" />,
    },
    {
      label: "Customers",
      icon: <UsersRound />,
      children: [
        { label: "View Customers", path: "/customer" },
        { label: "Add Customer", path: "/add-customer" },
      ],
    },
    {
      label: "Items",
      icon: <ReceiptText />,
      children: [
        { label: "View Items", path: "/items" },
        { label: "Add Item", path: "/items/add" },
      ],
    },
    {
      label: "Product Categories",
      icon:  <Boxes />,
      children: [
        { label: "View Categories", path: "/categories" },
        { label: "Add Category", path: "/add-categories" },
      ],
    },
    {
      label: "Product",
      icon:  <Boxes />,
      children: [
        { label: "View Products", path: "/products" },
        { label: "Add Product", path: "/add-product" },
      ],
    },
  ];
  
  function Sidebar() {
    const [openIndexes, setOpenIndexes] = useState([]);
    const location = useLocation();
  
    const toggleOpen = (idx) => {
      setOpenIndexes((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    };
  
    // Helper to check if any child path is active
    const isParentActive = (children) => {
      return children?.some((child) => location.pathname.startsWith(child.path));
    };
  
    return (
      <aside className="fixed left-0 top-0 h-screen w-64 backdrop-blur-sm text-[#949494] p-4 overflow-y-auto z-30">
        <div className="mb-8 text-2xl font-bold flex items-center justify-center">
          Logo
        </div>
        <ul className="space-y-2">
          {sidebarItems.map((item, idx) => {
            const activeParent = item.children && isParentActive(item.children);
            return (
              <li key={idx}>
                <div
                  className={`flex items-center justify-between cursor-pointer px-3 py-2 rounded hover:bg-[#d3c7e934] transition ${activeParent ? "text-[#7C2EEA] font-semibold" : ""}`}
                  onClick={() => item.children && toggleOpen(idx)}
                >
                  {item.path ? (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 ${isActive ? "text-[#7C2EEA] font-semibold" : "text-[#949494]"}`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ) : (
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  )}
                  {item.children && (
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform ${openIndexes.includes(idx) ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
                {item.children && openIndexes.includes(idx) && (
                  <ul className="ml-7 mt-1 space-y-1">
                    {item.children.map((child, cidx) => (
                      <li key={cidx}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-3 py-1 rounded transition hover:bg-[#d3c7e934] ${isActive ? "text-[#7C2EEA] font-semibold" : "text-[#949494]"}`
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
  
  export default Sidebar;