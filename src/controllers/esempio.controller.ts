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
import {Esempio} from '../models';
import {EsempioRepository} from '../repositories';

export class EsempioController {
  constructor(
    @repository(EsempioRepository)
    public esempioRepository : EsempioRepository,
  ) {}

  @post('/esempio', {
    responses: {
      '200': {
        description: 'Esempio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Esempio)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Esempio, {
            title: 'NewEsempio',
            exclude: ['id'],
          }),
        },
      },
    })
    esempio: Omit<Esempio, 'id'>,
  ): Promise<Esempio> {
    return this.esempioRepository.create(esempio);
  }

  @get('/esempio/count', {
    responses: {
      '200': {
        description: 'Esempio model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Esempio) where?: Where<Esempio>,
  ): Promise<Count> {
    return this.esempioRepository.count(where);
  }

  @get('/esempio', {
    responses: {
      '200': {
        description: 'Array of Esempio model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Esempio, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Esempio) filter?: Filter<Esempio>,
  ): Promise<Esempio[]> {
    return this.esempioRepository.find(filter);
  }

  @patch('/esempio', {
    responses: {
      '200': {
        description: 'Esempio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Esempio, {partial: true}),
        },
      },
    })
    esempio: Esempio,
    @param.where(Esempio) where?: Where<Esempio>,
  ): Promise<Count> {
    return this.esempioRepository.updateAll(esempio, where);
  }

  @get('/esempio/{id}', {
    responses: {
      '200': {
        description: 'Esempio model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Esempio, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Esempio, {exclude: 'where'}) filter?: FilterExcludingWhere<Esempio>
  ): Promise<Esempio> {
    return this.esempioRepository.findById(id, filter);
  }

  @patch('/esempio/{id}', {
    responses: {
      '204': {
        description: 'Esempio PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Esempio, {partial: true}),
        },
      },
    })
    esempio: Esempio,
  ): Promise<void> {
    await this.esempioRepository.updateById(id, esempio);
  }

  @put('/esempio/{id}', {
    responses: {
      '204': {
        description: 'Esempio PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() esempio: Esempio,
  ): Promise<void> {
    await this.esempioRepository.replaceById(id, esempio);
  }

  @del('/esempio/{id}', {
    responses: {
      '204': {
        description: 'Esempio DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.esempioRepository.deleteById(id);
  }
}
