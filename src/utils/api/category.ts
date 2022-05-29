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

export const deleteCategory = async (id: number): Promise<any | undefined> => {
  try {
    const response: AxiosResponse<any> = await axios.delete(url + "/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const editCategory = async (
  id: number | undefined,
  categoryName: string
): Promise<any | undefined> => {
  try {
    const editedCategory = {
      Id: id,
      CategoryName: categoryName,
    };
    const response: AxiosResponse<any> = await axios.put(url, editedCategory);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
