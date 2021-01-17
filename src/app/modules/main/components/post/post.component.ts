import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../../../shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public post?: IPost;
  constructor() { }

  ngOnInit(): void {
  }

}
