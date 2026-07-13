import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "contact". */
@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './contact.page.html',
})
export class ContactPageComponent extends SectionPageBase {
  readonly key = 'contact' as const;
}
