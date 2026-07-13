import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "pricing". */
@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './pricing.page.html',
})
export class PricingSectionPageComponent extends SectionPageBase {
  readonly key = 'pricing' as const;
}
