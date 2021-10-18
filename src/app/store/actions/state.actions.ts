import { createAction, props } from '@ngrx/store';
import { Headers } from '../models/header.model';
import { Footer } from '../models/footer.model';
import { Pages } from '../models/page.model';
import { Blogpost } from '../models/blogpost.model';

export const actionHeader = createAction('[Header Component] Header',props<{header:Headers}>());
export const actionFooter = createAction('[Footer Component] Footer',props<{footer:Footer}>());
export const actionPage = createAction('[Page Component ] Page',props<{page:Pages}>());
export const actionBlogpost = createAction('[Blog post Component] Blogpost',props<{blogpost:Blogpost}>());