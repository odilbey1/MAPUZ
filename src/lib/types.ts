export type LinkType =
  | 'telegram'
  | 'instagram'
  | 'phone'
  | 'google_maps'
  | 'website'
  | 'youtube'
  | 'tiktok'
  | 'facebook'
  | 'custom';

export interface BusinessLink {
  id: string;
  title: string;
  type: LinkType;
  url: string;
  subtitle?: string;
}

export interface Business {
  id: string;
  business_name: string;
  slug: string;
  description: string;
  logo: string;
  telegram?: string;
  instagram?: string;
  phone?: string;
  google_maps?: string;
  links?: BusinessLink[];
  created_at: string;
}

export type BusinessFormData = Omit<Business, 'id' | 'created_at'>;
