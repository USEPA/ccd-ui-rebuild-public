import Repository from '~/api/Repository';

const settingsStore = useSettingsStore();
const settings = settingsStore.getSettings;

export default class HelpTextRepository {
  readonly #repo: Repository;

  constructor() {
    const {APPLICATION_CCD_API: baseURL} = useRuntimeConfig().public;

    this.#repo = new Repository({baseURL});
  }

  /**
   * Help Texts response that contains all help texts
   * @returns HelpText[]
   */
  async getHelpTexts() {
    type HelpTextsApiResponse = {
      _embedded: {
        helptext: HelpTextApiResponse[];
      };
    };
    const helpTexts = await this.#repo.fetch<HelpTextsApiResponse>(`${settings.HELPTEXT_API}`);
    const helpTextArr: HelpTextApiResponse[] = helpTexts._embedded.helptext;
    return helpTextArr;
  }
}
