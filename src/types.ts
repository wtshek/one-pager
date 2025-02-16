export interface BookInformation {
  author_key?: string[];
  author_name?: string[];
  cover_edition_key?: string;
  cover_i?: number;
  edition_count?: number;
  first_publish_year?: number;
  has_fulltext?: boolean;
  ia?: string[];
  ia_collection_s?: string;
  key?: string;
  language?: string[];
  public_scan_b?: boolean;
  title?: string;
}

export interface BlogPost {
  title: string;
  book_id: string;
}
