export type Author = {
  first: string;
  middle: string[];
  last: string;
}

export function parseAuthor(authorStr: string): Author[] {
  const authors: string[] = [];
  let currentStr = '';
  let bracketCount = 0;

  // 扫描字符串,根据大括号层级和and分割作者
  for (let i = 0; i < authorStr.length; i++) {
    const char = authorStr[i];

    if (char === '{') {
      bracketCount++;
    } else if (char === '}') {
      bracketCount--;
    }

    // 只在最外层识别and作为分隔符
    if (bracketCount === 0 &&
      authorStr.slice(i, i + 5).toLowerCase() === ' and ') {
      authors.push(currentStr);
      currentStr = '';
      i += 4; // 跳过"and"
      continue;
    }

    currentStr += char;
  }

  authors.push(currentStr);

  return authors
    .map(author => author.trim())
    .filter(author => author.length > 0)
    .map(author => {
      // 初始化结果
      const result: Author = {
        first: '',
        middle: [],
        last: ''
      };

      // 移除最外层大括号
      author = author.replace(/^\{|\}$/g, '').trim();

      // 处理 "lastname, firstname middlename" 格式
      if (author.includes(',')) {
        const [last, rest] = author.split(',').map(s => s.trim());
        result.last = last;

        if (rest) {
          const names = rest.split(/\s+/);
          result.first = names[0] || '';
          result.middle = names.slice(1);
        }
      }
      // 处理 "firstname middlename lastname" 格式
      else {
        const names = author.split(/\s+/);

        if (names.length === 1) {
          result.last = names[0];
        } else {
          result.first = names[0];
          result.last = names[names.length - 1];
          result.middle = names.slice(1, -1);
        }
      }

      return result;
    });
}