export interface ButtonItem {
  name: string;
  value: string;
  dataCy: string;
}

export interface SelectedSearch {
  selectedSearchType: string;
}
export const options = ref<ButtonItem[]>([
  {
    name: 'Type-ahead search',
    value: 'typeAheadSearch',
    dataCy: 'exactSearchButton',
  },
  {
    name: 'Exact search',
    value: 'exactSearch',
    dataCy: 'exactSearchButton',
  },
  {
    name: 'Identifier substring search',
    value: 'substringSearch',
    dataCy: 'substringSearch',
  },
]);
