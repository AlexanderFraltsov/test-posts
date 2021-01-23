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

  private textDivide(text: string, query: string): string[] {
    const fragments = [];
    let restText = text;
    while (restText.length > 0) {
      const index = restText.toLowerCase().indexOf(query.toLowerCase());
      if (index === -1) {
        fragments.push(restText);
        restText = '';
      } else {
        if (index !== 0) {
          fragments.push(restText.slice(0, index));
        }
        fragments.push(restText.slice(index, index + query.length));
        restText = restText.slice(index + query.length);
      }
    }
    return fragments;
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

    if (typeResolved === searchTypes.WORD && query) {
      posts.map(p => {
        const fragments = this.textDivide(p.text, query)
          .map(f => ({
            value: f,
            isMark: this.match(f, query)
          }));
        console.log(fragments);
        return {
          ...p,

        };
      });

    }
    return posts.map(post => {
      const { author, date, text, file } = post;

      const fragments = (typeResolved === searchTypes.WORD && query) ?
        this.textDivide(text, query)
          .map(f => ({
            value: f,
            isMark: this.match(f, query)
          }))
          : [{
            value: text,
            isMark: false
          }];

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
        text,
        fragments,
        file: {
          value: file,
          isMark: typeResolved === searchTypes.DOCUMENT && this.match(file?.name, query)
        }
      };
    });
  }
}
