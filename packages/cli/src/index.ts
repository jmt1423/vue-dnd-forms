import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import inquirer from "inquirer";
import { execa } from "execa";
import ora from "ora";
import { fileURLToPath } from "node:url";
import type { CliOptions, PackageInfo } from "./types.js";

const dependencies = [
  "@formkit/drag-and-drop",
  "@formkit/vue",
  "@vueuse/core",
  "class-variance-authority",
  "clsx",
  "lucide-vue-next",
  "reka-ui",
  "tailwind-merge",
  "vue-sonner",
];

const getDirname = (): string => {
  const __filename = fileURLToPath(import.meta.url);
  return path.dirname(__filename);
};

const findFormBuilderSrcPath = (): string => {
  const currentDir = getDirname();
  
  // Look for bundled source files in CLI package
  const bundledPath = path.resolve(currentDir, "../../form-builder-src");
  if (fs.existsSync(bundledPath)) {
    return bundledPath;
  }
  
  throw new Error(
    "Could not locate form-builder source files.\n" +
    "This seems to be a CLI package issue. Please report this bug."
  );
};

export async function main(): Promise<void> {
  console.log(chalk.green.bold("Vue Form Forge Installer"));
  console.log(
    chalk.gray("This tool will copy all form-builder components to your Vue 3 project."),
  );

  const answers = await inquirer.prompt<CliOptions>([
    {
      type: "input",
      name: "targetDir",
      message: "Where do you want to install the form builder components?",
      default: "src/components/form-builder",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Please enter a valid directory path";
        }
        return true;
      }
    },
    {
      type: "confirm",
      name: "installDeps",
      message: "Do you want to install the required dependencies?",
      default: true,
    },
  ]);

  // Check for Vue
  try {
    const packageJson = (await fs.readJSON("package.json")) as PackageInfo;
    if (!packageJson.dependencies?.vue && !packageJson.devDependencies?.vue) {
      console.log(
        chalk.red.bold(
          "Vue is not installed in your project. This project requires Vue 3.",
        ),
      );

      const { installVue } = await inquirer.prompt<{ installVue: boolean }>([
        {
          type: "confirm",
          name: "installVue",
          message: "Do you want to install Vue 3?",
          default: true,
        },
      ]);

      if (installVue) {
        dependencies.push("vue");
      } else {
        console.log(chalk.yellow("Skipping Vue installation. Please install Vue 3 manually."));
        process.exit(1);
      }
    }
  } catch (error) {
    console.log(
      chalk.red.bold(
        "Could not find package.json. Please run this command in your project root.",
      ),
    );
    process.exit(1);
  }

  const destPath = path.resolve(process.cwd(), answers.targetDir);
  const spinner = ora("Setting up form-builder components...").start();

  try {
    // Find the form-builder source path
    const formBuilderSrcPath = findFormBuilderSrcPath();
    spinner.text = "Found form-builder source files...";
    
    // Create the target directory (including parent directories)
    await fs.ensureDir(destPath);
    spinner.text = "Created target directory...";
    
    // Check if directory already has content
    const existingFiles = await fs.readdir(destPath);
    if (existingFiles.length > 0) {
      spinner.stop();
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
        {
          type: "confirm",
          name: "overwrite",
          message: `Directory ${answers.targetDir} already exists and is not empty. Overwrite?`,
          default: false,
        },
      ]);
      
      if (!overwrite) {
        console.log(chalk.yellow("Installation cancelled."));
        process.exit(0);
      }
      spinner.start("Copying form-builder components...");
    }
    
    // Copy all files from bundled source to target directory
    await fs.copy(formBuilderSrcPath, destPath, {
      overwrite: true,
      filter: (src) => {
        // Skip the bundle metadata file
        return !src.endsWith('.bundle-info.json');
      }
    });

    spinner.succeed("Form-builder components copied successfully!");
    
    // Show what was copied
    console.log(chalk.cyan(`\n📁 Components installed to: ${chalk.bold(answers.targetDir)}`));
    
    // List the main items that were copied
    const copiedItems = await fs.readdir(destPath);
    if (copiedItems.length > 0) {
      console.log(chalk.gray("   Contents:"));
      copiedItems.slice(0, 10).forEach(item => {
        console.log(chalk.gray(`   ├── ${item}`));
      });
      if (copiedItems.length > 10) {
        console.log(chalk.gray(`   └── ... and ${copiedItems.length - 10} more items`));
      }
    }

  } catch (error) {
    spinner.fail("Failed to copy components");
    if (error instanceof Error) {
      console.error(chalk.red("Error:"), error.message);
    } else {
      console.error(chalk.red("Unknown error:"), error);
    }
    process.exit(1);
  }

  // Install dependencies
  if (answers.installDeps) {
    const depSpinner = ora("Installing dependencies...").start();

    try {
      const packageManager = fs.existsSync("yarn.lock") ? "yarn" : 
                           fs.existsSync("pnpm-lock.yaml") ? "pnpm" : "npm";

      depSpinner.text = `Installing dependencies with ${packageManager}...`;

      if (packageManager === "yarn") {
        await execa("yarn", ["add", ...dependencies]);
      } else if (packageManager === "pnpm") {
        await execa("pnpm", ["add", ...dependencies]);
      } else {
        await execa("npm", ["install", ...dependencies]);
      }

      depSpinner.succeed("Dependencies installed successfully!");
    } catch (error) {
      depSpinner.fail("Failed to install dependencies");
      console.log(chalk.yellow("\n⚠️  You may need to install them manually:"));
      console.log(chalk.gray(`npm install ${dependencies.join(" ")}`));
    }
  }

  // Final success message
  console.log("\n" + chalk.green.bold("🎉 Installation complete!"));
  console.log(chalk.cyan("You can now import and use the form-builder components:"));
}