import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PDF_ICON } from '../../../../constants/constants';
import { ToastService } from '../../../core/services/toast.service';
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

  public icon = PDF_ICON;
  public postForm: FormGroup;
  public editedFile: File | null = null;
  public formControls: {[key: string]: AbstractControl};

  constructor(
    private postService: PostService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
    this.formControls = {
      text: new FormControl('', [
        Validators.required
      ]),
      file: new FormControl('', [
        requiredFileType('pdf')
      ]),
      fileSource: new FormControl('')
    };
    this.postForm = new FormGroup(this.formControls);
  }

  public ngOnInit(): void {}

  public open(content: any): void {
    if (this.post) {
      const { text, file } = this.post;

      this.editedFile = file?.value || null;

      this.postForm.patchValue({
        text: text.value,
        file: file?.value?.name,
        fileSource: file?.value
      });
    }

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
    this.toastService.show('Пост удален!', {
      classname: 'bg-danger text-light'
    });
  }

  private onEdit(): void {
    const { fileSource, text } = this.postForm.value;

    const isModified = (
      fileSource !== this.post?.file?.value ||
      text !== this.post?.text.value
    );

    if ( !isModified ) {
      return;
    }

    this.postService.updatePost({
      id: this.post!.id,
      text,
      isModified,
      file: fileSource
    });
    this.postForm.setValue({text: '', file: '', fileSource: ''});
    this.toastService.show('Пост отредактирован!', {
      classname: 'bg-primary text-light'
    });
  }

  public onFileChange(e: any): void {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.postForm.patchValue({
        fileSource: file
      });
      this.editedFile = file;
    }
  }

  public onClear(): void {
    this.editedFile = null;
    this.postForm.patchValue({
      fileSource: '',
      file: ''
    });
  }
}
