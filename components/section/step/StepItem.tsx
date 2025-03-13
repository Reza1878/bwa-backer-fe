import clsx from "clsx";
import { Typography } from "components/common";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StepItemProps {
  position: number;
  src: string;
  title: string;
  description: React.ReactNode;
}
function StepItem(props: StepItemProps) {
  const { description, title, src, position } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const margin = ["", "lg:-mt-14", "lg:-mt-28"];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: -48 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "text-center w-full lg:w-1/3 flex flex-col items-center lg:py-0 py-6",
        margin[position]
      )}
    >
      <Image src={src} alt="Step" />
      <Typography className="font-medium py-2">{title}</Typography>
      <Typography variant="small">{description}</Typography>
    </motion.div>
  );
}

export default StepItem;
