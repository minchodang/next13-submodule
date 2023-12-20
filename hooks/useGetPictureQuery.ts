import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import QueryKeys from './Querykey';

const ParameterType = z.object({
    id: z.string(),
});

const PictureItem = z.object({
    id: z.string(),
    description: z.string(),
    alt_description: z.string(),
    width: z.number(),
    height: z.number(),
    urls: z.object({
        raw: z.string(),
        full: z.string(),
        regular: z.string(),
        small: z.string(),
        thumb: z.string(),
    }),
});

export type FetchPictureParameterType = z.infer<typeof ParameterType>;

export type PicturesIndividualType = z.infer<typeof PictureItem>;

export const fetchPicture = async ({ id }: FetchPictureParameterType) => {
    const { data } = await axios.get<PicturesIndividualType>(
        `https://api.unsplash.com/photos/${id}?client_id=${process.env.unsplash_access_key}`,
    );
    return data;
};

export const useGetPictureQuery = ({ id }: FetchPictureParameterType) =>
    useQuery({
        queryKey: [QueryKeys.picture, id],
        queryFn: () => fetchPicture({ id }),
        refetchOnWindowFocus: false,
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 120 * 60 * 1000,
    });
