import {Injectable } from '@nestjs/common';
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
    async getBoardsbyUserId(userid: number): Promise<Board> {
        const found = await this.boardRepository.findOne({where: {userid}});

        return found;
    }

    //user 생성해서 userRepository에 저장
    createUser(createuserDto: CreateUserDto): Promise<User>{
        return this.userRepository.createUser(createuserDto);
    }

    //board를 user에서 만들도록 하는게 나을듯
    createUserBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }
}
