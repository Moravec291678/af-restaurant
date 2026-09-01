import { useEffect, useMemo, useState } from "react";
import "./Menu.css";

import ashak from "../assets/images/menu/ashak.png";
import ashakVege from "../assets/images/menu/ashakVege.png";
import baghlawa from "../assets/images/menu/baghlawa.png";
import bartha from "../assets/images/menu/bartha.png";
import boloni from "../assets/images/menu/boloni.png";
import boraniBadenjan from "../assets/images/menu/boraniBadenjan.png";
import catni from "../assets/images/menu/catni.png";
import daal from "../assets/images/menu/daal.png";
import dalSoup from "../assets/images/menu/dalSoup.png";
import falafel from "../assets/images/menu/falafel.png";
import grilovanyPstruh from "../assets/images/menu/grilovanyPstruh.png";
import grilovanyLosos from "../assets/images/menu/grilovanyLosos.png";
import hoveziSaslik from "../assets/images/menu/hoveziSaslik.png";
import hranolky from "../assets/images/menu/hranolky.png";
import chalouBasmati from "../assets/images/menu/chalouBasmati.png";
import iceFerni from "../assets/images/menu/iceFerni.png";
import jehneciKotlety from "../assets/images/menu/jehneciKotlety.png";
import jehneciSaslik from "../assets/images/menu/jehneciSaslik.png";
import koftaChalow from "../assets/images/menu/koftaChalow.png";
import kureciKridla from "../assets/images/menu/kureciKridla.png";
import kureciStehna from "../assets/images/menu/kureciStehna.png";
import mantu from "../assets/images/menu/mantu.png";
import nanePlacka from "../assets/images/menu/nanePlacka.png";
import pro2Osoby from "../assets/images/menu/pro2Osoby.png";
import pro4Osoby from "../assets/images/menu/pro4Osoby.png";
import qabuliPalow from "../assets/images/menu/qabuliPalow.png";
import qormeBamia from "../assets/images/menu/qormeBamia.png";
import salatMix from "../assets/images/menu/salatMix.png";
import sambosa from "../assets/images/menu/sambosa.png";
import samiKebab from "../assets/images/menu/samiKebab.png";
import torshi from "../assets/images/menu/torshi.png";
import zabziSpenat from "../assets/images/menu/zabziSpenat.png";
/* =========================================================
   MENU DATA
   ========================================================= */

