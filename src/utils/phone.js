export const Phone = {
  clean(phone) {
    return phone.replace(/\D/g, '');
  },

  isValid(phone) {
    const digits = this.clean(phone);

    if (digits.length === 11 && digits.startsWith("0")) return true;
    if (digits.length === 13 && digits.startsWith("234")) return true;

    return false;
  },

  toAccountNumber(phone) {
    return this.clean(phone).slice(-10);
  },

  toLocal(phone) {
    let digits = this.clean(phone);
    if (digits.startsWith("234")) digits = "0" + digits.slice(3);
    return digits;
  },

  toInternational(phone) {
    let digits = this.clean(phone);
    if (digits.startsWith("0")) digits = "234" + digits.slice(1);
    return "+" + digits;
  },
};