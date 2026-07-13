import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "audience". */
@Component({
  selector: 'app-audience-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './audience.page.html',
})
export class AudiencePageComponent extends SectionPageBase {
  readonly key = 'audience' as const;
}
