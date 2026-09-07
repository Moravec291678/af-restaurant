import ashak from "../assets/images/menu/ashak.webp";
import ashakVege from "../assets/images/menu/ashakVege.webp";
import baghlawa from "../assets/images/menu/baghlawa.webp";
import bartha from "../assets/images/menu/bartha.webp";
import boloni from "../assets/images/menu/boloni.webp";
import boraniBadenjan from "../assets/images/menu/boraniBadenjan.webp";
import catni from "../assets/images/menu/catni.webp";
import daal from "../assets/images/menu/daal.webp";
import dalSoup from "../assets/images/menu/dalSoup.webp";
import falafel from "../assets/images/menu/falafel.webp";
import grilovanyPstruh from "../assets/images/menu/grilovanyPstruh.webp";
import grilovanyLosos from "../assets/images/menu/grilovanyLosos.webp";
import hoveziSaslik from "../assets/images/menu/hoveziSaslik.webp";
import hranolky from "../assets/images/menu/hranolky.webp";
import chalouBasmati from "../assets/images/menu/chalouBasmati.webp";
import iceFerni from "../assets/images/menu/iceFerni.webp";
import jehneciKotlety from "../assets/images/menu/jehneciKotlety.webp";
import jehneciSaslik from "../assets/images/menu/jehneciSaslik.webp";
import koftaChalow from "../assets/images/menu/koftaChalow.webp";
import kureciKridla from "../assets/images/menu/kureciKridla.webp";
import kureciStehna from "../assets/images/menu/kureciStehna.webp";
import mantu from "../assets/images/menu/mantu.webp";
import nanePlacka from "../assets/images/menu/nanePlacka.webp";
import pro2Osoby from "../assets/images/menu/pro2Osoby.webp";
import pro4Osoby from "../assets/images/menu/pro4Osoby.webp";
import qabuliPalow from "../assets/images/menu/qabuliPalow.webp";
import qormeBamia from "../assets/images/menu/qormeBamia.webp";
import salatMix from "../assets/images/menu/salatMix.webp";
import sambosa from "../assets/images/menu/sambosa.webp";
import samiKebab from "../assets/images/menu/samiKebab.webp";
import torshi from "../assets/images/menu/torshi.webp";
import zabziSpenat from "../assets/images/menu/zabziSpenat.webp";
import shorNachod from "../assets/images/menu/shorNachod.webp";

const menuImages = {
  falafel,
  bartha,
  sambosa,
  boloni,

  "dal-soup": dalSoup,
  "salat-mix": salatMix,
  "shor-na-chod": shorNachod,

  "qabuli-palow": qabuliPalow,
  "kofta-chalow": koftaChalow,
  mantu,
  ashak,

  "kureci-kridla": kureciKridla,
  "kureci-stehna": kureciStehna,
  "jehneci-kotlety": jehneciKotlety,
  "hovezi-saslik": hoveziSaslik,
  "jehneci-saslik": jehneciSaslik,
  "sami-kebab": samiKebab,

  "mix-grill-2": pro2Osoby,
  "mix-grill-4": pro4Osoby,

  daal,
  "zabzi-spenat": zabziSpenat,
  "qorme-bamia": qormeBamia,
  "ashak-vegetariansky": ashakVege,
  "borani-badenjan": boraniBadenjan,

  "grilovany-losos": grilovanyLosos,
  "grilovany-pstruh": grilovanyPstruh,

  nane: nanePlacka,
  catni,
  hranolky,
  chalouBasmati,
  torshi,

  baghlawa,
  "ice-ferni": iceFerni,
};

export function getMenuImage(id) {
  return menuImages[id] ?? null;
}
