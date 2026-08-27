export type UnitKey = string;

export type UnitDefinition = {
  key: UnitKey;
  label: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

export type UnitGroup = {
  key: string;
  label: string;
  units: UnitDefinition[];
};

const linear = (key: string, label: string, symbol: string, factor: number): UnitDefinition => ({
  key, label, symbol,
  toBase: (value) => value * factor,
  fromBase: (value) => value / factor,
});

export const unitGroups: UnitGroup[] = [
  { key: "length", label: "길이", units: [linear("mm","밀리미터","mm",0.001),linear("cm","센티미터","cm",0.01),linear("m","미터","m",1),linear("km","킬로미터","km",1000),linear("inch","인치","in",0.0254),linear("ft","피트","ft",0.3048),linear("yd","야드","yd",0.9144),linear("mile","마일","mi",1609.344)] },
  { key: "area", label: "넓이", units: [linear("sqm","제곱미터","㎡",1),linear("pyeong","평","평",3.30578512397),linear("sqcm","제곱센티미터","㎠",0.0001),linear("sqft","제곱피트","ft²",0.09290304),linear("acre","에이커","acre",4046.8564224)] },
  { key: "weight", label: "무게", units: [linear("mg","밀리그램","mg",0.000001),linear("g","그램","g",0.001),linear("kg","킬로그램","kg",1),linear("ton","톤","t",1000),linear("oz","온스","oz",0.028349523125),linear("lb","파운드","lb",0.45359237)] },
  { key: "volume", label: "부피", units: [linear("ml","밀리리터","mL",0.001),linear("l","리터","L",1),linear("cc","씨씨","cc",0.001),linear("cup","컵(미국)","cup",0.2365882365),linear("pint","파인트(미국)","pt",0.473176473),linear("gallon","갤런(미국)","gal",3.785411784)] },
  { key: "speed", label: "속도", units: [linear("mps","미터/초","m/s",1),linear("kmh","킬로미터/시","km/h",1/3.6),linear("mph","마일/시","mph",0.44704),linear("knot","노트","kn",0.5144444444)] },
  { key: "pressure", label: "압력", units: [linear("pa","파스칼","Pa",1),linear("kpa","킬로파스칼","kPa",1000),linear("bar","바","bar",100000),linear("psi","PSI","psi",6894.757293168),linear("atm","기압","atm",101325)] },
  { key: "energy", label: "에너지", units: [linear("j","줄","J",1),linear("kj","킬로줄","kJ",1000),linear("kcal","킬로칼로리","kcal",4184),linear("wh","와트시","Wh",3600),linear("kwh","킬로와트시","kWh",3600000)] },
  { key: "data", label: "데이터", units: [linear("b","바이트","B",1),linear("kb","킬로바이트","KB",1000),linear("mb","메가바이트","MB",1000000),linear("gb","기가바이트","GB",1000000000),linear("tb","테라바이트","TB",1000000000000)] },
  { key: "temperature", label: "온도", units: [
    { key:"c",label:"섭씨",symbol:"℃",toBase:(v)=>v,fromBase:(v)=>v },
    { key:"f",label:"화씨",symbol:"℉",toBase:(v)=>(v-32)*5/9,fromBase:(v)=>v*9/5+32 },
    { key:"k",label:"켈빈",symbol:"K",toBase:(v)=>v-273.15,fromBase:(v)=>v+273.15 },
  ]},
  { key: "fuel", label: "연비", units: [
    { key:"kml",label:"km/L",symbol:"km/L",toBase:(v)=>v,fromBase:(v)=>v },
    { key:"l100",label:"L/100km",symbol:"L/100km",toBase:(v)=>v===0?Infinity:100/v,fromBase:(v)=>v===0?Infinity:100/v },
    { key:"mpgus",label:"MPG(미국)",symbol:"mpg US",toBase:(v)=>v*0.425143707,fromBase:(v)=>v/0.425143707 },
  ]},
];

export function getUnitGroup(key: string) { return unitGroups.find((group) => group.key === key); }

export function convertUnit(groupKey: string, value: number, fromKey: string, toKey: string) {
  const group = getUnitGroup(groupKey);
  if (!group) throw new Error(`Unknown unit group: ${groupKey}`);
  const from = group.units.find((unit) => unit.key === fromKey);
  const to = group.units.find((unit) => unit.key === toKey);
  if (!from || !to) throw new Error("Unknown unit");
  return to.fromBase(from.toBase(value));
}

export function convertAll(groupKey: string, value: number, fromKey: string) {
  const group = getUnitGroup(groupKey);
  if (!group) return [];
  return group.units.map((unit) => ({ ...unit, value: convertUnit(groupKey, value, fromKey, unit.key) }));
}
