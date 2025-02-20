import withLocalized from "@/lib/locale/withLocalized";


// Address Component
const Address = withLocalized({
  en: () => (
    <section>
      <h3>Address</h3>
      Department of Innovative Sciences<br />
      Fictional University<br />
      123 Imagination Avenue<br />
      Dream City, DC 45678
    </section>
  ),
  zh: () => (
    <section>
      <h3>地址</h3>
      创新科学系<br />
      虚构大学<br />
      想象大道123号<br />
      梦想城，DC 45678
    </section>
  ),
  ja: () => (
    <section>
      <h3>住所</h3>
      イノベーション科学部<br />
      架空大学<br />
      イマジネーション・アベニュー123<br />
      ドリームシティ、DC 45678
    </section>
  ),
});

// Contact Component
const Contact = withLocalized({
  en: () => (
    <section>
      <h3>Contact</h3>
      Email: contact@fictionallab.edu<br />
      Phone: +1 (555) 123-4567
    </section>
  ),
  zh: () => (
    <section>
      <h3>联系方式</h3>
      邮箱: contact@fictionallab.edu<br />
      电话: +1 (555) 123-4567
    </section>
  ),
  ja: () => (
    <section>
      <h3>連絡先</h3>
      メール: contact@fictionallab.edu<br />
      電話: +1 (555) 123-4567
    </section>
  ),
});

// Office Hours Component
const OfficeHours = withLocalized({
  en: () => (
    <section>
      <h3>Office Hours</h3>
      Monday to Friday<br />
      9:00 AM - 5:00 PM
    </section>
  ),
  zh: () => (
    <section>
      <h3>办公时间</h3>
      周一至周五<br />
      上午9:00 - 下午5:00
    </section>
  ),
  ja: () => (
    <section>
      <h3>オフィスアワー</h3>
      月曜日から金曜日<br />
      午前9時〜午後5時
    </section>
  ),
});

// More Content Component
const MoreContent = withLocalized({
  en: () => (
    <section>
      <h3>More Content</h3>
      Some Awesome Contents.
    </section>
  ),
  zh: () => (
    <section>
      <h3>更多内容</h3>
      一些精彩的内容。
    </section>
  ),
  ja: () => (
    <section>
      <h3>その他のコンテンツ</h3>
      素晴らしいコンテンツです。
    </section>
  ),
});

const FooterContent = () => {
  return (
    <>
      <Address />
      <Contact />
      <OfficeHours />
      <MoreContent />
    </>
  );
};

export default FooterContent;