import { TestBed } from '@angular/core/testing';

import { mockPosts } from '../../../constants/constants';
import { PostService } from './post.service';
import { IPost } from '../../../shared/models/post.model';

describe('PostService', () => {
  let service: PostService;

  const author = 'Paul Atreides';
  const mockPost = {
    author,
    text: 'text'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
    service.posts$.next(mockPosts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    expect(service.getAll()).toEqual(service.posts$);
  });

  it('should add post', () => {
    const { length } = service.posts$.getValue();

    service.addPost(mockPost);
    expect(service.posts$.getValue().length).toBe(length + 1);
    expect(service.posts$.getValue().find(p => p.author === author)).not.toBe(undefined);
  });
  it('should remove post', () => {
    service.addPost(mockPost);
    const { id } = service.posts$.getValue().find(p => p.author === author) as IPost;
    expect(service.posts$.getValue().find(p => p.id === id)).not.toBe(undefined);

    service.removePost(id);
    expect(service.posts$.getValue().find(p => p.id === id)).toBe(undefined);
  });
  it('should update post', () => {
    service.addPost(mockPost);
    const post = service.posts$.getValue().find(p => p.author === author);
    expect(post?.isModified).toBe(false);

    const newText = 'new text';
    const modified: IPost = {
      ...(post as IPost),
      text: newText
    };

    service.updatePost(modified);
    const modifiedPost = service.posts$.getValue().find(p => p.id === (post as IPost).id);
    expect(modifiedPost?.text).toBe(newText);
    expect(modifiedPost?.isModified).toBe(true);
  });
});
