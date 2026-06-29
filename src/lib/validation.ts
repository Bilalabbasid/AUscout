export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  const re = /^\+?[\d\s\-()]{7,15}$/;
  return re.test(phone);
}

export interface WaitlistFormData {
  full_name: string;
  email: string;
  phone: string;
  role: string;
  leagues: string[];
  message: string;
  consent: boolean;
}

export interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  role?: string;
  consent?: string;
}

export function validateWaitlistForm(data: WaitlistFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.full_name.trim()) {
    errors.full_name = "Full name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!data.role) {
    errors.role = "Please select your role.";
  }

  if (!data.consent) {
    errors.consent = "You must agree to be contacted.";
  }

  return errors;
}
