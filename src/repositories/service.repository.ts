import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Service, ServiceRelations, Credential} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CredentialRepository} from './credential.repository';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id,
  ServiceRelations
> {

  public readonly credentials: HasManyRepositoryFactory<Credential, typeof Service.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CredentialRepository') protected credentialRepositoryGetter: Getter<CredentialRepository>,
  ) {
    super(Service, dataSource);
    this.credentials = this.createHasManyRepositoryFactoryFor('credentials', credentialRepositoryGetter,);
    this.registerInclusionResolver('credentials', this.credentials.inclusionResolver);
  }
}
