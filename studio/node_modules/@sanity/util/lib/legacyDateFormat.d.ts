declare const sanitizeLocale: (locale: string) => string;
declare const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
declare const DEFAULT_TIME_FORMAT = "HH:mm";
type ParseResult = {
  isValid: boolean;
  date?: Date;
  error?: string;
} & ({
  isValid: true;
  date: Date;
} | {
  isValid: false;
  error?: string;
});
declare function format(input: Date, dateFormat: string, options?: {
  useUTC?: boolean;
  timeZone?: string;
}): string;
declare function parse(dateString: string, dateFormat?: string, timeZone?: string): ParseResult;
declare function isValidTimeZoneString(timeZone: string): boolean;
export { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT, ParseResult, format, isValidTimeZoneString, parse, sanitizeLocale };