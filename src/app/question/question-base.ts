export class QuestionBase<T>{
  value: T;
  TituloGeneral: string;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  centros_actividades: string;
  constructor(options: {
      value?: T,
      TituloGeneral?: string,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      centros_actividades?: string;
    } = {}) {
    this.value = options.value;
    this.TituloGeneral = options.TituloGeneral;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.centros_actividades = options.centros_actividades || '';
  }
}