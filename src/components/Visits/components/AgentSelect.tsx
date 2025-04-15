
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { FormValues } from '../types/form';
import { mockAgents } from '../hooks/useScheduleVisit';

interface AgentSelectProps {
  control: Control<FormValues>;
}

export function AgentSelect({ control }: AgentSelectProps) {
  return (
    <FormField
      control={control}
      name="agentId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Corretor</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um corretor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mockAgents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
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
