// Currently used in POD conversion modal
export const decimalScientificNotation = (value: number) => {
  if (!value) {
    return value;
  }
  // If integer return
  if (value % 1 === 0) {
    return value;
  }

  const numOfDecimalsAfter = value?.toString()?.split('.')?.[1]?.length ?? 0;
  const numOfDecimalsBefore = value?.toString()?.split('.')?.[0]?.length ?? 0;
  if (numOfDecimalsAfter > 8 || numOfDecimalsBefore > 8) {
    return value.toExponential(4);
  }
  return value;
};

// Currently used in Physchem grid for displaying ranges. ex: 6.78e-8 to 2.59e-6
export const roundedValueFormatter = (value: number | null | string) => {
  if (value === null) {
    return '-';
  }

  if (Number.isNaN(value)) {
    return value;
  }

  let converted = value as string | number;
  if (typeof converted === 'number') {
    if ((converted >= 0.1 && converted < 1000) || (converted <= -0.1 && converted > -1000) || converted === 0) {
      converted = converted.toPrecision(3);
    }
    else {
      converted = converted.toExponential(2);
    }
  }
  return converted;
};

export const genUID = (prefix: string | null | undefined) => {
  const pre = prefix || '';
  const mili = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  const uid = `${pre}${mili}${random}`;
  return uid;
};

// Generates a random number with digits(default 5). e.g.: generateRandomNumberWithDigits(3) = n >= 100 && n <= 999
export const generateRandomNumberWithDigits = (digits: number = 5) => {
  const min = 10 ** (digits - 1);
  const max = (10 ** digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const genHazardId = () => {
  let value = generateRandomNumberWithDigits();
  while (value >= 0) {
    value = -1 * value;
  }
  return value;
};

export const isBoolean = (val: unknown) => typeof val === 'boolean';

export const dateFormatIso = (dateStr: string) => new Date(dateStr).toISOString().substring(0, 10);

export const formatDate = (value: string) => {
  if (!value) {
    return value;
  }
  // If integer return
  if (value) {
    const formatted = useDateFormat(value, 'MMMM Do YYYY, h:mm a');
    return formatted.value;
  }
  return '-';
};

export const removeDuplicates = <T> (arr: T[]) => Array.from(new Set([...arr]));

// Workaround for v-number-input being a lab component. TODO: remove when fixed in Vuetify
export const addAriaLabelToNumberInputs = () => {
  const decerementBtnElements = document.getElementsByName('decrement-btn');
  const incrementBtnElements = document.getElementsByName('increment-btn');
  if (Symbol.iterator in Object(decerementBtnElements)) {
    Array.from(decerementBtnElements)?.forEach((btn) => {
      btn.setAttribute('aria-label', 'Decrement Input');
    });
  }

  if (Symbol.iterator in Object(incrementBtnElements)) {
    Array.from(incrementBtnElements)?.forEach((btn) => {
      btn.setAttribute('aria-label', 'Increment Input');
    });
  }
};

// Default grid style
export const defaultGridstyle = ({
  height = '500px',
  width = '100%',
  paddingBottom = '20px !important',
  additionalStyles,
}: {
  height?: string;
  width?: string;
  paddingBottom?: string;
  additionalStyles?: string;
} = {}) => {
  return `height: ${height}; width: ${width}; padding-bottom: ${paddingBottom} ${additionalStyles ? `;${additionalStyles}` : ''}`;
};
