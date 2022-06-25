import { Field } from "@prisma/client";
import { FieldType } from "@prisma/client";

export type FieldCreateRequestParams = {
  label: string;
  type: FieldType;
  required: boolean;
  jobId: number;
  companyId: number | null;
};

export type FieldCreateResponseParams = Field;
