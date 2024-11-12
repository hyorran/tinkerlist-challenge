import type { SvelteComponent } from 'svelte';

export type Part = {
  id: string;
  title: string;
  items: Item[];
};

export type Item = {
  id: string;
  title: string;
};

export type Column<T> = {
  id: string;
  label: string;
  accessor: keyof T;
  render?: (item: T) => string | number | SvelteComponent;
};
