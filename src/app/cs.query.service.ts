import { Injectable } from '@angular/core';
import { ContentstackService } from '../modules/contentstack/contentstack.service';

@Injectable({ providedIn: 'root' })
export class ContentstackQueryService {

  constructor(private cs: ContentstackService) { }

  getEntry(contentTypeUid: string, references = []): Promise<any> {

    return this.cs.stack().ContentType(contentTypeUid)
      .Query()
      .includeReference(references)
      .toJSON()
      .find()
      .then(entry => {
        return entry;
      }, err => {
        console.log(err, 'err');
      });
  }

  getEntryWithQuery(contentTypeUid: string, { key, value }, references = []): Promise<any> {
    return this.cs.stack().ContentType(contentTypeUid)
      .Query()
      .where(key, value)
      .includeReference(references)
      .toJSON()
      .find()
      .then(entry => {
        return entry;
      }, err => {
        console.log(err, 'err');
      });
  }
}
