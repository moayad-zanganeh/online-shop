export interface authType {
  password: string;
  username: string;
}
export interface SetSearchParamsType {
  setSearchParams: (params: URLSearchParams | Record<string, string>) => void;
}
