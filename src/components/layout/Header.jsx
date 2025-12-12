"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GreetingCol from "@/components/layout/GreetingCol";
import { navItems, getCurrentIndex } from "@/constants";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { setSideBarToggle } from "@/ReduxToolkit/Reducers/Layout/LayoutReducer";
import { useState, useEffect } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { AddIcon } from "@/components/ui/SvgIcons";
export default function Header({ userDetails = {} }) {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const activeIndex = getCurrentIndex(pathName);
  return (
    <div className="header-area">
      <GreetingCol userDetails={userDetails} />

      <div className="space-between gap-1">
        <nav className="top-nav position-relative">
          {/* Sliding Pill */}
          <div
            className="slider-pill"
            style={{
              width: `${100 / navItems.length}%`,
              transform: `translateX(calc(${activeIndex * 100}% - 4px))`,
            }}
          />

          {/* Nav Items */}
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
          <AddIcon /> Add Habit
        </button>
      </div>
    </div>
  );
}
