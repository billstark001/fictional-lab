
import { Container } from "./components";
import withLocalized from '@/lib/locale/withLocalized';

const PageEn = () => {
  return <Container>
    test en
  </Container>;
};

const PageZh = () => {
  return <Container>
    test zh
  </Container>;
};

export default withLocalized({
  'en': PageEn,
  'zh': PageZh,
});


// export default function () {
//   return (
//     <Container>
//       <h1>CV
//         <div className="clickable-icon cv-dl" onClick={triggerDownload}>
//           <FaDownload />
//         </div>
//       </h1>

//       {/* <object data={cvPdf} type="application/pdf" width='100%' height='800px'>
//         Click the <FaDownload /> icon to download the PDF file.
//       </object> */}
//     </Container>
//   )
// }