import { useState } from 'react';
import { toast } from 'sonner';
import { Button, Input, Modal } from '@/components/ui';

interface AddRouterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddRouterModal({ isOpen, onClose }: AddRouterModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Router added successfully');
      onClose();
    }, 700);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Router">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Router Name" placeholder="e.g. Main Office Router" required />
        <Input label="Location" placeholder="e.g. Main Office" required />
        <Input label="IP Address" placeholder="e.g. 192.168.88.1" required />
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Add Router
          </Button>
        </div>
      </form>
    </Modal>
  );
}
