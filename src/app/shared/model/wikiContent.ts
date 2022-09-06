export interface Main {
  warnings: string;
}

export interface Extracts {
  warnings: string;
}

export interface Warnings {
  main: Main;
  extracts: Extracts;
}

export interface Normalized {
  fromencoded: boolean;
  from: string;
  to: string;
}

export interface Page {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
  revisions: Revision[];
}

export interface Revision {
  contentformat: string;
  contentmodel: string;
  content: string;
}


export interface Query {
  normalized: Normalized[];
  pages: Page[];
}

export interface iWikiContent {
  batchcomplete: boolean;
  warnings: Warnings;
  query: Query;

  message?: string;
  isContentError?: boolean;
  isBatchRedirect?: boolean;
  batchRedirectText?: string;
}

export class WikiContent implements iWikiContent {
  public batchcomplete!: boolean;
  public message?: string;
  public warnings!: Warnings;
  public query!: Query;

  public isContentError: boolean = false;
  public isBatchRedirect: boolean = false;
  public batchRedirectText!: string;
  constructor(obj2clone?: WikiContent, modifierObj?: {}, isRedirectApi?: boolean) {
    if (obj2clone) {
      Object.assign(this, obj2clone);

      try {
        if (!isRedirectApi) {
          this.isContentError = ((this.query.pages[0]?.extract?.substring(0, 4) === '<!--' ? true : false) || (this.query.pages[0]?.extract ? false : true));
          if (this.isContentError) {
            this.isBatchRedirect = true;
          }
        }

        if (isRedirectApi) {
          this.isBatchRedirect = this.query.pages[0]?.revisions[0]?.content?.toUpperCase().substring(0, 9) === '#REDIRECT';
          if (this.isBatchRedirect) {
            this.batchRedirectText = this.query.pages[0]?.revisions[0]?.content?.split('[[')[1].split(']]')[0];
          }
        }
      } catch {
        this.batchcomplete = false;
        this.isBatchRedirect = false;
        this.isContentError = false;
      }
    }
    if (modifierObj) {
      Object.assign(this, modifierObj);
    }
  }
}




// export interface Main {
//   warnings: string;
// }

// export interface Revisions {
//   warnings: string;
// }

// export interface Warnings {
//   main: Main;
//   revisions: Revisions;
// }

// export interface Normalized {
//   fromencoded: boolean;
//   from: string;
//   to: string;
// }

// export interface Revision {
//   contentformat: string;
//   contentmodel: string;
//   content: string;
// }

// export interface Page {
//   pageid: number;
//   ns: number;
//   title: string;
//   revisions: Revision[];
// }

// export interface Query {
//   normalized: Normalized[];
//   pages: Page[];
// }

// export interface iWikiContent {
//   batchcomplete: boolean;
//   message?: string;
//   warnings: Warnings;
//   query: Query;
// }
