import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-type";
import { axiosBaseQuery } from "@/src/helpers/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 900,
  refetchOnFocus: false,
  refetchOnReconnect: true,
});
