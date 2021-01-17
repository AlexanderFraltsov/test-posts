export interface IPost {
  readonly id: string;
  readonly author: string;
  readonly date: Date;
  text: string;
  isModified: boolean;
  file?: File;
}
