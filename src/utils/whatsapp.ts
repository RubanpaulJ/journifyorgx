export function whatsappLink(phoneE164Digits: string, message: string) {
  const phone = phoneE164Digits.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

