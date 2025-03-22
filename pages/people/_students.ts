import { MemberInfoList } from "./MemberPhotoBox";

import grad0 from '@/assets/flux/graduate_student_image.jpg?url';
import grad1 from '@/assets/flux/graduate_student_image1.jpg?url';
import grad2 from '@/assets/flux/graduate_student_image2.jpg?url';
import grad3 from '@/assets/flux/graduate_student_image3.jpg?url';
import grad4 from '@/assets/flux/graduate_student_image4.jpg?url';
import grad5 from '@/assets/flux/graduate_student_image5.jpg?url';


import undergrad0 from '@/assets/flux/undergraduate_stud_image.jpg?url';
import undergrad1 from '@/assets/flux/undergraduate_stud_image1.jpg?url';
import undergrad2 from '@/assets/flux/undergraduate_stud_image2.jpg?url';
import undergrad3 from '@/assets/flux/undergraduate_stud_image3.jpg?url';
import undergrad4 from '@/assets/flux/undergraduate_stud_image4.jpg?url';
import undergrad5 from '@/assets/flux/undergraduate_stud_image5.jpg?url';

export type StudentProgramType = 'Phd' | 'Master' | 'Undergraduate';

export default {
  "Phd": [
    {
      name: "Alice Johnson",
      email: "alice.johnson@fictionallab.edu",
      researchArea: "Alice is exploring the use of reinforcement learning in dynamic environments, with applications in robotics and healthcare.",
      photo: grad0,
    },
    {
      name: "Bob Martinez",
      email: "bob.martinez@fictionallab.edu",
      researchArea: "Bob’s research focuses on modeling protein-ligand interactions to accelerate drug discovery.",
      photo: grad1,
    }
  ],
  "Master": [
    {
      name: "Charlie Nguyen",
      email: "charlie.nguyen@fictionallab.edu",
      researchArea: "Charlie is developing algorithms for autonomous drones used in environmental monitoring.",
      photo: grad4,
    },
    {
      name: "Diana Patel",
      email: "diana.patel@fictionallab.edu",
      researchArea: "Diana is studying how game theory can be applied to improve urban transportation systems.",
      photo: grad2,
    },
    {
      name: "Charlie Nguyen",
      email: "charlie.nguyen@fictionallab.edu",
      researchArea: "Charlie is developing algorithms for autonomous drones used in environmental monitoring.",
      photo: grad3,
    },
    {
      name: "Diana Patel",
      email: "diana.patel@fictionallab.edu",
      researchArea: "Diana is studying how game theory can be applied to improve urban transportation systems.",
      photo: grad5,
    }
  ],
  "Undergraduate": [
    {
      name: "Ethan Lee",
      email: "ethan.lee@fictionallab.edu",
      researchArea: "Ethan is working on building machine learning models for personalized education tools.",
      photo: undergrad1,
    },
    {
      name: "Fiona Wang",
      email: "fiona.wang@fictionallab.edu",
      researchArea: "Fiona’s project involves analyzing social media data to detect trends and misinformation.",
      photo: undergrad2,
    },
    {
      name: "Ethan Lee",
      email: "ethan.lee@fictionallab.edu",
      researchArea: "Ethan is working on building machine learning models for personalized education tools.",
      photo: undergrad0,
    },
    {
      name: "Fiona Wang",
      email: "fiona.wang@fictionallab.edu",
      researchArea: "Fiona’s project involves analyzing social media data to detect trends and misinformation.",
      photo: undergrad3,
    },
    {
      name: "Ethan Lee",
      email: "ethan.lee@fictionallab.edu",
      researchArea: "Ethan is working on building machine learning models for personalized education tools.",
      photo: undergrad4,
    },
    {
      name: "Fiona Wang",
      email: "fiona.wang@fictionallab.edu",
      researchArea: "Fiona’s project involves analyzing social media data to detect trends and misinformation.",
      photo: undergrad5,
    },
  ]
} satisfies Record<StudentProgramType, MemberInfoList>;