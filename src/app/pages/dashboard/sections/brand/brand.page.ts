import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "brand" (الشعار والهوية). */
@Component({
  selector: 'app-brand-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './brand.page.html',
})
export class BrandPageComponent extends SectionPageBase {
  readonly key = 'brand' as const;
}
