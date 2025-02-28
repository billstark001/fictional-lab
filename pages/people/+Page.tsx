
import { Container } from "./components";
import PhotoBox from "./PhotoBox";
import Localized from "@/lib/locale/Localized";
import { hanakoYamada, janeDoe, johnSmith } from "./_faculty.en";
import { hanakoYamadaZh, janeDoeZh, johnSmithZh } from "./_faculty.zh";
import { hanakoYamadaJa, janeDoeJa, johnSmithJa } from "./_faculty.ja";
import { MembersGrid } from "./MemberPhotoBox";

import students from './_students';

export default function Page() {
  return (
    <Container>
      
      <h1>
        <Localized
          zh='教授与职员'
          ja='教授・職員'
        >
          Faculty
        </Localized>
      </h1>


      <Localized
        zh={<PhotoBox {...janeDoeZh} />}
        ja={<PhotoBox {...janeDoeJa} />}
      >
        <PhotoBox {...janeDoe} />
      </Localized>
      
      <Localized
        zh={<PhotoBox {...johnSmithZh} />}
        ja={<PhotoBox {...johnSmithJa} />}
      >
        <PhotoBox {...johnSmith} />
      </Localized>
      
      <Localized
        zh={<PhotoBox {...hanakoYamadaZh} />}
        ja={<PhotoBox {...hanakoYamadaJa} />}
      >
        <PhotoBox {...hanakoYamada} />
      </Localized>

      <h1>
        <Localized
          zh='博士后'
          ja='ポスドク'
        >
          PostDoctoral Fellows
        </Localized>
      </h1>

      <MembersGrid items={students.Phd} />

      
      <h1>
        <Localized
          zh='博士学生'
          ja='博士課程学生'
        >
          Doctoral Program Students
        </Localized>
      </h1>

      <MembersGrid items={students.Phd} />
      
      <h1>
        <Localized
          zh='硕士学生'
          ja='修士課程学生'
        >
          Master Students
        </Localized>
      </h1>

      <MembersGrid items={students.Master} />
      
      <h1>
        <Localized
          zh='本科学生'
          ja='学部生'
        >
          Undergraduate Students
        </Localized>
      </h1>

      <MembersGrid items={students.Undergraduate} />

    </Container>
  );
};