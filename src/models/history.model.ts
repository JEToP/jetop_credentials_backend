import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class History extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      dataType: 'integer',
      nullable: 'NO',
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'NO',
    },
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'NO',
    },
  })
  password: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      dataType: 'timestamp with time zone',
      nullable: 'NO',
    },
  })
  creationDate: string;

  @property({
    type: 'date',
    postgresql: {
      dataType: 'date',
      nullable: true,
    },
  })
  expirationDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<History>) {
    super(data);
  }
}

export interface HistoryRelations {
  // describe navigational properties here
}

export type HistoryWithRelations = History & HistoryRelations;
