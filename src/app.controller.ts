import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
/**
 * Gerenciamento dos serviços - Container de serviço
 * tudo oq queremos lhe dar dentro dos services e controllers ficam
 * registrados nos módulos, isso evita que instancias sejam criadas
 * de forma desnecessária. Com isso tudo o que está registrado em
 * um provider recebe seu recurso por injeção de dependencias no
 * seu construtor, com isso ele se torna um injetável.
 */
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('action')
  action(): string {
    return 'Hello action';
  }
}
