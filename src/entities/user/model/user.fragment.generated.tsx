import * as Types from "../../../types/types.generated";

import { gql } from "@apollo/client";
export type UserFieldsFragment = {
  __typename?: "User";
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    firstName
    lastName
    phone
    email
  }
`;
