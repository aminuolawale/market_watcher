export const toMillion = (num) => {
  return Math.abs(num) > 999999
    ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed() + "M"
    : Math.sign(num) * Math.abs(num);
};

console.log(toMillion(90090000));
