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
  Service,
  Credential,
} from '../models';
import {ServiceRepository} from '../repositories';

export class ServiceCredentialController {
  constructor(
    @repository(ServiceRepository) protected serviceRepository: ServiceRepository,
  ) { }

  @get('/services/{id}/credentials', {
    responses: {
      '200': {
        description: 'Array of Service has many Credential',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Credential)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Credential>,
  ): Promise<Credential[]> {
    return this.serviceRepository.credentials(id).find(filter);
  }

  @post('/services/{id}/credentials', {
    responses: {
      '200': {
        description: 'Service model instance',
        content: {'application/json': {schema: getModelSchemaRef(Credential)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Service.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {
            title: 'NewCredentialInService',
            exclude: ['id'],
            optional: ['serviceId']
          }),
        },
      },
    }) credential: Omit<Credential, 'id'>,
  ): Promise<Credential> {
    return this.serviceRepository.credentials(id).create(credential);
  }

  @patch('/services/{id}/credentials', {
    responses: {
      '200': {
        description: 'Service.Credential PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {partial: true}),
        },
      },
    })
    credential: Partial<Credential>,
    @param.query.object('where', getWhereSchemaFor(Credential)) where?: Where<Credential>,
  ): Promise<Count> {
    return this.serviceRepository.credentials(id).patch(credential, where);
  }

  @del('/services/{id}/credentials', {
    responses: {
      '200': {
        description: 'Service.Credential DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Credential)) where?: Where<Credential>,
  ): Promise<Count> {
    return this.serviceRepository.credentials(id).delete(where);
  }
}
