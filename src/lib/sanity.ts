import sanityClient from "@sanity/client";

const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;

console.log(token);

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
