import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

// DTO for creating a job
export class CreateJobDto {
  @ApiProperty({
    description: 'The title of the job',
    example: 'Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The company offering the job',
    example: 'Infosys',
  })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    description: 'The location of the job',
    example: 'New Delhi, India',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'The salary offered for the job',
    example: 60000,
    minimum: 1000,
  })
  @IsNumber()
  @Min(1000)
  salary: number;

  @ApiProperty({
    description: 'A detailed description of the job',
    example: 'We are looking for a skilled developer.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

// DTO for updating a job
export class UpdateJobDto extends PartialType(CreateJobDto) {
  @ApiProperty({
    description: 'Whether the job is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
