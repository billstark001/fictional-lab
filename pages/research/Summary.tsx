import withLocalized from "@/lib/locale/withLocalized";

export const Summary = withLocalized({
  'en': () => <>
    <h1>Summary</h1>
    At Fictional Lab, we focus on solving some of the
    most pressing scientific and technological challenges
    of our time. Below are our primary research domains,
    along with specific projects and goals.
  </>,
  'ja': () => <>
    <h1>サマリー</h1>
    フィクション・ラボでは、現代における最も差し迫った科学技術的課題
    の解決に注力しています。以下は、私たちの主な研究領域と、
    具体的なプロジェクトや目標です。
  </>,
  'zh': () => <>
    <h1>总览</h1>
    在虚构实验室，我们专注于解决当代一些最紧迫的科学和技术挑战。
    以下是我们的主要研究领域以及具体项目和目标。
  </>,
});

export default Summary;