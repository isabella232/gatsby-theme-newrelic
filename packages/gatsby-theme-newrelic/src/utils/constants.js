const prefixStorageKey = (name) => ['gatsby-theme-newrelic', name].join(':');

export const SPLITS = {
  GLOBAL_HEADER_GITHUB_BUTTONS: 'developer-website_global-header-gh-buttons',
  FREE_ACCOUNT_BUTTON_COLOR: 'free_account_button_color',
};

export const SPLIT_TRACKING_EVENTS = {
  GLOBAL_HEADER_CLICK_ACTION: 'global_header.action_clicked',
  GLOBAL_HEADER_FREE_ACCOUNT_CLICK: 'global_header.free_account_button_click',
};

export const STORAGE_KEYS = {
  USER_ID: prefixStorageKey('userId'),
  LAST_ANNOUNCEMENT_DISMISSED: prefixStorageKey('lastAnnouncementDismissed'),
};

export const TRACKING_COOKIE_NAME = 'newrelic-gdpr-consent';

export const DEV_SEGMENT_WRITE_KEY = 'oMdv2YZCnzuC1iTVi9iCnFn6F9ycYb5v';

export const SWIFTYPE_ENGINE_KEY = 'Ad9HfGjDw4GRkcmJjUut';
