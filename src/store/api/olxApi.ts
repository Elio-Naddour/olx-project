import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { CategoryFeild } from "@/types/categoryFeildsTypes";

export const olxApi = createApi({
  reducerPath: "olxApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: ["Categories", "CategoryFields"],
  endpoints: (build) => ({
    getCategories: build.query<any, void>({
      query: () => ({ url: "https://www.olx.com.lb/api/categories" }),
      providesTags: ["Categories"],
    }),
    getCategoryFields: build.query<any, { slug: string }>({
      query: ({ slug }) => ({
        url: `https://www.olx.com.lb/api/categoryFields?categorySlugs=${encodeURIComponent(
          slug
        )}&includeChildCategories=true&splitByCategoryIDs=true&flatChoices=true&groupChoicesBySection=true&flat=true`,
      }),
      transformResponse: (response: any): CategoryFeild => {
        const firstKey = Object.keys(response)[0];
        return response[firstKey];
      },
      providesTags: (result, error, arg) => [
        { type: "CategoryFields", id: arg.slug },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryFieldsQuery,
  util: olxApiUtil,
} = olxApi;
