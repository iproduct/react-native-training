interface BooksResponse {
    kind: string;
    totalItems: number;
    items: Item[];
  }
  
  interface Item {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
  }
  
  interface SearchInfo {
    textSnippet: string;
  }
  
  interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Epub;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  }
  
  interface Epub {
    isAvailable: boolean;
    acsTokenLink?: string;
  }
  
  interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
  }
  
  interface VolumeInfo {
    title: string;
    subtitle?: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers?: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
    averageRating?: number;
    ratingsCount?: number;
  }
  
  interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
  }
  
  interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  }
  
  interface ReadingModes {
    text: boolean;
    image: boolean;
  }
  
  interface IndustryIdentifier {
    type: string;
    identifier: string;
  }