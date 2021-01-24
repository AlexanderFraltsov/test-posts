import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarkedPost } from '../../../../shared/models/markedPost.model';
import { PostComponent } from './post.component';
import { PostService } from '../../services/post.service';
import { ToastService } from '../../../core/services/toast.service';


describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let modalService: NgbModal;
  const mockUser = 'Paul';
  const mockPost: IMarkedPost = {
    id: '1',
    author: {
      value: mockUser,
      isMark: false
    },
    date: {
      value: new Date(),
      isMark: false
    },
    text: 'text',
    fragments: [{
      value: 'text',
      isMark: false
    }],
    isModified: false,
    file: {
      value: new File([''], 'file.pdf', { type: 'application/pdf' }),
      isMark: false
    }
  };
  const mockPostService = jasmine.createSpyObj('PostService', ['removePost', 'updatePost']);
  const mockToastService = jasmine.createSpyObj('ToastService', ['show']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        NgbModal,
        { provide: PostService, useValue: mockPostService },
        { provide: ToastService, useValue: mockToastService }
      ]
    })
    .compileComponents();
    modalService = TestBed.inject(NgbModal);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear post form', () => {
    component.editedFile = (mockPost.file?.value as File);
    component.postForm.patchValue({
      fileSource: component.editedFile.name,
      file: component.editedFile
    });

    component.onClear();

    expect(component.editedFile).toBeNull();
    expect(component.postForm.get('file')?.value).toBeFalsy();
  });

  it('should change file', () => {
    component.onClear();

    component.onFileChange({ target: { files: [ mockPost.file?.value as File ]}});

    expect(component.editedFile).toBeTruthy();
    expect(component.postForm.get('fileSource')?.value).toBeTruthy();
  });
});
