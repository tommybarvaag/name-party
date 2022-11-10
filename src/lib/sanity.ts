import sanityClient from "@sanity/client";

const token =
  "skHCqG8HlFAwfIUCkqA97Psy7VhPWUEmhoHwAr3BuvUPCy2s0UzE5TjLbp96C0VgkF16FZasncsI2gr8NukD04nDxVJP8nveRSmFWg7zhOCd5GyTuATMNobWqeKf7XysF9JeGk5Bpq2DmVkWw1Q1JPuY6uNnq984GOpQXli8LRNhHIdwcteB";

export default sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: "9x5c2mih",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-08-31",
  token,
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
});
