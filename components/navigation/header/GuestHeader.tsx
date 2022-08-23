import { Button, Container, Img, Typography } from "components/common";

import React from "react";
import GuestNavbar from "../navbar/GuestNavbar";
function GuestHeader() {
  return (
    <header className="relative my-6">
      <GuestNavbar />
    </header>
  );
}

export default GuestHeader;
