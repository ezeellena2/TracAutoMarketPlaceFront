/**
 * Store global de notificaciones Toast
 * Permite mostrar mensajes de éxito, error, info desde cualquier lugar
 */

import { create } from 'zustand';

export type TipoToast = 'exito' | 'error' | 'info' | 'advertencia';

export interface Toast {
  id: string;
  tipo: TipoToast;
  mensaje: string;
  duracion?: number;
}

interface ToastState {
  toasts: Toast[];
  agregarToast: (tipo: TipoToast, mensaje: string, duracion?: number) => void;
  removerToast: (id: string) => void;
  // Helpers
  exito: (mensaje: string) => void;
  error: (mensaje: string) => void;
  info: (mensaje: string) => void;
  advertencia: (mensaje: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  agregarToast: (tipo, mensaje, duracion = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const toast: Toast = { id, tipo, mensaje, duracion };

    set((state) => ({ toasts: [...state.toasts, toast] }));

    // Auto-remover después de la duración
    if (duracion > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duracion);
    }
  },

  removerToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  // Helpers para uso más simple
  exito: (mensaje) => useToastStore.getState().agregarToast('exito', mensaje),
  error: (mensaje) => useToastStore.getState().agregarToast('error', mensaje),
  info: (mensaje) => useToastStore.getState().agregarToast('info', mensaje),
  advertencia: (mensaje) => useToastStore.getState().agregarToast('advertencia', mensaje),
}));

// Helper functions para usar sin hook
export const toast = {
  exito: (mensaje: string) => useToastStore.getState().exito(mensaje),
  error: (mensaje: string) => useToastStore.getState().error(mensaje),
  info: (mensaje: string) => useToastStore.getState().info(mensaje),
  advertencia: (mensaje: string) => useToastStore.getState().advertencia(mensaje),
};
