import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";


const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/contact`,
        credentials: 'include'
    }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        createContact: (builder.mutation) ({
            query: (newContact) => ({
                url: "/",
                method: "POST",
                body: newContact,
                credentials: 'include',
            })
        }),
        getContactByEmail: (builder.query) ({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Contact']
        })
    })
})

export const {useCreateContactMutation, useGetContactByEmailQuery} = contactApi;

export default contactApi;