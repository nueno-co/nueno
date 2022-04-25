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
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Create a new job
              </button>
            </Link>
          </span>
        </div>
      </header>
      <main>
        {jobs?.map((job) => {
          return (
            <div key={job.uid}>
              <a className="block p-8 mt-8 bg-white border border-gray-200 shadow-sm rounded-xl" href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>

                <h3 className="mt-3 text-xl font-bold text-gray-800">{job.title}</h3>

                <p className="mt-4 text-sm text-gray-500">{job.description}</p>
              </a>
            </div>
          );
        })}
      </main>
    </Shell>
  );
}
