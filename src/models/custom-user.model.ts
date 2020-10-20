import {Entity, model, property} from '@loopback/repository';

@model()
export class CustomUser extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  googleId: string;


  constructor(data?: Partial<CustomUser>) {
    super(data);
  }
}

export interface CustomUserRelations {
  // describe navigational properties here
}

export type CustomUserWithRelations = CustomUser & CustomUserRelations;
