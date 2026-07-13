import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "pricingPage". */
@Component({
  selector: 'app-pricing-header-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './pricing-page.page.html',
})
export class PricingHeaderPageComponent extends SectionPageBase {
  readonly key = 'pricingPage' as const;
}
