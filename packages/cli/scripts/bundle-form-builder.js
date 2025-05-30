import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, "../");
const formBuilderSrc = path.resolve(__dirname, "../../form-builder/src");
const bundledDest = path.resolve(cliRoot, "form-builder-src");

async function bundleFormBuilder() {
  try {
    console.log("Bundling form-builder...");

    if (!(await fs.pathExists(formBuilderSrc))) {
      console.log(`Form-builder source files not found at ${formBuilderSrc}`);
      process.exit(1);
    }

    await fs.remove(bundledDest);

    await fs.copy(formBuilderSrc, bundledDest, {
      filter: (src) => {
        const relativePath = path.relative(formBuilderSrc, src);

        const skipPatterns = [
          "*.spec.ts",
          "*.test.ts",
          "*.spec.vue",
          "*.test.vue",
          "__tests__",
          "coverage",
          "node_modules",
          ".DS_Store",
          "Thumbs.db",
        ];

        return !skipPatterns.some((pattern) => {
          if (pattern.includes("*")) {
            const regex = new RegExp(pattern.replace("*", ".*"));
            return regex.test(relativePath);
          }
          return relativePath.includes(pattern);
        });
      },
    });

    console.log("Form-builder bundled successfully!");

    const items = await fs.readdir(bundledDest);
    console.log(`Form-builder contains ${items.length} files.`);
    console.log(`Form-builder is ready to be imported from ${bundledDest}`);
  } catch (error) {
    console.log("Failed to bundle form-builder:", error.message);
    process.exit(1);
  }
}

bundleFormBuilder().then(() => {
  console.log("Done!");
  process.exit(0);
});
