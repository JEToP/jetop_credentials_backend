import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Esempio} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Esempio,
  pattern: 'CrudRest',
  dataSource: 'db',
  basePath: '/esempio',
};
module.exports = config;
