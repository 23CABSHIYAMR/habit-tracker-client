"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GreetingCol from "@/components/GreetingCol";
import { navItems, getCurrentIndex } from "@/constants";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { setSideBarToggle } from "@/ReduxToolkit/Reducers/Layout/LayoutReducer";
import { useState, useEffect } from "react";

export default function Header() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userDetails"));
    if (user) setUserDetails(user);
  }, []);

  const activeIndex = getCurrentIndex(pathName);

  return (
    <div className="header-area">
      <GreetingCol userDetails={userDetails} />

      <div className="space-between gap-4">
        <nav className="top-nav">
          <div
            className="pill"
            style={{ transform: `translateX(${activeIndex * 105}%)` }}
          ></div>

          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.pathName}
              className={`navItem ${activeIndex === i ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          className="rmv-btn-style add-habit-btn"
          onClick={() => dispatch(setSideBarToggle(true))}
        >
          + Add Habit
        </button>
      </div>
    </div>
  );
}
