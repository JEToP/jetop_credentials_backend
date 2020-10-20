import {Entity, model, property} from '@loopback/repository';

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
  })
  backupCode?: object;

  @property({
    type: 'string',
  })
  backupFileUrl?: string;

  @property({
    type: 'string',
  })
  referredContact?: string;

  @property({
    type: 'string',
  })
  referredNumber?: string;

  @property({
    type: 'string',
  })
  otpType?: string;


  constructor(data?: Partial<Credential>) {
    super(data);
  }
}

export interface CredentialRelations {
  // describe navigational properties here
}

export type CredentialWithRelations = Credential & CredentialRelations;
