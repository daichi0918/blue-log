"use client";

/**
 * HomeTemplate
 *
 * @package templates
 */
import { Footer } from "@/components/organisms/Footer";
import { NotLoginHeader } from "@/components/organisms/NotLoginHeader";

import style from "./styles.module.css";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const HomeTemplate = () => {
  return (
    <>
      <NotLoginHeader />
      <Footer />
    </>
  );
};
