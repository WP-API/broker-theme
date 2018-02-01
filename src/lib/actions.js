import { apps, pages } from './types';

export const getApp = apps.fetchSingle;
export const getAppForEdit = id => apps.fetchSingle( id, 'edit' );
export const getArchive = apps.fetchArchive;
export const updateApp = apps.updateSingle;
export const createApp = apps.createSingle;

export const getPage = pages.fetchPageByPath;
