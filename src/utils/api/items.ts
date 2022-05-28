import axios, { AxiosResponse } from "axios";
import { ICreateItem, ILibraryItem } from "../interfaces/items";

const url = "http://localhost:5000/items";

interface IRecievedItemData {
  items: ILibraryItem[];
}

interface ICreatedResponse {
  itemId: number;
}

export const getAllItems = async (): Promise<ILibraryItem[] | undefined> => {
  try {
    const response: AxiosResponse<IRecievedItemData> = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const createItem = async (
  item: ICreateItem
): Promise<ICreatedResponse | undefined> => {
  try {
    const ItemToCreate = {
      CategoryId: 1,
      Title: item.Title,
      Author: item.Author,
      Pages: item.Pages || null,
      RunTimeMinutes: item.RunTimeMinutes || null,
      Type: item.Type,
      IsBorrowable: item.IsBorrowable,
      Borrower: null,
      BorrowDate: null,
    };
    const response: AxiosResponse<ICreatedResponse> = await axios.post(
      url,
      ItemToCreate
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const editItem = async (item: ICreateItem): Promise<any | undefined> => {
  try {
    const editedItem = {
      CategoryId: item.CategoryId,
      Title: item.Title,
      Author: item.Author,
      Pages: item.Pages || null,
      RunTimeMinutes: item.RunTimeMinutes || null,
      Type: item.Type,
      IsBorrowable: item.IsBorrowable,
      Borrower: null,
      BorrowDate: null,
    };
    const response: AxiosResponse<any> = await axios.put(url, editedItem);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const deleteItem = async (id: number): Promise<any | undefined> => {
  try {
    const response: AxiosResponse<any> = await axios.delete(url + id);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
