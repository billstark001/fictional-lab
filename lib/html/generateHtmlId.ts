export function generateHtmlId(input: string): string {
  // Remove leading/trailing whitespace and convert to lowercase
  let sanitized = input.trim().toLowerCase();

  // Replace spaces and invalid characters with hyphens
  sanitized = sanitized.replace(/[^a-z0-9]+/g, '-');

  // Remove leading/trailing hyphens
  sanitized = sanitized.replace(/^-+|-+$/g, '');

  // Ensure the ID is not empty (fallback to a default if needed)
  return sanitized || 'default-id';
}