export type Dtxsid = `DTXSID${string}`;

export type Dtxcid = `DTXCID${string}`;

export interface Tab {
  label: string;
  labelDisplay: string;
  category: string;
  subCategory: null | string;
  url: null | string;
  disable: boolean;
  disabled?: boolean;
  external?: boolean;
  listName: string;
  dtxsid: Dtxsid | Dtxcid;
  items?: Tab[];
}
