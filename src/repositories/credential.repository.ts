import {DefaultCrudRepository} from '@loopback/repository';
import {Credential, CredentialRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CredentialRepository extends DefaultCrudRepository<
  Credential,
  typeof Credential.prototype.id,
  CredentialRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Credential, dataSource);
  }
}
