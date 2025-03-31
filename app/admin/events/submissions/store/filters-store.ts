import { create } from 'zustand';

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type DatePreset = 'all' | 'today' | 'week' | 'month' | 'custom';

interface FiltersState {
  status: string;
  search: string;
  dateRange: DateRange;
  datePreset: DatePreset;
  setStatus: (status: string) => void;
  setSearch: (search: string) => void;
  setDateRange: (range: DateRange) => void;
  setDatePreset: (preset: DatePreset) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  status: 'all',
  search: '',
  dateRange: { from: undefined, to: undefined },
  datePreset: 'all',
  setStatus: (status) => set(() => ({ status })),
  setSearch: (search) => set(() => ({ search })),
  setDateRange: (dateRange) => set(() => ({ dateRange, datePreset: 'custom' })),
  setDatePreset: (datePreset) => {
    const today = new Date();
    let dateRange: DateRange = { from: undefined, to: undefined };

    switch (datePreset) {
      case 'today':
        dateRange = {
          from: today,
          to: today,
        };
        break;
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        dateRange = {
          from: weekStart,
          to: today,
        };
        break;
      case 'month':
        const monthStart = new Date(today);
        monthStart.setMonth(today.getMonth() - 1);
        dateRange = {
          from: monthStart,
          to: today,
        };
        break;
      case 'all':
      default:
        dateRange = { from: undefined, to: undefined };
    }

    set(() => ({ datePreset, dateRange }));
  },
  reset: () =>
    set(() => ({
      status: 'all',
      search: '',
      dateRange: { from: undefined, to: undefined },
      datePreset: 'all',
    })),
}));
