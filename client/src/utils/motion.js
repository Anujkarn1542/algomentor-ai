export const pageMotion = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  transition: {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  },
};

export const cardMotion = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const hoverCardMotion = {
  whileHover: {
    y: -6,
    scale: 1.015,
    boxShadow: "0 12px 30px rgba(124,58,237,0.18)",
  },
  whileTap: {
    scale: 0.995,
  },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 18,
  },
};
