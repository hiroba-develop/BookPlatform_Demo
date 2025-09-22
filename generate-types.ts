import { generate } from "openapi-typescript-codegen";

generate({
  input: "./api/swagger_yaml_api.yaml",
  output: "./src/api",
  httpClient: "fetch",
  useOptions: true,
});
