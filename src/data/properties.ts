import type { LocaleCode, LocationKey, Property, PropertyType } from "@/lib/types";

const IMG = {
  apt1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  apt2: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  apt3: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
  apt4: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  house1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  house2: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  sea1: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  sea2: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  land1: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  land2: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1200&q=80",
  com1: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  com2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
};

const coords: Record<LocationKey, { lat: number; lng: number }> = {
  sunny_beach: { lat: 42.695, lng: 27.71 },
  sveti_vlas: { lat: 42.713, lng: 27.758 },
  burgas: { lat: 42.5048, lng: 27.4626 },
  ravda: { lat: 42.65, lng: 27.675 },
  kosharitsa: { lat: 42.735, lng: 27.695 },
  burgas_region: { lat: 42.55, lng: 27.35 },
  other: { lat: 42.48, lng: 27.42 },
};

type Seed = {
  id: string;
  slug: string;
  hot?: boolean;
  type: PropertyType;
  locationKey: LocationKey;
  priceEur: number;
  rooms: number | "studio";
  areaM2: number;
  floor?: number;
  floorsTotal?: number;
  offset: [number, number];
  images: string[];
  titles: Record<LocaleCode, string>;
  descriptions: Record<LocaleCode, string>;
  addresses: Record<LocaleCode, string>;
};

