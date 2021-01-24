import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { IPost } from '../../../shared/models/post.model';
import { mockPosts } from '../../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>(mockPosts);

  public getAll(): Observable<IPost[]> {
    return this.posts$;
  }

  public addPost(post: {text: string, author: string, file?: File}): void {
    const prev = this.posts$.getValue();
    const date = new Date();
    this.posts$.next([
      ...prev,
      {
        isModified: false,
        id: date.toString(),
        date,
        ...post
      }
    ]);
  }

  public removePost(id: string): void {
    const prev = this.posts$.getValue();
    this.posts$.next(prev.filter(post => post.id !== id));
  }

  public updatePost(post: Partial<IPost>): void {
    const prev = this.posts$.getValue();
    this.posts$.next(prev.map(el => {
      if (el.id === post.id) {
        return {
          ...el,
          ...post,
          isModified: true
        };
      }
      return el;
    }));
  }
}
