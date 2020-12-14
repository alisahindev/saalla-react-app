export const LOADER_START = 'LOADER_START';
export const LOADER_END = 'LOADER_END';

export const setLoader = loading => ({ type: loading ? LOADER_START : LOADER_END });
