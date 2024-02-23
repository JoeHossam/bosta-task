import AppHeader from "@/components/AppHeader";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const AppWrapper = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();

    i18n.on("languageChanged", () => {
      document.body.dir = i18n.dir();
    });
  }, [i18n]);

  return (
    <>
      <AppHeader />
      <main className="container mt-10">
        <Outlet />
      </main>
    </>
  );
};

export default AppWrapper;
