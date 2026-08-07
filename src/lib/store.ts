import { Business, BusinessFormData, BusinessLink } from './types';
import { supabase } from './supabase';

const LINKS_MARKER = '__MAPUZ_LINKS__:';

// Helper: Encode links array into description string as bulletproof fallback
function encodeLinksIntoDescription(desc: string, links: BusinessLink[]): string {
  const cleanDesc = desc ? desc.split(LINKS_MARKER)[0].trim() : '';
  if (!links || links.length === 0) return cleanDesc;
  return cleanDesc ? `${cleanDesc}\n\n${LINKS_MARKER}${JSON.stringify(links)}` : `${LINKS_MARKER}${JSON.stringify(links)}`;
}

// Helper: Upload logo to Supabase Storage if it's base64 data
async function processLogoUrl(logoData: string): Promise<string> {
  if (!logoData || !logoData.startsWith('data:image')) {
    return logoData;
  }

  try {
    const fileName = `logo_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
    const base64Parts = logoData.split(',');
    const mimeMatch = base64Parts[0].match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
    const binaryStr = atob(base64Parts[1]);
    const array = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      array[i] = binaryStr.charCodeAt(i);
    }
    const blob = new Blob([array], { type: mimeType });

    const { data, error } = await supabase.storage
      .from('logos')
      .upload(fileName, blob, {
        contentType: mimeType,
        upsert: true,
      });

    if (!error && data) {
      const { data: publicData } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);
      return publicData.publicUrl;
    }
  } catch (e) {
    console.error('Supabase storage upload error:', e);
  }
  return logoData;
}

// Helper: Normalize business row from Supabase
function normalizeBusiness(row: any): Business {
  let links: BusinessLink[] = [];
  let description = row.description || '';

  // 1. Check native 'links' JSONB column
  if (row.links && Array.isArray(row.links) && row.links.length > 0) {
    links = row.links;
  } else if (description.includes(LINKS_MARKER)) {
    // 2. Extract embedded links from description fallback
    try {
      const parts = description.split(LINKS_MARKER);
      description = parts[0].trim();
      const parsed = JSON.parse(parts[1]);
      if (Array.isArray(parsed) && parsed.length > 0) {
        links = parsed;
      }
    } catch (e) {
      console.error('Failed to parse embedded links:', e);
    }
  }

  // 3. Fallback to legacy single fields if still no links found
  if (links.length === 0) {
    if (row.telegram) {
      links.push({
        id: 'tg_legacy',
        title: 'Telegram',
        type: 'telegram',
        url: row.telegram,
        subtitle: 'Telegram orqali bog\'lanish',
      });
    }
    if (row.instagram) {
      links.push({
        id: 'ig_legacy',
        title: 'Instagram',
        type: 'instagram',
        url: row.instagram,
        subtitle: 'Sahifamizni kuzatib boring',
      });
    }
    if (row.phone) {
      links.push({
        id: 'ph_legacy',
        title: 'Telefon',
        type: 'phone',
        url: row.phone,
        subtitle: '',
      });
    }
    if (row.google_maps) {
      links.push({
        id: 'map_legacy',
        title: 'Joylashuv',
        type: 'google_maps',
        url: row.google_maps,
        subtitle: 'Google Maps xaritasidan ochish',
      });
    }
  }

  // Clean description string from marker if present
  if (description.includes(LINKS_MARKER)) {
    description = description.split(LINKS_MARKER)[0].trim();
  }

  return {
    id: row.id,
    business_name: row.business_name,
    slug: row.slug,
    description: description,
    logo: row.logo || '',
    telegram: row.telegram || (links.find((l) => l.type === 'telegram')?.url || ''),
    instagram: row.instagram || (links.find((l) => l.type === 'instagram')?.url || ''),
    phone: row.phone || (links.find((l) => l.type === 'phone')?.url || ''),
    google_maps: row.google_maps || (links.find((l) => l.type === 'google_maps')?.url || ''),
    links: links,
    created_at: row.created_at || new Date().toISOString(),
  };
}

export const businessStore = {
  async getAll(): Promise<Business[]> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }
    return (data || []).map(normalizeBusiness);
  },

  async getBySlug(slug: string): Promise<Business | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error('Supabase getBySlug error:', error);
      return null;
    }
    return normalizeBusiness(data);
  },

  async getById(id: string): Promise<Business | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error('Supabase getById error:', error);
      return null;
    }
    return normalizeBusiness(data);
  },

  async create(formData: BusinessFormData): Promise<Business> {
    const processedLogo = await processLogoUrl(formData.logo);
    const linksList = formData.links || [];

    // Extract first items of each type for legacy column compatibility
    const firstTg = linksList.find((l) => l.type === 'telegram')?.url || formData.telegram || '';
    const firstIg = linksList.find((l) => l.type === 'instagram')?.url || formData.instagram || '';
    const firstPh = linksList.find((l) => l.type === 'phone')?.url || formData.phone || '';
    const firstMap = linksList.find((l) => l.type === 'google_maps')?.url || formData.google_maps || '';

    const payload: Record<string, any> = {
      business_name: formData.business_name,
      slug: formData.slug,
      description: formData.description || '',
      logo: processedLogo,
      telegram: firstTg,
      instagram: firstIg,
      phone: firstPh,
      google_maps: firstMap,
      links: linksList,
    };

    let { data, error } = await supabase
      .from('businesses')
      .insert([payload])
      .select()
      .single();

    // Bulletproof fallback: If 'links' column is missing in Supabase schema, embed links into description
    if (error && (error.message?.includes('links') || error.code === 'PGRST204')) {
      console.warn("Column 'links' missing in Supabase PostgreSQL table. Using bulletproof description fallback...");
      delete payload.links;
      payload.description = encodeLinksIntoDescription(formData.description || '', linksList);

      const retry = await supabase
        .from('businesses')
        .insert([payload])
        .select()
        .single();
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(error.message || 'Supabase bazasiga saqlashda xatolik yuz berdi');
    }

    return normalizeBusiness(data);
  },

  async update(id: string, formData: Partial<BusinessFormData>): Promise<Business | null> {
    const updatedPayload: Record<string, any> = { ...formData };
    if (updatedPayload.logo) {
      updatedPayload.logo = await processLogoUrl(updatedPayload.logo);
    }

    const linksList: BusinessLink[] = updatedPayload.links && Array.isArray(updatedPayload.links) ? updatedPayload.links : [];

    if (linksList.length > 0) {
      updatedPayload.telegram = linksList.find((l) => l.type === 'telegram')?.url || formData.telegram || '';
      updatedPayload.instagram = linksList.find((l) => l.type === 'instagram')?.url || formData.instagram || '';
      updatedPayload.phone = linksList.find((l) => l.type === 'phone')?.url || formData.phone || '';
      updatedPayload.google_maps = linksList.find((l) => l.type === 'google_maps')?.url || formData.google_maps || '';
    }

    let { data, error } = await supabase
      .from('businesses')
      .update(updatedPayload)
      .eq('id', id)
      .select()
      .single();

    // Bulletproof fallback: If 'links' column is missing in Supabase schema, embed links into description
    if (error && (error.message?.includes('links') || error.code === 'PGRST204')) {
      console.warn("Column 'links' missing in Supabase PostgreSQL table. Using bulletproof description fallback...");
      delete updatedPayload.links;
      if (linksList.length > 0 || formData.description !== undefined) {
        updatedPayload.description = encodeLinksIntoDescription(formData.description || '', linksList);
      }

      const retry = await supabase
        .from('businesses')
        .update(updatedPayload)
        .eq('id', id)
        .select()
        .single();
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Supabase update error:', error);
      throw new Error(error.message || 'Supabase bazasini yangilashda xatolik yuz berdi');
    }

    return normalizeBusiness(data);
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('businesses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return false;
    }

    return true;
  }
};
