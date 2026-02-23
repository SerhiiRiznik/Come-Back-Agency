"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import CloudIcon from "@mui/icons-material/Cloud";
import styles from "./Header.module.scss";

export default function Header() {
  const router = useRouter();
  return (
    <AppBar position="static" elevation={0} className={styles["header-appbar"]}>
      <Toolbar className={styles["header-toolbar"]}>
        <Button
          startIcon={<CloudIcon className={styles["header-icon"]} />}
          className={styles["header-btn"]}
          onClick={() => router.push("/")}
        >
          Come Back Agency
        </Button>
      </Toolbar>
    </AppBar>
  );
}
