
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WikiContentService } from 'src/app/shared/services/wiki-content.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { WikiContent } from './../../shared/model/wikiContent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.scss']
})
export class DynamicContentComponent implements OnInit, OnDestroy {
  protected destroyActions = new Subject<boolean>();
  wikiContent!: string;
  topicKeyword!: string;
  displayCommonError: boolean = false;
  isLoading: boolean = false;
  searchKeyword!: string;
  public searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public wikiContentService: WikiContentService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      topicKeyword: ['pizza', [Validators.required, Validators.maxLength(254)]],
    });
    this.onSubmit();
  }

  // // convenience getter for easy access to form fields
  // public get formControls() {
  //   return this.searchForm.controls;
  // }

  onSubmit() {
    this.searchKeyword = this.searchForm.controls['topicKeyword'].value;
    this.displayCommonError = false;
    if (this.searchForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.wikiContentService
      .getWikiContent(this.searchForm.controls['topicKeyword'].value)
      .pipe(takeUntil(this.destroyActions))
      .subscribe((result: WikiContent) => {
        console.log('getWikiContent', result);
        // console.log(result.query.pages[0]?.extract);
        this.wikiContent = '';
        if (result && result.batchcomplete && !result.isContentError) {
          //this.wikiContent = result.query.pages[0]?.revisions[0]?.content;
          //this.wikiContent = result.query.pages[0]?.extract.substring(0, 4) === '<!--' ? result.warnings.extracts.warnings : result.query.pages[0]?.extract;
          this.wikiContent = result.query.pages[0]?.extract;
        } else if (result && result.batchcomplete && result.isContentError) {
          this.batchRedirect();
        } else if (result && !result.batchcomplete && !result.isContentError) {
          this.displayCommonError = true;
        }
        this.isLoading = false;
      });
  }

  public batchRedirect() {
    this.displayCommonError = false;
    this.isLoading = true;
    this.wikiContentService
      .getWikiContentBatchRedirect(this.searchForm.controls['topicKeyword'].value)
      .pipe(takeUntil(this.destroyActions))
      .subscribe((result: WikiContent) => {
        console.log('getWikiContentBatchRedirect', result);
        //console.log(result.query.pages[0]?.extract);
        this.wikiContent = '';
        if (result && result.batchcomplete && !result.isContentError) {
          this.searchForm.controls['topicKeyword'].setValue(result.batchRedirectText);
          this.onSubmit();
        } else if (result && result.batchcomplete && result.isContentError) {
          this.batchRedirect();
        } else if (result && !result.batchcomplete && !result.isContentError) {
          this.displayCommonError = true;
        }
        this.isLoading = false;
      });
  }

  resetForm() {
    this.wikiContent = '';
    this.displayCommonError = false;
    this.isLoading = false;
  }


  clearForm() {
    this.searchForm.controls['topicKeyword'].setValue('');
    this.resetForm();
  }

  public get isValueExsist() {
    return this.searchForm.controls['topicKeyword'].value.trim().length !== 0;
  }

  public ngOnDestroy() {
    this.destroyActions.next(false);
    this.destroyActions.complete();
  }

}

