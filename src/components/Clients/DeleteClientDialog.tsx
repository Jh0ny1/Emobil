
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientType } from './ClientCard';

interface DeleteClientDialogProps {
  client: ClientType;
  onDelete: () => void;
  trigger?: React.ReactNode;
}

const DeleteClientDialog: React.FC<DeleteClientDialogProps> = ({ 
  client, 
  onDelete,
  trigger
}) => {
  // Fix to prevent event propagation issues
  const handleDelete = (e: React.MouseEvent) => {
    // Stop event propagation
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  };

  return (
    <AlertDialog>
      {trigger ? (
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
            <Trash className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o cliente {client.name}? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash className="h-4 w-4 mr-2" />
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClientDialog;
