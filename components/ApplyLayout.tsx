import { Fragment } from "react";

import { applyType } from "@helpers/type-safety";

export default function ApplyLayout({ job, children }: applyType) {
  return (
    <Fragment>
      <div className="flex ">
        <div className="container w-2/4 mx-auto mt-20">
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h4 className="mb-1 font-bold text-gray-600 text-md">{job.Company.name}</h4>

                  <h1 className="mb-5 text-2xl font-medium leading-6 text-gray-900">{job.title}</h1>

                  <a href="#" className="flex items-start p-0 mt-4 rounded-lg hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="white"
                      strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <div className="-ml-4">
                      <p className="mt-0 text-sm text-gray-500">{job.description} </p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
