import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Credential,
  Service,
} from '../models';
import {CredentialRepository} from '../repositories';

export class CredentialServiceController {
  constructor(
    @repository(CredentialRepository)
    public credentialRepository: CredentialRepository,
  ) { }

  @get('/credentials/{id}/service', {
    responses: {
      '200': {
        description: 'Service belonging to Credential',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Service)},
          },
        },
      },
    },
  })
  async getService(
    @param.path.number('id') id: typeof Credential.prototype.id,
  ): Promise<Service> {
    return this.credentialRepository.service(id);
  }
}
