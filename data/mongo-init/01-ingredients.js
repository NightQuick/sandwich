db = db.getSiblingDB('myAppDB');

db.ingredients.insertMany([
  {
    key: 'bacon',
    type: 'filling',
    name: 'Бекон',
    description: '(3-4 кусочка)',
    price: 35,
    image: 'https://imgur.com/ntIRWxm.png'
  },
  {
    key: 'bmt',
    type: 'filling',
    name: 'БМТ',
    description: '',
    price: 60,
    image: 'https://imgur.com/hB8kmg4.png'
  },
  {
    key: 'cheese',
    type: 'filling',
    name: 'Сыр',
    description: '(2 треугольника)',
    price: 20,
    image: 'https://imgur.com/FGgPDWx.png'
  },
  {
    key: 'moc',
    type: 'filling',
    name: 'Моцарелла',
    description: '(1 скуп)',
    price: 20,
    image: 'https://imgur.com/wZRIvVM.png'
  },
  {
    key: 'chicken-breast',
    type: 'filling',
    name: 'Куриная грудка',
    description: '',
    price: 60,
    image: 'https://imgur.com/nAX6zVa.png'
  },
  {
    key: 'chicken-teriyaki',
    type: 'filling',
    name: 'Курица Терияки',
    description: '',
    price: 65,
    image: 'https://imgur.com/LNMF106.png'
  },
  {
    key: 'ham',
    type: 'filling',
    name: 'Ветчина',
    description: '(4 кусочка)',
    price: 45,
    image: 'https://imgur.com/94m0lE2.png'
  },
  {
    key: 'melt',
    type: 'filling',
    name: 'Мелт',
    description: '',
    price: 70,
    image: 'https://imgur.com/VAZ1Jcy.png'
  },
  {
    key: 'mushrooms',
    type: 'filling',
    name: 'Грибы',
    description: '(2 скупа)',
    price: 50,
    image: 'https://imgur.com/A1sMY1y.png'
  },
  {
    key: 'omelet',
    type: 'filling',
    name: 'Омлет',
    description: '',
    price: 50,
    image: 'https://imgur.com/8Xekgz0.png'
  },
  {
    key: 'pepperoni',
    type: 'filling',
    name: 'Пепперони',
    description: '(3 кусочка)',
    price: 40,
    image: 'https://imgur.com/0tF8aqX.png'
  },
  {
    key: 'pork-bbq',
    type: 'filling',
    name: 'Свинина Барбекю',
    description: '',
    price: 65,
    image: 'https://imgur.com/8FPYDNs.png'
  },
  {
    key: 'roast',
    type: 'filling',
    name: 'Ростбиф',
    description: '(2-3 кусочка)',
    price: 55,
    image: 'https://imgur.com/kkWPxOT.png'
  },
  {
    key: 'salami',
    type: 'filling',
    name: 'Салями',
    description: '(4 кусочка)',
    price: 40,
    image: 'https://imgur.com/Ku18jCQ.png'
  },
  {
    key: 'seafood',
    type: 'filling',
    name: 'Морепродукты',
    description: '(2 скупа)',
    price: 45,
    image: 'https://imgur.com/3VA5Es6.png'
  },
  {
    key: 'spicy-italian',
    type: 'filling',
    name: 'Острый итальянский',
    description: '',
    price: 60,
    image: 'https://imgur.com/PJFTiOD.png'
  },
  {
    key: 'subway-club',
    type: 'filling',
    name: 'Сабвэй Клаб',
    description: '',
    price: 70,
    image: 'https://imgur.com/ttxH5b6.png'
  },
  {
    key: 'tuna',
    type: 'filling',
    name: 'Тунец',
    description: '(2 скупа)',
    price: 55,
    image: 'https://imgur.com/ymJ1Qw8.png'
  },
  {
    key: 'turkey',
    type: 'filling',
    name: 'Индейка',
    description: '(3 кусочка)',
    price: 45,
    image: 'https://imgur.com/GibSplg.png'
  },
  {
    key: 'turkey-ham',
    type: 'filling',
    name: 'Индейка и ветчина',
    description: '(2/2 кусочка)',
    price: 45,
    image: 'https://imgur.com/wPYgmBI.png'
  },

  {
    key: 'white-italian',
    type: 'bread',
    name: 'Белый итальянский',
    description: '',
    price: 0,
    image: 'https://imgur.com/gVOIT5D.png'
  },
  {
    key: 'white-sesame',
    type: 'bread',
    name: 'Белый с кунжутом',
    description: '',
    price: 0,
    image: 'https://imgur.com/CecTtN1.png'
  },
  {
    key: 'oregano-parmesan',
    type: 'bread',
    name: 'Орегано-пармезан',
    description: '',
    price: 0,
    image: 'https://imgur.com/NGqjr5Q.png'
  },
  {
    key: 'grey',
    type: 'bread',
    name: 'Серый',
    description: '',
    price: 0,
    image: 'https://imgur.com/sfoDoAL.png'
  },
  {
    key: 'grey-with-cereal',
    type: 'bread',
    name: 'Серый с овсяными хлопьями',
    description: '',
    price: 0,
    image: 'https://imgur.com/ysvAzhe.png'
  },

  {
    key: 'pekinka',
    type: 'vegetable',
    name: 'Пекинская капуста',
    description: '',
    price: 0,
    image: 'https://imgur.com/SRvoV95.png'
  },
  {
    key: 'tomato',
    type: 'vegetable',
    name: 'Помидор',
    description: '',
    price: 0,
    image: 'https://imgur.com/hvTEu9V.png'
  },
  {
    key: 'pickled-cucumber',
    type: 'vegetable',
    name: 'Соленый огурец',
    description: '',
    price: 0,
    image: 'https://imgur.com/ITm5ixr.png'
  },
  {
    key: 'onion-purple',
    type: 'vegetable',
    name: 'Красный лук',
    description: '',
    price: 0,
    image: 'https://imgur.com/jAgHwlb.png'
  },
  {
    key: 'green-peppers-bulgarian',
    type: 'vegetable',
    name: 'Болгарский перец',
    description: '',
    price: 0,
    image: 'https://imgur.com/HMa2B3o.png'
  },
  {
    key: 'olives',
    type: 'vegetable',
    name: 'Маслины',
    description: '',
    price: 0,
    image: 'https://imgur.com/qclyGuu.png'
  },
  {
    key: 'pepper-hapapeno',
    type: 'vegetable',
    name: 'Острый перец Халапеньо',
    description: '',
    price: 0,
    image: 'https://i.imgur.com/ITm5ixr.png'
  },

  {
    key: '1000-islands',
    type: 'sauce',
    name: '1000 Островов',
    description: '',
    price: 0,
    image: 'https://imgur.com/IPQnCd2.png'
  },
  {
    key: 'bbq',
    type: 'sauce',
    name: 'Барбекю',
    description: '',
    price: 0,
    image: 'https://imgur.com/s1hkABT.png'
  },
  {
    key: 'cheese',
    type: 'sauce',
    name: 'Сырный',
    description: '',
    price: 0,
    image: 'https://imgur.com/2eBm76m.png'
  },
  {
    key: 'chipotle',
    type: 'sauce',
    name: 'Чиппотл',
    description: '',
    price: 0,
    image: 'https://imgur.com/ofuBzi1.png'
  },
  {
    key: 'garlic',
    type: 'sauce',
    name: 'Чесночный',
    description: '',
    price: 0,
    image: 'https://imgur.com/umtb0yQ.png'
  },
  {
    key: 'mayonnaise',
    type: 'sauce',
    name: 'Майонез',
    description: '',
    price: 0,
    image: 'https://imgur.com/Cykp3p1.png'
  },
  {
    key: 'mustard',
    type: 'sauce',
    name: 'Горчица',
    description: '',
    price: 0,
    image: 'https://imgur.com/j8McoC2.png'
  },
  {
    key: 'mustard-and-honey',
    type: 'sauce',
    name: 'Горчица медовая',
    description: '',
    price: 0,
    image: 'https://imgur.com/veZjXsx.png'
  },
  {
    key: 'olive-oil',
    type: 'sauce',
    name: 'Оливковое масло',
    description: '',
    price: 0,
    image: 'https://imgur.com/mRpuUMv.png'
  },
  {
    key: 'spicy-ketchup',
    type: 'sauce',
    name: 'Острый кетчуп',
    description: '',
    price: 0,
    image: 'https://imgur.com/at4WlvD.png'
  },
  {
    key: 'sweet-and-sour',
    type: 'sauce',
    name: 'Кисло-сладкий',
    description: '',
    price: 0,
    image: 'https://i.imgur.com/HXgamYR.png'
  },
  {
    key: 'sweet-onion',
    type: 'sauce',
    name: 'Сладкий лук',
    description: '',
    price: 0,
    image: 'https://i.imgur.com/8SA55GB.png'
  },
  {
    key: 'wine-vinegar',
    type: 'sauce',
    name: 'Винный уксус',
    description: '',
    price: 0,
    image: 'https://i.imgur.com/ClcPqO9.png'
  },

  {
    key: '1x',
    type: 'size',
    name: '15 См',
    description: '',
    price: 0,
    image: 'https://imgur.com/tV4Zm1a.jpg'
  },
  {
    key: '2x',
    type: 'size',
    name: '30 См',
    description: '',
    price: 110,
    image: 'https://imgur.com/x4GuL05.jpg'
  }
]);

db.ingredients.createIndex({ key: 1, type: 1 }, { unique: true });
