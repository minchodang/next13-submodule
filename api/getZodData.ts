import axios from 'axios';
import { z } from 'zod';

const zodData = z.object({
    id: z.number(),
    item: z.string(),
    test: z.object({
        item1: z.string(),
    }),
});

export type zodType = z.infer<typeof zodData>;

export const getZodData = async () => {
    const { data } = await axios.get<zodType>('/api/zod-test');
    try {
        return zodData.parse(data);
    } catch (error) {
        alert(error);
    }
};
