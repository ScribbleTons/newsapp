// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HackerNews } from './../types'

// Define a service using a base URL and expected endpoints
export const hackerNewsApi = createApi({
  reducerPath: 'hackerNews',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/' }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getTopStories: builder.query<HackerNews.latestStories>({
      query: () => {
	  return "topstories.json"
	  },
	  transformResponse: (response: number[]) => {
		let data = response;
		data = data.slice(0,60)
		return data;
		},
    }),
	getStoryById: builder.query<HackerNews.story, "id">({
		query: (id) => `item/${id}.json`
	}),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTopStoriesQuery, useGetStoryByIdQuery, usePrefetch } = hackerNewsApi

