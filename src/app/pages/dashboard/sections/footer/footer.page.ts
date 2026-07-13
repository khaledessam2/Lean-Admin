import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "footer". */
@Component({
  selector: 'app-footer-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './footer.page.html',
})
export class FooterPageComponent extends SectionPageBase {
  readonly key = 'footer' as const;
}
