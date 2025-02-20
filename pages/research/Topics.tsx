import withLocalized from "@/lib/locale/withLocalized";
import { TopicCard } from "./TopicCard";
import Localized from "@/lib/locale/Localized";

import aiImage from '@/assets/flux/artificial_intelli_image.jpg?url';
import robotImage from '@/assets/flux/robotics_and_autom_image.jpg?url';
import bioImage from '@/assets/flux/computational_biol_image.jpg?url';
import socialImage from '@/assets/flux/social_systems_and_image.jpg?url';


const AIContent = withLocalized({
  en: () => (
    <TopicCard
      image={aiImage}
      content={`
### Artificial Intelligence and Machine Learning

**Research Areas:**
- Interpretable AI systems to ensure transparency and fairness.
- Reinforcement learning for autonomous decision-making.
- Natural language processing for human-machine interaction.

**Current Projects:**
- Developing AI-driven tools for personalized education.
- Building robust AI models for real-time disaster prediction and management.
`}
    />
  ),
  ja: () => (
    <TopicCard
      image={aiImage}
      content={`
### 人工知能と機械学習

**研究分野:**
- 透明性と公平性を確保するための解釈可能なAIシステム。
- 自律的な意思決定のための強化学習。
- 人間と機械の相互作用を可能にする自然言語処理。

**現在のプロジェクト:**
- 個別化教育のためのAI駆動ツールの開発。
- リアルタイム災害予測と管理のための堅牢なAIモデルの構築。
`}
    />
  ),
  zh: () => (
    <TopicCard
      image={aiImage}
      content={`
### 人工智能与机器学习

**研究领域:**
- 可解释的人工智能系统，以确保透明性和公平性。
- 用于自主决策的强化学习。
- 用于人机交互的自然语言处理。

**当前项目:**
- 开发基于人工智能的个性化教育工具。
- 构建用于实时灾害预测和管理的强大人工智能模型。
`}
    />
  ),
});

const RoboticsContent = withLocalized({
  en: () => (
    <TopicCard
      image={robotImage}
      content={`
### Robotics and Automation

**Research Areas:**
- Autonomous robots for industrial and healthcare applications.
- Human-robot collaboration systems for shared environments.
- Swarm robotics and multi-agent systems.

**Current Projects:**
- Creating robotic assistants for elderly care and rehabilitation.
- Exploring drone-based solutions for environmental monitoring and agriculture.
`}
    />
  ),
  ja: () => (
    <TopicCard
      image={robotImage}
      content={`
### ロボティクスと自動化

**研究分野:**
- 産業および医療分野のための自律型ロボット。
- 共有環境における人間とロボットの協力システム。
- 群ロボット工学およびマルチエージェントシステム。

**現在のプロジェクト:**
- 高齢者ケアとリハビリテーションのためのロボットアシスタントの作成。
- 環境モニタリングと農業のためのドローンベースのソリューションの探求。
`}
    />
  ),
  zh: () => (
    <TopicCard
      image={robotImage}
      content={`
### 机器人与自动化

**研究领域:**
- 用于工业和医疗应用的自主机器人。
- 共享环境中的人机协作系统。
- 群体机器人学和多智能体系统。

**当前项目:**
- 为老年人护理和康复创建机器人助手。
- 探索基于无人机的环境监测和农业解决方案。
`}
    />
  ),
});

const ComputationalBiologyContent = withLocalized({
  en: () => (
    <TopicCard
      image={bioImage}
      content={`
### Computational Biology

**Research Areas:**
- Modeling protein-ligand interactions and drug discovery.
- Genomic data analysis using machine learning.
- Simulating cellular processes for cancer research.

**Current Projects:**
- Using computational models to identify potential treatments for rare diseases.
- Building scalable bioinformatics pipelines for large-scale genomic studies.
`}
    />
  ),
  ja: () => (
    <TopicCard
      image={bioImage}
      content={`
### 計算生物学

**研究分野:**
- タンパク質-リガンド相互作用のモデリングと薬物発見。
- 機械学習を用いたゲノムデータ解析。
- 癌研究のための細胞プロセスのシミュレーション。

**現在のプロジェクト:**
- 計算モデルを使用して希少疾患の潜在的な治療法を特定。
- 大規模なゲノム研究のためのスケーラブルなバイオインフォマティクスパイプラインの構築。
`}
    />
  ),
  zh: () => (
    <TopicCard
      image={bioImage}
      content={`
### 计算生物学

**研究领域:**
- 蛋白质-配体相互作用建模和药物发现。
- 使用机器学习进行基因组数据分析。
- 模拟细胞过程以进行癌症研究。

**当前项目:**
- 使用计算模型识别潜在的罕见疾病治疗方法。
- 构建用于大规模基因组研究的可扩展生物信息学管道。
`}
    />
  ),
});

const SocialSystemsContent = withLocalized({
  en: () => (
    <TopicCard
      image={socialImage}
      content={`
### Social Systems and Networks

**Research Areas:**
- Analyzing social networks to understand human behavior.
- Game theory for modeling strategic interactions in societal systems.
- Agent-based modeling for urban planning and policy-making.

**Current Projects:**
- Designing algorithms to detect misinformation in online communities.
- Simulating the spread of epidemics in densely populated cities.
`}
    />
  ),
  ja: () => (
    <TopicCard
      image={socialImage}
      content={`
### 社会システムとネットワーク

**研究分野:**
- 人間の行動を理解するためのソーシャルネットワークの分析。
- 社会システムにおける戦略的相互作用をモデリングするためのゲーム理論。
- 都市計画および政策立案のためのエージェントベースモデリング。

**現在のプロジェクト:**
- オンラインコミュニティでの誤情報を検出するアルゴリズムの設計。
- 密集した都市における疫病の拡散をシミュレーション。
`}
    />
  ),
  zh: () => (
    <TopicCard
      image={socialImage}
      content={`
### 社会系统与网络

**研究领域:**
- 分析社交网络以理解人类行为。
- 使用博弈论对社会系统中的战略交互进行建模。
- 基于代理的建模，用于城市规划和政策制定。

**当前项目:**
- 设计算法以检测在线社区中的虚假信息。
- 模拟在人口稠密城市中疫情的传播。
`}
    />
  ),
});


export const Topics = () => <>
  <h1><Localized>{
    ({ locale }) => locale === 'zh'
      ? '研究主题' : locale === 'ja'
        ? 'テーマ' : 'Individual Topics'
  }</Localized></h1>
  <AIContent />
  <RoboticsContent />
  <ComputationalBiologyContent />
  <SocialSystemsContent />
</>;