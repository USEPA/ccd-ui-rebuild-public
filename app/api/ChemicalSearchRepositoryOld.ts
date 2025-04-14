import ChemicalTranslator from '~/api/translators/ChemicalTranslator';

class AxiosChemicalSearchRepository {
  constructor(axios, settings, chemicalTranslator) {
    this.axios = axios;
    this.chemicalTranslator = chemicalTranslator;
    this.settings = settings;
  }

  async startsWithP(searchTerm, chemicalList) {
    try {
      const chemList = await this.axios.$get(`${process.env.APPLICATION_PUBLIC_API}${this.settings.PUBLIC_CHEMICAL_SEARCH_API}${encodeURIComponent(searchTerm)}`, {
        params: {
          list: chemicalList,
        },
        timeout: 18000,
      });
      const searchList = chemList.map(chem => ({
        dtxsid: chem.dtxsid,
        dtxcid: chem.dtxcid,
        searchMatch: chem.searchName,
        rank: chem.rank,
        hasStructureImage: chem.hasStructureImage,
        searchWord: chem.searchValue,
      }
      ));
      return searchList;
    }
    catch (error) {
      return JSON.stringify(error.response);
    }
  }

  async startsWith(searchTerm, chemicalList) {
    try {
      const chemList = await this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_API}${encodeURIComponent(searchTerm)}`, {
        params: {
          list: chemicalList,
        },
        timeout: 20000,
      });
      return chemList;
    }
    catch (err) {
      console.error('error:', err);
      return null;
    }
  }

  async equalsDetails(params) {
    try {
      const results = await this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_EQUALS_DETAILS_API}${params}`);
      return results;
    }
    catch (e) {
      console.error('error: ', e);
      return e.toString();
    }
  }

  matchesExactly(params) {
    return this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_EXACT_API}${params}`)
      .then(data => data)
      .catch((error) => {
        if (error.response.status === 400) { return []; }
        throw (error);
      });
  }

  async containsDetails(params) {
    let results = [{message: 'Too many results'}];
    try {
      results = await this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_CONTAIN_DETAILS_API}${encodeURIComponent(params)}`, {
        timeout: 20000,
      });
      return results;
    }
    catch (err) {
      return results;
    }
  }

  startsWithDetails(params) {
    return this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_STARTS_WITH_DETAILS_API}${params}`);
  }

  containsDtxsid(searchTerm, chemicalList) {
    return this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_CONTAIN_DTXSID_API}${searchTerm}`, {
      params: {
        list: chemicalList,
      },
    });
  }

  async msReadySearchByDtxcid(id) {
    const results = await this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.MSREADY_SEARCH_API}`, {
      params: {
        id,
      },
    });
    return results.data;
  }

  async massSearch(params, context) {
    try {
      const results = await this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_MASS_API}${params}`, {
        timeout: 20000,
      });
      const translatedData = this.chemicalTranslator.translate(results.content, (results.pageable.pageNumber * 1000) + 1);
      const responseChunk = {
        content: translatedData,
        paging: results.pageable,
        totalPages: results.totalPages,
      };
      return responseChunk;
    }
    catch (err) {
      const responseChunk = {
        content: [],
        paging: {},
        totalPages: 0,
        error: `${this.settings.BASE_ERROR_MESSAGE} ${err.message}`,
      };
      return responseChunk;
    }
  }

  async msReadySearch(params) {
    try {
      const results = await this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_MSREADY_API}${params.formula}`);
      // return results
      const translatedData = this.chemicalTranslator.translate(results, params.currentCount);

      const responseChunk = {
        currentCount: params.currentCount + results.length,
        content: translatedData,
      };
      return responseChunk;
    }
    catch (err) {
      const responseChunk = {
        currentCount: 0,
        content: [],
        error: `${this.settings.BASE_ERROR_MESSAGE} ${err.message}`,
      };
      return responseChunk;
    }
  }

  async exactFormulaSearch(params) {
    const url = `${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_EXACT_FORMULA_API}${params}`;
    const results = await this.axios.$get(url);
    return results;
  }

  count(params) {
    const results = this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_COUNT_API}${params}`);
    return results;
  }

  formulaCount(params) {
    const results = this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_FORMULA_COUNT_API}${params}`);
    return results;
  }

  formulaRange(params) {
    const results = this.axios.$get(`${process.env.APPLICATION_BASE_API}${this.settings.CHEMICAL_SEARCH_FORMULA_RANGE}${params}`);
    return results;
  }
}

export default class ChemicalSearchRepository {
  constructor(axios, settings) {
    this.axios = axios;
    this.settings = settings;
  }

  build() {
    return process.env.NODE_ENV === 'local' ?
      new FakeChemicalSearchRepository() :
      new AxiosChemicalSearchRepository(this.axios, this.settings, new ChemicalTranslator());
  }
}
