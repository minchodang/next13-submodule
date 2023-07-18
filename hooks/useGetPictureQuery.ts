import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QueryKeys from './Querykey';

export type FetchPictureType = {
    id: string;
};

export type PicturesIndividualType = {
    id: string;
    description: string;
    alt_description: string;
    width: number;
    height: number;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
};

export const fetchPicture = async ({ id }: FetchPictureType) => {
    const { data } = await axios.get<PicturesIndividualType>(
        `/api/photos/${id}?client_id=${process.env.unsplash_access_key}`,
    );
    return data;
};

export const useGetPictureQuery = ({ id }: FetchPictureType) =>
    useQuery([QueryKeys.picture, id], () => fetchPicture({ id }), {
        refetchOnWindowFocus: false,
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000,
        cacheTime: 120 * 60 * 1000,
    });
