/**
 * Curxx's helpline, the one place the number lives: footer, contact and customer-care spots, and the
 * partner pages all read it. (108, the national ambulance number, is separate.)
 */
export const HELPLINE = {
  /** As written on the page. */
  display: '+91 85850 84840',
  /** For tel: links. */
  tel: '+918585084840',
} as const;
export const HELPLINE_HREF = `tel:${HELPLINE.tel}`;
