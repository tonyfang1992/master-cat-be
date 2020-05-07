"use strict";
const bcrypt = require("bcryptjs");
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "root@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: "admin",
          name: "root",
          rank: "黃金會員",
          phone: "0911222333",
          address: "台北101",
          spendMoney: 8888,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user1@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: "customer",
          name: "user1",
          rank: "一般會員",
          phone: "0988555999",
          address: "高雄夢時代",
          spendMoney: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user2@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: "customer",
          name: "user2",
          rank: "白銀會員",
          spendMoney: 3500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "Cats",
      [
        {
          name: "橘貓",
          gender: "男生",
          UserId: 2,
          age: 6,
          weight: 8,
          breed: "米克斯",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "ThisWeekActivities",
      [
        {
          name: "4月零食盒 12件$499元!",
          description:
            "【4月防疫版禮盒今天開搶!】塞爆12件!每件不到$42你敢信!? 有吃有玩又實用，汪喵澎湃零食盒只要$499!每個月為毛爸媽精選品項不重複的天然營養肉乾、肉泥零食，新款玩具，市價49折起一次買齊!",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "換季除毛 全區$49起!",
          description:
            "【換季除毛專科】跟過敏、體臭、搔癢、滿屋子毛Say Bye! 洗劑、梳理、除毛好物 最低$49起!嚴選毛爸媽滿意度最高的專業貓狗清潔、除毛、環境除臭抑菌好物!",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 65,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "【爆毛罐罐】Peko整箱$599",
          description:
            "添加滿滿鱉蛋粉! 爆毛就吃這罐! PekoPeko 沛可 主食餐罐 貓狗皆適用!細緻好吞食的湯狀罐 體貼牙口不佳的老幼毛孩! 鱉蛋粉豐富卵磷脂 幫助毛髮蓬蓬滑順!",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 85,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "【安娜美廚】新裝上市",
          description:
            "Annamaet 安娜美廚 (安娜瑪特) 貓狗飼料安娜瑪特回來了！全球百萬飼主,WDJ,FDA齊力推薦！冠軍犬貓的頂級乾糧食譜！",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "【希爾思】送7-11咖啡x2",
          description:
            "【希爾思】全品下殺65折! 即日起 4kg / 4磅以下 任 2 包，6kg / 13磅以上 任 1 包，送 7-11 City Cafe雙人咖啡提貨券 可換美式咖啡(價值$90) 數量有限，贈完為止!",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 65,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "【春夏涼墊】最高省千元!",
          description:
            "毛孩的春夏涼品來了! 貓狗涼爽床/窩/屋/毯/墊 全面$290起!夏季、冬季 四季皆宜 貓狗 開放式/半開放式 高架涼床/棉窩/貓屋/毯類",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "【2020 WDJ】入選飼料出爐",
          description:
            "WDJ是什麼? 美國權威雜誌公正評鑑，精選頂級品牌，高含肉量、無劣質材料添加，每一口乾乾都是專業認證的營養保障!",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "【防疫專區】無酒精5折起!",
          description:
            "嚴選全站最強除臭噴霧、地板、餐具、衣物除臭洗劑、草本驅蟲好物",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "【外出箱包】出清49折起!",
          description:
            "店長推薦外出旅遊必備外出包、旅行箱包、拉桿包、牽繩、胸背帶、項圈、外出水壺、防蚤用品",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 49,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "NewActivities",
      [
        {
          name: "毛起來 保健洗沐$139起!",
          description:
            "98.2%的使用滿意度! 寵物肌膚與健康的養護專家! 百萬毛爸媽與獸醫極力推薦! 從狗貓需求出發，成分透明、來源天然、SGS檢驗通過!",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "防禦工事 貓砂/清潔新品",
          description:
            "防御工事Hu'ruru 寵物清潔保養，天然無塵礦砂，除臭礦型豆腐砂，活性碳強效除臭/低粉塵，貓主子如廁好自在！除毛磚、除臭噴霧新上市",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 88,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "黃金盾 抗菌新品9折!",
          description:
            "最多專業人士推薦! 非酒精抗菌清潔商品，人寵舔食無害，多項國際認證，抗菌時效為最高7 天！",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 90,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "就愛酪梨 嘗鮮價$499!",
          description:
            "含有3倍omega的超級蔬果-酪梨油，是追求皮膚健康、腸胃勇健和毛髮亮麗的毛孩最需要的主食!",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 90,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "春季新品 75折起!",
          description: "新鮮好物火熱到貨!上百件貓狗飼料天然零食罐頭床窩搶先購",
          image:
            "https://loremflickr.com/800/500/restaurant,food/?random=${Math.random() * 100}",
          discount: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "Subcategories",
      [
        {
          name: "貓咪肉泥 / 貓草 / 化毛膏",
          description:
            "與貓主子感情加溫必備日系肉泥、化毛紓壓貓草、木天蓼、營養化毛膏",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "貓草 / 薄荷 / 木天蓼",
          description:
            "讓貓咪心神蕩漾、紓壓愉悅、化毛保健的貓草、貓薄荷、木天蓼、DIY種植貓草",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "魚乾 / 魚條 / 肉鬆",
          description: "嚴選貓咪最愛的海鮮、魚乾、肉條、魚鬆點心",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "貓砂 / 貓砂盆 / 尿布墊",
          description:
            "百萬網友大推99.99%凝結力礦砂、日本30年口碑無耗材除毛神器刷、毛孩環境除臭第一品牌臭味滾、超省錢高CP值可沖馬桶環保除臭松木砂、幼老汪喵照護必備高吸水尿布墊、養貓達人必備多功能除臭砂盆",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "洗沐 / 美容 / 清潔修剪",
          description:
            "天然SPA級精油洗毛精、乾洗噴霧、口腔噴劑、指甲剪、除毛梳、電剪、電動牙刷，全面75折起!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "環境清潔 / 消臭 / 驅蟲",
          description:
            "嚴選全站最強除臭噴霧、地板、餐具、衣物除臭洗劑、草本驅蟲好物",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "春夏涼墊",
          description:
            "夏季、冬季 四季皆宜 貓狗 開放式/半開放式 高架涼床/棉窩/貓屋/毯類",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "喵保健食品",
          description:
            "嚴選各年齡層毛孩必備的益生菌、口服葉黃素、排毛化毛粉、鮭魚薑黃油、爆毛養膚粉、納豆酵素、腸胃保健品，為牠維持日常活力、醫生遠離我!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "貓抓板 / 紙屋 / 跳台",
          description:
            "保衛家具大作戰! 嚴選超耐抓造型貓抓板、貓抓屋、磨爪玩具、益智DIY玩具",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "餐桌 / 餐碗 / 飲水機",
          description:
            "毛孩家庭必備! 全台最夯自動飲水機、智能飲水機、餐具、碗盤、飲水機濾心耗材",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "逗貓棒 / 貓草玩具",
          description:
            "貓皇貓奴一生必備的逗貓棒、電動逗貓玩具、貓草包、木天蓼玩具、DIY貓草種植",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "啃咬 /拉扯 / 陪伴玩具",
          description:
            "愛磨牙汪汪與喵喵必備啃咬/潔牙/陪伴/發聲/益智/藏食/抗憂鬱玩具",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "外出箱 / 包 / 籠",
          description:
            "店長推薦外出旅遊必備外出包、旅行箱包、拉桿包、牽繩、胸背帶、項圈、外出水壺、防蚤用品",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "貓咪飼料",
          description:
            "WDJ推薦，FDA認可的營養保障，讓毛孩安心吃飽飽!法國皇家、希爾思、渴望、柏萊富、莫比、法米納",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "喵大罐罐",
          description:
            "超人氣罐罐單品下殺21元起！百款毛爸媽高回購率的罐罐推薦、高含肉量主食罐、高嗜口性副食罐，缺水厭食救星這裡挑!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "肉乾零食",
          description:
            "百件毛孩最愛多汁肉乾、討好主子必備肉泥、極上鮮食凍乾、來自海洋天然小點心、香脆可口化毛餡餅、耐嚼磨牙起司棒這裡選!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "餐桌飲水",
          description:
            "毛孩家庭必備! 全台最夯自動飲水機、智能飲水機、餐具、碗盤、飲水機濾心耗材",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "抓板玩具",
          description:
            "家裡就是遊樂場! 一咬就停不下來的超萌啾啾玩具、抓過就回不去的超耐磨組合貓抓版$39起、銅板價羽毛逗貓棒$79起、電動逗貓神器好評熱銷中!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "保健護理",
          description:
            "嚴選各年齡層毛孩必備的益生菌、口服葉黃素、排毛化毛粉、鮭魚薑黃油、爆毛養膚粉、納豆酵素、腸胃保健品，為牠維持日常活力、醫生遠離我!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "Cans",
      [
        {
          brand: "惜時 SEEDS 貓罐頭",
          description:
            "台灣惜時SEEDS，高CP質的餐罐代表，從嚴選食材到完成製罐，由全球性上櫃上市的工廠製造，全新配方比例再晉級，營養又補水!‎",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "PekoPeko 沛可",
          description:
            "細緻好吞食的湯狀罐 體貼牙口不佳的老幼毛孩! 鱉蛋粉豐富卵磷脂 幫助毛髮蓬蓬滑順!",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "KATTOVIT 康特維",
          description:
            "德國進口 獸醫推薦! 針對各種需求的貓咪處方食品 全系列產品：腎臟保健、泌尿保健、腸胃保健、體重管理及低敏配方",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "Royal Canin 法國皇家",
          description:
            "奧地利原裝進口，依循皇家乾糧精神，為毛孩需求量身訂製的專屬營養，質地細緻營養更好吸收!",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "FirstMate 第一饗宴",
          description: "加拿大頂級楓味 WDJ連年推薦 無穀貓咪主食罐",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "原燒",
          description:
            "原燒 貓罐頭原燒 貓罐頭原燒 貓罐頭原燒 貓罐頭原燒 貓罐頭!",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "CanTypes",
      [
        {
          type: "主食罐",
          description: "頂級貓咪主食罐推薦",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "副食罐",
          description:
            "可以做為額外水分營養補充、獎勵訓練、提振食慾、拌飼料用的美味副食點心罐頭",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "Feeds",
      [
        {
          brand: "原點(本能) Instinct ",
          description:
            "原點(本能) Instinct WDJ連續推薦貓咪飼料!美國第一鮮肉無穀低穀飼料領導品牌，原點完美保留原始營養的鮮肉凍乾肉塊與專利純肉噴灑技術，原點保留100%營養，就像餐餐吃鮮肉!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "愛酪麗 AvoDerm",
          description:
            "含有3倍omega的超級蔬果-酪梨油，是追求皮膚健康、腸胃勇健和毛髮亮麗的毛孩最需要的主食!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "ZiwiPeak 巔峰",
          description:
            "超過96%鮮肉含量 AIR-DRIED 30℃ 自然風乾技術 將三倍營養濃縮鎖入每一份巔峰鮮肉糧!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "安娜美廚 Annamaet",
          description:
            "安娜瑪特回來了！全球百萬飼主,WDJ,FDA齊力推薦！冠軍犬貓的頂級乾糧食譜！",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "第一饗宴 FirstMate",
          description:
            "北美第一間無穀飼料開創者! 100%自家工廠生產+純天然原料，低敏好消化!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "黑鷹 BlackHawk",
          description:
            "黑鷹 BlackHawk 貓咪無穀/低穀飼料 全世界唯一添加澳洲'鴯鶓油'的毛孩飼料! 推薦 BlackHawk黑鷹 全系列富含液態黃金鴯鶓油，70%不飽和脂肪酸，最適合毛孩吸收，保護毛孩心腦血管!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "GHR 健康主義",
          description:
            "紐西蘭符合AAFCO標準健康糧，添加蔓越莓、百里香等7種天然草本，均衡營養，腸胃好棒!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "KitCat",
          description:
            "紐西蘭符合AAFCO標準健康糧，添加蔓越莓、百里香等7種天然草本，均衡營養，腸胃好棒!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "ANF 愛恩富",
          description:
            "ANF 愛恩富 貓飼料 適口性佳，容易消化， 提供三重蛋白質（雞肉，雞蛋，魚）給您的毛小孩最完整均衡的營養",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "藍饌 Blue Buffalo",
          description:
            "北美銷售第一天然寵糧，採用兩種顆粒增強營養；獨家”冷製法”製造的LifeSource Bits®抗氧顆粒提供了增強健康的營養補給。",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "卡比 Canidae",
          description:
            "卡比採用簡單的原料配方，使用鮮肉和天然食材，添加寵物生長必需的維他命和礦物質，讓您的愛寵健康長久陪伴您！",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "Orijen 渴望",
          description:
            "全網最便宜! 渴望 Orijen 貓飼料 WDJ推薦! 地表最強無穀貓飼料，85%超高鮮肉含量，新鮮區域原物料如同大自然供給，提供最天然、豐富的營養素。",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "法國皇家 RoyalCanin",
          description:
            "法國皇家 RoyalCanin 以超過50年的專業營養經驗，致力於臨床實證以及科學研究，用心調配確保貓犬獲得各個成長階段所需的專屬營養，維持寵物健康最佳狀態!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "FeedAges",
      [
        {
          age: "幼貓",
          description:
            "針對1歲以下發育期幼貓、懷孕期母貓所設計的高營養需求配方飼料",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          age: "成貓",
          description: "針對1歲以上成年貓咪需求的全方位均衡營養飼料",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          age: "老貓",
          description: "滿足7歲以上熟齡貓所需的低卡低脂、低負擔的樂齡飼料配方",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          age: "全齡貓",
          description:
            "店長為你篩選了全年齡階段都適合的全方位配方，是貓咪可以從小吃到老的均衡型乾糧!",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    queryInterface.bulkInsert(
      "FeedFunctions",
      [
        {
          function: "貓咪體重控制、低卡飼料推薦",
          description: "特別為需要控制體重的貓咪所精選的低卡低負擔配方飼料",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          function: "貓咪腸胃保健型飼料推薦",
          description:
            "針對容易軟便、腸胃消化較弱的貓咪所精選，添加益生菌或使用單一動物蛋白的低敏感飼料配方",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          function: "貓咪泌尿保健型飼料",
          description: "針對貓咪容易有的結石、泌尿道問題所調配的泌尿保健型飼料",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          function: "無穀貓咪飼料推薦",
          description: "更多首頁沒有的隱藏版貓咪無穀飼料品牌推薦!",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    return queryInterface.bulkInsert(
      "Products",
      Array.from({ length: 50 }).map((d) => ({
        name: faker.name.findName(),
        description: faker.lorem.text(),
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}",
        amount: faker.finance.mask(),
        SaleAmount: faker.finance.mask(),
        specification: faker.lorem.sentence(),
        price: faker.finance.mask(),
        detail: faker.lorem.sentence(),
        discount: 75,
        launched: false,
        ThisWeekActivityId: Math.floor(Math.random() * 9) + 1,
        NewActivityId: Math.floor(Math.random() * 5) + 1,
        CategoryId: Math.floor(Math.random() * 6) + 1,
        SubcategoryId: Math.floor(Math.random() * 13) + 1,
        CanId: Math.floor(Math.random() * 6) + 1,
        CanTypeId: Math.floor(Math.random() * 2) + 1,
        FeedId: Math.floor(Math.random() * 13) + 1,
        FeedAgeId: Math.floor(Math.random() * 4) + 1,
        FeedFunctionId: Math.floor(Math.random() * 4) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users", null, {});
    queryInterface.bulkDelete("Cats", null, {});
    queryInterface.bulkDelete("ThisWeekActivities", null, {});
    queryInterface.bulkDelete("NewActivities", null, {});
    queryInterface.bulkDelete("Subcategories", null, {});
    queryInterface.bulkDelete("Categories", null, {});
    queryInterface.bulkDelete("Cans", null, {});
    queryInterface.bulkDelete("CanTypes", null, {});
    queryInterface.bulkDelete("Feeds", null, {});
    queryInterface.bulkDelete("FeedAges", null, {});
    queryInterface.bulkDelete("FeedFunctions", null, {});
    return queryInterface.bulkDelete("Products", null, {});
  },
};
