export const stringToMarkup = (str: string) => {
  str = str.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  str = str.replace(/__(.*?)__/g, '<u>$1</u>');
  str = str.replace(/~~(.*?)~~/g, '<i>$1</i>');
  str = str.replace(/--(.*?)--/g, '<del>$1</del>');
  str = str.replace(/<<(.*?)>>/g, "<a href='$1'>Link</a>");
  return str;
};
