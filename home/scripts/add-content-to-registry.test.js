const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const path = require("node:path");
const { githubUrlToLocalPath } = require("./add-content-to-registry");

describe("githubUrlToLocalPath", () => {
  it("rejects trusted-prefix paths that escape the templates directory", () => {
    const templatesDir = path.join(__dirname, "..", "..", "templates");
    const crafted =
      "https://raw.githubusercontent.com/ln-dev7/square-ui/master/templates/../../home/.env";

    assert.equal(githubUrlToLocalPath(crafted, templatesDir), null);
  });
});
