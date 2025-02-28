import { PhotoBoxProps } from "./PhotoBox";

import male1 from '@/assets/flux/male_professor_image.jpg?url';
import female1 from '@/assets/flux/female_professor_image.jpg?url';
import female2 from '@/assets/flux/female_japanese_pr_image.jpg?url';

export const janeDoe: PhotoBoxProps = {
  name: "Dr. Jane Doe",
  position: "Principal Investigator",
  degree: "Ph.D. in Computer Science",
  department: "Department of Artificial Intelligence",
  links: {
    email: "jane.doe@fictionallab.edu",
    twitter: "janedoe_ai",
    linkedin: "jane-doe-ai",
    researchgate: "Jane_Doe"
  },
  bio: "Dr. Doe has been a leading researcher in AI for over a decade, with a focus on developing ethical and interpretable AI systems. She has published extensively in top-tier journals and conferences and serves on the editorial board of several AI journals.",
  background: "Before joining Fictional Lab, Dr. Doe was a research scientist at Tech University, where she led the Neural Computing Group. She received her Ph.D. from Stanford University and completed postdoctoral research at MIT.",
  photoUrl: female1,
};

export const johnSmith: PhotoBoxProps = {
  name: "Dr. John Smith",
  position: "Co-Investigator",
  degree: "Ph.D. in Robotics Engineering",
  department: "Department of Robotics and Social Systems",
  links: {
    email: "john.smith@fictionallab.edu",
    twitter: "johnsmith_robotics",
    linkedin: "john-smith-robotics",
    researchgate: "John_Smith_Robotics"
  },
  bio: "Dr. Smith's research bridges robotics and social systems, focusing on understanding how autonomous systems can work effectively with humans. He has led multiple international projects and received awards for his contributions to robotics research.",
  background: "Dr. Smith joined Fictional Lab after spending five years in industry as Lead Robotics Engineer at Future Technologies Inc. He holds a Ph.D. from Carnegie Mellon University and has published over 50 peer-reviewed papers.",
  photoUrl: male1,
};

export const hanakoYamada: PhotoBoxProps = {
  name: "Dr. Hanako Yamada",
  position: "Assistant Professor",
  degree: "Ph.D. in Computational Biology",
  department: "Department of Computational Life Sciences",
  links: {
    email: "hanako.yamada@fictionallab.edu",
    linkedin: "hanako-yamada-compbio",
    researchgate: "Hanako_Yamada_Bio"
  },
  bio: "Dr. Yamada specializes in applying machine learning techniques to biological data. Her work focuses on protein folding prediction and genomic analysis, with applications in drug discovery and personalized medicine.",
  background: "Dr. Yamada completed her doctoral work at UC Berkeley and was a Postdoctoral Fellow at the National Institute of Health before joining Fictional Lab. She is the recipient of the Young Investigator Award from the Computational Biology Society.",
  photoUrl: female2,
};