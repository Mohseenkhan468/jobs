import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from './entities/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import { Response } from 'express';
import { CustomException } from 'src/exception/custom.exception';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Jobs)
    private jobsRepository: Repository<Jobs>,
  ) {}
  ///////////////////////Create Job////////////////////
  async createJob(createJobDto: CreateJobDto, res: Response) {
    try {
      const newJob = await this.jobsRepository.save(createJobDto);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: newJob,
      });
    } catch (err) {
      throw new CustomException(err, err.status);
    }
  }
  ////////////////////Get All Jobs///////////////////////
  async getAllJobs(res: Response) {
    try {
      const jobs = await this.jobsRepository.find();
      return res.status(HttpStatus.OK).json({
        success: true,
        jobs,
      });
    } catch (err) {
      throw new CustomException(err, err.status);
    }
  }
  //////////////////////Get Single Job////////////////////////
  async getSingleJob(job_id: number, res: Response) {
    try {
      const job = await this.jobsRepository.findOneBy({ id: job_id });
      if (!job) {
        throw new BadRequestException('Job not found.');
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        data: job,
      });
    } catch (err) {
      throw new CustomException(err, err.status);
    }
  }
  /////////////////Update Job///////////////////////////
  async updateJob(job_id: number, updateJobDto: UpdateJobDto, res: Response) {
    try {
      if (!Object.keys(updateJobDto).length) {
        throw new BadRequestException('No fields provided for update');
      }
      const updateJob = await this.jobsRepository.update(
        { id: job_id },
        updateJobDto,
      );
      if (updateJob.affected === 0) {
        throw new BadRequestException('Job not found or no fields updated');
      }
      const job = await this.jobsRepository.findOneBy({ id: job_id });
      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: job,
      });
    } catch (err) {
      throw new CustomException(err, err.status);
    }
  }
  ///////////////////////Delete Job/////////////////////
  async deleteJob(job_id: number, res: Response) {
    try {
      const deleteJob = await this.jobsRepository.delete({ id: job_id });
      if (deleteJob.affected == 0) {
        throw new BadRequestException('Job not found');
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Job deleted successfully.',
      });
    } catch (err) {
      throw new CustomException(err, err.status);
    }
  }
}
