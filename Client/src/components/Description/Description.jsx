import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-semibold mb-2"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Create AI Images
      </motion.h1>

      <motion.p
        className="text-gray-500 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Turn your imagination into visuals
      </motion.p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <motion.img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Unleash your creativity with our advanced AI image generator that
            transforms simple text prompts into visually stunning artwork.
            Whether you're a designer, student, marketer, or storyteller
          </p>
          <p className="text-gray-600">
            Turn your words into captivating images with the power of AI. Create
            unique visuals instantly — no design skills needed. Ideal for
            artists, marketers, and dreamers who want to bring ideas to life.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Description;
