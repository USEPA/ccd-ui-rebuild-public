import HelpTextRepository from '~/api/HelpTextRepository';
import ListsRepository from '~/api/ListsRepository';
import HomePageRepository from '~/api/HomePageRepository';
import ChemSearchRepository from '~/api/ChemicalSearchRepository';
import AssayRepository from '~/api/AssayRepository';

export default defineNuxtPlugin({
  name: 'repositories',
  dependsOn: ['fetch'],
  setup() {
    const repositories = {
      lists: new ListsRepository(),
      homePage: new HomePageRepository(),
      helpTexts: new HelpTextRepository(),
      ChemSearch: new ChemSearchRepository(),
      assay: new AssayRepository(),
    };

    return {
      provide: {
        repositories,
      },
    };
  },
});
