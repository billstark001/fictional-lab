import * as cheerio from 'cheerio';
import parseMetadata, { Metadata } from '../metadata/parseMetadata';

export interface ParsedHtml {
  metadata: Metadata;
  head?: string;
  body: string;
}

const DESC_LENGTH = 320;

/**
 * Parse an HTML document to extract head and body information.
 * @param {string} html - The input HTML string.
 * @param {boolean} disableScripts - Whether to remove all <script> tags.
 * @returns {ParsedHtml} - An object containing extracted headJson, headHtml, and bodyHtml.
 */
export function parseHtml(html: string, meta?: Partial<Metadata>, disableScripts: boolean = false): ParsedHtml {
  const $ = cheerio.load(html);

  // Initialize result objects
  let headHtml: string | null = null;
  let bodyHtml: string | null = null;

  let bodyNode: ReturnType<typeof $> = $.root();

  // Check if <head> exists
  const hasHead = $('head').length > 0;

  const extractedMeta: Record<string, any> = {};
  if (hasHead) {
    // Extract <title>
    const title = $('head title').text();
    if (title) extractedMeta.title = title;
    // Extract meta tags
    $('head meta').each((_, el) => {
      const meta = $(el);
      const name = meta.attr('name') || meta.attr('property');
      const content = meta.attr('content');
      const charset = meta.attr('charset');

      // Process charset
      if (charset) {
        extractedMeta.charset = charset;
      }
      // Process meta fields
      if (name && content) {
        extractedMeta[name] = content;
      }
    });

    // Extract the remaining <head> content (excluding meta and title)
    const remainingHead = $('head').clone();
    remainingHead.find('title').remove();
    remainingHead.find('meta').remove();
    if (disableScripts) {
      remainingHead.find('script').remove();
    }
    headHtml = remainingHead.html();

    bodyNode = $('body');
  }

  // body

  if (disableScripts) {
    bodyNode.find('script').remove();
  }

  // default title
  if (!extractedMeta.title) {
    const firstHeading = bodyNode.find('h1');
    extractedMeta.title = firstHeading.text();
    firstHeading.remove();
  }

  // content
  bodyHtml = bodyNode.html();


  // metadata
  const metadata = parseMetadata(extractedMeta);

  // default description
  if (!metadata.desc && !meta?.desc) {
    const t = bodyNode.text();
    metadata.desc = (t.length > DESC_LENGTH 
      ? t.substring(0, DESC_LENGTH) + '……'
      : t).replace(/[\n\r\s]+/g, ' ');
  }

  // Return the final parsed result
  return {
    metadata: { ...meta, ...metadata },
    head: headHtml || undefined,
    body: bodyHtml || '',
  };
}

export default parseHtml;