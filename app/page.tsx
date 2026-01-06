import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-20 flex flex-col items-center">
        <h1 className="text-8xl text-center mx-70 font-bold my-20">
          Hire Smarter with AI-Driven Talent Matching
        </h1>
        <p className=" text-center text-2xl mx-80 mb-20">
          Transform your recruitment process with intelligent CV screening,
          skill extraction, and candidate matching. Find the perfect fit faster
        </p>
      </div>
    </>
  );
}