const seeds: Seed[] = [
  {
    id: "1",
    slug: "sunny-beach-studio-sea-view",
    hot: true,
    type: "apartment",
    locationKey: "sunny_beach",
    priceEur: 48500,
    rooms: "studio",
    areaM2: 38,
    floor: 4,
    floorsTotal: 6,
    offset: [0.004, 0.006],
    images: [IMG.sea1, IMG.apt1, IMG.apt2],
    titles: {
      ru: "Студия с видом на море, Солнечный Берег",
      en: "Sea-view studio, Sunny Beach",
      bg: "Студио с морски изглед, Слънчев бряг",
    },
    descriptions: {
      ru: "Компактная студия в 300 м от пляжа. Мебель, кондиционер, южная ориентация. Идеальна для сдачи в аренду.",
      en: "Compact studio 300 m from the beach. Furnished, A/C, south-facing. Great for short-term rental.",
      bg: "Компактно студио на 300 м от плажа. Обзаведено, климатик, южно изложение. Подходящо за отдаване под наем.",
    },
    addresses: {
      ru: "Солнечный Берег, первая линия комплекса",
      en: "Sunny Beach, first-line complex",
      bg: "Слънчев бряг, комплекс на първа линия",
    },
  },
  {
    id: "2",
    slug: "sveti-vlas-2bed-marina",
    hot: true,
    type: "apartment",
    locationKey: "sveti_vlas",
    priceEur: 129000,
    rooms: 2,
    areaM2: 78,
    floor: 2,
    floorsTotal: 5,
    offset: [-0.003, 0.004],
    images: [IMG.apt2, IMG.sea2, IMG.apt3],
    titles: {
      ru: "2-комнатная у марины, Святой Влас",
      en: "2-bed near the marina, Sveti Vlas",
      bg: "Двустаен апартамент до марината, Свети Влас",
    },
    descriptions: {
      ru: "Светлая квартира с большой террасой и видом на бухту. Закрытый двор, парковка, охрана.",
      en: "Bright apartment with a large terrace and bay views. Gated yard, parking, security.",
      bg: "Светъл апартамент с голяма тераса и изглед към залива. Закрит двор, паркинг, охрана.",
    },
    addresses: {
      ru: "Святой Влас, рядом с яхт-портом",
      en: "Sveti Vlas, near the yacht port",
      bg: "Свети Влас, близо до яхтеното пристанище",
    },
  },
  {
    id: "3",
    slug: "burgas-center-3bed",
    hot: true,
    type: "apartment",
    locationKey: "burgas",
    priceEur: 155000,
    rooms: 3,
    areaM2: 96,
    floor: 5,
    floorsTotal: 8,
    offset: [0.002, -0.003],
    images: [IMG.apt3, IMG.apt4, IMG.apt1],
    titles: {
      ru: "3-комнатная в центре Бургаса",
      en: "3-bed apartment in central Burgas",
      bg: "Тристаен апартамент в центъра на Бургас",
    },
    descriptions: {
      ru: "После ремонта, панорамные окна, два санузла. Рядом школа, парк и набережная.",
      en: "Recently renovated, panoramic windows, two bathrooms. School, park and seafront nearby.",
      bg: "След ремонт, панорамни прозорци, две бани. Училище, парк и крайбрежна алея наблизо.",
    },
    addresses: {
      ru: "Бургас, центр, ул. Александровска",
      en: "Burgas center, Aleksandrovska St.",
      bg: "Бургас център, ул. Александровска",
    },
  },
  {
    id: "4",
    slug: "ravda-family-house",
    hot: true,
    type: "house",
    locationKey: "ravda",
    priceEur: 189000,
    rooms: 4,
    areaM2: 160,
    offset: [0.005, -0.002],
    images: [IMG.house1, IMG.house2, IMG.sea1],
    titles: {
      ru: "Семейный дом в Равде",
      en: "Family house in Ravda",
      bg: "Семейна къща в Равда",
    },
    descriptions: {
      ru: "Дом с участком 450 м², сад и барбекю-зона. 8 минут пешком до моря.",
      en: "House on a 450 m² plot with garden and BBQ area. 8-minute walk to the sea.",
      bg: "Къща с двор 450 м², градина и барбекю зона. 8 минути пеша до морето.",
    },
    addresses: {
      ru: "Равда, тихий район",
      en: "Ravda, quiet neighbourhood",
      bg: "Равда, тих район",
    },
  },
  {
    id: "5",
    slug: "kosharitsa-plot",
    type: "land",
    locationKey: "kosharitsa",
    priceEur: 42000,
    rooms: 0,
    areaM2: 820,
    offset: [0.01, -0.008],
    images: [IMG.land1, IMG.land2],
    titles: {
      ru: "Участок под строительство, Кошарица",
      en: "Building plot, Kosharitsa",
      bg: "Парцел за строителство, Кошарица",
    },
    descriptions: {
      ru: "Ровный участок с коммуникациями рядом. Вид на холмы, удобный подъезд.",
      en: "Flat plot with utilities nearby. Hill views and easy road access.",
      bg: "Равен парцел с комуникации наблизо. Изглед към хълмовете и удобен достъп.",
    },
    addresses: {
      ru: "Кошарица, окраина",
      en: "Kosharitsa outskirts",
      bg: "Кошарица, покрайнини",
    },
  },
  {
    id: "6",
    slug: "sunny-beach-2bed-pool",
    hot: true,
    type: "apartment",
    locationKey: "sunny_beach",
    priceEur: 76000,
    rooms: 2,
    areaM2: 68,
    floor: 1,
    floorsTotal: 4,
    offset: [-0.006, 0.002],
    images: [IMG.apt4, IMG.sea1, IMG.apt2],
    titles: {
      ru: "2-комнатная у бассейна, Солнечный Берег",
      en: "2-bed by the pool, Sunny Beach",
      bg: "Двустаен до басейна, Слънчев бряг",
    },
    descriptions: {
      ru: "Квартира в комплексе с бассейном и ресепшеном. Готова к заселению.",
      en: "Apartment in a complex with pool and reception. Move-in ready.",
      bg: "Апартамент в комплекс с басейн и рецепция. Готов за нанасяне.",
    },
    addresses: {
      ru: "Солнечный Берег, комплекс Лагуна",
      en: "Sunny Beach, Laguna complex",
      bg: "Слънчев бряг, комплекс Лагуна",
    },
  },
  {
    id: "7",
    slug: "burgas-commercial-street",
    type: "commercial",
    locationKey: "burgas",
    priceEur: 210000,
    rooms: 0,
    areaM2: 112,
    floor: 0,
    floorsTotal: 3,
    offset: [-0.004, 0.005],
    images: [IMG.com1, IMG.com2],
    titles: {
      ru: "Торговое помещение, Бургас",
      en: "Retail unit, Burgas",
      bg: "Търговски обект, Бургас",
    },
    descriptions: {
      ru: "Витрина на проходимой улице, высокая потолочная высота, отдельный вход.",
      en: "Shopfront on a busy street, high ceilings, separate entrance.",
      bg: "Витрина на оживена улица, високи тавани, отделен вход.",
    },
    addresses: {
      ru: "Бургас, торговая зона",
      en: "Burgas, retail district",
      bg: "Бургас, търговска зона",
    },
  },
  {
    id: "8",
    slug: "sveti-vlas-penthouse",
    hot: true,
    type: "apartment",
    locationKey: "sveti_vlas",
    priceEur: 245000,
    rooms: 3,
    areaM2: 125,
    floor: 6,
    floorsTotal: 6,
    offset: [0.006, -0.005],
    images: [IMG.sea2, IMG.apt3, IMG.house2],
    titles: {
      ru: "Пентхаус с панорамой, Святой Влас",
      en: "Panoramic penthouse, Sveti Vlas",
      bg: "Пентхаус с панорама, Свети Влас",
    },
    descriptions: {
      ru: "Верхний этаж, две террасы, вид на море и горы. Премиальная отделка.",
      en: "Top floor with two terraces, sea and mountain views. Premium finishes.",
      bg: "Последен етаж, две тераси, изглед море и планини. Премиум довършителни работи.",
    },
    addresses: {
      ru: "Святой Влас, холм",
      en: "Sveti Vlas hillside",
      bg: "Свети Влас, хълм",
    },
  },
  {
    id: "9",
    slug: "burgas-region-village-house",
    type: "house",
    locationKey: "burgas_region",
    priceEur: 69000,
    rooms: 3,
    areaM2: 110,
    offset: [0.02, -0.03],
    images: [IMG.house2, IMG.land1, IMG.house1],
    titles: {
      ru: "Дом в селе, Бургасская область",
      en: "Village house, Burgas region",
      bg: "Къща в село, Бургаска област",
    },
    descriptions: {
      ru: "Уютный дом с садом и хозяйственными постройками. Тишина и природа.",
      en: "Cosy house with garden and outbuildings. Quiet countryside setting.",
      bg: "Уютна къща с градина и стопански постройки. Тишина и природа.",
    },
    addresses: {
      ru: "Бургасская область, село",
      en: "Burgas region village",
      bg: "Бургаска област, село",
    },
  },
  {
    id: "10",
    slug: "ravda-studio-investment",
    hot: true,
    type: "apartment",
    locationKey: "ravda",
    priceEur: 39900,
    rooms: "studio",
    areaM2: 32,
    floor: 3,
    floorsTotal: 5,
    offset: [-0.002, 0.007],
    images: [IMG.apt1, IMG.apt4],
    titles: {
      ru: "Инвестиционная студия, Равда",
      en: "Investment studio, Ravda",
      bg: "Инвестиционно студио, Равда",
    },
    descriptions: {
      ru: "Недорогой вход на рынок курортной недвижимости. Комплекс с бассейном.",
      en: "Affordable entry into resort property. Complex with a swimming pool.",
      bg: "Достъпен вход в курортни имоти. Комплекс с басейн.",
    },
    addresses: {
      ru: "Равда, курортная зона",
      en: "Ravda resort area",
      bg: "Равда, курортна зона",
    },
  },
];

