import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QueryKeys from './Querykey';

export type FetchPictureType = {
    page: number;
    limit: number;
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

export const fetchPictures = async ({ page, limit }: FetchPictureType) => {
    const { data } = await axios.get<PicturesIndividualType[]>(
        `/photo/photos/?client_id=${process.env.unsplash_access_key}&page=${page}&per_page=${limit}`,
    );
    return data;
};

export const useGetPicturesQuery = ({ page, limit }: FetchPictureType) =>
    useQuery([QueryKeys.pictures], () => fetchPictures({ page, limit }), {
        refetchOnWindowFocus: false,
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000,
        cacheTime: 120 * 60 * 1000,
    });
