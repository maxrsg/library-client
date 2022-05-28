export interface ILibraryItem {
  Id?: number;
  CategoryId?: number;
  CategoryName?: string;
  Title: string;
  Author: string;
  Pages: number;
  RunTimeMinutes: number;
  IsBorrowable: boolean;
  Borrower: string;
  BorrowDate: Date;
  Type: string;
}

// Data needed when creating new item
export interface ICreateItem {
  CategoryId?: number;
  Title: string;
  Author: string;
  Pages?: number;
  RunTimeMinutes?: number;
  Type: string;
  IsBorrowable: boolean;
}
