import { Injectable } from '@angular/core';
import { ContentstackService } from '../modules/contentstack/contentstack.service';
import * as Utils from "@contentstack/utils";
@Injectable({ providedIn: 'root' })
export class ContentstackQueryService {

  constructor(private cs: ContentstackService) { }
  renderOption = {
    ["span"]: (node, next) => {
      return next(node.children);
    },
  }

  onEntryChange = this.cs.stack().livePreview

  getEntry(contentTypeUid: string, references = [], jsonRtePath = []): Promise<any> {
    
    return this.cs.stack().contentstack.ContentType(contentTypeUid)
      .Query()
      .includeReference(references)
      .toJSON()
      .find()
      .then(entry => {
        jsonRtePath.length > 0 &&
          Utils.jsonToHTML({
            entry,
            paths: jsonRtePath,
            renderOption: this.renderOption,
          });
        return entry;
      }, err => {
        console.log(err, 'err');
      });
  }

  getEntryWithQuery(contentTypeUid: string, { key, value }, references = [], jsonRtePath = []): Promise<any> {
    return this.cs.stack().contentstack.ContentType(contentTypeUid)
      .Query()
      .where(key, value)
      .includeReference(references)
      .toJSON()
      .find()
      .then(entry => {
        jsonRtePath.length > 0 &&
          Utils.jsonToHTML({
            entry,
            paths: jsonRtePath,
            renderOption: this.renderOption,
          });
        return entry;
      }, err => {
        console.log(err, 'err');
      });
  }
}
