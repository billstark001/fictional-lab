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
  const content: (import("./lib/bibtex/types").BibtexEntry & { errors?: string[] })[];
  export default content;
}

declare module '*.url-gen' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.meta-gen' {
  const content: Record<string, import("./lib/metadata/parseMetadata").Metadata>;
  export default content;
}

declare module '*.lang-gen' {
  const content: Record<string, { [lang: string]: string }>;
  export default content;
}