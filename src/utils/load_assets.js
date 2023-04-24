export const getAssetURL = (image) => {
  // url 相对路径
  // base: 当前路径的URL
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};
