export const sentences = [
  {
    id: 1,
    japanese: "W/H（ワイヤーハーネス）の分岐が金属エッジと干渉しているので、分岐位置を変更します。",
    english: "The wire harness branch interferes with the metal edge, so we will change the branch position.",
    englishRaw: "The wire harness branch interferes with the metal edge, so we will change the branch position.",
    grammar: "S1 V1 M [so] S2 V2 O2",
    elements: [
      { text: "The wire harness branch", role: "S1", desc: "主語（ワイヤーハーネス of 分岐）" },
      { text: "interferes", role: "V1", desc: "動詞（干渉する）" },
      { text: "with the metal edge", role: "M", desc: "修飾語（金属エッジと）" },
      { text: "so", role: "接", desc: "接続詞（だから、〜なので）" },
      { text: "we", role: "S2", desc: "主語（私たちは）" },
      { text: "will change", role: "V2", desc: "動詞（変更する予定だ）" },
      { text: "the branch position", role: "O2", desc: "目的語（分岐位置を）" }
    ],
    note: `<code>interfere</code> は「干渉する」という意味の自動詞で、自動車設計の現場で非常によく使われます。対義語は <code>clearance</code>（隙間があること）です。`
  },
  {
    id: 2,
    japanese: "ラジエーターホースがW/Hと相対干渉していますが、耐久試験をして問題ない事が証明できています。",
    english: "The radiator hose and the wire harness have interference due to relative motion, but the durability test confirmed there is no issue.",
    englishRaw: "The radiator hose and the wire harness have interference due to relative motion, but the durability test confirmed there is no issue.",
    grammar: "S1 have O1 M [but] S2 confirmed [there is no issue]",
    elements: [
      { text: "The radiator hose and the wire harness", role: "S1", desc: "主語（ラジエーターホースとワイヤーハーネス）" },
      { text: "have", role: "V1", desc: "動詞（持っている）" },
      { text: "interference", role: "O1", desc: "目的語（干渉を）" },
      { text: "due to relative motion", role: "M", desc: "修飾語（相対運動によって）" },
      { text: "but", role: "接", desc: "接続詞（しかし）" },
      { text: "the durability test", role: "S2", desc: "主語（耐久試験が）" },
      { text: "confirmed", role: "V2", desc: "動詞（確認した）" },
      { text: "there is no issue", role: "O2", desc: "目的語節（問題がないということを）" }
    ],
    note: `<code>relative motion</code> は「相対運動（二つの部品が動くことで発生する相対的なズレ）」を意味します。<code>durability test</code> は「耐久試験」です。
<div class="grammar-box">
  <strong>【入れ子構造の解説】</strong><br>
  この文の構造分解において、<code>confirmed</code>（確認した）の目的語（O2）である <code>there is no issue</code> の部分は、名詞節（中にさらにS Vがある構造）になっています。<br>
  この部分の構造を詳しく解説すると、以下のようになります。<br>
  <span class="indent">
    [名詞節（O2）の中身]：<br>
    ・<code>there</code>（導入の副詞：主語ではありません）<br>
    ・<span class="note-badge v">V</span> is（動詞）<br>
    ・<span class="note-badge s">S</span> no issue（主語：問題が無いこと）
  </span>
</div>`
  },
  {
    id: 3,
    japanese: "干渉の対策として保護材を追加します。",
    english: "We will add a protector as a countermeasure against interference.",
    englishRaw: "We will add a protector as a countermeasure against interference.",
    grammar: "S V O M",
    elements: [
      { text: "We", role: "S", desc: "主語（私たちは）" },
      { text: "will add", role: "V", desc: "動詞（追加する）" },
      { text: "a protector", role: "O", desc: "目的語（保護材を）" },
      { text: "as a countermeasure against interference", role: "M", desc: "修飾語（干渉への対策として）" }
    ],
    note: `<code>protector</code> は「保護材（ワイヤーハーネス等に巻くチューブやテープ）」を指します。<code>countermeasure</code> は「対策・対抗策」です。`
  },
  {
    id: 4,
    japanese: "私はこの干渉は問題無いと思います。なぜならホースの根元付近のため動きが無いからです。",
    english: "I think this interference is not an issue because there is little movement near the base of the hose.",
    englishRaw: "I think this interference is not an issue because there is little movement near the base of the hose.",
    grammar: "S1 V1 [O1] because [there is] S3 M",
    elements: [
      { text: "I", role: "S1", desc: "主語（私は）" },
      { text: "think", role: "V1", desc: "動詞（思う）" },
      { text: "this interference is not an issue", role: "O1", desc: "目的語節（この干渉は問題ではないということ）" },
      { text: "because", role: "接", desc: "接続詞（なぜなら）" },
      { text: "there", role: "M", desc: "修飾語（誘導副詞：そこに）" },
      { text: "is", role: "V3", desc: "動詞（存在する）" },
      { text: "little movement", role: "S3", desc: "主語（ほとんど動きがないこと）" },
      { text: "near the base of the hose", role: "M", desc: "修飾語（ホースの根元付近では）" }
    ],
    note: `<p><strong>⚠️ There is構文の主語について：</strong><br>
<code>there</code> は主語ではありません。この構文では、<code>is</code>（動詞 V）の後ろにくる <strong><code>little movement</code>（ほとんど動きが無いこと）が本当の主語 (S)</strong> となります。</p>
<div class="grammar-box">
  <strong>【入れ子構造 of 解説】</strong><br>
  この文の構造分解において、<code>think</code> の目的語（O1）である <code>this interference is not an issue</code> の部分は名詞節（中にさらにS Vがある文）になっています。<br>
  この部分の構造を詳しく解説すると、以下のようになります。<br>
  <span class="indent">
    [名詞節（O1）の中身]：<br>
    ・<span class="note-badge s">S</span> this interference（主語：この干渉は）<br>
    ・<span class="note-badge v">V</span> is not（動詞：〜ではない）<br>
    ・<span class="note-badge c">C</span> an issue（補語：問題）
  </span>
  また、後半の <code>because</code>（理由の副詞節）の中も <code>there is</code> 構文によるS V関係（V: is, S: little movement）になっています。
</div>`
  },
  {
    id: 5,
    japanese: "あなたがNGと言っている部位は号口モデルと構造が同じです。号口車両を確認してください。",
    english: "The part you pointed out as NG has the same structure as the current model. Please confirm the GOUGUCHI vehicle.",
    englishRaw: "The part you pointed out as NG has the same structure as the current model. Please confirm the GOUGUCHI vehicle.",
    grammar: "S1 M V1 O1 M . V2 O2",
    elements: [
      { text: "The part you pointed out as NG", role: "S1", desc: "主語（あなたがNGと指摘した部分）" },
      { text: "has", role: "V1", desc: "動詞（持っている）" },
      { text: "the same structure as the current model", role: "O1", desc: "目的語（現行/号口モデルと同じ構造を）" },
      { text: "Please confirm", role: "V2", desc: "動詞（確認してください）" },
      { text: "the GOUGUCHI vehicle", role: "O2", desc: "目的語（号口車両を）" }
    ],
    note: `号口（ごうぐち）モデルは量産モデルのことで、英語では <code>current model</code> や <code>mass-production model</code> などと表現されます。
<div class="grammar-box">
  <strong>【入れ子構造の解説】</strong><br>
  この文の構造分解において、主語である <code>The part</code>（部分）の後ろには、関係代名詞が省略された修飾節 <code>you pointed out as NG</code>（あなたがNGと指摘した）が入り込んでいます。<br>
  この修飾節の中の構造を詳しく解説すると、以下のようになります。<br>
  <span class="indent">
    [修飾節の中身]：<br>
    ・<span class="note-badge s">S</span> you（主語：あなたが）<br>
    ・<span class="note-badge v">V</span> pointed out（動詞：指摘した）<br>
    ・<span class="note-badge m">M</span> as NG（修飾語：NGとして）
  </span>
</div>`
  },
  {
    id: 6,
    japanese: "あなたが評価した結果、NG of 部位があったら教えてください。",
    english: "Please let me know if you find any NG parts after your evaluation.",
    englishRaw: "Please let me know if you find any NG parts after your evaluation.",
    grammar: "V1 O1 C1 [if] S2 V2 O2 M",
    elements: [
      { text: "Please let", role: "V1", desc: "動詞（使役：させてください）" },
      { text: "me", role: "O1", desc: "目的語（私に）" },
      { text: "know", role: "C1", desc: "補語（原形不定詞：知ることを）" },
      { text: "if", role: "接", desc: "接続詞（もし〜なら）" },
      { text: "you", role: "S2", desc: "主語（あなたが）" },
      { text: "find", role: "V2", desc: "動詞（見つける）" },
      { text: "any NG parts", role: "O2", desc: "目的語（何らかのNG部位を）" },
      { text: "after your evaluation", role: "M", desc: "修飾語（あなたの評価の後に）" }
    ],
    note: `<code>let + O + C（原形不定詞）</code> は「OにCさせる」という使役構文で、「let me know」で「私に知らせて（＝教えて）」という意味の定番表現になります。
<div class="grammar-box">
  <strong>【入れ子構造の解説】</strong><br>
  この文の構造分解において、条件を表す接続詞 <code>if</code> の後ろの部分は、それ自体の中にS Vがある副詞節になっています。<br>
  この部分の構造を詳しく解説すると、以下のようになります。<br>
  <span class="indent">
    [if節（副詞節）の中身]：<br>
    ・<span class="note-badge s">S</span> you（主語：あなたが）<br>
    ・<span class="note-badge v">V</span> find（動詞：見つける）<br>
    ・<span class="note-badge o">O</span> any NG parts（目的語：NGの部品を）
  </span>
</div>`
  },
  {
    id: 7,
    japanese: "このW/Hの長さを測ると寸法公差の最大値でした。だからこれ以上長くなりません。",
    english: "We measured this wire harness, and the length was at the maximum tolerance. Therefore, it will not become longer than this.",
    englishRaw: "We measured this wire harness, and the length was at the maximum tolerance. Therefore, it will not become longer than this.",
    grammar: "S1 V1 O1 [and] S2 V2 C2 . [Therefore] S3 V3 C3 M",
    elements: [
      { text: "We", role: "S1", desc: "主語（私たちは）" },
      { text: "measured", role: "V1", desc: "動詞（測定した）" },
      { text: "this wire harness", role: "O1", desc: "目的語（このワイヤーハーネスを）" },
      { text: "and", role: "接", desc: "接続詞（そして）" },
      { text: "the length", role: "S2", desc: "主語（長さは）" },
      { text: "was", role: "V2", desc: "動詞（〜であった）" },
      { text: "at the maximum tolerance", role: "C2", desc: "補語（最大寸法公差の位置に）" },
      { text: "Therefore", role: "M", desc: "修飾語（したがって）" },
      { text: "it", role: "S3", desc: "主語（それは）" },
      { text: "will not become", role: "V3", desc: "動詞（〜にならない）" },
      { text: "longer than this", role: "C3", desc: "補語・修飾語（これより長く）" }
    ],
    note: `<code>maximum tolerance</code> は「最大許容差・公差の最大値」を指します。設計公差内のギリギリであることを示しています。`
  },
  {
    id: 8,
    japanese: "この配線はTMKの組み付け順序だと噛み込みません。",
    english: "This wire will not be pinched if TMK's assembly procedure is followed.",
    englishRaw: "This wire will not be pinched if TMK's assembly procedure is followed.",
    grammar: "S1 V1 [if] S2 V2",
    elements: [
      { text: "This wire", role: "S1", desc: "主語（この配線は）" },
      { text: "will not be pinched", role: "V1", desc: "動詞（挟まれない・噛み込まない／受動態）" },
      { text: "if", role: "接", desc: "接続詞（もし〜なら）" },
      { text: "TMK's assembly procedure", role: "S2", desc: "主語（TMKの組み付け順序が）" },
      { text: "is followed", role: "V2", desc: "動詞（遵守されるなら／受動態）" }
    ],
    note: `<code>pinch</code> は「挟む、締め付ける、噛み込む」という意味です。
<div class="grammar-box">
  <strong>【入れ子構造の解説】</strong><br>
  この文の構造分解において、接続詞 <code>if</code> の後ろの部分は、それ自体の中にS V（受動態）がある副詞節になっています。<br>
  この部分の構造を詳しく解説すると、以下のようになります。<br>
  <span class="indent">
    [if節（副詞節）の中身]：<br>
    ・<span class="note-badge s">S</span> TMK's assembly procedure（主語：TMKの組み付け順序が）<br>
    ・<span class="note-badge v">V</span> is followed（動詞：守られる）
  </span>
</div>`
  },
  {
    id: 9,
    japanese: "このリード線は反対側も同じ問題がある事を設計者と確認しました。",
    english: "I confirmed with the designer that the opposite side of this lead wire has the same issue.",
    englishRaw: "I confirmed with the designer that the opposite side of this lead wire has the same issue.",
    grammar: "S1 V1 M [O1] . S2 V2 O2",
    elements: [
      { text: "I", role: "S1", desc: "主語（私は）" },
      { text: "confirmed", role: "V1", desc: "動詞（確認した）" },
      { text: "with the designer", role: "M", desc: "修飾語（設計者と）" },
      { text: "that the opposite side of this lead wire has the same issue", role: "O1", desc: "目的語節（このリード線の反対側にも同じ問題があること）" }
    ],
    note: `<code>lead wire</code> は「リード線」です。<code>opposite side</code> は「反対側（対称側）」です。
<div class="grammar-box">
  <strong>【入れ子構造の解説】</strong><br>
  この文の構造分解において、<code>confirmed</code>（確認した）の目的語（O1）である <code>that the opposite side... has the same issue</code> の部分は、<code>that</code> で始まる名詞節（中にさらにS Vがある構造）になっています。<br>
  この部分の構造を詳しく解説すると、以下のようになります。<br>
  <span class="indent">
    [that節（名詞節）の中身]：<br>
    ・<span class="note-badge s">S</span> the opposite side of this lead wire（主語：このリード線の反対側が）<br>
    ・<span class="note-badge v">V</span> has（動詞：持っている）<br>
    ・<span class="note-badge o">O</span> the same issue（目的語：同じ問題を）
  </span>
</div>`
  }
];
