import { Candidate, FieldChoice, FieldValue } from "@prisma/client";

export type candidateType = {
  Job: {
    title: string;
    description: string;
    createdAt: Date;
  } | null;
  name: string;
  email: string;
  address: string;
  FieldValue: {
    text: string;
  }[];
}[];
