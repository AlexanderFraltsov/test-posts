import { IPost } from '../../../../shared/models/post.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts$: Observable<IPost[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.getAll();
  }

  public ngOnInit(): void {}
}
