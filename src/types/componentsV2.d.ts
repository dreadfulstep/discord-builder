type MediaObject = {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
    content_type?: string;
};

type GalleryItem = {
    media: MediaObject;
    spoiler: boolean;
    description: string;
};

type MediaGalleryProps = {
    items: GalleryItem[];
}