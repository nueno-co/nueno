import { GetStaticProps } from "next";
import { Fragment } from "react";

import prisma from "@helpers/prisma";
import { jobType } from "@helpers/type-safety";

import ApplyLayout from "@components/ApplyLayout";

export default function Apply({ job }: { job: jobType }) {
  return (
    <ApplyLayout job={job}>
      <Fragment>
        <form method="POST">
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
                    className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Qualification
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md shadow-sm block-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    </ApplyLayout>
  );
}

export async function getStaticPaths() {
  const data = await prisma?.job.findMany({
    select: {
      uid: true,
    },
  });
  const paths = data?.map(({ uid }) => {
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
  console.log(uid);
  const job = await prisma?.job.findUnique({
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
    },
  });
  return {
    props: {
      job,
    },
  };
};
