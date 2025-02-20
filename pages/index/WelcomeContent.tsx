import withLocalized from "@/lib/locale/withLocalized";
import MarkdownRenderer from "@/lib/react/MarkdownRenderer";


const WelcomeContent = withLocalized({
  en: () => (
    <MarkdownRenderer>
      {`# Welcome to the Fictional Lab

At Fictional Lab, we are driven by curiosity and innovation, pushing the boundaries of knowledge to address real-world challenges. Our interdisciplinary research team is composed of experts in artificial intelligence, robotics, computational biology, and social systems modeling. We believe in open collaboration, fostering creativity, and empowering the next generation of scientists and engineers.

Our mission is simple:

- **Innovate:** Develop cutting-edge technologies that solve complex problems.
- **Collaborate:** Work with academic, industrial, and governmental partners to maximize the impact of our research.
- **Educate:** Mentor students and young researchers to become leaders in their fields.

Whether you are a researcher, student, or industry professional, we invite you to explore our work, join our initiatives, or partner with us to shape the future. Welcome to Fictional Lab—a place where ideas come to life.`}
    </MarkdownRenderer>
  ),
  zh: () => (
    <MarkdownRenderer>
      {`# 欢迎来到虚构实验室

在虚构实验室，我们以好奇心和创新为动力，突破知识的边界，解决现实世界的挑战。我们的跨学科研究团队由人工智能、机器人学、计算生物学和社会系统建模领域的专家组成。我们相信开放合作，激发创造力，并赋能下一代科学家和工程师。

我们的使命很简单：

- **创新：** 开发解决复杂问题的尖端技术。
- **合作：** 与学术界、工业界和政府合作伙伴合作，最大化我们研究的影响力。
- **教育：** 指导学生和年轻研究人员成为各自领域的领导者。

无论您是研究人员、学生还是行业专业人士，我们邀请您探索我们的工作，加入我们的计划，或与我们合作，共同塑造未来。欢迎来到虚构实验室——一个让想法变为现实的地方。`}
    </MarkdownRenderer>
  ),
  ja: () => (
    <MarkdownRenderer>
      {`# フィクションラボへようこそ

フィクションラボでは、好奇心とイノベーションを原動力に、知識の限界を押し広げ、現実世界の課題に取り組んでいます。私たちの学際的な研究チームは、人工知能、ロボティクス、計算生物学、社会システムモデリングの専門家で構成されています。オープンな協力、創造性の促進、次世代の科学者やエンジニアの育成を信条としています。

私たちの使命はシンプルです：

- **革新：** 複雑な問題を解決する最先端技術を開発すること。
- **協力：** 学術、産業、政府のパートナーと協力し、研究の影響を最大化すること。
- **教育：** 学生や若手研究者を指導し、それぞれの分野のリーダーになるように育成すること。

研究者、学生、または業界の専門家であるかに関わらず、私たちの活動を探求し、私たちの取り組みに参加し、または私たちと協力して未来を形作ることをお勧めします。フィクションラボへようこそ—アイデアが命を吹き込まれる場所です。`}
    </MarkdownRenderer>
  ),
});

export default WelcomeContent;