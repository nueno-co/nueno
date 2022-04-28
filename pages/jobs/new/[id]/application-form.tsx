import { DotsVerticalIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, BaseSyntheticEvent } from "react";

import { asStringOrUndefined } from "@helpers/type-safety";

import Shell from "@components/Shell";

type Attributes = { type: string; label: string; required: boolean }[];
type FieldAttributes = { fields: Attributes; jobUid: string };

export default function JobsNew() {
  const router = useRouter();
  const jobUid = asStringOrUndefined(router.query.id);
  const [fields, setFields] = useState([
    {
      type: "SHORT_TEXT",
      label: "",
      required: false,
    },
  ]);

  function addField() {
    const newFields = [...fields];
    newFields.push({ type: "SHORT_TEXT", label: "", required: false });
    setFields(newFields);
  }
  function removeField(index: number) {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  }
  function updateField(value: string, index: number, key: string) {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [key]: value };
    setFields(newFields);
  }
  //drag and drop in functions
  function allowDrop(e: BaseSyntheticEvent) {
    e.preventDefault();
  }
  function drap(e: BaseSyntheticEvent) {
    e.dataTransfer.setData("text", e.target.id);
  }
  function drop(e: BaseSyntheticEvent) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
  }

  async function submit(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!jobUid) return;

    try {
      const requestParams: FieldAttributes = { jobUid, fields };
      await axios.post("/api/application-forms/create", requestParams);

      router.push({ pathname: "/jobs/" });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Application form</h1>
          <span className="sm:ml-3">
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Publish
            </button>
          </span>
        </div>
      </header>
      <main>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-2 bg-white sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-700">Customize your application form</h2>
                  <div className="flex items-center">
                    <DotsVerticalIcon className="w-5 h-5 text-gray-400 cursor-move" aria-hidden="true" />
                    <div className="flex-auto p-2 bg-gray-100 rounded">
                      <p className="text-md">First name</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DotsVerticalIcon className="w-5 h-5 text-gray-400 cursor-move" aria-hidden="true" />
                    <div className="flex-auto p-2 bg-gray-100 rounded">
                      <p className="text-md">Last name</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DotsVerticalIcon className="w-5 h-5 text-gray-400 cursor-move" aria-hidden="true" />
                    <div className="flex-auto p-2 bg-gray-100 rounded">
                      <p className="text-md">Email</p>
                    </div>
                  </div>
                  {fields.map((field, index) => (
                    <>
                      <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}></div>
                      <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
                        <div key={index} draggable="true" onDragStart={(e) => drag(e)} id={index}>
                          <div className="flex items-center">
                            <DotsVerticalIcon
                              className="w-5 h-5 text-gray-400 cursor-move"
                              aria-hidden="true"
                            />
                            <div className="flex-auto p-2 bg-gray-100 rounded">
                              <p className="text-sm font-semibold text-md">Type</p>
                              <select
                                value={field.type}
                                onChange={(e) => updateField(e.target.value, index, "type")}
                                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 sm:text-sm">
                                <option value="SHORT_TEXT">Short text</option>
                                <option value="LONG_TEXT">Long text</option>
                                <option value="CHECKBOX">Yes/No</option>
                                <option value="SELECT">Select one</option>
                                <option value="MULTI_SELECT">Select multiple</option>
                              </select>
                              <p className="text-sm font-semibold text-md">Label</p>
                              <input
                                id="label"
                                name="label"
                                type="text"
                                value={field.label}
                                onChange={(e) => updateField(e.target.value, index, "label")}
                                required
                                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="e. g. LinkedIn URL"
                              />
                            </div>
                          </div>
                          <div>
                            {index > 0 && (
                              <a
                                href="#"
                                className="ml-5 text-sm font-bold text-red-700"
                                onClick={() => removeField(index)}>
                                X Remove
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}></div>
                    </>
                  ))}
                  <div>
                    <button
                      type="button"
                      onClick={addField}
                      className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Add field
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tips</h3>
                <div className="mt-1 text-sm text-gray-600">...</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
