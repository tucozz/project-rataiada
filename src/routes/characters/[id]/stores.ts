import { writable } from 'svelte/store';
import { Page } from './types';

export const currentPage = writable(Page.Home);
