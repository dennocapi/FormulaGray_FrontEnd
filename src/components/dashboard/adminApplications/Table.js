import { useEffect, useRef, useState } from "react";
import {
  adminGetAllApplications,
  adminDeleteApplication,
} from "../../../data/api/authenticatedRequests";

import PageLoader from "../../loaders/PageLoader";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import ShowApplicationMenu from "../../buttons/ShowApplicationMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useParams } from "react-router-dom";
export const Table = () => {
  const tableRef = useRef(null);
  const [students, setStudents] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const { currentStage } = useParams();

  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        if (currentStage) {
          const res = await adminGetAllApplications({
            currentStage: currentStage,
          });
          setStudents(res.data);
        } else {
          const res = await adminGetAllApplications();
          setStudents(res.data);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, []);
  const handleChange = async (e) => {
    setLoading(true);
    try {
      const res = await adminGetAllApplications({
        currentStage: e.target.value,
      });
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const deleteOneApplication = async (student) => {
    const confirmer = window.confirm(
      "Are you sure you want to delete this application? You can not undo this action."
    );
    if (confirmer) {
      const res = await adminDeleteApplication(student._id);
      if (res.status == 200) {
        setStudents((prev) => prev.filter((item) => item._id !== student._id));
        toast("Application deleted successfully!");
      }
    }
  };
  return (
    <div className="px-4 sm:px-6  mr-2 no-scrollbar">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="md:text-xl font-bold text-blue-500">Applications</h1>
        </div>
        {console.log(students)}
        <div className="flex space-x-4 items-center">
          <div className="">
            <div className="col-span-6 sm:col-span-3">
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => handleChange(e)}
                autoComplete="status"
                className="mt-1 block w-full rounded-md border text-[#184061] border-gray-300 bg-white  shadow-sm focus:border-indigo-500 focus:outline-none cursor-pointer focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Applications</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div>
            <DownloadTableExcel
              filename="applications table"
              sheet="applications"
              currentTableRef={tableRef.current}
            >
              <div className="bg-white shadow-md rounded-md text-[#184061] cursor-pointer px-2 py-1.5 ">
                Generate report
              </div>
            </DownloadTableExcel>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                className="min-w-full table-fixed divide-y divide-gray-300"
                ref={tableRef}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Apply Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      First name
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Last name
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Recruitment Partner
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Program
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      School
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Application status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200  bg-white">
                  {!loading &&
                    students &&
                    students?.map((student) => (
                      <tr>
                        <td className="whitespace-nowrap px-3 text-left py-4 text-sm text-gray-500">
                          {moment(student?.createdAt).format("L")}
                        </td>
                        <td className="whitespace-nowrap px-3 text-left py-4 text-sm text-gray-500">
                          {student?.studentId?.email}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-left text-sm font-medium">
                          {student?.studentId?.firstName}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-left text-sm font-medium">
                          {student?.studentId?.lastName}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-left text-sm font-medium">
                          {student?.recruitmentPartnerId?.email}
                        </td>
                        <td className="whitespace-nowrap capitalize px-3 text-left py-4 text-sm text-blue-500">
                          {student?.programmeId?.title}
                        </td>
                        <td className="whitespace-nowrap px-3 text-left py-4 text-sm text-blue-500">
                          {student?.programmeId?.schoolId?.name}
                        </td>

                        <td className="whitespace-nowrap px-3 text-left py-4 text-sm text-gray-500">
                          {student?.currentStage}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3  text-left text-sm font-medium sm:pr-6">
                          <div className=" flex space-x-1 items-center">
                            <div
                              className=" cursor-pointer p-1 hover:bg-gray-100 rounded-full "
                              onClick={() => deleteOneApplication(student)}
                            >
                              <AiOutlineDelete className="text-xl text-red-500" />
                            </div>

                            <ShowApplicationMenu
                              id={student._id}
                              student={student}
                              setApplications={setStudents}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
                {loading && <div className=" text-lg p-2">Loading</div>}
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
