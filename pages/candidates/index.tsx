/* eslint-disable react/no-unescaped-entities */
import Shell from "@components/Shell";

export default function Candidate() {
  return (
    <Shell>
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-auto border-4 border-gray-200 border-dashed rounded-lg h-97">
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="px-4 py-5 border-b-2 bg-gray-50 border-b-grey-500 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium ">
                        <label>2022-05-10</label>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <label className="font-bold">Candidate Name</label> candidate@mail
                        <br />
                        Qualification | Address
                      </dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <label className="font-bold">Job Title</label>
                        <br />
                        Job Description
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
