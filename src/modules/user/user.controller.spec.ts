import { Test, TestingModule } from '@nestjs/testing';
import { UserController, getOwnerSignin } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userController.getHello()).toBe('Hello World!');
    });
  });

  // 사장님 회원가입
  // 1. 필수값 (아이디/비밀번호/이름/이메일/전화번호/기본주소)을 모두 입력해야 통과
  describe('User', () => {
    it('User SignUp returns the correct user object after registration', () => {
      const expectedUser = {
        id: 'jason11',
        email: 'jason@gmail.com',
      };

      const registeredUser = getOwnerSignin();

      expect(registeredUser).toEqual(expectedUser);
    });
  });
});
