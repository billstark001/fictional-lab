import { PhotoBoxProps } from "./PhotoBox";

import male1 from '@/assets/flux/male_professor_image.jpg?url';
import female1 from '@/assets/flux/female_professor_image.jpg?url';
import female2 from '@/assets/flux/female_japanese_pr_image.jpg?url';

export const janeDoeJa: PhotoBoxProps = {
  name: "Dr. Jane Doe",
  position: "主任研究員",
  degree: "コンピュータサイエンス博士",
  department: "人工知能学部",
  links: {
    email: "jane.doe@fictionallab.edu",
    twitter: "janedoe_ai",
    linkedIn: "jane-doe-ai",
    researchGate: "Jane_Doe"
  },
  bio: "道博士は10年以上にわたりAI分野の先導的研究者であり、倫理的で解釈可能なAIシステムの開発に焦点を当てています。トップジャーナルや学会で多数論文を発表し、複数のAI学術誌の編集委員を務めています。",
  background: "フィクショナルラボに参加する前、道博士はテック大学の研究者として神経計算グループを率いていました。スタンフォード大学で博士号を取得し、MITでポスドク研究を完了しました。",
  photoUrl: female1,
};

export const johnSmithJa: PhotoBoxProps = {
  name: "Dr. John Smith",
  position: "共同研究員",
  degree: "ロボット工学博士",
  department: "ロボティクス・社会システム学部",
  links: {
    email: "john.smith@fictionallab.edu",
    twitter: "johnsmith_robotics",
    linkedIn: "john-smith-robotics",
    researchGate: "John_Smith_Robotics"
  },
  bio: "スミス博士の研究はロボティクスと社会システムを橋渡しし、自律システムがどのように人間と効果的に協働できるかを理解することに焦点を当てています。複数の国際プロジェクトを主導し、ロボティクス研究への貢献により賞を受賞しています。",
  background: "スミス博士はフューチャーテクノロジーズ社の主任ロボット技術者として産業界で5年間過ごした後、フィクショナルラボに加わりました。カーネギーメロン大学で博士号を取得し、50以上のピアレビュー論文を発表しています。",
  photoUrl: male1,
};

export const hanakoYamadaJa: PhotoBoxProps = {
  name: <span><ruby>山田<rt>やまだ</rt></ruby> <ruby>花子<rt>はなこ</rt></ruby>博士</span>,
  position: "助教授",
  degree: "計算生物学博士",
  department: "計算生命科学部",
  links: {
    email: "hanako.yamada@fictionallab.edu",
    linkedIn: "hanako-yamada-compbio",
    researchGate: "Hanako_Yamada_Bio"
  },
  bio: "山田博士は生物学的データに機械学習技術を適用することを専門としています。彼女の研究はタンパク質折りたたみ予測とゲノム解析に焦点を当て、創薬と個別化医療に応用されています。",
  background: "山田博士はカリフォルニア大学バークレー校で博士課程を修了し、フィクショナルラボに参加する前は国立衛生研究所のポスドクフェローでした。計算生物学学会からヤングインベスティゲーター賞を受賞しています。",
  photoUrl: female2,
};