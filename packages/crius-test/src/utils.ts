export function compileString(template: string, params: object): string {
  const renderTemplate = new Function(...Object.keys(params), `return \`${template}\``);
  return renderTemplate(...Object.values(params));
}
