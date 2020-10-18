// Uncomment these imports to begin using these cool features!

import {get} from '@loopback/rest';

export class HelloWorldExampleController {
  @get('/hello-world-example')
  helloWorld(): string {
    return 'Hello World!';
  }
}
