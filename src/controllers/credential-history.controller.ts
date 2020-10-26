import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Credential,
  History,
} from '../models';
import {CredentialRepository} from '../repositories';

export class CredentialHistoryController {
  constructor(
    @repository(CredentialRepository) protected credentialRepository: CredentialRepository,
  ) { }

  @get('/credentials/{id}/histories', {
    responses: {
      '200': {
        description: 'Array of Credential has many History',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(History)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<History>,
  ): Promise<History[]> {
    return this.credentialRepository.histories(id).find(filter);
  }

  @post('/credentials/{id}/histories', {
    responses: {
      '200': {
        description: 'Credential model instance',
        content: {'application/json': {schema: getModelSchemaRef(History)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Credential.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(History, {
            title: 'NewHistoryInCredential',
            exclude: ['id'],
            optional: ['credentialId']
          }),
        },
      },
    }) history: Omit<History, 'id'>,
  ): Promise<History> {
    return this.credentialRepository.histories(id).create(history);
  }

  @patch('/credentials/{id}/histories', {
    responses: {
      '200': {
        description: 'Credential.History PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(History, {partial: true}),
        },
      },
    })
    history: Partial<History>,
    @param.query.object('where', getWhereSchemaFor(History)) where?: Where<History>,
  ): Promise<Count> {
    return this.credentialRepository.histories(id).patch(history, where);
  }

  @del('/credentials/{id}/histories', {
    responses: {
      '200': {
        description: 'Credential.History DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(History)) where?: Where<History>,
  ): Promise<Count> {
    return this.credentialRepository.histories(id).delete(where);
  }
}
