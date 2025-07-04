import { baseApi } from "../api/baseApi";

const itineraryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createItinerary: builder.mutation({
      query: (data) => ({
        url: "/itinerary",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Itinerary"],
    }),
    getItineraryById: builder.query({
      query: (id) => ({
        url: `/itinerary/${id}`,
        method: "GET",
      }),
      providesTags: ["Itinerary"],
    }),
    updateItinerary: builder.mutation({
      query: ({ id, data }) => ({
        url: `/itinerary/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Itinerary"],
    }),
  }),
});

export const {
  useCreateItineraryMutation,
  useGetItineraryByIdQuery,
  useUpdateItineraryMutation,
} = itineraryApi;
