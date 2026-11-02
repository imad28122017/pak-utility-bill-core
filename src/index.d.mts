/** An ISO calendar date, e.g. 2026-11-02. Validation is performed at runtime. */
export type ISODate = string;
/** Calendar billing month, e.g. 2026-11. Validation is performed at runtime. */
export type BillingPeriod = string;
export type Provider = 'iesco' | 'sngpl' | 'nayatel' | 'cda';
export interface ParsedBill {
  provider: Provider | null;
  reference: string | null;
  amountMinor: number | null;
  dueDate: ISODate | null;
  billingPeriod: BillingPeriod | null;
  issues: string[];
}
export interface BillRecord {
  provider: Provider;
  reference: string;
  amountMinor?: number | null;
  dueDate?: ISODate | null;
  billingPeriod?: BillingPeriod | null;
  paid?: boolean;
  updatedAt?: ISODate;
  source?: string;
  history?: Array<{ billingPeriod?: BillingPeriod | null; amountMinor?: number | null; dueDate?: ISODate | null; paid?: boolean }>;
  [field: string]: unknown;
}
export type Verification = { ok: boolean; issues: string[] };
export type MergeResult =
  | { status: 'needs_review'; bill: BillRecord; issues: string[] }
  | { status: 'updated'; bill: BillRecord; issues: [] };
export function validISODate(value: unknown): value is ISODate;
export function normalizeDate(input: unknown): ISODate | null;
export function normalizePeriod(input: unknown): BillingPeriod | null;
export function daysBetween(todayISO: ISODate, dueISO: ISODate): number | null;
export function parsePKRMinor(input: string | number): number | null;
export function formatPKRMinor(amount: number): string | null;
export const PROVIDER_MARKERS: Readonly<Record<Provider, RegExp>>;
export function parseBillText(rawText: string): ParsedBill;
export function normalizeReference(value: unknown): string;
export function verifyImport(existing: BillRecord | null | undefined, parsed: ParsedBill | null | undefined): Verification;
export function mergeVerifiedBill(existing: BillRecord, parsed: ParsedBill, updatedAt: ISODate): MergeResult;
export type BillStatus = 'marked_paid' | 'unknown' | 'overdue' | 'due_soon' | 'upcoming';
export function billStatus(record: Pick<BillRecord, 'paid' | 'dueDate'> | null, todayISO: ISODate): BillStatus;
