import axios from 'axios';
import type { DiaryEntery, NewDiaryEntery } from './types';

const baseUrl = '/api/diaries'

const getAllDiaries = async () => {
        const res = await axios.get<DiaryEntery[]>(baseUrl);
        return res.data;
}

const addNewDiary = async (entery: NewDiaryEntery) => {
        try {
                const res = await axios.post<DiaryEntery>(baseUrl, entery);
                return res.data;
        } catch (error) {
                if (axios.isAxiosError(error)) {
                        const data = error.response?.data;
                        const newError = new Error(data);
                        newError.name = "axiosError";
                        throw newError;
                }
        }
}

export default {
        getAllDiaries,
        addNewDiary
}
