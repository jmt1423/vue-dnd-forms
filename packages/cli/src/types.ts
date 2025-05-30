export interface CliOptions {
  targetDir: string;
  installDeps: boolean;
}

export interface PackageInfo {
  name: string;
  dependencies: Record<string, string>;
  devDependencies?: Record<string, string>;
}