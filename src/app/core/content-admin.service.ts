import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';
import {
  DEFAULT_CONTENT,
  SectionKey,
  SiteContent,
  mergeContent,
} from '@site/content/site-content';

/** تحميل وحفظ محتوى الموقع من/إلى Supabase (لوحة الأدمن). */
@Injectable({ providedIn: 'root' })
export class ContentAdminService {
  /** يحمّل المحتوى الفعّال (الافتراضي مدموجاً فوقه ما هو مخزّن). */
  async loadAll(): Promise<SiteContent> {
    const { data, error } = await supabase.from('site_content').select('section, data');
    if (error) throw error;

    const overrides: Partial<Record<SectionKey, unknown>> = {};
    for (const row of data ?? []) {
      overrides[row.section as SectionKey] = row.data;
    }
    return mergeContent(overrides);
  }

  /** يحفظ قسماً واحداً (upsert على المفتاح section). */
  async saveSection(section: SectionKey, data: unknown): Promise<void> {
    const { error } = await supabase
      .from('site_content')
      .upsert({ section, data }, { onConflict: 'section' });
    if (error) throw error;
  }

  /** يعيد قسماً إلى محتواه الافتراضي (حذف الصف المخزّن). */
  async resetSection(section: SectionKey): Promise<void> {
    const { error } = await supabase.from('site_content').delete().eq('section', section);
    if (error) throw error;
  }

  /** المحتوى الافتراضي لقسم (للاستخدام عند الإرجاع). */
  defaultSection(section: SectionKey): unknown {
    return structuredClone(DEFAULT_CONTENT[section]);
  }

  /**
   * يرفع صورة إلى bucket الصور ويعيد الرابط العام.
   * @param path مسار الملف داخل الـ bucket (مثلاً hero/162738.png)
   */
  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop() || 'png';
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 40);
    const path = `uploads/${safe}-${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from('site-images')
      .upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;

    const { data } = supabase.storage.from('site-images').getPublicUrl(path);
    return data.publicUrl;
  }
}
