import { Component } from '@angular/core';
import { SectionShellComponent } from '../../components/section-shell';
import { FieldEditorComponent } from '../../../../editor/field-editor';
import { SectionPageBase } from '../section-page-base';

/** صفحة قسم "hero". */
@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [SectionShellComponent, FieldEditorComponent],
  templateUrl: './hero.page.html',
})
export class HeroPageComponent extends SectionPageBase {
  readonly key = 'hero' as const;
}
