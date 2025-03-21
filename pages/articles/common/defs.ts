import path from "path";

export const articlesDirectory = path.normalize(
  path.join(process.cwd(), 'pages/articles/_articles/')
);
export const extensionOrder = ['html', 'md'] as const;