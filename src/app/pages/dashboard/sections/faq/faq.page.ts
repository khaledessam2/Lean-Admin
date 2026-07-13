import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "faq". */
@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './faq.page.html',
})
export class FaqPageComponent extends SectionPageBase {
  readonly key = 'faq' as const;
}
