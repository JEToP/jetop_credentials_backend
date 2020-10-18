import {DefaultCrudRepository} from '@loopback/repository';
import {Esempio, EsempioRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EsempioRepository extends DefaultCrudRepository<
  Esempio,
  typeof Esempio.prototype.ID,
  EsempioRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Esempio, dataSource);
  }
}
