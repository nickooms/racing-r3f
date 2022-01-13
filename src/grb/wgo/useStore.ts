import { useIndexedDBStore } from 'use-indexeddb';
import { WGO } from './WGO';

export const useStore = () => useIndexedDBStore<WGO>('wgo');
