import { ChevronRight, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { BottomSheet } from '@/components/ui';
import { SUPPORT_CONTACT } from '@/constants/routes';

interface SupportBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportBottomSheet({ isOpen, onClose }: SupportBottomSheetProps) {
  const items = [
    {
      key: 'whatsapp',
      label: 'Chat on WhatsApp',
      sub: 'Get quick help',
      icon: MessageCircle,
      href: `https://wa.me/${SUPPORT_CONTACT.whatsapp}`,
    },
    {
      key: 'call',
      label: 'Call Us',
      sub: SUPPORT_CONTACT.phone,
      icon: Phone,
      href: `tel:${SUPPORT_CONTACT.phone}`,
    },
    {
      key: 'faq',
      label: 'FAQs',
      sub: 'Find answers to common questions',
      icon: HelpCircle,
      href: '#',
    },
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Support">
      <p className="mb-3 text-sm text-slate-400">How can we help you?</p>
      <div className="flex flex-col divide-y divide-slate-100">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 py-3.5 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink-900">{item.label}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </a>
          );
        })}
      </div>
    </BottomSheet>
  );
}
