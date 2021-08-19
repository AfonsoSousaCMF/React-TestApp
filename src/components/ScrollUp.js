import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const ScrollUp = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
        {showButton && (
            <Button onClick={scrollToTop} id="scroll" className="scrollUp">
            <KeyboardArrowUpIcon />
          </Button>
        )}
    </>
  );
};

export default ScrollUp;
