// mailsApi.ts
import { Mail } from "@/components/rpr-mail/data";
import { baseApi } from "./baseApi";

// Define the API service
export const mailsApi = baseApi.injectEndpoints({
  // optional, useful for cache invalidation
  endpoints: (builder) => ({
    getMails: builder.query<Mail[], void>({
      // <ResponseType, RequestArg>
      query: () => "/mails", // fetch endpoint
      providesTags: (result) =>
        result
          ? [
              ...result?.map(({ id }) => ({
                type: "Mail" as const,
                id,
              })),
              { type: "Mail" as const, id: "LIST" },
            ]
          : [{ type: "Mail" as const, id: "LIST" }], // optional, helps with cache management
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const { useGetMailsQuery } = mailsApi;
