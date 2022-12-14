import React, { useState, useEffect, useRef } from "react";
import MusicLoader from "../loaders/MusicLoader";
import Spinner from "../utils/BlueSpinner";
import { AiFillFilePdf } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

function FileUpload({ uploadDoc, isDocLoading, docName, docUrl, title, name }) {
  const fileRef = useRef(null);

  const thumbnailUpload = () => {
    fileRef.current.click();
  };

  return (
    <div>
      {(docUrl !== "" && (
        <div className="rounded p-4 text-center group">
          <div className="flex justify-between mb-2 items-center text-sm text-gray-600 font-semibold">
            <div className="">{title}</div>
            <div
              className="  p-1 rounded-lg  hover:bg-gray-300 cursor-pointer"
              onClick={() => thumbnailUpload()}
            >
              <MdEdit className=" text-purple-900 text-xl" />
              <input
                name={name ? name : "thumbnail"}
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={uploadDoc}
                accept=".pdf,.doc"
              />
            </div>
          </div>
          {!isDocLoading && (
            <div className="flex space-x-2 items-center justify-center ">
              <div className="">
                <AiFillFilePdf className=" text-blue-500 text-xl" />
              </div>
              <div className="">{docName ? docName : name}</div>
            </div>
          )}
          {isDocLoading && (
            <div className="flex flex-col justify-center items-center h-32">
              <div>
                <Spinner />
              </div>
            </div>
          )}
        </div>
      )) || (
        <div className="mt-8">
          <div className="mb-4 text-left text-sm text-gray-600 font-semibold">
            {title}
          </div>
          <div className="flex w-full justify-center ">
            <div className="flex justify-center w-10/12">
              <div className="p-8 border-2 border-dashed w-full flex justify-center">
                <span
                  className="px-2 py-1 bg-transparent border-2 font-semibold border-bloow-gray rounded-full hover:underline cursor-pointer hover:bg-gray-100"
                  onClick={!isDocLoading ? thumbnailUpload : () => {}}
                >
                  {(isDocLoading && (
                    <div className="">
                      <Spinner />
                    </div>
                  )) ||
                    title}
                </span>
                <input
                  name={name ? name : "thumbnail"}
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  onChange={uploadDoc}
                  accept=".pdf,.doc"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
