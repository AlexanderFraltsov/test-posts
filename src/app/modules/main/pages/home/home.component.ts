import { IPost } from '../../../../shared/models/post.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { PostService } from '../../services/post.service';
import { requiredFileType } from '../../utils/requiredFileType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts$: Observable<IPost[]>;

  public postForm!: FormGroup;
  public formControls: {[key: string]: AbstractControl} = {
    text: new FormControl('', [
      Validators.required
    ]),
    file: new FormControl(null, [
      requiredFileType('pdf')
    ]),
  };


  constructor(
    private postService: PostService,
    private modalService: NgbModal
    ) {
    this.posts$ = this.postService.getAll();
  }

  public ngOnInit(): void {
    this.postForm = new FormGroup(this.formControls);
  }

  public open(content: any) {
    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then(
        result => {
          if (result === 'add') {
            this.onAdd();
          }
        },
        reason => {}
      )
  }

  public onAdd(){
    console.log(this.postForm.value);
    const { file, text } = this.postForm.value;

    this.postService.addPost({ 
      text,
      author: 'mockUser'
    });
  }
}
