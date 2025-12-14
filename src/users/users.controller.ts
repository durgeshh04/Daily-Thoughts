import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * This is users controller class
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * This api is responsible to create the users
   * @param createUserDto
   * @returns
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * This api is responsible to fetch the data of all the users
   * @param page
   * @param limit
   * @returns
   */

  @Get()
  @ApiOperation({
    description: 'This api fetches data of all the users',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    default: 1,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    default: 10,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'User details successfully fetched',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAll();
  }

  /**
   * This api fetches the data of the single user
   * @param id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * This api updates the single user information partially
   * @param id
   * @param updateUserDto
   * @returns
   */
  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * This api is deletes a single user
   * @param id
   * @returns
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
