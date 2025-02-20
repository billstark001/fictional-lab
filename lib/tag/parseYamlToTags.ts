import { defaultLocale } from "../locale";
import { Tag } from "./types";

// Function to parse YAML data into Tag structures
export function parseYamlToTags(parsedYaml: Record<string, any>): Tag[] {
  const tags: Tag[] = [];

  for (const [mainName, value] of Object.entries(parsedYaml)) {
    if (Array.isArray(value)) {
      // Case: `<mainName>: [<alt>, <alt>]`
      tags.push({
        mainName,
        mainNames: {},
        alternatives: value,
      });
    } else if (typeof value === "object" && value !== null) {
      // Case: `<mainName>: { translations: { <lang>: <mainName> }, alternatives: [<alt>, <alt>] }`
      let mainNames = value.translations
        || value.intl
        || value.translation
        || value.trsl
        || {};
      if (typeof mainNames !== 'object') {
        if (Array.isArray(mainNames)) {
          mainNames = mainNames.length > 0
            ? { ...mainNames, [defaultLocale]: mainNames[0] }
            : {};
        } else {
          mainNames = { [defaultLocale]: String(mainNames) };
        }
      }

      let alternatives = value.alternatives
        || value.alts
        || value.alt
        || [];
      if (!Array.isArray(alternatives)) {
        alternatives = typeof alternatives === 'object'
          ? Object.values(alternatives)
          : [String(alternatives)];
      }

      tags.push({
        mainName,
        mainNames,
        alternatives,
      });
    } else {
      throw new Error(`Invalid YAML format for tag: ${mainName}`);
    }
  }

  return tags;
}

export default parseYamlToTags;