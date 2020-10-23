import {Entity, model, property} from '@loopback/repository';

@model()
export class Service extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'varchar',
      dataLength: 50
    }
  })
  name: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'varchar',
      dataLength: 50
    }
  })
  favicon?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'text',
    }
  })
  notes?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'text',
    }
  })
  url?: string;


  constructor(data?: Partial<Service>) {
    super(data);
  }
}

export interface ServiceRelations {
  // describe navigational properties here
}

export type ServiceWithRelations = Service & ServiceRelations;
