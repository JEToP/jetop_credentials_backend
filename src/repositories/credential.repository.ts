import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Credential, CredentialRelations, History} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {HistoryRepository} from './history.repository';

export class CredentialRepository extends DefaultCrudRepository<
  Credential,
  typeof Credential.prototype.id,
  CredentialRelations
> {

  public readonly histories: HasManyRepositoryFactory<History, typeof Credential.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HistoryRepository') protected historyRepositoryGetter: Getter<HistoryRepository>,
  ) {
    super(Credential, dataSource);
    this.histories = this.createHasManyRepositoryFactoryFor('histories', historyRepositoryGetter,);
    this.registerInclusionResolver('histories', this.histories.inclusionResolver);
  }
}
