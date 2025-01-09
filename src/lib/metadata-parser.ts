import { type HTMLElement, parse } from "node-html-parser";

// Types and Interfaces
type MetaData = Record<string, string>;

interface BaseMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  themeColor?: string;
  icon?: string;
  shortcutIcon?: string;
  appleIcon?: string;
}

interface OpenGraphImage {
  url?: string;
  width?: string;
  height?: string;
}

interface OpenGraphVideo extends OpenGraphImage {
  secureUrl?: string;
  type?: string;
  tags?: string[];
}

interface OpenGraph {
  siteName?: string;
  url?: string;
  title?: string;
  description?: string;
  type?: string;
  image?: OpenGraphImage;
  video?: OpenGraphVideo;
}

interface AppPlatform {
  appName?: string;
  url?: string;
}

interface AppLinks {
  ios?: AppPlatform & { appStoreId?: string };
  android?: AppPlatform & { packageName?: string };
  web?: { url?: string };
}

interface TwitterPlayer {
  url?: string;
  width?: string;
  height?: string;
}

interface TwitterApp {
  name?: string;
  id?: string;
  url?: string;
}

interface Twitter {
  card?: string;
  site?: string;
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  player?: TwitterPlayer;
  apps?: {
    iphone?: TwitterApp;
    ipad?: TwitterApp;
    googleplay?: TwitterApp;
  };
}

interface GroupedMetadata {
  base: BaseMetadata;
  openGraph: OpenGraph;
  appLinks: AppLinks;
  twitter: Twitter;
  facebook?: {
    appId?: string;
  };
}

// Main functions
export function parseMetadata(html: string): GroupedMetadata {
  const root = parse(html);
  const metaTags = root.querySelectorAll("meta");
  const metadata: MetaData = extractMetadata(metaTags);
  const groupedMetadata = groupMetadata(metadata);
  const icons = extractIconMetadata(root, groupedMetadata.openGraph.url);

  if (!groupedMetadata.base.title) {
    groupedMetadata.base.title = root.querySelector("title")?.text;
  }

  return { ...groupedMetadata, base: { ...groupedMetadata.base, ...icons } };
}

function extractMetadata(metaTags: HTMLElement[]): MetaData {
  const metadata: MetaData = {};

  for (const meta of metaTags) {
    const name = meta.getAttribute("name") || meta.getAttribute("property");
    const content = meta.getAttribute("content");

    if (name && content) {
      metadata[name] = content;
    }
  }

  return metadata;
}

function groupMetadata(metadata: MetaData): GroupedMetadata {
  return {
    base: extractBaseMetadata(metadata),
    openGraph: extractOpenGraphMetadata(metadata),
    appLinks: extractAppLinksMetadata(metadata),
    twitter: extractTwitterMetadata(metadata),
    ...(metadata["fb:app_id"] && { facebook: { appId: metadata["fb:app_id"] } }),
  };
}

// Helper functions for metadata extraction
function extractBaseMetadata(metadata: MetaData): BaseMetadata {
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    themeColor: metadata["theme-color"],
  };
}

function extractOpenGraphMetadata(metadata: MetaData): OpenGraph {
  return {
    siteName: metadata["og:site_name"],
    url: metadata["og:url"],
    title: metadata["og:title"],
    description: metadata["og:description"],
    type: metadata["og:type"],
    image: extractOpenGraphImage(metadata),
    video: metadata["og:video:url"] ? extractOpenGraphVideo(metadata) : undefined,
  };
}

function extractOpenGraphImage(metadata: MetaData): OpenGraphImage {
  return {
    url: metadata["og:image"],
    width: metadata["og:image:width"],
    height: metadata["og:image:height"],
  };
}

function extractOpenGraphVideo(metadata: MetaData): OpenGraphVideo {
  return {
    url: metadata["og:video:url"],
    secureUrl: metadata["og:video:secure_url"],
    type: metadata["og:video:type"],
    width: metadata["og:video:width"],
    height: metadata["og:video:height"],
    tags: metadata["og:video:tag"] ? [metadata["og:video:tag"]] : undefined,
  };
}

function extractAppLinksMetadata(metadata: MetaData): AppLinks {
  return {
    ios: {
      appStoreId: metadata["al:ios:app_store_id"],
      appName: metadata["al:ios:app_name"],
      url: metadata["al:ios:url"],
    },
    android: {
      appName: metadata["al:android:app_name"],
      packageName: metadata["al:android:package"],
      url: metadata["al:android:url"],
    },
    web: {
      url: metadata["al:web:url"],
    },
  };
}

function extractTwitterMetadata(metadata: MetaData): Twitter {
  return {
    card: metadata["twitter:card"],
    site: metadata["twitter:site"],
    url: metadata["twitter:url"],
    title: metadata["twitter:title"],
    description: metadata["twitter:description"],
    image: metadata["twitter:image"],
    player: metadata["twitter:player"] ? extractTwitterPlayer(metadata) : undefined,
    apps: extractTwitterApps(metadata),
  };
}

function extractTwitterPlayer(metadata: MetaData): TwitterPlayer {
  return {
    url: metadata["twitter:player"],
    width: metadata["twitter:player:width"],
    height: metadata["twitter:player:height"],
  };
}

function extractTwitterApps(metadata: MetaData): Twitter["apps"] {
  return {
    iphone: extractTwitterPlatformApp(metadata, "iphone"),
    ipad: extractTwitterPlatformApp(metadata, "ipad"),
    googleplay: extractTwitterPlatformApp(metadata, "googleplay"),
  };
}

function extractTwitterPlatformApp(metadata: MetaData, platform: string): TwitterApp {
  return {
    name: metadata[`twitter:app:name:${platform}`],
    id: metadata[`twitter:app:id:${platform}`],
    url: metadata[`twitter:app:url:${platform}`],
  };
}
function extractIconMetadata(
  root: HTMLElement,
  site?: string,
): Pick<BaseMetadata, "icon" | "shortcutIcon" | "appleIcon"> {
  const icons: Pick<BaseMetadata, "icon" | "shortcutIcon" | "appleIcon"> = {};
  const linkTags = root.querySelectorAll("link");

  const relToKey: Record<
    string,
    keyof Pick<BaseMetadata, "icon" | "shortcutIcon" | "appleIcon">
  > = {
    icon: "icon",
    "shortcut icon": "shortcutIcon",
    "apple-touch-icon": "appleIcon",
  };

  for (const link of linkTags) {
    const rel = link.getAttribute("rel");
    const href = link.getAttribute("href");

    if (!(href && rel && rel in relToKey)) continue;

    const key = relToKey[rel] as keyof Pick<
      BaseMetadata,
      "icon" | "shortcutIcon" | "appleIcon"
    >;
    icons[key] = href.startsWith("http")
      ? href
      : site
        ? new URL(href, site).toString()
        : undefined;
  }

  return icons;
}
