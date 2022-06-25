import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import { FieldCreateResponseParams } from "@api-contracts/application-forms/fields";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import {
  SortableList,
  SortableItem,
  SortableItemProps,
  ItemRenderProps,
} from "@thaddeusjiang/react-sortable-list";
import axios from "axios";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState } from "react";
import { useQuery } from "react-query";

import { asStringOrUndefined } from "@helpers/type-safety";

import Shell from "@components/Shell";

export default function JobsNew() {
  const router = useRouter();
  const jobUid = asStringOrUndefined(router.query.id);

  // const jobUid = typeof router.query?.id === "string" ? router.query.id : "";

  const query = useQuery("items", getJobApplicationFormFields);
  console.log(query);

  const [items, setItems] = useState<SortableItemProps[]>([query as any]);

  async function getJobApplicationFormFields() {
    // const response = await axios.get(`/api/application-forms/field-list/${jobUid}`);
    const response = await axios.get(`/api/application-forms/field-list/5952dfdb`);
    // const responseData = response.data;
    const responseData: FieldCreateResponseParams = response.data;
    console.clear();
    console.log(responseData);
    setItems(responseData as any);
    return responseData;
  }

  function validateForm() {
    const title = document.getElementById("job-title") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    let response = true as boolean;

    if (!title.value) {
      alert("Please enter a job title.");
      response = false;
    }

    if (title.value.length < 3) {
      alert("The job title should be at least 10 characters long.");
      response = false;
    }

    if (!description.value) {
      alert("Please enter the job description.");
      response = false;
    }

    return response;
  }

  const deleteField = (fieldId: any) => {
    alert(fieldId);
  };

  async function submit(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!jobUid) return;

    try {
      const requestParams: ApplicationFormsCreateRequestParams = { jobUid, fields: [] };
      await axios.post("/api/application-forms/create", requestParams);

      router.push({ pathname: "/jobs/" });
    } catch (e) {
      console.log(e);
    }
  }

  async function generateDefaultFields(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!jobUid) return;

    const data = { jobUid: jobUid };

    type responseType = {
      count: number;
    };

    try {
      const response: responseType = await axios.post("/api/application-forms/generate-default-fields", data);

      if (response.count > 0) getJobApplicationFormFields();
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
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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

                  {items ? (
                    <SortableList items={items} setItems={setItems}>
                      {({ items }: { items: SortableItemProps[] }) => (
                        <>
                          {items.map((item: SortableItemProps) => (
                            <SortableItem key={item.id} id={item.id}>
                              <div className="flex items-center">
                                <DotsVerticalIcon
                                  className="w-5 h-5 text-gray-400 cursor-move"
                                  aria-hidden="true"
                                />
                                <div className="flex-auto p-2 bg-gray-100 rounded">
                                  <p className="text-md">{item.label}</p>
                                </div>

                                <TrashIcon
                                  key={item.id}
                                  className="z-auto w-5 h-5 text-red-600 cursor-pointer hover:text-indigo-600"
                                  onClick={() => deleteField(item.id)}
                                />
                              </div>
                            </SortableItem>
                          ))}
                        </>
                      )}
                    </SortableList>
                  ) : (
                    <div className="py-5 my-10 text-center bg-gray-100 rounded">
                      <h4 className="flex-auto p-1">
                        You currently have a no fields added for this application form
                      </h4>
                      <span className="mb-2 sm:ml-3">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Do you want save time?
                        </h3>

                        <button
                          type="button"
                          onClick={generateDefaultFields}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Load Default Fields
                        </button>
                      </span>
                      <p className="text-red-600">
                        <strong>Note: </strong>Existing fields will be deleted.
                      </p>
                    </div>
                  )}
                  <form>
                    <h3 className="mt-5 font-medium leading-6 text-gray-900 tex5t-lg">Add Form Fields</h3>
                    <div className="flex items-center">
                      <div className="flex-auto p-2 bg-gray-100 rounded">
                        <p className="mb-1 text-sm font-semibold text-md">Field Type</p>
                        <select
                          defaultValue="short_text"
                          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="short_text">Short Text</option>
                          <option value="long_text">Long Text</option>
                          <option value="checkbox">Yes/No(Checkbox)</option>
                          <option value="select">Select One(Dropdown Select)</option>
                          <option value="multi_select">Select Multiple</option>
                        </select>
                        <p className="mb-1 text-sm font-semibold text-md">Name of Field</p>
                        <input
                          id="label"
                          name="label"
                          type="text"
                          required
                          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="e. g. First Name, LinkedIn URL"
                        />
                        <p className="mb-1 text-sm font-semibold text-md">Field Requirement</p>
                        <select
                          defaultValue="short_text"
                          name="required"
                          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="true">Mandatory</option>
                          <option value="false">Optional</option>
                        </select>
                      </div>
                    </div>
                    <div className="my-3">
                      <button
                        type="button"
                        onClick={submit}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add field
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tips</h3>
                <div className="mt-1 text-sm text-gray-600">
                  <ul className="list-disc">
                    <li>Select the appropriate field type from the dropdown list.</li>
                    <li>
                      Enter field name such as <strong>First Name</strong>, <strong>Phone Number</strong>{" "}
                      e.t.c
                    </li>
                    <li>Fields can be re-ordered by drag and drop.</li>
                    <li>Click the trash button to remove a field from the application form.</li>
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
