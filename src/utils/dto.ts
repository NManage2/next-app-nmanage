interface ICreatePostDTO {
  title: string;
  content: string;
}
interface IUpdatePostDTO {
  title?: string;
  content?: string;
}
interface IRegisterUserDto {
  username: string;
  email: string;
  password: string;
}

interface ILoginUserDto {
  email: string;
  password: string;
}
interface IUpdateUserDTO {
  username?: string;
  email?: string;
  password?: string;
}
interface ICreateCommentDTO {
  text: string;
  postId: number;
}
interface IUpdateCommentDTO {
  text: string;
}
export type {
  ICreatePostDTO,
  IUpdatePostDTO,
  IRegisterUserDto,
  ILoginUserDto,
  IUpdateUserDTO,
  ICreateCommentDTO,
  IUpdateCommentDTO,
};
