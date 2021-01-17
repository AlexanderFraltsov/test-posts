import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPost } from '../../../../shared/models/post.model';
import { PostService } from '../../services/post.service';

const requiredFileType = (type: string) => (control: FormControl) => {
  const file = control.value;
  if (file) {
    if (file.name) {
      const ext = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() === ext) {
        return null
      }
    }
  }
  return {
    requiredFileType: true
  }
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public post?: IPost;
  constructor(
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  public postForm: FormGroup;
  public formControls = {
    text: new FormControl('', [
      Validators.required
    ]),
    file: new FormControl(null, [
      requiredFileType('pdf')
    ]),
  };

  ngOnInit(): void {
    this.postForm = new FormGroup(this.formControls);
  }

  public open(content: any) {
    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then(
        result => {
          if (result === 'remove') {
            this.onDelete();
          }
          if (result === 'edit') {
            this.onEdit();
          }
        },
        reason => {}
      )
  }

  public onDelete() {
    this.postService.removePost(this.post!.id);
  }

  public onEdit() {
    console.log(this.postForm.value);
    const { file, text } = this.postForm.value;
    this.postService.updatePost({ id: this.post!.id, text, isModified: true});
  }
}
