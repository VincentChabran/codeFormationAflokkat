import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { EncodePasswordPipe } from '../tools/pipes/encode-password.pipe';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';
import { IgnoreJwtGuard } from '../utils/decorator/IgnoreJwtGuard.decorator';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user-input';
import { LocalAuthGuard } from './local-auth.guard';

@Resolver()
export class AuthResolver {
   constructor(private authService: AuthService) {}

   @IgnoreJwtGuard()
   @UseGuards(LocalAuthGuard)
   @Mutation(() => LoginResponse)
   login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context('req') req) {
      return this.authService.login(req.user);
   }

   @IgnoreJwtGuard()
   @UsePipes(EncodePasswordPipe)
   @Mutation(() => User)
   singUp(@Args('singupUserInput') singupUserInput: CreateUserInput) {
      return this.authService.singup(singupUserInput);
   }
}
