import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import { Response } from 'express';

@ApiTags('Jobs') // Group all routes under the "Jobs" tag in Swagger
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
//////////////////////////Create Job///////////////////////
  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Job created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async createJob(@Body() createJobDto: CreateJobDto, @Res() res: Response) {
    return await this.jobsService.createJob(createJobDto, res);
  }
/////////////////////////Get All Jobs/////////////////////////////
  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns a list of jobs' })
  async getAllJobs(@Res() res: Response) {
    return await this.jobsService.getAllJobs(res);
  }
////////////////////////Get Single Job//////////////////////////////
  @Get('/:job_id')
  @ApiOperation({ summary: 'Get a single job by ID' })
  @ApiParam({
    name: 'job_id',
    description: 'The ID of the job to retrieve',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the job with the given ID',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Job not found' })
  async getSingleJob(
    @Param('job_id', ParseIntPipe) job_id: number,
    @Res() res: Response,
  ) {
    return await this.jobsService.getSingleJob(job_id, res);
  }
////////////////////////Update Single Job////////////////////
  @Put('/:job_id')
  @ApiOperation({ summary: 'Update an existing job' })
  @ApiParam({
    name: 'job_id',
    description: 'The ID of the job to update',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Job updated successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Job not found' })
  async updateJob(
    @Param('job_id', ParseIntPipe) job_id: number,
    @Body() updateJobDto: UpdateJobDto,
    @Res() res: Response,
  ) {
    return await this.jobsService.updateJob(job_id, updateJobDto, res);
  }
////////////////////////Delete Single Job//////////////////////
  @Delete('/:job_id')
  @ApiOperation({ summary: 'Delete a job by ID' })
  @ApiParam({
    name: 'job_id',
    description: 'The ID of the job to delete',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Job deleted successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Job not found' })
  async deleteJob(
    @Param('job_id', ParseIntPipe) job_id: number,
    @Res() res: Response,
  ) {
    return await this.jobsService.deleteJob(job_id, res);
  }
}
