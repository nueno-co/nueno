import Shell from "@components/Shell";

export default function JobsNew() {
  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">New job</h1>
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save & continue
            </button>
          </span>
        </div>
      </header>
      <main>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <div>
                      <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                        <span className="pr-1 text-red-600">*</span>Job title
                      </label>
                      <input
                        id="job-title"
                        name="job-title"
                        type="text"
                        required
                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Full-Stack Engineer"
                      />
                    </div>
                  </div>

                  <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <div>
                      <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                        <span className="pr-1 text-red-600">*</span>Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows={8}
                        placeholder="Job description..."
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save & continue
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tips</h3>
                <p className="mt-1 text-sm text-gray-600">
                  <ul className="list-disc">
                    <li>Use common job titles for searchability.</li>
                    <li>Advertise for just one job eg: "Software Engineer", not "Software Engineers".</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
