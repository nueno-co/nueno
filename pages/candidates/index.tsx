/* eslint-disable react/no-unescaped-entities */
import { candidateType } from "@api-contracts/jobs/candidate";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Fragment } from "react";

import prisma from "@helpers/prisma";

import Shell from "@components/Shell";

export default function CandidateHandler(props: any) {
  const candidates: candidateType = props.candidates;
  const candidateList = candidates.map((candidate, idx: number) => {
    const date = new Date(candidate.Job?.createdAt.toString() as string);
    const fieldValues = candidate.FieldValue[0]["text"];

    return (
      <Fragment key={idx}>
        <div className="py-1 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-2 sm:px-0">
            <div className="overflow-auto border-4 border-gray-200 border-dashed rounded-lg h-97">
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="px-4 py-5 border-b-2 bg-gray-50 border-b-grey-500 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                      <dd className="text-sm font-medium sm:col-span-1 ">
                        <label>{`${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</label>
                      </dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <label className="font-bold">{candidate.name}</label>
                        <br />
                        {`${fieldValues} | ${candidate.address} | ${candidate.email}`}
                      </dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <label className="font-bold">{candidate.Job?.title}</label>
                        <br />
                        {candidate.Job?.description}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  });
  return (
    <Shell>
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
        </div>
      </header>
      <main>{candidateList}</main>
    </Shell>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const company = await prisma.company.findFirst({
    select: {
      id: true,
      User: {
        where: {
          id: session.user.id,
        },
      },
      Job: {
        select: {
          id: true,
        },
      },
    },
  });
  const jobIds = company?.Job.map((job) => job.id);
  let candidates = await prisma.candidate.findMany({
    where: {
      jobId: {
        in: jobIds,
      },
    },

    select: {
      name: true,
      email: true,
      address: true,
      Job: {
        select: {
          title: true,
          description: true,
          createdAt: true,
        },
      },
      FieldValue: {
        select: {
          text: true,
        },
      },
    },
  });
  candidates = JSON.parse(JSON.stringify(candidates));
  return {
    props: { candidates },
  };
};
