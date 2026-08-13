import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/** Format a number as Kenyan Shillings, e.g. 1250 -> "KSh 1,250" */
export function formatCurrency(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`;
}

/** Format an ISO date to a friendly absolute string, e.g. "22 Jul 2026, 10:30 AM" */
export function formatDateTime(iso: string): string {
  return dayjs(iso).format('D MMM YYYY, h:mm A');
}

export function formatDate(iso: string): string {
  return dayjs(iso).format('D MMM YYYY');
}

/** Format an ISO date as a relative string, e.g. "5 mins ago" */
export function formatRelativeTime(iso: string): string {
  return dayjs(iso).fromNow();
}

/** Format seconds remaining as e.g. "18h 42m 45s" */
export function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return '0s';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (h > 0 || m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

/** Mask a phone number for display, e.g. "+254712345678" -> "+254 7** *** 678" */
export function maskPhone(phone: string): string {
  if (phone.length < 7) return phone;
  return `${phone.slice(0, 4)} ${phone.slice(4, 5)}** *** ${phone.slice(-3)}`;
}

/** Normalize a local Kenyan number into +254 format for display/sending */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('254')) return `+${digits}`;
  if (digits.startsWith('0')) return `+254${digits.slice(1)}`;
  return `+254${digits}`;
}
