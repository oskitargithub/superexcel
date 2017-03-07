import { QuestionBase } from './question-base';

export class DobleTextQuestion extends QuestionBase<string> {
  controlType = 'dobletext';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}