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

    //userid를 가진 board 배열 
    async getBoardsbyUserID(userid: number): Promise<Board[]> {
        // return this.userRepository.find({where: {userid}});
        // 저녀석은 User[]를 return 한다.
        const user = await this.userRepository.findOne({where: {userid}})
        return await this.boardRepository.find({where: {user}})
    }

    //user 생성해서 userRepository에 저장
    createUser(createuserDto: CreateUserDto): Promise<User>{
        return this.userRepository.createUser(createuserDto);
    }

    //board를 user에서 만들도록 하는게 나을듯
    createUserBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    //UserID로 유저 찾기
    async getUserByUserID(userid: number): Promise<User> {
        const found = await this.userRepository.findOne({where:{userid}});

        if(!found) {
            throw new NotFoundException(`Can't find User with id ${userid}`);
        }
        return found;
    }

    //유저의 닉네임 바꾸기
    async updateUserNickname(userid: number, nickname: string): Promise<User>{
        const user = await this.getUserByUserID(userid);

        user.nickname = nickname;
        await this.userRepository.save(user);

        return user;
    }

    
}