function moreSeeds(): Seed[] {
  const base = [...seeds];
  const extras: Seed[] = [];
  const locations: LocationKey[] = [
    "sunny_beach",
    "sveti_vlas",
    "burgas",
    "ravda",
    "kosharitsa",
    "burgas_region",
  ];
  const types: PropertyType[] = ["apartment", "apartment", "house", "land", "commercial"];
  const imgSets = [
    [IMG.apt1, IMG.apt2, IMG.sea1],
    [IMG.apt3, IMG.sea2, IMG.apt4],
    [IMG.house1, IMG.house2],
    [IMG.land1, IMG.land2],
    [IMG.com1, IMG.com2],
  ];

  for (let i = 11; i <= 42; i++) {
    const locationKey = locations[i % locations.length];
    const type = types[i % types.length];
    const rooms =
      type === "land" || type === "commercial"
        ? 0
        : i % 5 === 0
          ? "studio"
          : ((i % 4) + 1) as number;
    const areaM2 =
      type === "land" ? 500 + i * 20 : type === "house" ? 120 + i * 3 : 35 + i * 2;
    const priceEur =
      type === "land"
        ? 25000 + i * 1500
        : type === "commercial"
          ? 90000 + i * 4000
          : type === "house"
            ? 110000 + i * 3500
            : 35000 + i * 2800;

    extras.push({
      id: String(i),
      slug: `${locationKey}-${type}-${i}`,
      hot: i % 7 === 0,
      type,
      locationKey,
      priceEur,
      rooms: rooms as number | "studio",
      areaM2,
      floor: type === "apartment" ? (i % 6) + 1 : undefined,
      floorsTotal: type === "apartment" ? 6 : undefined,
      offset: [((i % 9) - 4) * 0.003, ((i % 7) - 3) * 0.003],
      images: imgSets[i % imgSets.length],
      titles: {
        ru: `${type === "apartment" ? "Квартира" : type === "house" ? "Дом" : type === "land" ? "Участок" : "Коммерция"} #${i}`,
        en: `${type} listing #${i}`,
        bg: `${type === "apartment" ? "Апартамент" : type === "house" ? "Къща" : type === "land" ? "Парцел" : "Търговски"} #${i}`,
      },
      descriptions: {
        ru: "Демо-объект LEV Estates. После подключения CRM здесь появятся реальные описания из вашей системы.",
        en: "LEV Estates demo listing. After CRM connection, real descriptions will sync from your system.",
        bg: "Демо обект на LEV Estates. След връзка с CRM тук ще се появят реални описания.",
      },
      addresses: {
        ru: `${locationKey.replaceAll("_", " ")}`,
        en: `${locationKey.replaceAll("_", " ")}`,
        bg: `${locationKey.replaceAll("_", " ")}`,
      },
    });
  }

  return [...base, ...extras];
}

export const properties: Property[] = moreSeeds().map((s) => {
  const center = coords[s.locationKey];
  return {
    id: s.id,
    slug: s.slug,
    status: "active",
    hot: Boolean(s.hot),
    type: s.type,
    locationKey: s.locationKey,
    priceEur: s.priceEur,
    rooms: s.rooms,
    areaM2: s.areaM2,
    floor: s.floor,
    floorsTotal: s.floorsTotal,
    coordinates: {
      lat: center.lat + s.offset[0],
      lng: center.lng + s.offset[1],
    },
    images: s.images,
    createdAt: `2025-${String((Number(s.id) % 12) + 1).padStart(2, "0")}-15`,
    translations: {
      ru: {
        title: s.titles.ru,
        description: s.descriptions.ru,
        addressLabel: s.addresses.ru,
      },
      en: {
        title: s.titles.en,
        description: s.descriptions.en,
        addressLabel: s.addresses.en,
      },
      bg: {
        title: s.titles.bg,
        description: s.descriptions.bg,
        addressLabel: s.addresses.bg,
      },
    },
  };
});
