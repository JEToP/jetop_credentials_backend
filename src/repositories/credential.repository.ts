import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Credential, CredentialRelations, History, Service} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {HistoryRepository} from './history.repository';
import {ServiceRepository} from './service.repository';

export class CredentialRepository extends DefaultCrudRepository<
  Credential,
  typeof Credential.prototype.id,
  CredentialRelations
> {

  public readonly histories: HasManyRepositoryFactory<History, typeof Credential.prototype.id>;

  public readonly service: BelongsToAccessor<Service, typeof Credential.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HistoryRepository') protected historyRepositoryGetter: Getter<HistoryRepository>, @repository.getter('ServiceRepository') protected serviceRepositoryGetter: Getter<ServiceRepository>,
  ) {
    super(Credential, dataSource);
    this.service = this.createBelongsToAccessorFor('service', serviceRepositoryGetter,);
    this.registerInclusionResolver('service', this.service.inclusionResolver);
    this.histories = this.createHasManyRepositoryFactoryFor('histories', historyRepositoryGetter,);
    this.registerInclusionResolver('histories', this.histories.inclusionResolver);
  }
}
