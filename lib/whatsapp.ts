export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
}

export function buildWhatsAppUrl(options: { message?: string; number?: string } = {}) {
  const number = options.number ?? getWhatsAppNumber();
  const message = options.message ?? "Olá! Gostaria de conversar sobre atendimento inteligente para minha clínica.";
  const encodedMessage = encodeURIComponent(message);

  return number
    ? `https://wa.me/${number}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}
