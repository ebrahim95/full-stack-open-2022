import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const addDiaryEntry = async (diary_entry: NewDiaryEntry) => {
  const response = await axios.post<NewDiaryEntry>(baseUrl, diary_entry);
  return response.data;
};
