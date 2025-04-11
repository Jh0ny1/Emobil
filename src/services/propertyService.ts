
import { supabase } from "@/integrations/supabase/client";
import { PropertyType } from '@/components/Properties/PropertyCard';

// Tipo para criação de propriedade
export type CreatePropertyType = Omit<PropertyType, 'id'> & { user_id: string };

// Buscar todas as propriedades
export const fetchProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*');
  
  if (error) throw error;
  return data as PropertyType[];
};

// Buscar uma propriedade específica
export const fetchPropertyById = async (id: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as PropertyType;
};

// Adicionar uma nova propriedade
export const addProperty = async (property: CreatePropertyType) => {
  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single();
  
  if (error) throw error;
  return data as PropertyType;
};

// Atualizar uma propriedade existente
export const updateProperty = async (id: string, updates: Partial<PropertyType>) => {
  const { data, error } = await supabase
    .from('properties')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as PropertyType;
};

// Excluir uma propriedade
export const deleteProperty = async (id: string) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Upload de imagem para uma propriedade
export const uploadPropertyImage = async (file: File) => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('Usuário não autenticado');
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('property-images')
    .upload(fileName, file);
  
  if (uploadError) throw uploadError;
  
  const { data } = supabase.storage
    .from('property-images')
    .getPublicUrl(fileName);
  
  return data.publicUrl;
};
