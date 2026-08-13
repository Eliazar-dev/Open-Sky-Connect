import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button, Input, Modal } from '@/components/ui';
import type { Plan } from '@/types';

interface PlanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pass an existing plan to edit; omit to create a new one. Same modal handles both. */
  plan?: Plan | null;
}

export function PlanFormModal({ isOpen, onClose, plan }: PlanFormModalProps) {
  const isEditing = !!plan;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', durationLabel: '', speedLabel: '', price: '' });

  useEffect(() => {
    if (plan) {
      setForm({ name: plan.name, durationLabel: plan.durationLabel, speedLabel: plan.speedLabel, price: String(plan.price) });
    } else {
      setForm({ name: '', durationLabel: '', speedLabel: '', price: '' });
    }
  }, [plan, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(isEditing ? 'Plan updated successfully' : 'Plan created successfully');
      onClose();
    }, 700);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Plan' : 'Add Plan'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Plan Name"
          placeholder="e.g. 1 Day"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <Input
          label="Duration"
          placeholder="e.g. 24 Hours"
          value={form.durationLabel}
          onChange={(e) => setForm((f) => ({ ...f, durationLabel: e.target.value }))}
          required
        />
        <Input
          label="Speed"
          placeholder="e.g. Up to 10 Mbps"
          value={form.speedLabel}
          onChange={(e) => setForm((f) => ({ ...f, speedLabel: e.target.value }))}
          required
        />
        <Input
          label="Price (KSh)"
          type="number"
          placeholder="e.g. 150"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          required
        />
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Add Plan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
