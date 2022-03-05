import { FieldType } from "@prisma/client";

export type ApplicationFormsCreateRequestParams = {
  jobUid: string;
  fields: FieldAttributes[];
};

export type ApplicationFormsCreateResponseParams = {
  jobUid: string;
};

type FieldAttributes = {
  label: string;
  required: boolean;
  type: FieldType;
  fieldChoices?: FieldChoiceAttributes[];
};

type FieldChoiceAttributes = {
  name: string;
  default?: boolean;
};
