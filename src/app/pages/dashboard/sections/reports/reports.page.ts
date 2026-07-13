import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "reports". */
@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './reports.page.html',
})
export class ReportsPageComponent extends SectionPageBase {
  readonly key = 'reports' as const;
}
