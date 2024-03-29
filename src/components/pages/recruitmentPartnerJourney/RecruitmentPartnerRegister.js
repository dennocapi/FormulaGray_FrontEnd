import React, { useState, useEffect } from "react";
import { Navbar } from "../../landingPage/Navbar";
import Banner from "../../dashboard/Banner";
import SideBar from "../../dashboard/SideBar";
import { Steps } from "../../Steps";
import { ContactInformation } from "./ContactInformationForm";
import BusinessInformationForm from "./BusinessInformationForm";
import RecruitmentDetails from "./RecruitmentDetails";
import { useRecruiter, userStore } from "../../../stores";
import { refreshSession } from "../../../data/api/authenticatedRequests";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utils/Spinner";
export const RecruitmentPartnerRegister = () => {
  const recruiter = useRecruiter((state) => state.recruiter);
  const storeUser = userStore((state) => state.storeUser);
  const user = userStore((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await refreshSession();
        if (res && res.status !== 200) {
          setLoading(false);
          return navigate("/signin");
        } else if (res.data.user) {
          storeUser(res.data.user);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div>
      <div className=" grid grid-cols-12">
        <div className="md:col-span-2 hidden md:block h-screen overflow-y-hidden ">
          <SideBar />
        </div>
        <div className="md:col-span-10 col-span-12 h-screen overflow-y-scroll w-full overflow-x-hidden">
          <Banner />
          <Steps />
          {loading && <Spinner />}
          {!loading && (
            <div className=" min-h-screen">
              <div className=" flex flex-row-reverse mr-10">
                {user?.onboarding && (
                  <Link to={"/dashboard"}>
                    <div className="p-1 cursor-pointer text-sm bg-white shadow-md rounded-md ">
                      Back To Dashboard
                    </div>
                  </Link>
                )}
              </div>
              {recruiter.step == "contact" && <ContactInformation />}
              {recruiter.step == "business" && <BusinessInformationForm />}
              {recruiter.step == "recruitment-details" && (
                <RecruitmentDetails />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
