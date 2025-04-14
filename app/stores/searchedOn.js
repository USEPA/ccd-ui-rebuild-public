export const useSearchedOnStore = defineStore('searchedOnStore', {
  state: () => ({
    chemicalSearchedOnStr: '',
  }),
  getters: {
    getChemicalSearchedOn: state => state.chemicalSearchedOnStr,
  },
  actions: {
    loadSearchedOn(searchStr) {
      this.chemicalSearchedOnStr = searchStr;
    },
  },
});
