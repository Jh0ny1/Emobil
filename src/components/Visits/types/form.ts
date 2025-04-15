
import * as z from 'zod';

export const formSchema = z.object({
  clientId: z.string().min(1, { message: 'Selecione um cliente' }),
  agentId: z.string().min(1, { message: 'Selecione um corretor' }),
  propertyId: z.string().min(1, { message: 'Selecione um imóvel' }),
  date: z.date({ required_error: 'Selecione uma data para a visita' }),
  time: z.string().min(1, { message: 'Informe o horário da visita' }),
  notes: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
