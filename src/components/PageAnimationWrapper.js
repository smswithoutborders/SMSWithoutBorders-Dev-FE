import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
export const PageAnimationWrapper = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        className="font-display"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 19 }}
        exit={{ y: -300, opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
