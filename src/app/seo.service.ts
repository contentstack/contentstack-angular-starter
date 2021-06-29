import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SeoService {
    constructor() { }
    seoArray: any = [];

    getSeoField(seo, metaTagService) {
        for (const [key, value] of Object.entries(seo)) {
            this.seoArray.push({ name: key.replace('meta_', ''), content: value });
        }
        metaTagService.addTags(this.seoArray);
        return this.seoArray;
    }
}
