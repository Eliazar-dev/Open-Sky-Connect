import { MessageCircle, Phone } from 'lucide-react';
import { SUPPORT_CONTACT } from '@/constants/routes';

export function NeedHelpFooter() {
  return (
    <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
      <span>Need Help?</span>
      <a
        href={`https://wa.me/${SUPPORT_CONTACT.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 font-medium text-brand-600 hover:underline"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        WhatsApp
      </a>
      <a href={`tel:${SUPPORT_CONTACT.phone}`} className="flex items-center gap-1 font-medium text-brand-600 hover:underline">
        <Phone className="h-3.5 w-3.5" />
        Call Us
      </a>
    </div>
  );
}
