import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GenerateUniqueFileNamePipe } from '../tools/pipes/generate-unique-file-name.pipe';
import { uploadFile } from '../tools/functions/uploadFile';
import { pathUploadsBlogImg } from '../utils/constant/pathUploads';
import { UseInterceptors } from '@nestjs/common';
import { FindBlogRemoveBlogImgInterceptor } from '../tools/interceptors/find-blog-remove-blog-img.interceptor';

@Resolver(() => Blog)
export class BlogResolver {
   constructor(private readonly blogService: BlogService) {}

   @UseInterceptors(FindBlogRemoveBlogImgInterceptor)
   @Mutation(() => String)
   async uploadBlogImg(
      @Args('blog') blog: UpdateBlogInput,
      @Args('file', { type: () => GraphQLUpload }, GenerateUniqueFileNamePipe) { createReadStream, filename }: FileUpload,
   ): Promise<string> {
      await this.blogService.updateBlogImg(filename, blog);
      return uploadFile(pathUploadsBlogImg, filename, createReadStream);
   }

   @Mutation(() => Blog)
   createBlog(
      @Args('createBlogInput') createBlogInput: CreateBlogInput,
      @Args('file', { type: () => GraphQLUpload }, GenerateUniqueFileNamePipe) { createReadStream, filename }: FileUpload,
   ) {
      uploadFile(pathUploadsBlogImg, filename, createReadStream);
      return this.blogService.create(createBlogInput, filename);
   }

   @Query(() => [Blog], { name: 'blogs' })
   findAll() {
      return this.blogService.findAll();
   }

   @Query(() => Blog, { name: 'blog' })
   findOne(@Args('id', { type: () => Int }) id: number) {
      return this.blogService.findOne(id);
   }

   @Mutation(() => Blog)
   updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
      return this.blogService.update(updateBlogInput.id, updateBlogInput);
   }

   @UseInterceptors(FindBlogRemoveBlogImgInterceptor)
   @Mutation(() => Boolean)
   removeBlog(@Args('blog') blog: UpdateBlogInput) {
      return this.blogService.remove(blog);
   }
}
