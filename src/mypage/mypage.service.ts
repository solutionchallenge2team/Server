import {Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from 'src/boards/board.repository';
import { Board } from 'src/boards/board.entity';
import { UserRepository } from '../auth/user.repository';
import { CreateUserDto } from 'src/auth/dto/create-user-dto';
import { User } from 'src/auth/user.entity';
import { CreateBoardDto } from 'src/auth/dto/create-board-dto';

@Injectable()
export class MypageService {
    constructor(
        private boardRepository: BoardRepository,
        private userRepository: UserRepository,
    ) {} 

    //UserID로 유저 정보 가져오기
    async getUserByUserID(userid: number): Promise<User> {
        const found = await this.userRepository.findOne({where:{userid}});

        if(!found) {
            throw new NotFoundException(`Can't find User with id ${userid}`);
        }
        return found;
    }

    //userid로 유저가 작성한 글 가져오기
    async getBoardsbyUserID(userid: number): Promise<Board[]> {
        const user = await this.userRepository.findOne({where: {userid}})
        return await this.boardRepository.find({where: {user}})
    }

    //닉네임 수정
    async updateUserNickname(userid: number, nickname: string): Promise<User>{
        const user = await this.getUserByUserID(userid);

        user.nickname = nickname;
        await this.userRepository.save(user);

        return user;
    }

    
}
