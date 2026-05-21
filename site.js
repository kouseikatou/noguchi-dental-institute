/* 共通ヘッダー/フッターを一元管理するカスタム要素。
   各ページは <site-header current="page-key"></site-header>、
   <site-footer></site-footer> の2タグを置くだけ。

   サイト共通の文字情報（法人名・連絡先・所在地など）はすべて
   このファイル冒頭の定数オブジェクトに集約。修正は1箇所で完結。 */

const SITE = {
  name: "一般財団法人野口歯科学研究所 歯科部会",
  nameMultiline: "一般財団法人<br>野口歯科学研究所 歯科部会",
  nameLatin: "Noguchi Institute of Dental Science / Dental Section",
  tagline: "歯科治療技術・学術相談・専門ホットライン",
  hotline: {
    label: "歯科部会ホットライン",
    tel: "0120-793-550",
  },
  address: {
    postal: "466-0842",
    line: "愛知県名古屋市昭和区檀渓通 3-10 LM107",
  },
  business: "歯科治療技術の検討、学術講演会、歯科ホットライン",
};

/* ナビゲーション: 全画面共通の遷移先。
   inFooter: true のものだけがフッターのサイトマップにも掲載される。 */
const NAV_ITEMS = [
  { key: "index", label: "TOP", href: "index.html", inFooter: true },
  { key: "statement", label: "設立趣旨", href: "index.html#statement" },
  { key: "lecture", label: "学術講演会", href: "index.html#lecture" },
  { key: "hotline", label: "歯科ホットライン", href: "hotline.html", inFooter: true },
  { key: "members", label: "加入会員", href: "members.html", inFooter: true },
  { key: "line-card", label: "LINE診察券", href: "line-card.html", inFooter: true },
  { key: "contact", label: "お問い合わせ", href: "index.html#contact" },
];

const link = (href, label, extra = "") =>
  `<a href="${href}"${extra ? " " + extra : ""}>${label}</a>`;

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute("current") || "";
    const contactHref = current === "index" ? "#contact" : "index.html#contact";

    const navLinks = NAV_ITEMS
      .map((item) => {
        const aria = item.key === current ? 'aria-current="page"' : "";
        return `<li>${link(item.href, item.label, aria)}</li>`;
      })
      .join("");

    this.innerHTML = `
      <div class="fixed-header">
        <header id="header">
          <a class="logo-area" href="index.html" aria-label="${SITE.name} ホーム">
            <span class="logo-main">${SITE.nameMultiline}</span>
            <span class="logo-sub">${SITE.nameLatin}</span>
          </a>
          <div class="header-copy">${SITE.tagline}</div>
          <a class="header-contact" href="${contactHref}">お問い合わせ</a>
        </header>
        <nav id="headnav" aria-label="主要ナビゲーション">
          <ul id="menu">${navLinks}</ul>
        </nav>
      </div>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const sitemap = NAV_ITEMS
      .filter((item) => item.inFooter)
      .map((item) => link(item.href, item.label))
      .join("\n                ");

    this.innerHTML = `
      <footer id="footer">
        <div class="footer-inner">
          <div class="footer-brand">
            ${SITE.nameMultiline}
            <small>${SITE.nameLatin}</small>
          </div>
          <div class="footer-col">
            <h4>FOUNDATION</h4>
            <dl>
              <dt>事務窓口</dt>
              <dd>〒${SITE.address.postal}<br>${SITE.address.line}</dd>
              <dt>事業</dt>
              <dd>${SITE.business}</dd>
            </dl>
          </div>
          <div class="footer-col">
            <h4>CONTACT</h4>
            <dl>
              <dt>${SITE.hotline.label}</dt>
              <dd>${link("tel:" + SITE.hotline.tel, SITE.hotline.tel)}（フリーダイヤル）</dd>
              <dt>メール</dt>
              <dd><span class="footer-pending">準備中</span></dd>
              <dt>サイトマップ</dt>
              <dd>
                ${sitemap}
              </dd>
            </dl>
          </div>
        </div>
        <div class="footer-bottom">
          <small>&copy; ${SITE.name} All Rights Reserved.</small>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
