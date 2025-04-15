
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { FormValues } from '../types/form';
import { mockProperties } from '../hooks/useScheduleVisit';

interface PropertySelectProps {
  control: Control<FormValues>;
}

export function PropertySelect({ control }: PropertySelectProps) {
  return (
    <FormField
      control={control}
      name="propertyId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Imóvel</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um imóvel" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mockProperties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
