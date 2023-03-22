import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UseInterceptors, UsePipes } from '@nestjs/common';
import { FindUserRemovePictureInterceptor } from '../tools/interceptors/find-user-remove-picture.interceptor';
import { uploadFile } from '../tools/functions/uploadFile';
import { pathUploadsProfilImg, pathUploadsTemp } from '../utils/constant/pathUploads';
import { GenerateUniqueFileNamePipe } from '../tools/pipes/generate-unique-file-name.pipe';
import { LoginResponse } from '../auth/dto/login-response';
import { EncodePasswordPipe } from '../tools/pipes/encode-password.pipe';

@Resolver(() => User)
export class UserResolver {
   constructor(private readonly userService: UserService) {}

   @UsePipes(EncodePasswordPipe)
   @Mutation(() => User)
   async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
      return await this.userService.create(createUserInput);
   }

   @Query(() => [User], { name: 'users' })
   async findAll() {
      return await this.userService.findAll();
   }

   @Query(() => [User], { name: 'usersByIsNotActive' })
   async findByIsNotActive() {
      return this.userService.findByIsNotActive();
   }

   @Query(() => User, { name: 'user' })
   async findOne(@Args('id', { type: () => Int }) id: number) {
      return await this.userService.findOneById(id);
   }

   @Mutation(() => LoginResponse)
   async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
      return await this.userService.update(updateUserInput.id, updateUserInput);
   }

   @UseInterceptors(FindUserRemovePictureInterceptor)
   @Mutation(() => String)
   async uploadProfilePicture(
      @Args('user') user: UpdateUserInput,
      @Args('file', { type: () => GraphQLUpload }, GenerateUniqueFileNamePipe) { createReadStream, filename }: FileUpload,
   ): Promise<string> {
      await this.userService.updateProfilPictureName(filename, user);
      return uploadFile(pathUploadsProfilImg, filename, createReadStream);
   }

   @UseInterceptors(FindUserRemovePictureInterceptor)
   @Mutation(() => User)
   async removeUser(@Args('user') user: UpdateUserInput) {
      return await this.userService.remove(user);
   }

   // Upload le Csv d'une formation, créé les utilisateurs et envoi les mails
   @Mutation(() => String)
   async uploadCsvFormation(@Args('file', { type: () => GraphQLUpload }) { createReadStream, filename }: FileUpload) {
      const fileName = await uploadFile(pathUploadsTemp, filename, createReadStream);
      return this.userService.createUsersByCsv(fileName);
   }
}
