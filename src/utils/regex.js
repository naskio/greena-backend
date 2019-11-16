export const phoneRegex = /^\+?[1-9]\d{1,14}$/; // ISO E.164 (for Twilio)
export const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
export const phoneCountryCodeRegex = /^[1-9]\d{0,2}$/; // max 3
export const phoneSubscriberNumberRegex = /^[1-9]\d{4,14}$/; // 12 to 14 digits or max 12 if(code length 3)
export const passwordStrengthRegex = /^.{8,}$/;
export const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const validationCodeRegex = /^\d{4,10}$/; // max 3
