import {DefaultCrudRepository} from '@loopback/repository';
import {History, HistoryRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HistoryRepository extends DefaultCrudRepository<
  History,
  typeof History.prototype.id,
  HistoryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(History, dataSource);
  }
}
