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

enum ComponentType {
    ActionRow = 1,
    Button = 2,
    StringSelect = 3,
    UserSelect = 5,
    RoleSelect = 6,
    MentionableSelect = 7,
    ChannelSelect = 8,
    Section = 9,
    TextDisplay = 10,
    Thumbnail = 11,
    MediaGallery = 12,
    File = 13,
    Separator = 14,
    Container = 17
}

enum AccessoryType {
    Thumbnail = 11,
    Button = 2,
}

interface ParserOptions {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  heading?: boolean;
  blockquote?: boolean;
  unorderedList?: boolean;
  orderedList?: boolean;
  link?: boolean;
  newline?: boolean;
  code?: boolean;
  subtext?: boolean;
}

type Thumbnail = {
    media: MediaObject;
    description?: string;
    spoiler?: boolean;
}