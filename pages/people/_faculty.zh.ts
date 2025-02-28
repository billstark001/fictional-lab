import { PhotoBoxProps } from "./PhotoBox";

import male1 from '@/assets/flux/male_professor_image.jpg?url';
import female1 from '@/assets/flux/female_professor_image.jpg?url';
import female2 from '@/assets/flux/female_japanese_pr_image.jpg?url';

export const janeDoeZh: PhotoBoxProps = {
  name: "Dr. Jane Doe",
  position: "首席研究员",
  degree: "计算机科学博士",
  department: "人工智能系",
  links: {
    email: "jane.doe@fictionallab.edu",
    twitter: "janedoe_ai",
    linkedin: "jane-doe-ai",
    researchgate: "Jane_Doe"
  },
  bio: "杜博士在人工智能领域拥有十多年的领先研究经验，专注于开发道德和可解释的人工智能系统。她在顶级期刊和会议上发表了大量论文，并在多个人工智能期刊的编辑委员会任职。",
  background: "在加入虚构实验室之前，杜博士是科技大学的研究科学家，她领导了神经计算小组。她在斯坦福大学获得博士学位，并在麻省理工学院完成了博士后研究。",
  photoUrl: female1,
};

export const johnSmithZh: PhotoBoxProps = {
  name: "Dr. John Smith",
  position: "联合研究员",
  degree: "机器人工程博士",
  department: "机器人与社会系统系",
  links: {
    email: "john.smith@fictionallab.edu",
    twitter: "johnsmith_robotics",
    linkedin: "john-smith-robotics",
    researchgate: "John_Smith_Robotics"
  },
  bio: "史密斯博士的研究连接了机器人技术和社会系统，专注于了解自主系统如何能与人类有效合作。他领导了多个国际项目，并因其在机器人研究方面的贡献而获得奖项。",
  background: "史密斯博士在加入虚构实验室之前，在未来技术公司担任首席机器人工程师五年。他拥有卡内基梅隆大学的博士学位，并发表了50多篇同行评审论文。",
  photoUrl: male1,
};

export const hanakoYamadaZh: PhotoBoxProps = {
  name: "山田花子博士",
  position: "助理教授",
  degree: "计算生物学博士",
  department: "计算生命科学系",
  links: {
    email: "hanako.yamada@fictionallab.edu",
    linkedin: "hanako-yamada-compbio",
    researchgate: "Hanako_Yamada_Bio"
  },
  bio: "山田博士专门研究将机器学习技术应用于生物数据。她的工作专注于蛋白质折叠预测和基因组分析，在药物发现和个性化医疗方面有应用。",
  background: "山田博士在加州大学伯克利分校完成了她的博士工作，在加入虚构实验室之前是国家卫生研究院的博士后研究员。她获得了计算生物学学会的青年研究者奖。",
  photoUrl: female2,
};