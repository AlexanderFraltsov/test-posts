import { IPost } from '../shared/models/post.model';

export enum paths {
  MAIN = 'main',
  AUTH = 'login'
}

export const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const mockPosts: IPost[] = [
  {
    id: '1',
    author: 'User 1',
    date: new Date(),
    text: lorem,
    isModified: false
  },
  {
    id: '2',
    author: 'User 2',
    date: new Date(),
    text: lorem,
    isModified: true
  }
];

export enum searchTypes {
  NAME = 'имени автора',
  DATE = 'дате создания',
  WORD = 'ключевому слову',
  DOCUMENT = 'названию документа'
}

export const SEARCH_STRING = 'searchString';

export const loginErrors = {
  NO_NAME: 'Введите имя пользователя',
  NO_PASSWORD: 'Введите пароль',
  NAME_MIN_LENGTH: 'Имя должно состоять минимум из трех символов',
  PASSWORD_MIN_LENGTH: 'Пароль должен состоять минимум из 8 символов'
};

export const PDF_ICON = 'https://cdn4.iconfinder.com/data/icons/file-extensions-1/64/pdfs-512.png';
