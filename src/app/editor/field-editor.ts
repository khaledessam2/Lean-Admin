import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldSchema, isWideField } from './schema';
import { ContentAdminService } from '../core/content-admin.service';
import { ConfirmService } from '../shared/confirm.service';

/**
 * محرّر حقل واحد يعمل بشكل تكراري:
 * - النصوص/الأرقام/الاختيار/الصور: حقل مباشر
 * - stringlist: قائمة نصوص (إضافة/حذف/ترتيب)
 * - objectlist: قائمة كائنات، كل كائن يعرض حقوله عبر نفس المكوّن
 */
@Component({
  selector: 'app-field-editor',
  standalone: true,
  imports: [FormsModule, FieldEditorComponent],
  templateUrl: './field-editor.html',
})
export class FieldEditorComponent {
  private readonly content = inject(ContentAdminService);
  private readonly confirm = inject(ConfirmService);

  /** وصف الحقل. */
  readonly schema = input.required<FieldSchema>();
  /** الكائن الأب الذي يحتوي هذه الخاصية (يُعدَّل مباشرةً). */
  readonly model = input.required<any>();

  /** حالة رفع الصورة لكل حقل صورة. */
  protected readonly uploading = signal(false);
  protected readonly uploadError = signal('');

  /** هل الحقل عريض (يمتدّ على كامل عرض شبكة عناصر القائمة). */
  protected readonly wide = isWideField;

  get value(): any {
    return this.model()[this.schema().key];
  }
  set value(v: any) {
    this.model()[this.schema().key] = v;
  }

  /** القائمة (لأنواع stringlist / objectlist). */
  get list(): any[] {
    const v = this.model()[this.schema().key];
    return Array.isArray(v) ? v : [];
  }

  onNumber(raw: string): void {
    if (raw === '' || raw === null) {
      this.value = this.schema().nullable ? null : 0;
    } else {
      this.value = Number(raw);
    }
  }

  addString(): void {
    this.list.push('');
  }

  addObject(): void {
    this.list.push(this.blankFrom(this.schema().fields ?? []));
  }

  async removeAt(i: number): Promise<void> {
    const ok = await this.confirm.ask({
      title: 'حذف عنصر',
      message: 'هل تريد حذف هذا العنصر؟ لا يمكن التراجع.',
      confirmText: 'حذف',
      danger: true,
    });
    if (!ok) return;
    this.list.splice(i, 1);
  }

  moveUp(i: number): void {
    if (i <= 0) return;
    const arr = this.list;
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
  }

  moveDown(i: number): void {
    const arr = this.list;
    if (i >= arr.length - 1) return;
    [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
  }

  async onImage(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploading.set(true);
    this.uploadError.set('');
    try {
      this.value = await this.content.uploadImage(file);
    } catch (err: any) {
      this.uploadError.set(err?.message || 'تعذّر رفع الصورة');
    } finally {
      this.uploading.set(false);
      input.value = '';
    }
  }

  /** ينشئ كائناً فارغاً وفق حقول القائمة. */
  private blankFrom(fields: FieldSchema[]): Record<string, any> {
    const obj: Record<string, any> = {};
    for (const f of fields) {
      switch (f.type) {
        case 'number': obj[f.key] = f.nullable ? null : 0; break;
        case 'boolean': obj[f.key] = false; break;
        case 'select': obj[f.key] = f.options?.[0] ?? ''; break;
        case 'stringlist':
        case 'objectlist': obj[f.key] = []; break;
        default: obj[f.key] = '';
      }
    }
    return obj;
  }

  /** لعرض ملخّص صغير لعنصر القائمة. */
  itemSummary(item: any): string {
    if (item == null) return '';
    const first = this.schema().fields?.[0]?.key;
    const v = first ? item[first] : '';
    return typeof v === 'string' ? v : String(v ?? '');
  }
}
