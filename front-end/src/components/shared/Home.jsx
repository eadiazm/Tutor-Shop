import React from "react";
import HomeInfo from "./HomeInfo";
import HomeSubjects from "./HomeSubjects";
import HomeTestimony from "./HomeTestimony";
import ContactStudent from "../student/ContactStudent";

export const Home = () => {
  return (
    <>
      <HomeInfo />
      <HomeSubjects />
      <HomeTestimony />
      <ContactStudent homepage={"si"} />
    </>
  );
};
