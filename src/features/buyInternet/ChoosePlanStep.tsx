import { ChevronLeft } from 'lucide-react';
import { Button, Card, Skeleton } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { Plan } from '@/types';
import { formatCurrency } from '@/utils/format';

interface ChoosePlanStepProps {
  plans: Plan[] | undefined;
  isLoading: boolean;
  selectedPlanId: string | null;
  onSelectPlan: (id: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function ChoosePlanStep({ plans, isLoading, selectedPlanId, onSelectPlan, onContinue, onBack }: ChoosePlanStepProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <div className="flex items-center gap-3 px-4 pt-5 pb-2 sm:px-6">
        <button onClick={onBack} aria-label="Back" className="text-slate-400 hover:text-slate-600">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-ink-900">Choose a Plan</h1>
      </div>
      <p className="px-4 text-sm text-slate-400 sm:px-6">Select a plan that suits you</p>

      <div className="mx-auto w-full max-w-md flex-1 px-4 pt-4 sm:px-6">
        <div className="flex flex-col gap-3">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-2xl" />)
            : plans?.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                return (
                  <Card
                    key={plan.id}
                    padding="none"
                    onClick={() => onSelectPlan(plan.id)}
                    className={cn(
                      'flex cursor-pointer items-center justify-between px-4 py-3.5 transition-colors',
                      isSelected && 'border-brand-500 ring-1 ring-brand-500'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full border-2',
                          isSelected ? 'border-brand-500' : 'border-slate-300'
                        )}
                      >
                        {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{plan.name}</p>
                        <p className="text-xs text-slate-400">{plan.speedLabel}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-ink-900">{formatCurrency(plan.price)}</p>
                  </Card>
                );
              })}
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">All plans are non-refundable.</p>
      </div>

      <div className="sticky bottom-0 mx-auto w-full max-w-md bg-surface px-4 py-4 sm:px-6">
        <Button fullWidth size="lg" disabled={!selectedPlanId} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
