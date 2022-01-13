import { useIndexedDBStore } from 'use-indexeddb';
import { WVB } from './WVB';

export const useStore = () => useIndexedDBStore<WVB>('wvb');
