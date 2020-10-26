import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  History,
  Credential,
} from '../models';
import {HistoryRepository} from '../repositories';

export class HistoryCredentialController {
  constructor(
    @repository(HistoryRepository)
    public historyRepository: HistoryRepository,
  ) { }

  @get('/histories/{id}/credential', {
    responses: {
      '200': {
        description: 'Credential belonging to History',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Credential)},
          },
        },
      },
    },
  })
  async getCredential(
    @param.path.number('id') id: typeof History.prototype.id,
  ): Promise<Credential> {
    return this.historyRepository.credential(id);
  }
}
