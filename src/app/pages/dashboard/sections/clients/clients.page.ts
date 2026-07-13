import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "clients". */
@Component({
  selector: 'app-clients-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './clients.page.html',
})
export class ClientsPageComponent extends SectionPageBase {
  readonly key = 'clients' as const;
}
