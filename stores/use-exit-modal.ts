import {create} from 'zustand'

interface ExitModalState {
  isOpen: boolean;
  openModal: () => void
  closeModal: () => void
}

export const useExitModal = create<ExitModalState>((set) => ({
  isOpen: false,
  openModal: () => set({isOpen: true}),
  closeModal: () => set({isOpen: false}),
}))