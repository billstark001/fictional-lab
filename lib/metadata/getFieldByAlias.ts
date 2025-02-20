const enFieldAliases = {
  title: ['title', 'name', 'heading', 'subject', 'caption', 'headline', 'topic'],
  lang: ['language', 'locale'],
  charset: ['charset'],
  desc: ['description', 'summary', 'overview', 'abstract', 'content', 'detail', 'info', 'introduction'],
  authors: ['author', 'creator', 'creators', 'writer', 'writers', 'contributor', 'contributors', 'by'],
  created: ['createTime', 'createAt', 'createdAt', 'createDate', 'dateCreated', 'created_at', 'creation_time', 'timestamp'],
  updated: ['updateTime', 'updateAt', 'updatedAt', 'lastModified', 'modifiedTime', 'modified_at', 'last_update', 'modification_time'],
  tags: ['tag', 'tags', 'categories', 'category', 'labels', 'topics', 'keywords', 'groups'],
  date: ['time', 'datetime', 'date', 'dateTime', 'timestamp', 'period', 'timing', 'moment'],
  image: ['image', 'images', 'figure', 'photo', 'graph', 'img'],
} as const;

const zhFieldAliases = {
  title: ['标题', '名称', '题目', '主题', '标记', '名字', '品名'],
  desc: ['描述', '摘要', '简介', '说明', '内容', '详情', '概述', '介绍'],
  authors: ['作者', '创作者', '撰写人', '编写者', '创建人', '编者', '写手'],
  created: ['创建时间', '建立时间', '生成时间', '编写时间', '创作时间', '撰写时间'],
  updated: ['更新时间', '修改时间', '编辑时间', '变更时间', '最后修改', '最新更新'],
  tags: ['标签', '分类', '类别', '类型', '归类', '分组', '主题', '关键词'],
  date: ['日期', '时间', '日子', '期间', '时刻', '时候', '时点'],
  image: ['图片', '图像', '图', '照片'],
} as const;

const jaFieldAliases = {
  title: ['タイトル', '名前', '題名', '表題', '見出し', '件名', '表記'],
  desc: ['説明', '概要', '詳細', '内容', '要約', '記述', 'あらまし', '紹介'],
  authors: ['著者', '作者', '制作者', '作成者', 'クリエイター', '執筆者'],
  created: ['作成日時', '作成時刻', '生成日時', '作成された時間', '制作日時'],
  updated: ['更新日時', '変更日時', '編集日時', '最終更新', '修正日時'],
  tags: ['タグ', 'カテゴリー', '分類', 'ラベル', 'キーワード', 'グループ'],
  date: ['日時', '時間', '日付', '期日', '時刻', '日にち', '期間'],
  image: ['画像', '図'],
} as const;

const allAliases = new Map<string, string>();

function initAliasMap() {
  const allFields = [enFieldAliases, zhFieldAliases, jaFieldAliases];

  for (const field in enFieldAliases) {
    allAliases.set(field, field);
  }
  
  for (const fieldAlias of allFields) {
    for (const [field, aliases] of Object.entries(fieldAlias)) {
      for (const alias of aliases) {
        allAliases.set(alias.toLowerCase(), field);
      }
    }
  }
}

export function getFieldByAlias(input: string): string | undefined {
  if (allAliases.size === 0) {
    initAliasMap();
  }
  return allAliases.get(input.toLowerCase());
}

export default getFieldByAlias;