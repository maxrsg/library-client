import { createContext } from "react";

interface IUpdateItemsContext {
  updateItems: () => void;
}

const UpdateItemsContext = createContext<IUpdateItemsContext>({
  updateItems: () => {},
});

export { UpdateItemsContext };
