import axios from "axios";
import { GetStaticProps } from "next";
import { ChangeEvent, Fragment, useState } from "react";

import prisma from "@helpers/prisma";
import { jobType } from "@helpers/type-safety";

import ApplyLayout from "@components/ApplyLayout";
import Banner from "@components/Banner";

export default function Apply({ job }: { job: jobType }) {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    address: "",
    fields: [] as { text: string; fieldId: number }[],
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [bannerMsg, setBannerMsg] = useState("");
  const onFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;

    setFormInput((state) => {
      const fieldId = parseInt(target.getAttribute("data-fieldid") as string);
      const idx = parseInt(target.getAttribute("data-idx") as string);
      const stateFields = [...state.fields];
      stateFields[idx] = { text: target.value, fieldId: fieldId };
      return { ...state, fields: stateFields };
    });
  };
  const fields = job.Field.map((field, idx) => {
    let input;
    switch (field.type) {
      case "SHORT_TEXT":
        input = (
          <input
            type="text"
            name={field.label.toLowerCase()}
            data-idx={idx}
            data-fieldid={field.id}
            onChange={onFieldChange}
            required={field.required}
            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm block-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        );
        break;
      case "LONG_TEXT":
        input = (
          <textarea
            name={field.label.toLowerCase()}
            data-idx={idx}
            data-fieldId={field.id}
            required={field.required}
            onChange={onFieldChange}
            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm block-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        );
        break;
      /**
       * other field type will be here
       */
    }
    return (
      <div key={idx} className="col-span-6 sm:col-span-3">
        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>
        {input}
      </div>
    );
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setBtnDisabled(true);
    const res = await axios.post("/api/jobs/apply", { ...formInput, jobid: job.id });
    const data = res.data;
    setBannerMsg(data.message);
    setIsApplied(true);

    setBtnDisabled(false);
  };
  let form = (
    <Fragment>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  onChange={(e) =>
                    setFormInput((state) => {
                      return { ...state, name: e.target.value };
                    })
                  }
                  className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) =>
                    setFormInput((state) => {
                      return { ...state, email: e.target.value };
                    })
                  }
                  className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm block-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6 mt-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  onChange={(e) =>
                    setFormInput((state) => {
                      return { ...state, address: e.target.value };
                    })
                  }
                  className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {fields}
            </div>
          </div>

          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              disabled={btnDisabled}
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Apply
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
  if (isApplied) {
    form = <Banner message={bannerMsg} />;
  }
  return <ApplyLayout job={job}>{form}</ApplyLayout>;
}

export async function getStaticPaths() {
  const data = await prisma.job.findMany({
    select: {
      uid: true,
    },
  });
  const paths = data.map(({ uid }) => {
    return {
      params: { uid },
    };
  });
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const uid = context.params?.uid;
  const job = await prisma.job.findUnique({
    where: {
      uid: uid as string,
    },
    select: {
      title: true,
      description: true,
      id: true,
      Company: {
        select: {
          id: true,
          name: true,
        },
      },
      Field: {
        select: {
          id: true,
          label: true,
          type: true,
          required: true,
        },
      },
    },
  });

  return {
    props: {
      job,
    },
  };
};
