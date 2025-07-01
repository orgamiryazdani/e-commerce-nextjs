import { motion } from 'framer-motion';
import React, { FC } from 'react';

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
};

const DotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
} as const;

export const Loading: FC = () => {
  return (
    <div className="flex w-full items-center justify-center pt-20">
      <motion.div
        className="flex h-20 w-40 justify-around [&>*]:block [&>*]:h-8 [&>*]:w-8 [&>*]:rounded-full [&>*]:bg-black"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span variants={DotVariants} transition={DotTransition} />
        <motion.span variants={DotVariants} transition={DotTransition} />
        <motion.span variants={DotVariants} transition={DotTransition} />
      </motion.div>
    </div>
  );
};
