import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/shared/models/post.model';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const mockPosts: IPost[] = [
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

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>(mockPosts);
  constructor() { }

  public getAll(): Observable<IPost[]> {
    return this.posts$;
  }

  public addPost(post: IPost): void {
    const prev = this.posts$.getValue();
    this.posts$.next([...prev, post]);
  }

  public removePost(id: string): void {
    const prev = this.posts$.getValue();
    this.posts$.next(prev.filter(post => post.id !== id));
  }

  public updatePost(post: Partial<IPost>): void {
    const prev = this.posts$.getValue();
    this.posts$.next(prev.map(el => {
      if (el.id === post.id) {
        return {...el, ...post};
      }
      return el;
    }));
  }
}
