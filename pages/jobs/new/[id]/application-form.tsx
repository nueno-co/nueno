import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import { FieldCreateResponseParams } from "@api-contracts/application-forms/fields";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";

import { asStringOrUndefined } from "@helpers/type-safety";

import Shell from "@components/Shell";

export default function JobsNew() {
  const router = useRouter();
  const jobUid = asStringOrUndefined(router.query.id);
  const [fields, setField] = useState([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [required, setRequired] = useState(false);

  // Fix useRouter() undefined on query in first render
  useEffect(() => {
    if (router.asPath !== router.route) {
      getJobApplicationFormFields();
    }
  }, [router.isReady]);

  /**
   * @description Get the value of the selected field type.
   * @param value: string
   *
   * @return label: string
   */
  const typeValue = (value: string) => {
    setType(value);
  };

  /**
   * @description Get the value of the selected field requirement.
   * @param value: string
   *
   * @return label: string
   */
  const requiredValue = (value: string) => {
    if (value == "true") {
      setRequired(true);
    } else {
      setRequired(false);
    }
  };

  /**
   * @description Get the fields associated with a job appplication form.
   *
   * @return fields: array
   */
  async function getJobApplicationFormFields() {
    const response = await axios.get(`/api/application-forms/field-list/${jobUid}`);
    const responseData: FieldCreateResponseParams = response.data;
    setField(responseData as any);
    return responseData;
  }

  /**
   * @description Delete a job application form input field.
   *
   * @return response: number
   */
  async function deleteField(fieldId: number, fieldLabel: string) {
    if (confirm("Are you sure you want to delete this field from your form?")) {
      const response = await axios.delete(`/api/application-forms/delete-field/${fieldId}`);
      if (response.statusText == "OK") {
        getJobApplicationFormFields();
        alert(`${fieldLabel} field was deleted sucessfully!`);
      }
    } else {
      return;
    }
  }

  /**
   * @description Validate form inputs on submit.
   *
   * @return response: boolean
   */
  function validateForm() {
    const label = document.getElementById("label") as HTMLInputElement;
    const type = document.getElementById("type") as HTMLInputElement;
    const required = document.getElementById("required") as HTMLInputElement;
    let response = true as boolean;

    if (!type.value) {
      alert("Please select the field type.");
      response = false;
    }

    if (!label.value) {
      alert("Please enter a field label.");
      response = false;
    }

    if (!required.value) {
      alert("Please select the field requirement.");
      response = false;
    }

    return response;
  }

  /**
   * @description Submit a user created form input field.
   *
   * @return response: number
   */
  async function submit(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!jobUid) return;

    const data = { label, type, required };

    if (validateForm()) {
      try {
        const requestParams: ApplicationFormsCreateRequestParams = {
          jobUid,
          fields: [data as any],
        };
        const response = await axios.post("/api/application-forms/create", requestParams);

        if (response.data.jobUid == jobUid) {
          // Reset the form
          const resetForm = document.getElementById("create-field") as HTMLFormElement;
          resetForm.reset();

          // Update the form field list
          getJobApplicationFormFields();

          // Display success message
          alert("Field was added sucessfully!");
        }
        // router.push({ pathname: "/jobs/" });
      } catch (e) {
        console.log(e);
      }
    }
  }

  /**
   * @description Generate default fields for the current job appplication form in view.
   *
   * @return response: number
   */
  async function generateDefaultFields(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!jobUid) return;
    const data = { jobUid: jobUid };

    try {
      const response = await axios.post("/api/application-forms/generate-default-fields", data);

      if (response.data.count > 0) getJobApplicationFormFields();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * @description Re-order a job application  form input field.
   *
   * @return result: void
   */
  const applyDrag = (arr: any, dragResult: any) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    console.log(removedIndex, addedIndex, payload);

    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  };

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

                  {fields.length ? (
                    <Container onDrop={(e) => setField(applyDrag(fields as any, e))}>
                      {fields.map((field: FieldCreateResponseParams) => {
                        return (
                          <Draggable key={field.id} className="my-2">
                            <div className="flex items-center">
                              <DotsVerticalIcon
                                className="w-5 h-5 text-gray-400 cursor-move"
                                aria-hidden="true"
                              />
                              <div className="flex-auto p-2 bg-gray-100 rounded">
                                <p className="text-md">{field.label}</p>
                              </div>

                              <TrashIcon
                                key={field.id}
                                className="w-5 h-5 ml-1 text-red-600 cursor-pointer hover:text-indigo-600"
                                onClick={() => deleteField(field.id, field.label)}
                              />
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
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
                  <form id="create-field">
                    <h3 className="mt-5 font-medium leading-6 text-gray-900 tex5t-lg">Add Form Fields</h3>
                    <div className="flex items-center">
                      <div className="flex-auto p-2 bg-gray-100 rounded">
                        <p className="mb-1 text-sm font-semibold text-md">Field Type</p>
                        <select
                          defaultValue=""
                          id="type"
                          onChange={(e) => typeValue(e.target.value)}
                          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="" disabled>
                            Select...
                          </option>
                          <option value="SHORT_TEXT">Short Text</option>
                          <option value="LONG_TEXT">Long Text</option>
                          <option value="CHECKBOX">Yes/No(Checkbox)</option>
                          <option value="SELECT">Select One(Dropdown Select)</option>
                          <option value="MULTI_SELECT">Select Multiple</option>
                        </select>
                        <p className="mb-1 text-sm font-semibold text-md">Name of Field</p>
                        <input
                          id="label"
                          name="label"
                          type="text"
                          onChange={(e) => setLabel(e.target.value)}
                          required
                          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="e. g. First Name, LinkedIn URL"
                        />
                        <p className="mb-1 text-sm font-semibold text-md">Field Requirement</p>
                        <select
                          defaultValue=""
                          id="required"
                          onChange={(e) => requiredValue(e.target.value)}
                          name="required"
                          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="" disabled>
                            Select...
                          </option>
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
