import { Step as BaseStep } from 'crius';

export class Step<P = {}, C = {}> extends BaseStep<P, C> {
  public name?: string;
  public title?: string;
  public params?: TemplateStringsArray;
}