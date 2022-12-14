import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineArrowRight } from "react-icons/ai";
import { userStore } from "../../stores";

function ProgramDetails({ setViewProgram, program }) {
  const user = userStore((state) => state.user);

  return (
    <>
      <div
        className="fixed w-full inset-0 z-75 overflow-hidden flex justify-center items-end md:items-center animated fadeIn faster"
        style={{ background: "rgba(0,0,0,.6)" }}
      >
        <div className="shadow-xl modal-container bg-white text-black w-full md:w-3/5 lg:w-3/5 xl:w-1/3 mx-auto rounded-t-lg md:rounded-lg z-100 overflow-y-auto max-h-full">
          <div className="modal-content text-left">
            <div className="flex w-full flex-row-reverse">
              <div
                className=" mt-1 mr-4 p-2 hover:bg-gray-200 hover:text-black rounded-lg cursor-pointer"
                onClick={() => setViewProgram(false)}
              >
                <AiOutlineClose className="" />
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="  text-center text-lg pb-2 font-semibold text-[#184061] ">
                {program.title}
              </div>
              <div className=" flex justify-between">
                <div className=" w-1/2 ">
                  <div className=" text-sm text-gray-500">School</div>
                  <div className="line-clamp-1 ">University of Toronto</div>
                </div>
                <div className=" w-1/2">
                  <div className=" text-sm  text-gray-500">Location</div>
                  <div className="flex space-x-1  items-center">
                    <div className=" line-clamp-1">
                      Ellesmere Port, North West, GB
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left font-semibold pt-2 pb-1 text-[#184061]">
                About
              </div>
              <div className=" line-clamp-6 ">
                This Higher National Certificate (HNC) aims to equip an
                individual with knowledge and understanding and skills for
                success in a range of positions in travel and tourism
                management. Students will develop skills in leadership and
                management, marketing, sustainable tourism, customer service as
                well as carrying out a research project.
              </div>
              <div className="text-left font-semibold pt-2 pb-1 text-[#184061]">
                Cost
              </div>
              <div className=" flex justify-between ">
                <div className="w-1/2">
                  <div className=" text-sm text-gray-500">Tuition</div>
                  <div className="">$14,250.00</div>
                </div>
                <div className=" w-1/2">
                  <div className=" text-sm text-gray-500">Application Fees</div>
                  <div className="">$250.00</div>
                </div>
              </div>
              <div className="text-left font-semibold pt-2 pb-1 text-[#184061]">
                Academic Requirements
              </div>
              <div className=" text-sm pt-2">
                Minimum Level of Education Completed
              </div>
              <div className=" text-lg">1-Year Post-Secondary Certificate</div>
              <div className=" text-sm pt-2">Minimum GPA</div>
              <div className=" text-lg">50.0%</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgramDetails;
