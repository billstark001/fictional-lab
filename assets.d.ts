declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.md?img' {
  export const header: string;
  export const sections: [string, string];
  export default sections;
}

declare module '*.bib' {
  const content: (import("bibtex-js-parser").Entry & { errors?: string[] })[];
  export default content;
}