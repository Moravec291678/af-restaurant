import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);

export function getSanityImageUrl(source) {
  if (!source) {
    return null;
  }

  return builder.image(source).width(900).auto("format").url();
}
