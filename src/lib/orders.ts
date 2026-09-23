import type { Order, OrderStatus } from './api';

export const ORDER_STEPS: Record<Order['kind'], { status: OrderStatus; label: string; icon: string }[]> = {
  pharmacy: [
    { status: 'placed', label: 'Order placed', icon: 'receipt_long' },
    { status: 'confirmed', label: 'Pharmacist verified', icon: 'verified' },
    { status: 'packed', label: 'Packed', icon: 'inventory_2' },
    { status: 'out_for_delivery', label: 'Out for delivery', icon: 'local_shipping' },
    { status: 'delivered', label: 'Delivered', icon: 'home' },
  ],
  lab: [
    { status: 'sample_scheduled', label: 'Collection scheduled', icon: 'event_available' },
    { status: 'sample_collected', label: 'Sample collected', icon: 'science' },
    { status: 'report_ready', label: 'Report ready', icon: 'lab_profile' },
  ],
};

export const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: 'Placed',
  confirmed: 'Confirmed',
  packed: 'Packed',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  sample_scheduled: 'Collection scheduled',
  sample_collected: 'Sample collected',
  report_ready: 'Report ready',
  cancelled: 'Cancelled',
};

const LAB_VISIT_STEPS = [
  { status: 'sample_scheduled' as const, label: 'Lab visit booked', icon: 'event_available' },
  { status: 'sample_collected' as const, label: 'Sample given at the lab', icon: 'science' },
  { status: 'report_ready' as const, label: 'Report ready', icon: 'lab_profile' },
];

/** Tracking steps; a walk-in lab visit reads differently from a home collection. */
export const orderSteps = (o: Order) => (o.kind === 'lab' && o.collectionMode === 'lab' ? LAB_VISIT_STEPS : ORDER_STEPS[o.kind]);

export const statusLabel = (o: Order) => (o.kind === 'lab' && o.collectionMode === 'lab' && o.status === 'sample_scheduled' ? 'Lab visit booked' : STATUS_LABEL[o.status]);

export const cancellable = (o: Order) => (o.kind === 'pharmacy' ? ['placed', 'confirmed'] : ['sample_scheduled']).includes(o.status);

export const statusTone = (s: OrderStatus) =>
  s === 'cancelled' ? 'bg-[#FAFAF9] border-[#E7E5E4] text-[#78716C]' : s === 'delivered' || s === 'report_ready' ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]' : 'bg-[#FFF7ED] border-[#FED7AA] text-[#B45309]';
