import axios from 'axios';
import { z } from 'zod';

const zodData = z.object({
    id: z.number(),
    item: z.string(),
    test: z.object({
        item1: z.string(),
    }),
});

export type ZodType = z.infer<typeof zodData>;

export const getZodData = async () => {
    const { data } = await axios.get<ZodType>('/api/zod-test');
    try {
        return zodData.parse(data);
    } catch (error) {
        return alert(error);
    }
};
