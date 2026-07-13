import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "features". */
@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './features.page.html',
})
export class FeaturesPageComponent extends SectionPageBase {
  readonly key = 'features' as const;
}
