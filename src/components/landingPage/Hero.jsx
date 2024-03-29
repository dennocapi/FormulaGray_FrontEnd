import React from "react";
import students from '../../assets/students.jpg'
import studentsPhone from '../../assets/student-cellphone.jpg'
import smilingStudents from '../../assets/smiling-students.jpg'
import happyStudents from '../../assets/happy-students.jpg'
export const Hero = () => {
  return (
    <main className="lg:relative bg-indigo-500">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left text-white">
        <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline ">
              Join your <span className="text-[skyblue]">Dream</span>
            </span>{" "}
            <span className="block xl:inline">
              <span className="text-[skyblue]">School</span> today
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg sm:text-xl md:mt-5 md:max-w-3xl ">
            Get matched and apply to quality  Education institutions globally.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3">
              <a
                href="/signin"
                className="flex w-full items-center  text-indigo-500 justify-center rounded-md  bg-white px-8 py-3 text-base font-medium hover:bg-gray-200 md:py-4 md:px-10 md:text-lg"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={smilingStudents}
          alt=""
        />
      </div>
    </main>
  );
};
