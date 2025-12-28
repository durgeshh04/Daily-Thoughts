import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepo.findOneBy({
        email: createUserDto.email,
      });
      if (existingUser) {
        throw new HttpException('User already exist', HttpStatus.CONFLICT);
      }

      // Create and save address optional (city, pincode, state) || strict (country)
      const address = this.addressRepo.create({
        city: createUserDto.address.city,
        pincode: createUserDto.address.pincode,
        state: createUserDto.address.state,
        country: createUserDto.address.country,
      });

      const addressData = await this.addressRepo.save(address);

      if (!addressData.id) {
        throw new HttpException(
          'Failed to create address',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Create and save user
      const userData = this.userRepo.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        phoneNo: createUserDto.phoneNo,
        addressId: addressData.id,
      });

      await this.userRepo.save(userData);

      return {
        message: 'User created successfully',
        status: HttpStatus.CREATED,
        timestamp: new Date(),
      };
    } catch (error) {
      console.log(error.message);

      // Don't catch and return error - throw it so NestJS can handle it properly
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          message: 'Failed to create user',
          error: error.message,
          timestamp: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const [users, total] = await this.userRepo.findAndCount({
        skip,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        message: 'Users retrieved successfully',
        status: HttpStatus.OK,
        data: users,
        count: users.length, // no. of users on the page
        total, // total users
        totalPages,
        currentPage: page,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error fetching users:', error);

      throw new HttpException(
        {
          message: 'Failed to fetch users',
          error: error.message,
          timestamp: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const userData = await this.userRepo.findOneBy({ id });
      if (!userData) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      return userData;
    } catch (error) {
      console.error(error.message);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'User not found',
          error: error.message,
          timestamp: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userData = await this.findOne(id);
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
