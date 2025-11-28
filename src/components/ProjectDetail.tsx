import { motion, useAnimation, easeInOut } from "framer-motion";
import { useEffect } from "react";

const ProjectDetail = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: easeInOut, delay: 0.2 },
    });
  });

  return (
    <>
      <motion.div
        className="flex container flex-col bg-background min-h-screen w-full p-8 lg:p-4"
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
      ></motion.div>
    </>
  );
};
export default ProjectDetail;
