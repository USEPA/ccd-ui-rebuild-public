export interface HelpText {
  helpPosition: string | null;
  helpText: string;
  iconType: string | null;
  helpTextId: string;
}

export interface HelpTextApiResponse extends HelpText {
  _links: {
    self: {
      href: string;
    };
    helpText: {
      href: string;
    };
  };
}

export interface UseHelpTextsState {
  helpTexts: HelpText[];
  loadingHelpTexts: boolean;
}
