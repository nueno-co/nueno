import { JobsListResponseParams } from "@api-contracts/jobs/list";
import { BriefcaseIcon } from "@heroicons/react/outline";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useQuery } from "react-query";

import Shell from "@components/Shell";

export default function Jobs() {
  const { isLoading, data: jobs } = useQuery("jobs", getJobs);

  async function getJobs() {
    const response = await axios.get("/api/jobs/list");
    const responseData: JobsListResponseParams = response.data;
    return responseData;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          <span className="sm:ml-3">
            <Link href="/jobs/new">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create a new job
              </button>
            </Link>
          </span>
        </div>
      </header>
      <main>
        {jobs?.map((job) => {
          return (
            <>
              <div
                key={job.uid}
                className="flex flex-col md:flex-row   justify-between  container 
                    mx-auto py-[20px]   mb-10 mt-5 md:mb-5 shadow-lg   relative bg-white rounded-[5px]  ">
                <div className="flex flex-shrink-0 mt-3 md:px-9">
                  <div className=" flex flex-col md:w-[90px]  w-[50px] mr-4 absolute translate-x-4 -translate-y-14  md:relative md:-translate-x-0 md:-translate-y-0 ">
                    <BriefcaseIcon />
                  </div>
                  <div className="justify-between ml-4">
                    <h1 className="text-[#5ba4a4] font-bold text-[12px]">{job.Company?.name}</h1>
                    <div className="flex my-[10px] font-bold hover:text-[#5ba4a4] cursor-pointer">
                      <h1>{job.title}</h1>
                    </div>
                    <div className="flex flex-col text-[#7b8e8e] font-medium text-[13px] mb-4">
                      <span>{moment(job.createdAt).fromNow()}</span>
                      <p>{job.description.slice(0, 15) + (job.description.length > 15 ? "..." : "")}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex mb-3 ml-3 mr-3 ">
                    <div className="flex flex-wrap flex-grow-0  md:justify-end  border-t-[1px] border-t-[#7b8e8e] md:border-0 lg:mt-[25px] ">
                      <Link href="jobs/new">
                        <button
                          value="Junior"
                          className="bg-[#eef6f6] text-gray-500 rounded-[5px] text-xs  font-bold hover:bg-gray-900 hover:text-white cursor-pointer mr-4 mb-4 pt-2 pb-[6px] px-2 my-2 ">
                          Read More
                        </button>
                      </Link>
                      <Link href="jobs/new">
                        <button
                          value="Junior"
                          className="bg-[#eef6f6] text-[#5ba4a4] rounded-[5px] text-xs  font-bold hover:bg-[#5ba4a4] hover:text-white cursor-pointer mr-4 mb-4 pt-2 pb-[6px] px-2 my-2 ">
                          Apply Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </main>
    </Shell>
  );
}
