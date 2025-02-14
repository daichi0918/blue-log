/**
 * navigation
 *
 * @package constants
 */

/**
 * ベースPATH
 * @type {string}
 */
export const BASE_PATH = "";

/**
 * リンク先一覧
 * 遷移先定義の際に使用
 * @type {{TOP: string, CREATE: string, EDIT: string, DETAIL: string}}
 */
export const NAVIGATION_LIST = {
  LOGIN: `${BASE_PATH}/signin`,
  SIGNUP: `${BASE_PATH}/signup`,
  TOP: `${BASE_PATH}/`,
};

/**
 * パス一覧
 * 画面遷移時の使用
 * @type {{TOP: string, CREATE: string, EDIT: string, DETAIL: string}}
 */
export const NAVIGATION_PATH = {
  TOP: `/`,
  SIGNIN: `/signin`,
  SIGNUP: `/signup`,
  ARTICLE: `/article/`,
  // CREATE: `/todo/create`,
  // EDIT: `/todo/edit/`,
};
