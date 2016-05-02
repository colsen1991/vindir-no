import { combineReducers } from 'redux';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import {
  SEARCH_EXCERPTS,
  FETCH_EXCERPTS_START,
  FETCH_EXCERPTS_SUCCESSFUL,
  FETCH_EXCERPTS_ERROR,
  FETCH_BLOG_START,
  FETCH_BLOG_SUCCESSFUL,
  FETCH_BLOG_ERROR,
  SHOW_COMMENTS,
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_ALL_BLOGS_START,
  FETCH_ALL_BLOGS_SUCCESSFUL,
  FETCH_ALL_BLOGS_ERROR,
  FETCH_BLOG_FOR_EDITING_START,
  FETCH_BLOG_FOR_EDITING_SUCCESSFUL,
  FETCH_BLOG_FOR_EDITING_ERROR,
  TITLE_CHANGED,
  TAGS_CHANGED,
  HEADER_IMAGE_LINK_CHANGED,
  EXCERPT_CHANGED,
  TEXT_CHANGED,
  PUBLISHED_CHANGED,
  SAVE_BLOG_START,
  SAVE_BLOG_SUCCESSFUL,
  SAVE_BLOG_ERROR
} from './actions';

export const initialState = {
  routing: {},
  excerpts: {
    data: [],
    fetching: true,
    error: false,
    search: 'travel'
  },
  blog: {
    data: {
      id: '',
      headerImageLink: '',
      title: '',
      tags: [],
      date: '',
      author: '',
      excerpt: '',
      text: ''
    },
    fetching: true,
    error: false,
    showComments: false
  },
  login: {
    loggedIn: false,
    posting: false,
    error: false,
    success: false,
    username: '',
    password: '',
    token: '',
    name: ''
  },
  allBlogs: {
    data: [],
    fetching: true,
    error: false
  },
  blogForEditing: {
    data: {
      id: '',
      headerImageLink: '',
      title: '',
      tags: [],
      date: '',
      author: '',
      excerpt: '',
      text: '',
      published: false
    },
    fetching: true,
    errorFetching: false,
    saving: false,
    successSaving: false,
    errorSaving: false
  }
};

export function excerpts(excerpts = initialState.excerpts, { type, payload, error }) {
  switch (type) {
    case FETCH_EXCERPTS_START:
      return { ...excerpts, fetching: true, error: false };
    case FETCH_EXCERPTS_SUCCESSFUL:
      return { ... excerpts, fetching: false, error: false, data: payload };
    case FETCH_EXCERPTS_ERROR:
      return { ...excerpts, fetching: false, error, data: payload };
    case SEARCH_EXCERPTS:
      return { ... excerpts, search: payload };
    default:
      return excerpts;
  }
}

export function blog(blog = initialState.blog, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG_START:
      return { ...blog, fetching: true, error: false, showComments: false };
    case FETCH_BLOG_SUCCESSFUL:
      return { ... blog, fetching: false, error: false, showComments: false, data: payload };
    case FETCH_BLOG_ERROR:
      return { ...blog, fetching: false, error, showComments: false, data: payload };
    case SHOW_COMMENTS:
      return { ...blog, showComments: true };
    default:
      return blog;
  }
}

function login(login = initialState.login, { type, payload, error }) {
  switch (type) {
    case USERNAME_CHANGED:
      return { ...login, username: payload };
    case PASSWORD_CHANGED:
      return { ...login, password: payload };
    case LOGIN_START:
      return { ...login, posting: true, error: false, success: false };
    case LOGIN_SUCCESS:
      return { ...initialState.login, success: true, loggedIn: true, token: payload.token, name: payload.name };
    case LOGIN_ERROR:
      return { ...login, posting: false, error, success: false, loggedIn: false };
    case LOCATION_CHANGE:
      return { ...initialState.login, loggedIn: login.loggedIn, token: login.token, name: login.name };
    default:
      return login;
  }
}

export function allBlogs(allBlogs = initialState.allBlogs, { type, payload, error }) {
  switch (type) {
    case FETCH_ALL_BLOGS_START:
      return { ...allBlogs, fetching: true, error: false };
    case FETCH_ALL_BLOGS_SUCCESSFUL:
      return { ... allBlogs, fetching: false, error: false, data: payload };
    case FETCH_ALL_BLOGS_ERROR:
      return { ...allBlogs, fetching: false, error, data: payload };
    default:
      return allBlogs;
  }
}

export function blogForEditing(blog = initialState.blogForEditing, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG_FOR_EDITING_START:
      return { ...blog, fetching: true, errorFetching: false };
    case FETCH_BLOG_FOR_EDITING_SUCCESSFUL:
      return { ... blog, fetching: false, errorFetching: false, data: payload };
    case FETCH_BLOG_FOR_EDITING_ERROR:
      return { ...blog, fetching: false, errorFetching: error, data: payload };
    case TITLE_CHANGED:
      return { ...blog, data: { ...blog.data, title: payload } };
    case TAGS_CHANGED:
      return { ...blog, data: { ...blog.data, tags: payload } };
    case HEADER_IMAGE_LINK_CHANGED:
      return { ...blog, data: { ...blog.data, headerImageLink: payload } };
    case EXCERPT_CHANGED:
      return { ...blog, data: { ...blog.data, excerpt: payload } };
    case TEXT_CHANGED:
      return { ...blog, data: { ...blog.data, text: payload } };
    case PUBLISHED_CHANGED:
      return { ...blog, data: { ...blog.data, published: !blog.data.published } };
    case SAVE_BLOG_START:
      return { ...blog, saving: true, errorSaving: false, successSaving: false };
    case SAVE_BLOG_SUCCESSFUL:
      return { ...blog, saving: false, errorSaving: false, successSaving: true };
    case SAVE_BLOG_ERROR:
      return { ...blog, saving: false, errorSaving: error, successSaving: false };
    case LOCATION_CHANGE:
      return initialState.blogForEditing;
    default:
      return blog;
  }
}

export default combineReducers({
  routing: routerReducer,
  excerpts,
  blog,
  login,
  allBlogs,
  blogForEditing
});
