import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/shared/models/post.model';

const mockPosts: IPost[] = [
  {
    id: '1',
    author: 'User 1',
    date: new Date(),
    text: 'text1',
    isModified: false
  },
  {
    id: '2',
    author: 'User 2',
    date: new Date(),
    text: 'text2',
    isModified: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  public getAll(): Observable<IPost[]> {
    return new Observable((subscriber) => subscriber.next(mockPosts));
  }
}
