"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { debounce } from "@/utils";

const BOOK_SEARCH_API = "https://openlibrary.org/search.json?q=";
const LIMIT = 5;

// TODO: make sure the uniqueness of the book
// e.g. search Mindsight

export default function Home() {
  return <div>Homepage</div>;
}
