import Header from "components/NewContentGenerator/Header";
import React, { useState, useEffect } from "react";

const NewContentGenerator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
    </>
  );
};

export default NewContentGenerator;
