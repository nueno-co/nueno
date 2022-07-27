import { JobsListResponseParams } from "@api-contracts/jobs/list";
import axios from "axios";
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
            <div
              key={job.uid}
              className="flex justify-between p-4 mb-3 align-middle rounded-md shadow-sm bg-slate-200">
              <h4 className="font-bold text-1xl">
                {job.title}
                <br />
                <small className="font-medium">
                  URL: <span className="font-light">{`${process.env.appUrl}/jobs/${job.uid}`}</span>
                </small>
              </h4>

              <Link href={`/jobs/${job.uid}`}>
                <a target="_blank" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500">
                  Apply
                </a>
              </Link>
            </div>
          );
        })}
      </main>
    </Shell>
  );
}
