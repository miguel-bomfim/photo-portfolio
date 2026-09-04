import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  image: {
    domains: ["sa-east-1.graphassets.com"]
  },
  build: {
    inlineStylesheets: "auto"
  }
});
