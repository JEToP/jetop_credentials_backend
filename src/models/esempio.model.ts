import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Esempio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  HW: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Esempio>) {
    super(data);
  }
}

export interface EsempioRelations {
  // describe navigational properties here
}

export type EsempioWithRelations = Esempio & EsempioRelations;
