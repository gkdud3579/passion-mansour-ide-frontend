import create from 'zustand';

const useCodeStore = create((set) => ({
  code: '',
  setCode: (newCode) => set({ code: newCode }),
}));

export default useCodeStore;