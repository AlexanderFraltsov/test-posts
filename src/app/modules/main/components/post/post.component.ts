import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { IMarkedPost } from '../../../../shared/models/markedPost.model';
import { PostService } from '../../services/post.service';
import { requiredFileType } from '../../utils/requiredFileType';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public post?: IMarkedPost;
  @Input() public user?: string;

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
  ) { }

  public ngOnInit(): void {
    this.postForm = new FormGroup(this.formControls);
  }

  public open(content: any): void {
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
      );
  }

  private onDelete(): void {
    this.postService.removePost(this.post!.id);
  }

  private onEdit(): void {
    const { file, text } = this.postForm.value;
    this.postService.updatePost({ id: this.post!.id, text, isModified: true});
    this.postForm.setValue({text: '', file: null});
  }
}
