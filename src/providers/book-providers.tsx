"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type BookStore, createBookStore } from "@/stores/book-store";

export type BookStoreAPI = ReturnType<typeof createBookStore>;

export interface BookStoreProviderProps {
  children: ReactNode;
}

export const BookStoreContext = createContext<BookStoreAPI | undefined>(
  undefined
);

export const BookStoreProvider = ({ children }: BookStoreProviderProps) => {
  const storeRef = useRef<BookStoreAPI>(undefined);

  if (!storeRef.current) {
    storeRef.current = createBookStore(undefined);
  }

  return (
    <BookStoreContext.Provider value={storeRef.current}>
      {children}
    </BookStoreContext.Provider>
  );
};

export const useBookStore = <T,>(selector: (store: BookStore) => T) => {
  const bookStoreContext = useContext(BookStoreContext);

  if (!bookStoreContext)
    throw new Error("useBookStore must be used within BookStoreProvider");

  return useStore(bookStoreContext, selector);
};
