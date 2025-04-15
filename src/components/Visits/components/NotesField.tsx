
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { FormValues } from '../types/form';
import { Textarea } from '@/components/ui/textarea';

interface NotesFieldProps {
  control: Control<FormValues>;
}

export function NotesField({ control }: NotesFieldProps) {
  return (
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Observações</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Observações adicionais sobre a visita..."
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