const menuItems = [
  /* =======================================================
     PŘEDKRMY
     ======================================================= */

  {
    id: "falafel",
    name: "Falafel",
    category: "predkrmy",
    description: "Cizrnové karbanátky míchané se zeleninou a bylinkami.",
    portion: "6 ks",
    price: 119,
    vegetarian: true,
    allergens: ["test"],
    image: falafel,
    imageAlt: "Falafel",
  },

  {
    id: "bartha",
    name: "Bartha",
    category: "predkrmy",
    description:
      "Grilovaný lilek se sezamovým olejem, citronovou šťávou a zeleninou, s jogurtem a česnekem.",
    portion: "200 g",
    price: 119,
    vegetarian: true,
    allergens: [],
    image: bartha,
    imageAlt: "Bartha",
  },

  {
    id: "sambosa",
    name: "Sambosa",
    category: "predkrmy",
    description:
      "Taštičky plněné bramborami, hráškem, cibulí, kukuřicí, bylinkami a kořením s čatní a jogurtem.",
    portion: "2 ks",
    price: 129,
    vegetarian: true,
    allergens: [],
    image: sambosa,
    imageAlt: "Sambosa",
  },

  {
    id: "boloni",
    name: "Boloni",
    category: "predkrmy",
    description:
      "Těstová kapsa plněná bramborem, pórkem, kořením a bylinkami s čatní a jogurtem.",
    portion: "2 ks",
    price: 149,
    vegetarian: true,
    allergens: [],
    image: boloni,
    imageAlt: "Boloni",
  },

  /* =======================================================
     POLÉVKY & SALÁTY
     ======================================================= */

  {
    id: "dal-soup",
    name: "Dal Soup",
    category: "polevky-salaty",
    description: "Polévka ze žlutého hrachu.",
    portion: "0,3 l",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: dalSoup,
    imageAlt: "Dal Soup",
  },

  {
    id: "polevka-dne",
    name: "Polévka dne",
    category: "polevky-salaty",
    description: "Denní nabídka čerstvé polévky.",
    portion: "0,3 l",
    price: 59,
    vegetarian: false,
    allergens: [],
    image: null,
  },

  {
    id: "salat-mix",
    name: "Salát Mix",
    category: "polevky-salaty",
    description: "Ledový salát, rajčata, okurky, balkánský sýr a olivy.",
    portion: "200 g",
    price: 149,
    vegetarian: true,
    allergens: [],
    image: salatMix,
    imageAlt: "Salát Mix",
  },

  {
    id: "shor-na-chod",
    name: "Shor-na-chod",
    category: "polevky-salaty",
    description: "Dušená cizrna, brambory s octem a čatní.",
    portion: "200 g",
    price: 79,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "kureci-salat",
    name: "Kuřecí salát",
    category: "polevky-salaty",
    description: "Grilované kuřecí maso, ledový salát, rajčata a okurka.",
    portion: "200 g",
    price: 149,
    vegetarian: false,
    allergens: [],
    image: null,
  },

  /* =======================================================
     ORIENTÁLNÍ SPECIALITY
     ======================================================= */

  {
    id: "qabuli-palow",
    name: "Qabuli Palow",
    category: "orientalni-speciality",
    description:
      "Dušená rýže Basmati s rozinkami a mrkví dle výběru masa, se směsí zeleniny v rajčatové omáčce.",
    variants: [
      {
        label: "Hovězí kousky",
        portion: "200 g",
        price: 299,
      },
      {
        label: "Jehněčí kousky",
        portion: "200 g",
        price: 299,
      },
      {
        label: "Kuřecí kousky",
        portion: "200 g",
        price: 299,
      },
      {
        label: "Jehněčí koleno",
        portion: "350 g",
        price: 399,
      },
    ],
    vegetarian: false,
    allergens: [],
    image: qabuliPalow,
    imageAlt: "Qabuli Palow",
  },

  {
    id: "kofta-chalow",
    name: "Kofta Chalow",
    category: "orientalni-speciality",
    description:
      "Dušená rýže Basmati podávaná s koftou, mletým hovězím masem s bylinkami a kořením v rajčatové omáčce.",
    portion: "350 g",
    price: 199,
    vegetarian: false,
    allergens: [],
    image: koftaChalow,
    imageAlt: "Kofta Chalow",
  },

  {
    id: "mantu",
    name: "Mantu",
    category: "orientalni-speciality",
    description:
      "Plněné taštičky s mletým hovězím masem a cibulí vařené v páře, navrchu hrách v rajčatové omáčce, čerstvé bylinky a jogurt s česnekem.",
    portion: "350 g",
    price: 199,
    vegetarian: false,
    allergens: [],
    image: mantu,
    imageAlt: "Mantu",
  },

  {
    id: "ashak",
    name: "Ashak",
    category: "orientalni-speciality",
    description:
      "Těstovinové taštičky plněné pórkem vařené v páře, přelité omáčkou z rajčat a mletého hovězího masa.",
    portion: "350 g",
    price: 189,
    vegetarian: false,
    allergens: [],
    image: ashak,
    imageAlt: "Ashak",
  },

  /* =======================================================
     SPECIALITY Z GRILU
     ======================================================= */

  {
    id: "kureci-kridla",
    name: "Kuřecí křídla",
    category: "gril",
    portion: "200 g",
    price: 259,
    vegetarian: false,
    allergens: [],
    image: kureciKridla,
    imageAlt: "Kuřecí křídla",
  },

  {
    id: "kureci-stehna",
    name: "Kuřecí stehna",
    category: "gril",
    portion: "300 g",
    price: 259,
    vegetarian: false,
    allergens: [],
    image: kureciStehna,
    imageAlt: "Kuřecí stehna",
  },

  {
    id: "kureci-prsa",
    name: "Kuřecí prsa",
    category: "gril",
    portion: "200 g",
    price: 259,
    vegetarian: false,
    allergens: [],
    image: null,
  },

  {
    id: "jehneci-kotlety",
    name: "Jehněčí kotlety",
    category: "gril",
    portion: "200 g",
    price: 299,
    vegetarian: false,
    allergens: [],
    image: jehneciKotlety,
    imageAlt: "Jehněčí kotlety",
  },

  {
    id: "hovezi-saslik",
    name: "Hovězí šašlik",
    category: "gril",
    portion: "350 g",
    price: 289,
    vegetarian: false,
    allergens: [],
    image: hoveziSaslik,
    imageAlt: "Hovězí šašlik",
  },

  {
    id: "jehneci-saslik",
    name: "Jehněčí šašlik",
    category: "gril",
    portion: "200 g",
    price: 259,
    vegetarian: false,
    allergens: [],
    image: jehneciSaslik,
    imageAlt: "Jehněčí šašlik",
  },

  {
    id: "sami-kebab",
    name: "Šami kebab",
    category: "gril",
    portion: "200 g",
    price: 299,
    vegetarian: false,
    allergens: [],
    image: samiKebab,
    imageAlt: "Šami kebab",
  },

  /* =======================================================
     MIX GRILL
     ======================================================= */

  {
    id: "mix-grill-2",
    name: "Mix Grill pro 2 osoby",
    category: "mix-grill",
    description:
      "1 kuřecí špíz, 1 jehněčí špíz, 1 špíz z mletého hovězího masa, 2 jehněčí kotlety, placky, salát, čatní, grilovaná zelenina, nakládaná zelenina (turshi) a hranolky.",
    portion: "400 g",
    price: 599,
    vegetarian: false,
    allergens: [],
    image: pro2Osoby,
    imageAlt: "Mix Grill pro 2 osoby",
  },

  {
    id: "mix-grill-4",
    name: "Mix Grill pro 4 osoby",
    category: "mix-grill",
    description:
      "2 kuřecí špízy, 2 jehněčí špízy, 2 špízy z mletého hovězího masa, 4 ks jehněčí kotlety, placky, salát, čatní, grilovaná zelenina, nakládaná zelenina (turshi) a hranolky.",
    portion: "900 g",
    price: 1249,
    vegetarian: false,
    allergens: [],
    image: pro4Osoby,
    imageAlt: "Mix Grill pro 4 osoby",
  },

  /* =======================================================
     VEGETARIÁNSKÁ JÍDLA
     ======================================================= */

  {
    id: "daal",
    name: "Daal",
    category: "vegetarianska",
    description:
      "Dušený půlený žlutý hrách s česnekem, zázvorem a speciálním kořením.",
    portion: "150 g",
    price: 139,
    vegetarian: true,
    allergens: [],
    image: daal,
    imageAlt: "Daal",
  },

  {
    id: "zabzi-spenat",
    name: "Zabzi – Špenát",
    category: "vegetarianska",
    description: "Špenát vařený s cibulí, pórkem a česnekem.",
    portion: "200 g",
    price: 169,
    vegetarian: true,
    allergens: [],
    image: zabziSpenat,
    imageAlt: "Zabzi – Špenát",
  },

  {
    id: "qorme-bamia",
    name: "Qorme Bamia",
    category: "vegetarianska",
    description:
      "Vařená okra (ibiškovec) s rajčatovou omáčkou, česnekem a cibulí.",
    portion: "200 g",
    price: 99,
    vegetarian: true,
    allergens: [],
    image: qormeBamia,
    imageAlt: "Qorme Bamia",
  },

  {
    id: "ashak-vegetariansky",
    name: "Ashak",
    category: "vegetarianska",
    description:
      "Těstovinové taštičky plněné pórkem vařené v páře, přelité fazolovou omáčkou.",
    portion: "350 g",
    price: 169,
    vegetarian: true,
    allergens: [],
    image: ashakVege,
    imageAlt: "Vegetariánský Ashak",
  },

  {
    id: "borani-badenjan",
    name: "Borani Badenjan",
    category: "vegetarianska",
    description:
      "Smažený lilek v marinádě z rajčat, podávaný s jogurtovo-česnekovým dresinkem a mátou.",
    portion: "300 g",
    price: 189,
    vegetarian: true,
    allergens: [],
    image: boraniBadenjan,
    imageAlt: "Borani Badenjan",
  },

  /* =======================================================
     RYBY
     ======================================================= */

  {
    id: "grilovany-losos",
    name: "Grilovaný losos",
    category: "ryby",
    description:
      "Grilovaný filet z lososa podávaný s grilovanou zeleninou a bylinkovou omáčkou.",
    portion: "200 g",
    price: 249,
    vegetarian: false,
    allergens: [],
    image: grilovanyLosos,
    imageAlt: "Grilovaný losos",
  },

  {
    id: "grilovany-pstruh",
    name: "Grilovaný pstruh",
    category: "ryby",
    description: "Grilovaný pstruh s hranolky a salátem.",
    portion: "200 g",
    price: 349,
    vegetarian: false,
    allergens: [],
    image: grilovanyPstruh,
    imageAlt: "Grilovaný pstruh",
  },

  /* =======================================================
     PŘÍLOHY
     ======================================================= */

  {
    id: "nane",
    name: "Nane – placka",
    category: "prilohy",
    description: "Perský chléb.",
    portion: "4 ks",
    price: 39,
    vegetarian: true,
    allergens: [],
    image: nanePlacka,
    imageAlt: "Nane – placka",
  },

  {
    id: "catni",
    name: "Čatní",
    category: "prilohy",
    description: "Směs feferonek, česneku, koriandru a vinného octa.",
    portion: "50 g",
    price: 49,
    vegetarian: true,
    allergens: [],
    image: catni,
    imageAlt: "Čatní",
  },

  {
    id: "hranolky",
    name: "Hranolky",
    category: "prilohy",
    portion: "100 g",
    price: 39,
    vegetarian: true,
    allergens: [],
    image: hranolky,
    imageAlt: "Hranolky",
  },

  {
    id: "chalou",
    name: "Chalou",
    category: "prilohy",
    description: "Bílá dlouhozrnná rýže.",
    portion: "100 g",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: chalouBasmati,
    imageAlt: "Chalou",
  },

  {
    id: "basmati",
    name: "Basmati",
    category: "prilohy",
    description: "Bílá dlouhozrnná rýže.",
    portion: "100 g",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "torshi",
    name: "Torshi",
    category: "prilohy",
    description: "Nakládaná zelenina v orientálním octu.",
    portion: "80 g",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: torshi,
    imageAlt: "Torshi",
  },

  /* =======================================================
     DEZERTY
     ======================================================= */

  {
    id: "baghlawa",
    name: "Baghlawa",
    category: "dezerty",
    description: "Listový řez s ořechy.",
    portion: "1 ks",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: baghlawa,
    imageAlt: "Baghlawa",
  },

  {
    id: "ice-ferni",
    name: "Ice Ferni",
    category: "dezerty",
    description: "Orientální pudink se zmrzlinou a ořechy.",
    portion: "100 g",
    price: 49,
    vegetarian: true,
    allergens: [],
    image: iceFerni,
    imageAlt: "Ice Ferni",
  },

  /* =======================================================
     NEALKO NÁPOJE
     ======================================================= */

  {
    id: "aquila",
    name: "Aquila neperlivá voda",
    category: "nealko",
    portion: "0,33 l",
    price: 49,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "mattoni",
    name: "Mattoni perlivá / jemně perlivá",
    category: "nealko",
    portion: "0,33 l",
    price: 49,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "lipton",
    name: "Lipton",
    category: "nealko",
    portion: "0,25 l",
    price: 49,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "dzus",
    name: "Džus",
    category: "nealko",
    description: "Jablko / pomeranč / jahoda / multivitamín.",
    portion: "0,25 l",
    price: 49,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "tocena-limonada",
    name: "Točená limonáda",
    category: "nealko",
    portion: "0,33 l",
    price: 49,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "pepsi",
    name: "Pepsi Cola",
    category: "nealko",
    portion: "0,5 l",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "pepsi-zero",
    name: "Pepsi Zero Sugar",
    category: "nealko",
    portion: "0,25 l",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "mirinda",
    name: "Mirinda",
    category: "nealko",
    portion: "0,25 l",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "7up",
    name: "7Up",
    category: "nealko",
    portion: "0,25 l",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "tonic",
    name: "Schweppes Indian / Pink Tonic",
    category: "nealko",
    portion: "0,25 l",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  /* =======================================================
     DOMÁCÍ NÁPOJE
     ======================================================= */

  {
    id: "dogh",
    name: "Dogh",
    category: "domaci-napoje",
    description: "Jogurtový koktejl s mátou, okurkou a citronovou šťávou.",
    portion: "0,33 l",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "mango-lassi",
    name: "Mango Lassi",
    category: "domaci-napoje",
    description: "Mango, mléko, jogurt a med.",
    portion: "0,33 l",
    price: 109,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  /* =======================================================
     TEPLÉ NÁPOJE
     ======================================================= */

  {
    id: "espresso",
    name: "Espresso",
    category: "teple-napoje",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "espresso-doppio",
    name: "Espresso Doppio",
    category: "teple-napoje",
    price: 99,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "lungo",
    name: "Lungo",
    category: "teple-napoje",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "teple-napoje",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "latte",
    name: "Latte",
    category: "teple-napoje",
    price: 79,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "zeleny-caj",
    name: "Zelený čaj s kardamonem",
    category: "teple-napoje",
    price: 79,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  /* =======================================================
     PIVO
     ======================================================= */

  {
    id: "pilsner",
    name: "Pilsner Urquell",
    category: "pivo",
    variants: [
      { label: "0,33 l", price: 55 },
      { label: "0,5 l", price: 69 },
    ],
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "kozel-svetly",
    name: "Kozel světlý",
    category: "pivo",
    variants: [
      { label: "0,33 l", price: 55 },
      { label: "0,5 l", price: 69 },
    ],
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "kozel-cerny",
    name: "Kozel černý",
    category: "pivo",
    portion: "0,5 l",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "birell",
    name: "Nealkoholické pivo Birell",
    category: "pivo",
    portion: "0,33 l",
    price: 59,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  /* =======================================================
     VÍNO
     ======================================================= */

  {
    id: "rkatsiteli",
    name: "Rkatsiteli",
    category: "vino",
    description: "Bílé, suché.",
    portion: "0,75 l",
    price: 499,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "alazani",
    name: "Alazani",
    category: "vino",
    description: "Bílé, polosladké.",
    portion: "0,75 l",
    price: 499,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "saperavi",
    name: "Saperavi",
    category: "vino",
    description: "Červené, suché.",
    portion: "0,75 l",
    price: 499,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "armenia",
    name: "Armenia z granátového jablka",
    category: "vino",
    description: "Červené, polosladké.",
    portion: "0,75 l",
    price: 599,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  /* =======================================================
     TVRDÝ ALKOHOL
     ======================================================= */

  {
    id: "finlandia",
    name: "Finlandia",
    category: "tvrdý-alkohol",
    portion: "0,04 l",
    price: 79,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "jack-daniels",
    name: "Jack Daniel's",
    category: "tvrdý-alkohol",
    portion: "0,04 l",
    price: 99,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "becherovka",
    name: "Becherovka",
    category: "tvrdý-alkohol",
    portion: "0,04 l",
    price: 69,
    vegetarian: true,
    allergens: [],
    image: null,
  },

  {
    id: "ararat",
    name: "Ararat 5 Y.O.",
    category: "tvrdý-alkohol",
    portion: "0,04 l",
    price: 99,
    vegetarian: true,
    allergens: [],
    image: null,
  },
];

/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [
  { id: "vse", label: "Vše" },
  { id: "predkrmy", label: "Předkrmy" },
  { id: "polevky-salaty", label: "Polévky & saláty" },
  { id: "orientalni-speciality", label: "Orientální speciality" },
  { id: "gril", label: "Z grilu" },
  { id: "mix-grill", label: "Mix Grill" },
  { id: "vegetarianska", label: "Vegetariánské" },
  { id: "ryby", label: "Ryby" },
  { id: "prilohy", label: "Přílohy" },
  { id: "dezerty", label: "Dezerty" },
  { id: "nealko", label: "Nealko" },
  { id: "domaci-napoje", label: "Domácí nápoje" },
  { id: "teple-napoje", label: "Teplé nápoje" },
  { id: "pivo", label: "Pivo" },
  { id: "vino", label: "Víno" },
  { id: "tvrdý-alkohol", label: "Destiláty" },
];

/* =========================================================
   ALLERGEN LEGEND
   ========================================================= */

const allergens = [
  { id: 1, label: "Obiloviny obsahující lepek" },
  { id: 2, label: "Korýši" },
  { id: 3, label: "Vejce" },
  { id: 4, label: "Ryby" },
  { id: 5, label: "Arašídy" },
  { id: 6, label: "Sójové boby" },
  { id: 7, label: "Mléko" },
  { id: 8, label: "Skořápkové plody" },
  { id: 9, label: "Celer" },
  { id: 10, label: "Hořčice" },
  { id: 11, label: "Sezamová semena" },
  { id: 12, label: "Oxid siřičitý a siřičitany" },
  { id: 13, label: "Vlčí bob" },
  { id: 14, label: "Měkkýši" },
];

/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(price) {
  return `${price.toLocaleString("cs-CZ")} Kč`;
}

/* =========================================================
   COMPONENT
   ========================================================= */

function Menu() {
  const [activeCategory, setActiveCategory] = useState("vse");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllergens, setShowAllergens] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const imageItems = useMemo(() => menuItems.filter((item) => item.image), []);

  const openLightbox = (item) => {
    const index = imageItems.findIndex((imageItem) => imageItem.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  const showPreviousImage = () => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null || imageItems.length === 0) return currentIndex;
      return (currentIndex - 1 + imageItems.length) % imageItems.length;
    });
  };

  const showNextImage = () => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null || imageItems.length === 0) return currentIndex;
      return (currentIndex + 1) % imageItems.length;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "vse" || item.category === activeCategory;

      const matchesVegetarian = !vegetarianOnly || item.vegetarian;

      const matchesSearch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesVegetarian && matchesSearch;
    });
  }, [activeCategory, vegetarianOnly, searchQuery]);

  return (
    <main className="menu-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="menu-page__hero">
        <div className="container">
          <div className="menu-page__hero-content">
            <span className="menu-page__eyebrow">
              ❖ AUTENTICKÁ AFGHÁNSKÁ KUCHYNĚ ❖
            </span>

            <h1 className="menu-page__title">Jídelní lístek</h1>

            <p className="menu-page__intro">
              Objevte tradiční chutě Afghánistánu, připravované s respektem k
              původním recepturám a kvalitním surovinám.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MENU
      ===================================================== */}

      <section className="menu-page__content" aria-labelledby="menu-page-title">
        <div className="container">
          {/* HEADER */}

          <header className="menu-page__header">
            <div>
              <span className="menu-page__section-label">STÁLÁ NABÍDKA</span>

              <h2 id="menu-page-title" className="menu-page__heading">
                Naše nabídka
              </h2>
            </div>

            <p className="menu-page__count">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "položka" : "položek"}
            </p>
          </header>

          {/* =================================================
              CATEGORY NAVIGATION
          ================================================= */}

          <nav className="menu-page__categories" aria-label="Kategorie jídel">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`menu-page__category ${
                  activeCategory === category.id
                    ? "menu-page__category--active"
                    : ""
                }`}
                aria-pressed={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id);

                  window.scrollTo({
                    top: 180,
                    behavior: "smooth",
                  });
                }}
              >
                {category.label}
              </button>
            ))}
          </nav>

          {/* =================================================
              MENU GRID
          ================================================= */}

          {filteredItems.length > 0 ? (
            <div className="menu-page__grid">
              {filteredItems.map((item) => (
                <article
                  className={`menu-page__item ${
                    item.image ? "menu-page__item--has-image" : ""
                  }`}
                  key={item.id}
                >
                  {item.image && (
                    <button
                      type="button"
                      className="menu-page__item-image"
                      onClick={() => openLightbox(item)}
                      aria-label={`Zobrazit fotografii ${item.name}`}
                    >
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        className="menu-page__item-image-icon"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M15 3h6v6M21 3l-8 8M5 5h5M5 5v5M5 19h5M5 19v-5M19 19h-5M19 19v-5" />
                        </svg>
                      </span>
                    </button>
                  )}

                  <div className="menu-page__item-top">
                    <div className="menu-page__item-heading">
                      <h3 className="menu-page__item-name">{item.name}</h3>

                      {item.vegetarian &&
                        ![
                          "vegetarianska",
                          "prilohy",
                          "dezerty",
                          "nealko",
                          "domaci-napoje",
                          "teple-napoje",
                          "pivo",
                          "vino",
                          "tvrdý-alkohol",
                        ].includes(item.category) && (
                          <span className="menu-page__badge">VEGE</span>
                        )}
                    </div>

                    {item.price && (
                      <span className="menu-page__price">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="menu-page__description">{item.description}</p>
                  )}

                  {item.variants && (
                    <div className="menu-page__variants">
                      {item.variants.map((variant) => (
                        <div
                          className="menu-page__variant"
                          key={`${item.id}-${variant.label}`}
                        >
                          <span>{variant.label}</span>

                          <span>
                            {variant.portion && (
                              <>
                                <small>{variant.portion}</small>{" "}
                              </>
                            )}

                            <strong>{formatPrice(variant.price)}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.portion && (
                    <div className="menu-page__meta">
                      <span>{item.portion}</span>

                      {item.allergens?.length > 0 && (
                        <span>Alergeny: {item.allergens.join(", ")}</span>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="menu-page__empty">
              <span className="menu-page__empty-mark">◆</span>

              <h3>Nic jsme nenašli</h3>

              <p>Zkuste změnit kategorii nebo hledaný výraz.</p>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory("vse");
                  setVegetarianOnly(false);
                  setSearchQuery("");
                }}
              >
                Zobrazit celý lístek
              </button>
            </div>
          )}

          {/* =================================================
              ALLERGENS
          ================================================= */}

          <section className="menu-page__allergens">
            <button
              type="button"
              className="menu-page__allergens-toggle"
              aria-expanded={showAllergens}
              onClick={() => setShowAllergens((currentValue) => !currentValue)}
            >
              <span>Informace o alergenech</span>

              <span className="menu-page__allergens-arrow" aria-hidden="true">
                {showAllergens ? "−" : "+"}
              </span>
            </button>

            {showAllergens && (
              <div className="menu-page__allergens-content">
                <p className="menu-page__allergens-intro">
                  Číselné označení alergenů bude doplněno podle finálních
                  receptur jednotlivých pokrmů. Níže je připravená legenda pro
                  jejich následné zobrazení u jídel.
                </p>

                <div className="menu-page__allergens-grid">
                  {allergens.map((allergen) => (
                    <div className="menu-page__allergen" key={allergen.id}>
                      <span>{allergen.id}</span>

                      <p>{allergen.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              FOOTNOTE
          ================================================= */}

          <div className="menu-page__note">
            <span className="menu-page__note-mark" aria-hidden="true">
              ◆
            </span>

            <p>
              Informace o složení pokrmů a alergenech vám rádi upřesníme také
              přímo v restauraci.
            </p>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && imageItems[lightboxIndex] && (
        <div
          className="menu-page__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografie ${imageItems[lightboxIndex].name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            type="button"
            className="menu-page__lightbox-close"
            onClick={closeLightbox}
            aria-label="Zavřít fotografii"
          >
            ×
          </button>

          {imageItems.length > 1 && (
            <>
              <button
                type="button"
                className="menu-page__lightbox-nav menu-page__lightbox-nav--previous"
                onClick={showPreviousImage}
                aria-label="Předchozí fotografie"
              >
                ‹
              </button>

              <button
                type="button"
                className="menu-page__lightbox-nav menu-page__lightbox-nav--next"
                onClick={showNextImage}
                aria-label="Další fotografie"
              >
                ›
              </button>
            </>
          )}

          <figure className="menu-page__lightbox-content">
            <img
              src={imageItems[lightboxIndex].image}
              alt={
                imageItems[lightboxIndex].imageAlt ||
                imageItems[lightboxIndex].name
              }
            />
            <figcaption>{imageItems[lightboxIndex].name}</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}

export default Menu;
