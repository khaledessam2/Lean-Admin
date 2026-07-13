import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "navbar". */
@Component({
  selector: 'app-navbar-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './navbar.page.html',
})
export class NavbarPageComponent extends SectionPageBase {
  readonly key = 'navbar' as const;
}
