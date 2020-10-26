import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Encryption} from '../encryption/encryption';
import {Credential, History, HistoryRelations} from '../models';
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

  definePersistedModel(entityClass: typeof History) {
    const modelClass = super.definePersistedModel(entityClass);
    const crypt = new Encryption();
    modelClass.observe('before save', async ctx => {
      ctx.instance.password = crypt.encrypt(ctx.instance.password);
      console.log(ctx.instance.password);
    });
    modelClass.observe('loaded', async ctx => {
      console.log(ctx);
      ctx.data.password = crypt.decrypt(ctx.data.password);
    })
    return modelClass;
  }
}
