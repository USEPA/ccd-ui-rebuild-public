<template>
  <client-only>
    <div class="input-group nav-search-input-group" style="minWidth: 300px;">
      <v-select
        :ref="'searchField'"
        :filterable="false"
        :append-to-body="true"
        :clear-search-on-blur="({ clearSearchOnSelect, multiple }) => {
          _options = []
          return true
        }"
        :options="options"
        label="searchWord"
        :select-on-key-codes="[13, 9]"
        :map-keydown="handlers"
        data-cy="header-nav-search-input"
        class="form-control nav-search-input px-0 py-0"
        :placeholder="placeholder"
        :tabindex="searchIndex"
        @search="onSearch"
        @input="selectOption"
      >
        <template #no-options>
          <span> {{ noResultsMessage }} {{ searchMessage }}</span>
        </template>
        <template #option="option">
          <div class="font-weight-normal">
            <span class="h6">{{ option.searchWord }}</span>
            <br> <span v-if="option.dtxsid" class="font-italic font-weight-lighter h6">{{ option.dtxsid }}</span>
            <span v-else class="font-italic font-weight-lighter h6">{{ option.dtxcid }}</span>
          </div>
        </template>
        <template #selected-option="option">
          <div class="font-weight-normal">
            <span class="h6">{{ option.searchWord }}</span>
            <span class="font-italic font-weight-lighter h6">{{ option.dtxsid }}</span>
          </div>
        </template>
      </v-select>
      <div class="input-group-append">
        <span class="input-group-text blue nav-search-icon">
          <i class="bi bi-search" />
        </span>
      </div>
      <div v-if="caffeine" class="container-fluid text-left">
        <div
          class="alert primary-color text-white"
          style="position:absolute;
        padding: 10px 10px 10px;
        top:40px;"
        >
          {{ caffeine }} <span
            v-for="word in caffeineArray"
            :key="word"
            :append-to-body="true"
            size="sm"
            trigger="hover"
            :options="{ placement: 'bottom' }"
          >
            <span>
              <a aria-label="search using auto suggested value" class="suggestions text-white text-decoration-underline font-weight-bolder ml-2" @click="updateSearch(word)"><u> {{ word }} </u></a>
            </span>
          </span>
        </div>
      </div>
      <!-- end caffeine-fix display -->
    </div>
  </client-only>
</template>

<script>
import {mapStores} from 'pinia';
import {debounce} from 'perfect-debounce';
import {useSettingsStore, useSearchedOnStore} from '#imports';

