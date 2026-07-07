export const sentences = [
  {
    id: 1,
    japanese: "W/H（ワイヤーハーネス）の分岐が金属エッジと干渉しているので、分岐位置を変更します。",
    english: "The wire harness branch interferes (with the metal edge), so we will change the branch position.",
    englishRaw: "The wire harness branch interferes with the metal edge, so we will change the branch position.",
    grammar: "S1 V1 M [so] S2 V2 O2",
    elements: [
      { text: "The wire harness branch", role: "S1", desc: "主語（ワイヤーハーネスの分岐）" },
      { text: "interferes", role: "V1", desc: "動詞（干渉する）" },
      { text: "with the metal edge", role: "M", desc: "修飾語（金属エッジと）" },
      { text: "so", role: "接", desc: "接続詞（だから、〜なので）" },
      { text: "we", role: "S2", desc: "主語（私たちは）" },
      { text: "will change", role: "V2", desc: "動詞（変更する予定だ）" },
      { text: "the branch position", role: "O2", desc: "目的語（分岐位置を）" }
    ],
    note: "interfereは「干渉する」という意味の自動詞で、自動車設計の現場で非常によく使われます。対義語はclearance（隙間があること）です。"
  },
  {
    id: 2,
    japanese: "ラジエーターホースがW/Hと相対干渉していますが、耐久試験をして問題ない事が証明できています。",
    english: "The radiator hose and the wire harness have interference (due to relative motion), but the durability test confirmed [there is no issue].",
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
    note: "relative motionは「相対運動（二つの部品が動くことで発生する相対的なズレ）」を意味します。durability testは「耐久試験」です。"
  },
  {
    id: 3,
    japanese: "干渉の対策として保護材を追加します。",
    english: "We will add a protector (as a countermeasure <against interference>).",
    englishRaw: "We will add a protector as a countermeasure against interference.",
    grammar: "S V O M",
    elements: [
      { text: "We", role: "S", desc: "主語（私たちは）" },
      { text: "will add", role: "V", desc: "動詞（追加する）" },
      { text: "a protector", role: "O", desc: "目的語（保護材を）" },
      { text: "as a countermeasure against interference", role: "M", desc: "修飾語（干渉への対策として）" }
    ],
    note: "protectorは「保護材（ワイヤーハーネス等に巻くチューブやテープ）」を指します。countermeasureは「対策・対抗策」です。"
  },
  {
    id: 4,
    japanese: "私はこの干渉は問題無いと思います。なぜならホースの根元付近のため動きが無いからです。",
    english: "I think [this interference is not an issue] because there is little movement (near the base <of the hose>).",
    englishRaw: "I think this interference is not an issue because there is little movement near the base of the hose.",
    grammar: "S1 V1 [O1] because [there is] S3 M",
    elements: [
      { text: "I", role: "S1", desc: "主語（私は）" },
      { text: "think", role: "V1", desc: "動詞（思う）" },
      { text: "this interference is not an issue", role: "O1", desc: "目的語節（この干渉は問題ではないということ）" },
      { text: "because", role: "接", desc: "接続詞（なぜなら）" },
      { text: "there is", role: "V3", desc: "動詞（存在する）" },
      { text: "little movement", role: "S3", desc: "主語（ほとんど動きが［ない］）" },
      { text: "near the base of the hose", role: "M", desc: "修飾語（ホースの根元付近では）" }
    ],
    note: "※[this interference is not an issue]全体がthinkの目的語(O1)です。there is構文ではisがV、movementがSとなります。littleは否定的に「ほとんど〜ない」という意味になります。"
  },
  {
    id: 5,
    japanese: "あなたがNGと言っている部位は号口モデルと構造が同じです。号口車両を確認してください。",
    english: "The part <you pointed out as NG> has the same structure (as the current model). Please confirm the GOUGUCHI vehicle.",
    englishRaw: "The part you pointed out as NG has the same structure as the current model. Please confirm the GOUGUCHI vehicle.",
    grammar: "S1 M V1 O1 M . V2 O2",
    elements: [
      { text: "The part you pointed out as NG", role: "S1", desc: "主語（あなたがNGと指摘した部分）" },
      { text: "has", role: "V1", desc: "動詞（持っている）" },
      { text: "the same structure as the current model", role: "O1", desc: "目的語（現行/号口モデルと同じ構造を）" },
      { text: "Please confirm", role: "V2", desc: "動詞（確認してください）" },
      { text: "the GOUGUCHI vehicle", role: "O2", desc: "目的語（号口車両を）" }
    ],
    note: "号口（ごうぐち）モデルは量産モデルのことで、英語ではcurrent modelやmass-production modelなどと表現されます。GOUGUCHI（日本語のローマ字表記）も社内や仕入先との会話でそのまま使われることがあります。"
  },
  {
    id: 6,
    japanese: "あなたが評価した結果、NG of 部位があったら教えてください。",
    english: "Please let me know if you find any NG parts (after your evaluation).",
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
    note: "let + O + C（動詞の原形）は「OにCさせる」という使役構文で、「let me know」で「私に知らせて（＝教えて）」という意味の定番表現になります。"
  },
  {
    id: 7,
    japanese: "このW/Hの長さを測ると寸法公差の最大値でした。だからこれ以上長くなりません。",
    english: "We measured this wire harness, and the length was at the maximum tolerance. Therefore, it will not become longer (than this).",
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
    note: "maximum toleranceは「最大許容差・公差の最大値」を指します。設計公差内のギリギリであることを示しています。"
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
    note: "pinchは「挟む、締め付ける、噛み込む」という意味です。assembly procedure is followedは「組み付け順序・組立工程が遵守されるなら」という意味です。TMKは社内略語または特定の組立工法の名称を想定しています。"
  },
  {
    id: 9,
    japanese: "このリード線は反対側も同じ問題がある事を設計者と確認しました。",
    english: "I confirmed (with the designer) [that the opposite side of this lead wire has the same issue].",
    englishRaw: "I confirmed with the designer that the opposite side of this lead wire has the same issue.",
    grammar: "S1 V1 M [O1] . S2 V2 O2",
    elements: [
      { text: "I", role: "S1", desc: "主語（私は）" },
      { text: "confirmed", role: "V1", desc: "動詞（確認した）" },
      { text: "with the designer", role: "M", desc: "修飾語（設計者と）" },
      { text: "that the opposite side of this lead wire has the same issue", role: "O1", desc: "目的語節（このリード線の反対側にも同じ問題があること）" }
    ],
    note: "lead wireは「リード線、導線」を指します。opposite sideは「反対側（対称側）」です。that以降がconfirmedの目的語である名詞節になります。"
  }
];
