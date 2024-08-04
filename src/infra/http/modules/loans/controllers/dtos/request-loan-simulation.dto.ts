import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class RequestLoanSimulationDTO {
  @ApiProperty({ example: '111111111' })
  @IsNotEmpty({ message: 'O campo "cpf" não pode ser vazio' })
  @IsString({ message: 'O campo "cpf" deve ser uma string' })
  cpf: string;

  @ApiProperty({ example: 'MG', enum: ['MG', 'SP', 'ES', 'RJ'] })
  @IsNotEmpty({ message: 'O campo "uf" não pode ser vazio' })
  @IsEnum(['MG', 'SP', 'ES', 'RJ'], {
    message: 'O campo "uf" deve ser um dos valores: MG, SP, ES, RJ',
  })
  uf: 'MG' | 'SP' | 'ES' | 'RJ';

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty({ message: 'O campo "birthday" não pode ser vazio' })
  @IsString({ message: 'O campo "birthday" deve ser do tipo caracteres' })
  birthday: Date;

  @ApiProperty({ example: 60000 })
  @IsNumber()
  loan: number;

  @ApiProperty({ example: 15000 })
  @IsNumber()
  installments: number;
}

export { RequestLoanSimulationDTO };
