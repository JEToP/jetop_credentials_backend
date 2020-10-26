import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {History} from './history.model';
import {Service} from './service.model';

@model()
export class Credential extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  creationDate: string;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'json'
    }
  })
  backupCode?: object;

  @property({
    type: 'string',
  })
  backupFileUrl?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'varchar',
      dataLength: 50
    }
  })
  referredContact?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'varchar',
      dataLength: 50
    }
  })
  referredNumber?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'varchar',
      dataLength: 50
    }
  })
  otpType?: string;

  @hasMany(() => History)
  histories: History[];

  @belongsTo(() => Service)
  serviceId: number;

  constructor(data?: Partial<Credential>) {
    super(data);
  }
}

export interface CredentialRelations {
  // describe navigational properties here
}

export type CredentialWithRelations = Credential & CredentialRelations;
