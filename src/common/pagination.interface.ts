export interface IPaginationResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface IPaginationRequest {
  page?: number;
  limit?: number;
  order?: string;
  sortBy?: string;
}
