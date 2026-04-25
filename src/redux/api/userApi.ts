import type { IResponse, SignupApiPayload } from "@/src/types";

import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-type";

export type TAdmin = {
	id: string;
	name: string;
	email: string;
	phone: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
};

export type TAdminQueryParams = {
	page?: number;
	limit?: number;
	searchTerm?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
};

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createAdmin: builder.mutation<IResponse<TAdmin>, SignupApiPayload>({
			query: (data) => ({
				url: "/user/admin",
				method: "POST",
				data,
			}),
			invalidatesTags: [tagTypes.meta],
		}),

		getAdmins: builder.query<IResponse<TAdmin[]>, TAdminQueryParams | void>({
			query: (params) => ({
				url: "/admin",
				method: "GET",
				params,
			}),
			providesTags: [tagTypes.meta],
		}),
	}),
});

export const { useCreateAdminMutation, useGetAdminsQuery } = userApi;

export default userApi;
