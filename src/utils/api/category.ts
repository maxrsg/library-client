import axios, { AxiosResponse } from "axios";
import { ICategory } from "../interfaces/category";

const url = "http://localhost:5000/category";

interface ICreatedResponse {
  categoryId: number;
}

export const getAllCategories = async (): Promise<ICategory[] | undefined> => {
  try {
    const response: AxiosResponse<ICategory[]> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const createCategory = async (
  categoryName: string
): Promise<ICreatedResponse | undefined> => {
  try {
    const response: AxiosResponse<ICreatedResponse> = await axios.post(url, {
      CategoryName: categoryName,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
