import { Field } from "@prisma/client";
import { ReactNode } from "react";

export function asStringOrUndefined(str: unknown) {
  return typeof str === "string" ? str : undefined;
}
export type jobType = {
  title: string;
  description: string;
  id: number;
  Company: {
    id: number;
    name: string;
  };
  Field: Field[];
};

export type applyType = {
  job: jobType;
  children: ReactNode;
};
