import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePlans, useInitiatePayment, useCheckPaymentStatus } from '@/hooks/usePlans';
import { useAuthContext } from '@/contexts/AuthContext';
import { ChoosePlanStep } from '@/features/buyInternet/ChoosePlanStep';
import { ConfirmPaymentStep } from '@/features/buyInternet/ConfirmPaymentStep';
import { WaitingForPaymentStep } from '@/features/buyInternet/WaitingForPaymentStep';
import { SuccessStep, FailedStep } from '@/features/buyInternet/SuccessStep';
import { CUSTOMER_ROUTES } from '@/constants/routes';
import type { BuyFlowStep } from '@/types';

export function BuyInternetPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { data: plans, isLoading } = usePlans();
  const initiatePayment = useInitiatePayment();
  const checkStatus = useCheckPaymentStatus();

  const [step, setStep] = useState<BuyFlowStep>('choose-plan');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const selectedPlan = plans?.find((p) => p.id === selectedPlanId);
  const phoneNumber = user?.phoneNumber ?? '';

  const goToDashboard = () => navigate(CUSTOMER_ROUTES.DASHBOARD);

  const handlePayNow = () => {
    if (!selectedPlanId) return;
    initiatePayment.mutate(
      { planId: selectedPlanId, phoneNumber },
      {
        onSuccess: ({ checkoutRequestId }) => {
          setStep('awaiting-payment');
          checkStatus.mutate(checkoutRequestId, {
            onSuccess: (status) => setStep(status === 'success' ? 'success' : 'failed'),
            onError: () => setStep('failed'),
          });
        },
        onError: (err) => toast.error(err instanceof Error ? err.message : 'Could not start payment'),
      }
    );
  };

  if (step === 'choose-plan') {
    return (
      <ChoosePlanStep
        plans={plans}
        isLoading={isLoading}
        selectedPlanId={selectedPlanId}
        onSelectPlan={setSelectedPlanId}
        onContinue={() => selectedPlanId && setStep('confirm')}
        onBack={goToDashboard}
      />
    );
  }

  if (step === 'confirm' && selectedPlan) {
    return (
      <ConfirmPaymentStep
        plan={selectedPlan}
        phoneNumber={phoneNumber}
        isSubmitting={initiatePayment.isPending}
        onPayNow={handlePayNow}
        onBack={() => setStep('choose-plan')}
      />
    );
  }

  if (step === 'awaiting-payment') {
    return <WaitingForPaymentStep phoneNumber={phoneNumber} onCancel={() => setStep('confirm')} />;
  }

  if (step === 'success' && selectedPlan) {
    return <SuccessStep plan={selectedPlan} onGoToDashboard={goToDashboard} />;
  }

  if (step === 'failed') {
    return <FailedStep onRetry={() => setStep('confirm')} onGoToDashboard={goToDashboard} />;
  }

  return null;
}
