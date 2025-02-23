export type StudentRecord = {
  name: string;
  email: string;
  image?: string;
  researchArea: string;
  bio: string;
};

export type StudentProgramType = 'Phd' | 'Master' | 'Undergraduate';

export default {
  "Phd": [
    {
      "name": "Alice Johnson",
      "email": "alice.johnson@fictionallab.edu",
      "researchArea": "Reinforcement Learning",
      "bio": "Alice is exploring the use of reinforcement learning in dynamic environments, with applications in robotics and healthcare."
    },
    {
      "name": "Bob Martinez",
      "email": "bob.martinez@fictionallab.edu",
      "researchArea": "Computational Biology",
      "bio": "Bob’s research focuses on modeling protein-ligand interactions to accelerate drug discovery."
    }
  ],
  "Master": [
    {
      "name": "Charlie Nguyen",
      "email": "charlie.nguyen@fictionallab.edu",
      "researchArea": "Autonomous Robotics",
      "bio": "Charlie is developing algorithms for autonomous drones used in environmental monitoring."
    },
    {
      "name": "Diana Patel",
      "email": "diana.patel@fictionallab.edu",
      "researchArea": "Game Theory in Social Systems",
      "bio": "Diana is studying how game theory can be applied to improve urban transportation systems."
    }
  ],
  "Undergraduate": [
    {
      "name": "Ethan Lee",
      "email": "ethan.lee@fictionallab.edu",
      "researchArea": "Machine Learning Applications",
      "bio": "Ethan is working on building machine learning models for personalized education tools."
    },
    {
      "name": "Fiona Wang",
      "email": "fiona.wang@fictionallab.edu",
      "researchArea": "Data-Driven Social Network Analysis",
      "bio": "Fiona’s project involves analyzing social media data to detect trends and misinformation."
    }
  ]
} satisfies Record<StudentProgramType, StudentRecord[]>;