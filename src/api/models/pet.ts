export interface Pet {
  id?: number;
  category?: PetCategory;
  name?: string;
  photoUrls?: string[];
  tags?: PetTag[];
  status?: string;
}

export interface PetCategory {
  id?: number;
  name?: string;
}

export interface PetTag {
  id?: number;
  name?: string;
}
