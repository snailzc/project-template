/**
 * 通用正则表达式，用于表单格式校验
 */

 interface Pattern {
   reg: RegExp;
   msg: string;
 }

export const doublePattern: Pattern = {
  reg: /^(([1-9][0-9]*)|(([0](\.\d{1,2})?|[1-9][0-9]*\.\d{1,2})))$/,
  msg: '请输入不超过两位小数的数字',
};

export const doublePositive: Pattern = {
  reg: /^(?=.*[0-9])\d*(?:\.\d{1,2})?$/,
  msg: '请输入不小于0且不超过两位小数的数字',
};

export const doubleZF: Pattern = {
  reg: /^([\\+ \\-]?(([1-9]\d*)|(0)))([.]\d{0,2})?$/,
  msg: '请输入不超过两位小数的正数或负数',
};

export const doubleFF: Pattern = {
  reg: /^[1-9]+\d*(\.\d{0,2})?$|^0?(\.\d{0,2})?$/,
  msg: '请输入大于0且不超过两位小数的数字',
};

export const doubleTT: Pattern = {
  reg: /^[1-9]+\d*(\.\d{0,3})?$|^0?\.\d{0,3}$/,
  msg: '请输入大于0且不超过三位小数的数字',
};

export const doubleDD: Pattern = {
  reg: /^[0-9]+\d*(\.\d{0,3})?$|^0?\.\d{0,3}$/,
  msg: '请输入大于等于0且不超过三位小数的数字',
};

export const doublePat: Pattern = {
  // reg: /^(\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*)|[0]$/,
  reg: /^-?[0-9]\d*(?:\.\d{1,2})?$/,
  msg: '请输入不超过两位小数的数字',
};

// 只能输入整数
export const intPat: Pattern = {
  reg: /^-?[0-9]\d*$/,
  msg: '只能输入整数',
};

export const positiveInt: Pattern = {
  reg: /^\+?[1-9]\d*$/,
  msg: '只能输入正整数',
};

export const nonNegativeInt: Pattern = {
  reg: /^[+]{0,1}(\d+)$/,
  msg: '请输入大于等于0的整数！',
};

// 非负数
export const nonNegative: Pattern = {
  reg: /^\d+(\.{0,1}\d+){0,1}$/,
  msg: '请输入非负数！',
};

// 0-100两位小数
export const weight: Pattern = {
  reg: /^(100|[1-9]?\d(\.\d{1,2})?)$/,
  msg: '0-100两位小数',
};

// 0-100一位小数
export const percentage: Pattern = {
  reg: /^(100|[1-9]?\d(\.\d)?)$/,
  msg: '0-100一位小数',
};

// 0-50整数
export const share: Pattern = {
  reg: /^[1-5]?[0-9]$/,
  msg: '0-50的整数',
};

// 0-10小数两位
export const density: Pattern = {
  reg: /^(10|\d(\.\d{1,2})?)$/,
  msg: '0-10两位小数',
};

// 0-600的整数
export const milliliter: Pattern = {
  reg: /^(600|[1-5]?\d{0,2})$/,
  msg: '0-600的整数',
};

// 0-30的整数
export const livestock: Pattern = {
  reg: /^(30|[1-2]?\d)$/,
  msg: '0-30的整数',
};

// 0-300的两位小数
export const litter: Pattern = {
  reg: /^(300|[0-9]{1,2}(\.\d{1,2})?)$/,
  msg: '0-300的两位小数',
};

// 15位长度、不得含有汉字、特殊符号，但特殊符号“.”、“-”允许。
export const overbit: Pattern = {
  reg: /^[A-Za-z0-9_.]{0,15}$/,
  msg: '不得超过15位、不得含有汉字、特殊符号, 但特殊符号“.”、“-”允许',
};


// 只允许输入大写字母A/B/C/D
export const upperLetter: Pattern = {
  reg: /^[A-D]{0,1}$/,
  msg: '只允许输入A、B、C、D',
};

// 经度
export const lonPattern: Pattern = {
  reg: /^-?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/,
  msg: '请输入正确的经度数据！',
};

export const latPattern: Pattern = {
  reg: /^-?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/,
  msg: '请输入正确的纬度数据！',
};
