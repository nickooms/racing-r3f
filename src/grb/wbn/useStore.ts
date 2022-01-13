import { useIndexedDBStore } from 'use-indexeddb';
import { WBN } from './WBN';

export const useStore = () => useIndexedDBStore<WBN>('wbn');
