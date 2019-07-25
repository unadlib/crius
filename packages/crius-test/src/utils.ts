export function compileString(template: string, params: object): string {
  const renderTemplate = new Function(...Object.keys(params), `return \`${template}\``);
  return renderTemplate(...Object.values(params));
}

export function parserString(text: string): Array<{ [K: string]: string }> {
  const rawArray = text.replace(/\s+/g, '').split('|');
  const dataArray = rawArray.filter(i => i);
  const length = rawArray.length - dataArray.length - 1;
  const keyLength = dataArray.length / length;
  const arr: Array<{ [K: string]: string }> = [];
  for(let l = length;l --> 1;) {
	  arr[l-1] = {};
    for(let k = keyLength;k --> 0;) {
      arr[l-1][dataArray[k]] = dataArray[l*keyLength+k];
    }
  }
  return arr;
}
