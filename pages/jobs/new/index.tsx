import { JobsCreateRequestParams, JobsCreateResponseParams } from "@api-contracts/jobs/create";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, BaseSyntheticEvent } from "react";
import Select from "react-select";

import Shell from "@components/Shell";

import TagInput from "../../../components/TagInput";
import { CompanyIndustry, JobFunction, EmploymentType, Experience, Education } from "../../../data/index";

export default function JobsNew() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function submit(e: BaseSyntheticEvent) {
    e.preventDefault();

    try {
      const requestParams: JobsCreateRequestParams = { title, description };
      const response = await axios.post("/api/jobs/create", requestParams);
      const responseData: JobsCreateResponseParams = response.data;

      router.push({ pathname: `/jobs/new/${responseData.uid}/application-form` });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">New job</h1>
          <span className="sm:ml-3">
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save & continue
            </button>
          </span>
        </div>
      </header>
      <main>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* first grid item */}
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div>
                      <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                        <span className="pr-1 text-red-600">*</span> Job title
                      </label>
                      <input
                        id="job-title"
                        name="job-title"
                        type="text"
                        required
                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Full-Stack Engineer"
                        value={title}
                        onInput={(e) => setTitle(e.currentTarget.value)}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-5 bg-white sm:p-6">
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
                        value={description}
                        onInput={(e) => setDescription(e.currentTarget.value)}
                      />
                    </div>

                    <div className="w-full mt-5 mb-5 rounded-md p-2">
                      <p className="bg-gray-100 text-xl py-3 rounded-md font-semibold">
                        Company industry and Job function
                      </p>

                      <div className="flex mt-5 justify-between items-center">
                        <div>
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            <span className="pr-1 text-red-600">*</span> Company industry
                          </label>
                          <Select
                            options={CompanyIndustry}
                            className="w-80  p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            <span className="pr-1 text-red-600">*</span> Job function
                          </label>
                          <Select
                            options={JobFunction}
                            className="w-80  p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-5 mb-5 rounded-md p-2">
                      <p className="bg-gray-100 text-xl py-3 rounded-md font-semibold">Employment details</p>

                      <div className="flex mt-5 justify-between items-center">
                        <div>
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            <span className="pr-1 text-red-600">*</span> Employment type
                          </label>
                          <Select
                            className="w-80  p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            options={EmploymentType}
                          />
                        </div>
                        <div>
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            <span className="pr-1 text-red-600">*</span> Experience
                          </label>
                          <Select
                            className="w-80  p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            options={Experience}
                          />
                        </div>
                      </div>
                      <div className="flex mt-5 justify-between items-center">
                        <div>
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            Education
                          </label>
                          <Select
                            className="w-80  p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            options={Education}
                          />
                        </div>
                        <div>
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            Keyword
                          </label>
                          <TagInput />
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-5 mb-5 rounded-md p-2">
                      <p className="bg-gray-100 text-xl py-3 rounded-md font-semibold">Annual salary</p>

                      <div className="grid grid-cols-4 gap-4 mt-5">
                        <div className="md:col-span-1">
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            From
                          </label>
                          <input
                            type="number"
                            name=""
                            id=""
                            className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            To
                          </label>
                          <input
                            type="number"
                            name=""
                            id=""
                            className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-700">
                            Currency
                          </label>
                          <select
                            name=""
                            id=""
                            className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">select...</option>
                            <option value="977">Bosnia and Herzegovina Convertible Mark (BAM)</option>
                            <option value="052">Barbadian Dollar (BBD)</option>
                            <option value="050">Bangladeshi Taka (BDT)</option>
                            <option value="975">Bulgarian Lev (BGN)</option>
                            <option value="048">Bahraini Dinar (BHD)</option>
                            <option value="108">Burundian Franc (BIF)</option>
                            <option value="060">Bermudian Dollar (BMD)</option>
                            <option value="096">Brunei Dollar (BND)</option>
                            <option value="933">Belarusian Ruble (BYN)</option>
                            <option value="974">Belarusian Ruble (BYR)</option>
                            <option value="084">Belize Dollar (BZD)</option>
                            <option value="124">Canadian Dollar (CAD)</option>
                            <option value="976">Congolese Franc (CDF)</option>
                            <option value="756">Swiss Franc (CHF)</option>
                            <option value="990">Unidad de Fomento (CLF)</option>
                            <option value="152">Chilean Peso (CLP)</option>
                            <option value="156">Chinese Renminbi Yuan (CNY)</option>
                            <option value="170">Colombian Peso (COP)</option>
                            <option value="188">Costa Rican Colón (CRC)</option>
                            <option value="931">Cuban Convertible Peso (CUC)</option>
                            <option value="192">Cuban Peso (CUP)</option>
                            <option value="132">Cape Verdean Escudo (CVE)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={submit}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save & continue
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* second grid item */}
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tips</h3>
                <div className="mt-1 text-sm text-gray-600">
                  <ul className="list-disc">
                    <li>Use common job titles for searchability.</li>
                    <li>Advertise for just one job eg: Software Engineer, not Software Engineers.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
