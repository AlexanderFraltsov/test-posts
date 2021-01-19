export interface IMarkedPost {
  readonly id: string;
  readonly author: {
    value: string,
    isMark: boolean
  };
  readonly date: {
    value: Date,
    isMark: boolean
  };
  text: {
    value: string,
    isMark: boolean
  };
  isModified: boolean;
  file?: {
    value?: File,
    isMark?: boolean
  };
}
