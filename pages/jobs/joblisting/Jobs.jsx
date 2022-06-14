import React from "react";

import Shell from "@components/Shell";

const Jobs = () => {
  return (
    <Shell>
      <header></header>
      <div className="py-4 bg-white rounded-md w-full sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
        <h1 className="text-2xl text-gray-500">Company Name</h1>
        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Create New Job
          </button>
        </span>
      </div>
      <main>
        <div className="bg-white h-56 rounded-xl w-full mt-10 p-5 hover:drop-shadow-md">
          <div className="flex justify-between items-center">
            <p className="text-xl text-gray-600">Jnr. Software Enginer</p>
            <div>
              <button
                type="button"
                className="py-2 px-10 hover:bg-gray-100 border-black border text-gray-700 mx-2 rounded-xl">
                Find Candidate
              </button>
              <button className="py-2 px-7 hover:drop-shadow-lg text-white bg-orange-600 rounded-xl">
                Publish (Careers page only)
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-9 mx-10">
            <div className="flex md:flex-col items-center py-3 px-7 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl">
              <span>-</span>
              <p>Sourced</p>
            </div>

            <div className="flex md:flex-col items-center py-3 px-7 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl">
              <span>-</span>
              <p>Applied</p>
            </div>
            <div className="flex md:flex-col items-center py-3 px-7 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl">
              <span>-</span>
              <p>Phone Screen</p>
            </div>
            <div className="flex md:flex-col items-center py-3 px-7 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl">
              <span>-</span>
              <p>Assessment</p>
            </div>
            <div className="flex md:flex-col items-center py-3 px-7 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl">
              <span>-</span>
              <p>Interview</p>
            </div>
            <div className="flex md:flex-col items-center py-3 px-7 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl">
              <span>-</span>
              <p>Offer</p>
            </div>
            <div className="flex md:flex-col items-center py-3 px-7 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl">
              <span>-</span>
              <p>Hired</p>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
};

export default Jobs;
