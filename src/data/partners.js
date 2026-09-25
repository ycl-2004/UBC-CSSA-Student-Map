// Runtime source of truth. One record per location; onlineOnly entries have no map coordinates.
(() => {
  "use strict";
  const partners = [
  {
    "id": "partner_1",
    "name": "海底捞（Broadway）",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "food",
    "icon": "🍲",
    "perk": "周一至周五（节假日除外）菜品 20% off",
    "shortPerk": "菜品 20% off · 工作日",
    "tags": [
      "Vancouver",
      "超值折扣"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：周一至周五（节假日除外）菜品 20% off。地址：3204 W Broadway, Vancouver, BC V6K 2H4。",
    "address": "3204 W Broadway, Vancouver, BC V6K 2H4",
    "lat": 49.26398,
    "lng": -123.1762,
    "aliases": [
      "haidilao",
      "hai di lao",
      "hot pot",
      "火锅",
      "海底捞"
    ]
  },
  {
    "id": "partner_2",
    "name": "Rumble Boxing Richmond",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "fun",
    "icon": "🥊",
    "perk": "20% off",
    "shortPerk": "20% off",
    "tags": [
      "Richmond",
      "超值折扣"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：20% off。地址：105-5766 Gilbert Rd, Richmond, BC V7C 0G1。",
    "address": "105-5766 Gilbert Rd, Richmond, BC V7C 0G1",
    "lat": 49.17211,
    "lng": -123.14647,
    "aliases": [
      "rumble",
      "boxing",
      "拳击",
      "健身"
    ]
  },
  {
    "id": "partner_3",
    "name": "From 1% Skin Lab",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "life",
    "icon": "✨",
    "perk": "护肤品 20% off；脱毛 50% off；秋季皮肤管理：$150 体验价，$200 两次；一个指定项目 15% off；两个指定项目 20% off",
    "shortPerk": "护肤品 20% off",
    "tags": [
      "Vancouver",
      "超值折扣"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：护肤品 20% off；脱毛 50% off；秋季皮肤管理：$150 体验价，$200 两次；一个指定项目 15% off；两个指定项目 20% off。地址：2828 Granville St, Vancouver, BC V6H 3J5。",
    "address": "2828 Granville St, Vancouver, BC V6H 3J5",
    "lat": 49.25958,
    "lng": -123.13872,
    "aliases": [
      "from 1%",
      "from1%",
      "skin lab",
      "美容",
      "护肤",
      "脱毛",
      "皮肤管理"
    ]
  },
  {
    "id": "partner_4",
    "name": "Share Tea",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Vancouver"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：1020 Mainland St Unit 30, Vancouver, BC V6B 2T5。",
    "address": "1020 Mainland St Unit 30, Vancouver, BC V6B 2T5",
    "lat": 49.2761,
    "lng": -123.11928,
    "aliases": [
      "share tea",
      "sharetea",
      "bubble tea",
      "boba",
      "奶茶",
      "茶饮"
    ]
  },
  {
    "id": "partner_5",
    "name": "Share Tea",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Vancouver"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：3619 Kingsway, Vancouver, BC V5R 5M1。",
    "address": "3619 Kingsway, Vancouver, BC V5R 5M1",
    "lat": 49.2312,
    "lng": -123.0278,
    "aliases": [
      "share tea",
      "sharetea",
      "bubble tea",
      "boba",
      "奶茶",
      "茶饮"
    ]
  },
  {
    "id": "partner_6",
    "name": "Share Tea",
    "area": "ubc",
    "areaLabel": "UBC Campus",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "UBC Campus",
      "校区直达"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：3348 Wesbrook Mall, Vancouver, BC V6S 0A8。",
    "address": "3348 Wesbrook Mall, Vancouver, BC V6S 0A8",
    "lat": 49.25449,
    "lng": -123.23503,
    "aliases": [
      "share tea",
      "sharetea",
      "bubble tea",
      "boba",
      "奶茶",
      "茶饮"
    ]
  },
  {
    "id": "partner_7",
    "name": "Share Tea",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Vancouver"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：1673 Renfrew St, Vancouver, BC V5K 4E1。",
    "address": "1673 Renfrew St, Vancouver, BC V5K 4E1",
    "lat": 49.2698,
    "lng": -123.0441,
    "aliases": [
      "share tea",
      "sharetea",
      "bubble tea",
      "boba",
      "奶茶",
      "茶饮"
    ]
  },
  {
    "id": "partner_8",
    "name": "Share Tea",
    "area": "langley",
    "areaLabel": "Langley",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Langley"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：19705 Fraser Hwy Unit 134A, Langley, BC V3A 7E9。",
    "address": "19705 Fraser Hwy Unit 134A, Langley, BC V3A 7E9",
    "lat": 49.1068,
    "lng": -122.6738,
    "aliases": [
      "share tea",
      "sharetea",
      "bubble tea",
      "boba",
      "奶茶",
      "茶饮"
    ]
  },
  {
    "id": "partner_9",
    "name": "Share Tea",
    "area": "surrey",
    "areaLabel": "Surrey",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Surrey"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：9965 152 St Unit 4B, Surrey, BC V3R 4G5。",
    "address": "9965 152 St Unit 4B, Surrey, BC V3R 4G5",
    "lat": 49.1834,
    "lng": -122.8005,
    "aliases": [
      "share tea",
      "sharetea",
      "bubble tea",
      "boba",
      "奶茶",
      "茶饮"
    ]
  },
  {
    "id": "partner_10",
    "name": "Share Tea",
    "area": "coquitlam",
    "areaLabel": "Coquitlam",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Coquitlam"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：435 North Rd, Coquitlam, BC V3K 3V9。",
    "address": "435 North Rd, Coquitlam, BC V3K 3V9",
    "lat": 49.2486,
    "lng": -122.8938,
    "aliases": [
      "share tea",
      "sharetea",
      "bubble tea",
      "boba",
      "奶茶",
      "茶饮"
    ]
  },
  {
    "id": "partner_11",
    "name": "HAKUMORI",
    "area": "burnaby",
    "areaLabel": "Burnaby",
    "category": "life",
    "icon": "🥗",
    "perk": "官网所有商品使用折扣码 UBCCSSA，享 15% off",
    "shortPerk": "官网 15% off · UBCCSSA",
    "tags": [
      "Burnaby"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：官网所有商品使用折扣码 UBCCSSA，享 15% off。地址：5154 Still Creek Ave, Burnaby, BC V5C 4E4。",
    "address": "5154 Still Creek Ave, Burnaby, BC V5C 4E4",
    "lat": 49.2604,
    "lng": -122.9984,
    "aliases": [
      "hakumori",
      "haku mori",
      "ubccssa",
      "ubc cssa",
      "网店",
      "护肤"
    ]
  },
  {
    "id": "partner_12",
    "name": "春芳号 Chun Fun How",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Vancouver"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：1067 W Broadway, Vancouver, BC。",
    "address": "1067 W Broadway, Vancouver, BC",
    "lat": 49.26376,
    "lng": -123.1284,
    "aliases": [
      "春芳号",
      "春芳號",
      "chun fun how",
      "chunfunhow",
      "奶茶"
    ]
  },
  {
    "id": "partner_13",
    "name": "春芳号 Chun Fun How",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Richmond"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：#105-4751 Garden City Rd, Richmond, BC。",
    "address": "#105-4751 Garden City Rd, Richmond, BC",
    "lat": 49.17789,
    "lng": -123.12549,
    "aliases": [
      "春芳号",
      "春芳號",
      "chun fun how",
      "chunfunhow",
      "奶茶"
    ]
  },
  {
    "id": "partner_14",
    "name": "First Bite Tart & Cake",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "drink",
    "icon": "🍰",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Richmond"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：153-5951 Minoru Blvd, Richmond, BC。",
    "address": "153-5951 Minoru Blvd, Richmond, BC",
    "lat": 49.17108,
    "lng": -123.14045,
    "aliases": [
      "first bite",
      "firstbite",
      "tart",
      "cake",
      "蛋挞",
      "甜点",
      "烘焙"
    ]
  },
  {
    "id": "partner_15",
    "name": "Tokyo in April",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "food",
    "icon": "🍣",
    "perk": "4 人及以上用餐 10% off",
    "shortPerk": "4 人及以上用餐 10% off",
    "tags": [
      "Vancouver"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：4 人及以上用餐 10% off。地址：526 Abbott St / International Village Mall, 88 W Pender St Unit 1103, Vancouver, BC V6B 6N7。",
    "address": "526 Abbott St / International Village Mall, 88 W Pender St Unit 1103, Vancouver, BC V6B 6N7",
    "lat": 49.28028,
    "lng": -123.1067,
    "aliases": [
      "tokyo in april",
      "日料",
      "日本料理"
    ]
  },
  {
    "id": "partner_16",
    "name": "Slothfuls",
    "area": "burnaby",
    "areaLabel": "Burnaby",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Burnaby"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：5242 Kingsway, Burnaby, BC。",
    "address": "5242 Kingsway, Burnaby, BC",
    "lat": 49.2258,
    "lng": -122.984,
    "aliases": [
      "slothfuls",
      "甜品",
      "dessert"
    ]
  },
  {
    "id": "partner_17",
    "name": "黑牛家（Hot Spot Buffet）",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "food",
    "icon": "🍲",
    "perk": "饮料 10% off",
    "shortPerk": "饮料 10% off",
    "tags": [
      "Vancouver"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：饮料 10% off。地址：240-3340 Kingsway, Vancouver, BC V5R 5L1。",
    "address": "240-3340 Kingsway, Vancouver, BC V5R 5L1",
    "lat": 49.23318,
    "lng": -123.03444,
    "aliases": [
      "hot spot buffet",
      "hotspot",
      "烧烤",
      "火锅"
    ]
  },
  {
    "id": "partner_18",
    "name": "MYST 觅食",
    "area": "burnaby",
    "areaLabel": "Burnaby",
    "category": "food",
    "icon": "🍜",
    "perk": "10% off all in-store purchases; 15% off event food orders of 50+ meals; 20% off event food orders of 100+ meals",
    "shortPerk": "10% off in-store purchases",
    "tags": [
      "Burnaby",
      "超值折扣"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：店内消费 10% off；50 份及以上活动餐食 15% off；100 份及以上活动餐食 20% off。地址：6400 Kingsway, Burnaby, BC V5E 1C5。",
    "address": "6400 Kingsway, Burnaby, BC V5E 1C5",
    "lat": 49.21935,
    "lng": -122.97069,
    "aliases": [
      "myst",
      "觅食",
      "event food",
      "活动餐食",
      "团餐"
    ]
  },
  {
    "id": "partner_19",
    "name": "MYST 觅食",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "food",
    "icon": "🍜",
    "perk": "10% off all in-store purchases; 15% off event food orders of 50+ meals; 20% off event food orders of 100+ meals",
    "shortPerk": "10% off in-store purchases",
    "tags": [
      "Vancouver",
      "超值折扣"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：店内消费 10% off；50 份及以上活动餐食 15% off；100 份及以上活动餐食 20% off。地址：2028 W 41st Ave, Vancouver, BC V6M 1Y8。",
    "address": "2028 W 41st Ave, Vancouver, BC V6M 1Y8",
    "lat": 49.2355,
    "lng": -123.153,
    "aliases": [
      "myst",
      "觅食",
      "event food",
      "活动餐食",
      "团餐"
    ]
  },
  {
    "id": "partner_20",
    "name": "MYST 觅食",
    "area": "langley",
    "areaLabel": "Langley",
    "category": "food",
    "icon": "🍜",
    "perk": "10% off all in-store purchases; 15% off event food orders of 50+ meals; 20% off event food orders of 100+ meals",
    "shortPerk": "10% off in-store purchases",
    "tags": [
      "Langley",
      "超值折扣"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：店内消费 10% off；50 份及以上活动餐食 15% off；100 份及以上活动餐食 20% off。地址：6225 200 St, Langley, BC。",
    "address": "6225 200 St, Langley, BC",
    "lat": 49.1158,
    "lng": -122.657,
    "aliases": [
      "myst",
      "觅食",
      "event food",
      "活动餐食",
      "团餐"
    ]
  },
  {
    "id": "partner_21",
    "name": "添璽（The North Bistro）",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "food",
    "icon": "🍜",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Richmond",
      "天车/商圈"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：4540 No. 3 Rd Unit 1200, Richmond, BC V6X 3V7。",
    "address": "4540 No. 3 Rd Unit 1200, Richmond, BC V6X 3V7",
    "lat": 49.1816,
    "lng": -123.1365,
    "aliases": [
      "添玺",
      "the north bistro"
    ]
  },
  {
    "id": "partner_22",
    "name": "柠记·手打柠檬茶",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "drink",
    "icon": "🧋",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Richmond",
      "天车/商圈"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：4260 No. 3 Rd, Richmond, BC V6X 2C2。",
    "address": "4260 No. 3 Rd, Richmond, BC V6X 2C2",
    "lat": 49.1834,
    "lng": -123.1366,
    "aliases": [
      "柠记",
      "柠檬茶",
      "lemon tea"
    ]
  },
  {
    "id": "partner_23",
    "name": "Wren Cafe",
    "area": "vancouver",
    "areaLabel": "Vancouver",
    "category": "drink",
    "icon": "🍰",
    "perk": "15% off",
    "shortPerk": "15% off",
    "tags": [
      "Vancouver"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：15% off。地址：280 Nelson St, Vancouver, BC V6B 2E2。",
    "address": "280 Nelson St, Vancouver, BC V6B 2E2",
    "lat": 49.277,
    "lng": -123.1185,
    "aliases": [
      "wren",
      "wren cafe",
      "咖啡"
    ]
  },
  {
    "id": "partner_24",
    "name": "豆捞坊列治文店",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "food",
    "icon": "🍲",
    "perk": "非 Happy Hour 时段单点菜品 20% off；Happy Hour 时段单点菜品 30% off",
    "shortPerk": "单点菜品 20–30% off",
    "tags": [
      "Richmond",
      "超值折扣",
      "天车/商圈"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：非 Happy Hour 时段单点菜品 20% off；Happy Hour 时段单点菜品 30% off。地址：#720-5300 No. 3 Rd, Richmond, BC V6X 2X9。",
    "address": "#720-5300 No. 3 Rd, Richmond, BC V6X 2X9",
    "lat": 49.1755,
    "lng": -123.1362,
    "aliases": [
      "豆捞坊",
      "hot pot",
      "火锅"
    ]
  },
  {
    "id": "partner_25",
    "name": "duoduo 酸奶碗",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "drink",
    "icon": "🍰",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Richmond"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：#130-7971 Alderbridge Way, Richmond, BC V6X 2A4。",
    "address": "#130-7971 Alderbridge Way, Richmond, BC V6X 2A4",
    "lat": 49.17783,
    "lng": -123.13835,
    "aliases": [
      "duoduo",
      "酸奶",
      "yogurt",
      "酸奶碗"
    ]
  },
  {
    "id": "partner_26",
    "name": "duoduo 酸奶碗",
    "area": "burnaby",
    "areaLabel": "Burnaby",
    "category": "drink",
    "icon": "🍰",
    "perk": "10% off",
    "shortPerk": "10% off",
    "tags": [
      "Burnaby"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：10% off。地址：5318 Grimmer St, Burnaby, BC。",
    "address": "5318 Grimmer St, Burnaby, BC",
    "lat": 49.2238,
    "lng": -122.988,
    "aliases": [
      "duoduo",
      "酸奶",
      "yogurt",
      "酸奶碗"
    ]
  },
  {
    "id": "partner_27",
    "name": "YOYO 低卡工厂 FitBox",
    "area": "online",
    "areaLabel": "大温配送",
    "category": "life",
    "icon": "🥗",
    "perk": "15% off",
    "shortPerk": "15% off",
    "tags": [
      "大温配送",
      "线上订餐"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：15% off。地址：线上订餐；大温配送（无公开实体店地址）。",
    "address": "线上订餐；大温配送（无公开实体店地址）",
    "onlineOnly": true,
    "aliases": [
      "fitbox",
      "fit box",
      "低卡",
      "meal prep",
      "轻食",
      "大温配送"
    ]
  },
  {
    "id": "partner_28",
    "name": "Deco Nova K歌之王",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "fun",
    "icon": "🎤",
    "perk": "15% off",
    "shortPerk": "15% off",
    "tags": [
      "Richmond",
      "天车/商圈"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：15% off。地址：4000 No. 3 Rd Unit 3300, Richmond, BC V6X 0J1。",
    "address": "4000 No. 3 Rd Unit 3300, Richmond, BC V6X 0J1",
    "lat": 49.1855,
    "lng": -123.1366,
    "aliases": [
      "deco nova",
      "deconova",
      "ktv",
      "karaoke",
      "k歌之王"
    ]
  },
  {
    "id": "partner_29",
    "name": "V+Club / V+ Karaoke",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "fun",
    "icon": "🎤",
    "perk": "V+Club 10% off；KTV 房费 15% off",
    "shortPerk": "V+Club 10% off",
    "tags": [
      "Richmond"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：V+Club 10% off；KTV 房费 15% off。地址：140-8171 Ackroyd Rd, Richmond, BC V6X 3K1。",
    "address": "140-8171 Ackroyd Rd, Richmond, BC V6X 3K1",
    "lat": 49.17276,
    "lng": -123.13518,
    "aliases": [
      "v+club",
      "v+ karaoke",
      "ktv",
      "karaoke",
      "卡拉ok"
    ]
  },
  {
    "id": "partner_30",
    "name": "桃花坞 Lovin Tea",
    "area": "richmond",
    "areaLabel": "Richmond",
    "category": "drink",
    "icon": "🧋",
    "perk": "麻将 $20/人，全天任打；另享 10% off",
    "shortPerk": "麻将 $20/人",
    "tags": [
      "Richmond"
    ],
    "desc": "UBC CSSA 官方合作商家。凭会员卡享：麻将 $20/人，全天任打；另享 10% off。地址：2040 Hazelbridge Way, Richmond, BC V6X 1E4。",
    "address": "2040 Hazelbridge Way, Richmond, BC V6X 1E4",
    "lat": 49.1848,
    "lng": -123.1332,
    "aliases": [
      "lovin tea",
      "loving tea",
      "桃花坞",
      "麻将",
      "mahjong"
    ]
  }
];
  window.CSSAMap.partners = partners;
})();
