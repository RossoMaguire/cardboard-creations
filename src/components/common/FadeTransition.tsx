import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      //ease: [0.61, 1, 0.88, 1],
    },
    transitionDelay: "2",
  },
};

const FadeTransition = ({ children }: any): any => (
  <AnimatePresence>
    <motion.div initial="initial" animate="enter" variants={variants}>
      {children}
    </motion.div>
  </AnimatePresence>
);

export default FadeTransition;
