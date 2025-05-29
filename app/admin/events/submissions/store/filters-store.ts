import { create } from 'zustand';

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

export type DatePreset =
  | 'all'
  | 'today'
  | 'week'
  | 'month'
  | 'last3days'
  | 'custom';

export const datePresetMap: Record<DatePreset, string> = {
  all: 'All',
  today: 'Today',
  week: 'Last 7 Days',
  month: 'Last 30 Days',
  last3days: 'Last 3 Days',
  custom: 'Custom',
};

interface FiltersState {
  status: string;
  search: string;
  dateRange: DateRange;
  datePreset: DatePreset;
  currentPage: number;
  setStatus: (status: string) => void;
  setSearch: (search: string) => void;
  setDateRange: (range: DateRange) => void;
  setDatePreset: (preset: DatePreset) => void;
  setCurrentPage: (page: number) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  status: 'all',
  search: '',
  dateRange: { from: undefined, to: undefined },
  datePreset: 'last3days',
  currentPage: 1,
  setStatus: (status) => set(() => ({ status, currentPage: 1 })),
  setSearch: (search) => set(() => ({ search, currentPage: 1 })),
  setDateRange: (dateRange) =>
    set(() => ({ dateRange, datePreset: 'custom', currentPage: 1 })),
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
      case 'last3days':
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);
        dateRange = {
          from: threeDaysAgo,
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

    set(() => ({ datePreset, dateRange, currentPage: 1 }));
  },
  setCurrentPage: (currentPage) => set(() => ({ currentPage })),
  reset: () =>
    set(() => ({
      status: 'all',
      search: '',
      dateRange: { from: undefined, to: undefined },
      datePreset: 'last3days',
      currentPage: 1,
    })),
}));
