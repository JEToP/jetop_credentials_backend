import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {History, HistoryRelations, Credential} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CredentialRepository} from './credential.repository';

export class HistoryRepository extends DefaultCrudRepository<
  History,
  typeof History.prototype.id,
  HistoryRelations
> {

  public readonly credential: BelongsToAccessor<Credential, typeof History.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CredentialRepository') protected credentialRepositoryGetter: Getter<CredentialRepository>,
  ) {
    super(History, dataSource);
    this.credential = this.createBelongsToAccessorFor('credential', credentialRepositoryGetter,);
  }
}
