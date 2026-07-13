import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "overview". */
@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './overview.page.html',
})
export class OverviewPageComponent extends SectionPageBase {
  readonly key = 'overview' as const;
}
