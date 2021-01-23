import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { PDF_ICON } from '../../../../constants/constants';
import { ToastService } from '../../../core/services/toast.service';
import { LoginService } from '../../../core/services/login.service';
import { IPost } from '../../../../shared/models/post.model';
import { SearchService } from '../../services/search.service';
import { PostService } from '../../services/post.service';
import { requiredFileType } from '../../utils/requiredFileType';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public icon = PDF_ICON;
  public posts$: Observable<IPost[]>;
  public user: string | undefined;
  public addedFile: File | null = null;

  public postForm!: FormGroup;
  public formControls: {[key: string]: AbstractControl} = {
    text: new FormControl('', [
      Validators.required
    ]),
    file: new FormControl('', [
      requiredFileType('pdf')
    ]),
    fileSource: new FormControl('')
  };


  constructor(
    private postService: PostService,
    private loginService: LoginService,
    public searchService: SearchService,
    private modalService: NgbModal,
    private toastService: ToastService
    ) {
    this.posts$ = this.postService.getAll();
    this.user = this.loginService.getLogin();
  }

  public ngOnInit(): void {
    this.postForm = new FormGroup(this.formControls);
  }

  public open(content: any): void {
    this.addedFile = null;
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
      );
  }

  public onClear(): void {
    this.addedFile = null;
    this.postForm.patchValue({
      fileSource: '',
      file: ''
    });
  }

  public onFileChange(e: any): void {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.postForm.patchValue({
        fileSource: file
      });
      this.addedFile = file;
    }
  }

  public onAdd(): void {
    const { fileSource, text } = this.postForm.value;
    if (this.user) {
      this.postService.addPost({
        text,
        author: this.user,
        file: fileSource
      });
    }
    this.postForm.patchValue({text: '', file: '', fileSource: ''});
    this.toastService.show('Пост успешно добавлен!', {
      classname: 'bg-success text-light'
    });
  }
}
