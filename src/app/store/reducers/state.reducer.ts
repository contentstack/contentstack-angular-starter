import { Action, createReducer, on } from '@ngrx/store';
import { actionHeader, actionFooter, actionPage, actionBlogpost } from '../actions/state.actions';
import { Headers } from '../models/header.model';
import { Footer } from '../models/footer.model';
import { Pages } from '../models/page.model';
import { Blogpost } from '../models/blogpost.model';

export interface State {
    header: Headers | {} | null;
    footer: Footer | {} | null;
    page: Pages | {} | null;
    blog_post:Blogpost | {}| null;
  }

export const initialState:State = {
    header: {},
    footer: {},
    page: {},
    blog_post: {}
};

const _stateReducer = createReducer(
    initialState,
    on(actionHeader, (state, { header }) => ({ ...state, header })),
    on(actionFooter, (state, { footer }) => ({ ...state, footer })),
    on(actionPage, (state, { page }) => ({ ...state, page })),
    on(actionBlogpost, (state, {blogpost }) => ({ ...state, blog_post: blogpost }))
);

export function stateReducer(state: State | undefined, action: Action) {
    return _stateReducer(state, action);
}