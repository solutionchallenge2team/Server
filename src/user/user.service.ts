import {Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from 'src/boards/board.repository';
import { Board } from 'src/boards/board.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/auth/dto/create-user-dto';
import { User } from 'src/user/user.entity';
import { CreateBoardDto } from 'src/auth/dto/create-board-dto';
import { CommunityRepository } from 'src/community/community.repository';

@Injectable()
export class UserService {
    constructor(
        private boardRepository: BoardRepository,
        private userRepository: UserRepository,
        private communityRepository: CommunityRepository,
    ) {} 

    //User 정보 자동으로 가져오기
    async getUserProfile(user: User): Promise<User> {
        return user;
    }



    //로그인 된 상태에서 유저가 작성한 글 가져오기
    async getBoardsbyUser(user: User): Promise<Board[]> {
        return await this.boardRepository.find({where: {user}})
    }


    //로그인 된 상태에서 닉네임 수정
    async updateUserNickname(user: User, nickname: string): Promise<User>{
        user.nickname = nickname;
        await this.userRepository.save(user);

        return user;
    }
    
}
