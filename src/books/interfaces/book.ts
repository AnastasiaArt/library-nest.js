export interface Book {
    id: string;
    title: string;
    description: string;
    authors: string;
    fileName: string;
    fileBook: string;
    favorite?: string;
    fileCover?: string;
}

export class CreateBookDto {
    title: string;
    description: string;
    authors: string;
    fileName: string;
}