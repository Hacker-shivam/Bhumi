import React from "react";
import { FaLeaf, FaSeedling, FaCloudSun, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Bhumi from "../components/Bhumi";
import Developer from "../components/Developer";

const About = () => {
  return (
    <section className="bg-gradient-to-r from-green-500 to-yellow-400 w-full min-h-screen">
        <Navbar />
        <Bhumi />
        <Developer />

    </section>
  );
};

export default About;