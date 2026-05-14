import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: object;
}

const BASE_URL = "https://easymei.com.br";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({ title, description, canonical, ogType = "website", ogImage, noIndex = false, jsonLd }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("EasyMei") ? title : `${title} | EasyMei`;
    document.title = fullTitle;

    setMeta("description", description);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

    const canonicalHref = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    setLink("canonical", canonicalHref);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:url", canonicalHref, "property");
    if (ogImage) {
      setMeta("og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`, "property");
    }

    // Twitter
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    // JSON-LD dinâmico
    if (jsonLd) {
      setJsonLd("dynamic-jsonld", jsonLd);
    }
  }, [title, description, canonical, ogType, ogImage, noIndex, jsonLd]);
}
