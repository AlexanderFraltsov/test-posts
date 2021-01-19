import { searchTypes } from '../../../constants/constants';
import { IPost } from '../../../shared/models/post.model';
import { IMarkedPost } from '../../../shared/models/markedPost.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markedMap'
})
export class MarkedMapPipe implements PipeTransform {

  private match(str: string | Date | undefined, query: string | null): boolean {
    if (!str || !query) {
      return false;
    }
    return str.toString().toLowerCase().includes(query.toLowerCase());
  }

  transform(
    posts: IPost[] | null,
    type: string | null,
    query: string | null
  ): IMarkedPost[] | null {
    if (!posts) {
      return null;
    }
    const typeResolved: searchTypes = type === null ? searchTypes.NAME : type as searchTypes;
    return posts.map(post => {
      const { author, date, text, file } = post;
      console.log(text);
      return {
        ...post,
        author: {
          value: author,
          isMark: typeResolved === searchTypes.NAME && this.match(author, query)
        },
        date: {
          value: date,
          isMark: typeResolved === searchTypes.DATE && this.match(date, query)
        },
        text: {
          value: text,
          isMark: typeResolved === searchTypes.WORD && this.match(text, query)
        },
        file: {
          value: file,
          isMark: typeResolved === searchTypes.DOCUMENT && this.match(file?.name, query)
        }
      };
    });
  }
}