export default {
  name: 'HomepageSearchBox',
  props: {
    cname: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Search for chemical by systematic name, synonym, CAS number, DTXSID or InChIKey',
    },
    searchIndex: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      errorMessage: '',
      noError: false,
      searchMessage: 'Start typing to search.',
      noResultsMessage: null,
      caffeine: false,
      caffeineArray: [],
      typeAheadResult: false,
      isEqualsSearch: false,
      isSingleResult: false,
      options: [],
      tabIndex: -1,
    };
  },
  computed: {
    ...mapStores(useSettingsStore, useSearchedOnStore),
  },
  methods: {
    updateSearch(word) {
      this.$refs.searchField.$refs.search.focus();
      this.$nextTick(() => {
        this.$refs.searchField.$refs.search.value = word;
        this.$refs.searchField.search = word;
      });
    },
    onSearchBlur(e) {
      this.options = [];
      this.noResultsMessage = null;
    },
    ...mapActions({
      loadSearchedOn: 'searchedOn/loadSearchedOn',
    }),
    selectOption(chemical) {
      this.setSearchOnAndRoute(chemical, this);
    },
    onSearch(search, loading) {
      if (search.length > 2) {
        this.isEqualsSearch = false;
        this.isSingleResult = false;
        this.typeAheadResult = false;
        this.options = [];
        this.caffeine = false;
        this.caffeineArray = [];
        loading(true);
        this.search(loading, search, this);
      }
    },
    setSearchOnAndRoute(chemical, vm) {
      if (!chemical) { return; }
      const dtxid = chemical.dtxsid ? chemical.dtxsid : chemical.dtxcid;
      this.loadSearchedOn(chemical.searchMatch);
      vm.$router.push(`/chemical/details/${dtxid}`);
    },
    search: debounce((loading, search, vm) => {
      if (search.length < '2') {
        vm.isEqualsSearch = false;
        vm.isSingleResult = false;
        vm.typeAheadResult = false;
        vm.caffeine = false;
        vm.caffeineArray = [];
        loading(false);
        vm.options = [];
      } else if ((search.length > 2) && ((search.trim().toUpperCase().includes('DTXSID') && search.trim().length <= 8) || (search.trim().toUpperCase().includes('DTXCID') && search.trim().length <= 8))) {
        vm.options = [];
        loading(false);
      } else {
        vm.$repositories.chemicalSearch.equalsDetails(search)
          .then((exactResults) => {
            if (exactResults.length === 1) {
              vm.options = [];
              vm.isSingleResult = exactResults[0];
              vm.isEqualsSearch = true;
              vm.options = exactResults;
              loading(false);
            }
            if (exactResults.length > 1) {
              vm.isEqualsSearch = true;
              vm.isSingleResult = false;
              vm.options = exactResults;
              loading(false);
            }
            if (exactResults.length === 0) {
              vm.isSingleResult = false;
              vm.isEqualsSearch = false;
              loading(false);
              vm.$repositories.chemicalSearch
                .startsWithP(search, vm.searchWithinChemicalList)
                .then((results) => {
                  if (!Array.isArray(results)) {
                    results = JSON.parse(results);
                    vm.caffeineArray = results.data.suggestions;
                    vm.caffeine = `${results.data.detail} You might want to try ${
                      vm.caffeineArray.length > 1 ? 'one of the following:' : ''
                    } `;
                    loading(false);
                    vm.$refs.searchField.$refs.search.blur();
                    return;
                  }
                  if (Array.isArray(results)) {
                    vm.caffiene = false;
                    vm.caffieneArray = [];
                  }
                  let orderedResult = [];
                  const exactMatch = results.find((item) => {
                    if (item.searchWord.toLowerCase() === search.toLowerCase()) {
                      return item;
                    }
                    return false;
                  });
                  if (exactMatch) {
                    orderedResult.push(exactMatch);
                    results.forEach((item) => {
                      if (item.dtxsid !== exactMatch.dtxsid) {
                        orderedResult.push(item);
                      }
                    });
                  } else {
                    orderedResult = results;
                  }
                  if (results.length === 0) {
                    vm.noResultsMessage = 'No results, please try again.';
                  }
                  // console.log('vm: ', vm.$sentry)
                  // vm.$sentry.captureMessage('chemicalsearch did not fail')
                  vm.options = orderedResult;
                  vm.typeAheadResult = true;
                  loading(false);
                });
            }
          });
      }
    }, 500),
    handlers: (map, vm) => ({
      ...map,
      13: (e) => {
        if (!vm.$parent.typeAheadResult) {
          e.preventDefault();
        }

        if (vm.$parent.overrideEnter) {
          vm.$parent.$emit('enter', {
            isSubstringSearch: vm.$parent.substringSearch,
            searchTerm: encodeURI(vm.search),
          });
          return;
        }
        if (vm.search.length === 2 && !vm.$parent.substringSearch) {
          vm.$repositories.chemicalSearch.matchesExactly(vm.search)
            .then((results) => {
              if (results.length === 1) {
                const chemical = results[0];
                vm.$parent.loadSearchedOn(chemical.searchMatch);
                vm.$router.push({path: `chemical/details/${chemical.dtxsid}`});
              } else {
                vm.$parent.options = results;
              }

              if (results.length === 0) {
                vm.$parent.noResultsMessage = 'No results, please try again.';
              }
            });
        } else if (vm.search.length >= 2 && vm.$parent.substringSearch) {
          vm.$router.push({path: `search-results?input_type=synonym_substring&inputs=${vm.search}`});
        } else if (vm.search.length >= 3 && vm.$parent.isEqualsSearch) {
          if (vm.$parent.isSingleResult) {
            vm.$parent.loadSearchedOn(vm.$parent.isSingleResult.searchMatch);
            vm.$router.push({path: `/chemical/details/${vm.$parent.isSingleResult.dtxsid}`});
          }
          if (!vm.$parent.isSingleResult) {
            vm.$router.push({path: `/dsstoxdb/multiple_results?input_type=equalsDetails&inputs=${vm.search}`});
          }
        } else if (vm.search.length >= 3 && vm.$parent.typeAheadResult) {
          vm.$parent.typeAheadResult = false;
          vm.typeAheadSelect();
        }
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.blue-grey-text {
    opacity: 50;
}

.nav-search-input-group {
  margin-top: 0em;
  padding-right: .5em;
}

.nav-search-icon {
  height: 2em;
}

.nav-search-input {
  height: 2em;
}
</style>
