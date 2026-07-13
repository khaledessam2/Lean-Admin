import { inject } from '@angular/core';
import { FieldSchema, SECTION_SCHEMAS, isBlockField } from '../../../editor/schema';
import { ContentStore } from '../../../core/content-store';
import { SectionKey } from '@site/content/site-content';

/**
 * أساس مشترك لكل صفحات الأقسام:
 * يوفّر مفتاح القسم، حقوله، ونموذجه من المخزن — بدون تكرار المنطق في كل صفحة.
 */
export abstract class SectionPageBase {
  protected readonly store = inject(ContentStore);

  /** مفتاح القسم — تحدّده كل صفحة. */
  abstract readonly key: SectionKey;

  /** حقول هذا القسم من السكيمة. */
  get fields(): FieldSchema[] {
    return SECTION_SCHEMAS.find((s) => s.key === this.key)?.fields ?? [];
  }

  /** الحقول الأساسية (تُعرض في شبكة داخل بطاقة واحدة). */
  get gridFields(): FieldSchema[] {
    return this.fields.filter((f) => !isBlockField(f));
  }

  /** الحقول الثقيلة (كل قائمة في بطاقة مستقلّة). */
  get blockFields(): FieldSchema[] {
    return this.fields.filter((f) => isBlockField(f));
  }

  /** هل يمتدّ الحقل على كامل عرض الشبكة (نص طويل/صورة). */
  protected span = (f: FieldSchema): boolean => f.type === 'textarea' || f.type === 'image';

  /** كائن نموذج القسم القابل للتعديل. */
  get model(): any {
    return this.store.model(this.key);
  }

  /** حقلٌ واحد بالمفتاح (لترتيبات التصميم المخصّصة). */
  field(key: string): FieldSchema | undefined {
    return this.fields.find((f) => f.key === key);
  }
}
