export interface ImageItem {
  id: string;
  src: string;
  alertMessage?: string;
  alertTitle?: string;
  wrongPositionMessage?: string;
  hintMessage?: string;
}

export interface Position {
  id: string;
  number: number;
  imageId: string | null;
}

