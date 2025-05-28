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

export async function main(): Promise<void> {
  console.log(chalk.green.bold("Vue DnD Forms Builder Installer"));
  console.log(
    chalk.gray("This tool will setup a form builder in your Vue 3 project."),
  );

  const answers = await inquirer.prompt<CliOptions>([
    {
      type: "input",
      name: "targetDir",
      message: "Where do you want to install the form builder?",
      default: "src/components/form-builder",
    },
    {
      type: "confirm",
      name: "installDeps",
      message: "Do you want to install the required dependencies?",
      default: true,
    },
  ]);

  try {
    const packageJson = (await fs.readJSON("package.json")) as PackageInfo;
    if (!packageJson.dependencies.vue) {
      console.log(
        chalk.red.bold(
          "Vue is not installed in your project. This project requires Vue 3.",
        ),
      );

      const { installVue } = await inquirer.prompt<{ installVue: boolean }>([
        {
          type: "confirm",
          name: "installVue",
          message: "Do you want to install Vue?",
          default: true,
        },
      ]);

      if (installVue) {
        dependencies.push("vue");
      } else {
        console.log(chalk.yellow("Skipping Vue installation."));
      }
    }
  } catch (error) {
    console.log(
      chalk.red.bold(
        "Could not detect vue. Please make sure you have vue installed.",
      ),
    );
  }

  const destPath = path.resolve(process.cwd(), answers.targetDir);
  await fs.ensureDir(destPath);

  const spinner = ora("Creating files...").start();
  try {
    // Instead of copying files, we'll create template files that import from the form-builder package
    const templatePath = path.resolve(getDirname(), "../../templates/form-builder");
    await fs.copy(templatePath, destPath);

    spinner.succeed("Files created successfully.");
  } catch (error) {
    spinner.fail("Failed to create files.");
    console.error(error);
    process.exit(1);
  }

  if (answers.installDeps) {
    spinner.text = "Installing dependencies...";
    spinner.start();

    try {
      const packageManager = fs.existsSync("yarn.lock") ? "yarn" : "npm";

      if (packageManager === "yarn") {
        await execa("yarn", ["add", ...dependencies]);
      } else {
        await execa("npm", ["install", ...dependencies]);
      }

      spinner.succeed("Dependencies installed successfully.");
    } catch (error) {
      spinner.fail("Failed to install dependencies.");
      console.log(chalk.yellow("You may need to add them manually:"));
      console.log(chalk.gray(`npm install ${dependencies.join(" ")}`));
      process.exit(1);
    }
    console.log("\n", chalk.green.bold("Installation complete!"));
    console.log(
      chalk.cyan("To use the form builder, import it in any page you want"),
    );
    console.log(
      chalk.cyan('import { FormBuilder } from "@vue-form-forge/form-builder"'),
    );
    console.log(chalk.cyan("or use the wrapper components in:"));
    console.log(chalk.cyan(`${answers.targetDir}`));
  }
}