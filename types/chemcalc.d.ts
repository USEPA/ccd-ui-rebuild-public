declare module 'chemcalc' {
  export function analyseMF(formula: string, options?: { isotopomers?: 'xy'; fwhm?: number }): { xy: string };
}
