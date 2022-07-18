import { useState } from "react";
export const useAlert = (alertType?: string, message?: string) => {
  return useState({ alertType: alertType, message: message });
};
