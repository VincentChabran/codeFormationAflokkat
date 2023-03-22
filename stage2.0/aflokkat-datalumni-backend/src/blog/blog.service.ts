import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
   constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}

   async updateBlogImg(profilPictureName: string, blog: UpdateBlogInput): Promise<void> {
      blog.pathImg = profilPictureName;
      await this.blogRepository.save(blog);
   }

   async create(createBlogInput: CreateBlogInput, filename: string) {
      const newBlog = this.blogRepository.create(createBlogInput);
      newBlog.pathImg = filename;
      return await this.blogRepository.save(newBlog);
   }

   async findAll() {
      return await this.blogRepository.find();
   }

   async findOne(id: number) {
      return await this.blogRepository.findOneByOrFail({ id });
   }

   async update(id: number, updateBlogInput: UpdateBlogInput) {
      const blog = await this.blogRepository.findOneBy({ id });
      return this.blogRepository.save({ ...blog, ...updateBlogInput });
   }

   async remove(blog: UpdateBlogInput) {
      await this.blogRepository.delete(blog.id);
      return true;
   }
}
