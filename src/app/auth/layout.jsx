"use client";

import Image from "next/image";
import React from "react";
import { Button } from "reactstrap";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-content-section center-items">
      <div className="auth-content-box center-items-col">
        <div className="d-flex flex-column gap-3 py-4">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
