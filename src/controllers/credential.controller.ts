import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Credential} from '../models';
import {CredentialRepository} from '../repositories';

export class CredentialController {
  constructor(
    @repository(CredentialRepository)
    public credentialRepository : CredentialRepository,
  ) {}

  @post('/credentials', {
    responses: {
      '200': {
        description: 'Credential model instance',
        content: {'application/json': {schema: getModelSchemaRef(Credential)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {
            title: 'NewCredential',
            exclude: ['id'],
          }),
        },
      },
    })
    credential: Omit<Credential, 'id'>,
  ): Promise<Credential> {
    return this.credentialRepository.create(credential);
  }

  @get('/credentials/count', {
    responses: {
      '200': {
        description: 'Credential model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Credential) where?: Where<Credential>,
  ): Promise<Count> {
    return this.credentialRepository.count(where);
  }

  @get('/credentials', {
    responses: {
      '200': {
        description: 'Array of Credential model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Credential, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Credential) filter?: Filter<Credential>,
  ): Promise<Credential[]> {
    return this.credentialRepository.find(filter);
  }

  @patch('/credentials', {
    responses: {
      '200': {
        description: 'Credential PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {partial: true}),
        },
      },
    })
    credential: Credential,
    @param.where(Credential) where?: Where<Credential>,
  ): Promise<Count> {
    return this.credentialRepository.updateAll(credential, where);
  }

  @get('/credentials/{id}', {
    responses: {
      '200': {
        description: 'Credential model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credential, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Credential, {exclude: 'where'}) filter?: FilterExcludingWhere<Credential>
  ): Promise<Credential> {
    return this.credentialRepository.findById(id, filter);
  }

  @patch('/credentials/{id}', {
    responses: {
      '204': {
        description: 'Credential PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {partial: true}),
        },
      },
    })
    credential: Credential,
  ): Promise<void> {
    await this.credentialRepository.updateById(id, credential);
  }

  @put('/credentials/{id}', {
    responses: {
      '204': {
        description: 'Credential PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() credential: Credential,
  ): Promise<void> {
    await this.credentialRepository.replaceById(id, credential);
  }

  @del('/credentials/{id}', {
    responses: {
      '204': {
        description: 'Credential DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.credentialRepository.deleteById(id);
  }
}
