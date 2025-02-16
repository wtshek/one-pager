import { createStore } from "zustand/vanilla";
import { BookInformation } from "@/types";

export type BookState = { book: BookInformation | undefined };

export type BookActions = {
  setCurrBook: (info: BookInformation) => void;
};

export type BookStore = BookActions & BookState;

export const defaultInitState: { book: BookInformation | undefined } = {
  book: undefined,
};

export const createBookStore = (
  initState: BookState | undefined = defaultInitState
) => {
  return createStore<BookStore>()((set) => ({
    book: initState,
    setCurrBook: (info: BookInformation) => set(() => ({ book: info })),
  }));
};
