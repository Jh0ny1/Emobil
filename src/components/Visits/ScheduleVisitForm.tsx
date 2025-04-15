
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ClientSelect } from './components/ClientSelect';
import { PropertySelect } from './components/PropertySelect';
import { AgentSelect } from './components/AgentSelect';
import { DateTimeFields } from './components/DateTimeFields';
import { NotesField } from './components/NotesField';
import { useScheduleVisit } from './hooks/useScheduleVisit';
import { FormValues, formSchema } from './types/form';
import { Plus } from 'lucide-react';

export default function ScheduleVisitForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  });

  const { clients, open, setOpen, handleSubmit } = useScheduleVisit(form);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agendar Visita
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Agendar Nova Visita</DialogTitle>
          <DialogDescription>
            Preencha os dados para agendar uma visita a um imóvel.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <ClientSelect control={form.control} clients={clients} />
            <PropertySelect control={form.control} />
            <AgentSelect control={form.control} />
            <DateTimeFields control={form.control} />
            <NotesField control={form.control} />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Agendar Visita</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
