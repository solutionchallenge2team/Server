import { Injectable, NotFoundException } from "@nestjs/common";
import { Board } from "./board.entity";
import { BoardRepository } from "./board.repository";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { Reply } from "src/reply/reply.entity";
import { ReplyRepository } from "src/reply/reply.repository";

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
        private replyRepository: ReplyRepository
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find({order: {
            boardId: 'ASC' // 오름차순으로 정렬
        }
    });
    }
    
    //id를 이용해서 게시물 가져오기
    async getBoardById(boardId: number): Promise<Board> {
        const found = await this.boardRepository.findOne({where:{boardId}});

        if(!found) {
            throw new NotFoundException(`Can't find Board with boardId ${boardId}`);
        }   
        return found;
    }
    
    //게시물 생성하기, userid는 입력이 아니라 자동으로 가져와야 한다. 
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    //게시물 삭제하기
    async deleteBoard(boardId: number): Promise<void>{
        //삭제 권한 추가해야함
        const result = await this.boardRepository.delete(boardId);

        if(result.affected===0) {
            throw new NotFoundException(`Can't find board with boardId ${boardId}`);
        }
    }

    //게시물 title, description 바꾸기
    async updateBoard(boardId: number, newtitle: string, newcontent: string, newlocation: string): Promise<Board>{
        const board = await this.getBoardById(boardId);

        if (newtitle !== undefined && newtitle !== '') {
            board.title = newtitle;
        }
        if (newcontent !== undefined && newcontent !== '') {
            board.content = newcontent;
        }
        if (newlocation !== undefined && newlocation !== '') {
            board.location = newlocation;
        }
        await this.boardRepository.save(board);

        return board;
    }

    //boarId로 Board가져오고 replys배열에 newreply 추가
    // async addBoardReply(boardId: number, createReplyDto: CreateBoardDto): Promise<Board>{
    //     const board = await this.getBoardById(boardId);

    //     const newReply = new Reply();
    //     newReply.replyId = createReplyDto;
    //     newReply.board = board;

    //     if (!board.replies) {
    //         board.replies = [];
    //     }
        

        
    //     board.replies.push(newReply);

    //     await this.replyRepository.save(newReply);
    //     await this.boardRepository.save(board);

    //     return board;
    // }
    
    //좋아요 수 1씩 증가하기(Url이 Patch될 때마다 1씩 증가)
    async increaseHearts(boardId: number): Promise<Board> {
        const board = await this.boardRepository.findOne({where: {boardId}});
        if (!board) {
            throw new Error(`Board with ID ${boardId} not found`);
        }

        board.hearts = board.hearts + 1;
        await this.boardRepository.save(board);
        return board;
    }

    //좋아요 수 1씩 감소하기(Url이 Patch될 때마다 1씩 감소)
    async decreaseHearts(boardId: number): Promise<Board> {
        const board = await this.boardRepository.findOne({where: {boardId}});
        if (!board) {
            throw new Error(`Board with ID ${boardId} not found`);
        }

        board.hearts = board.hearts - 1;
        await this.boardRepository.save(board);
        return board;
    }
    
    //TOP10만 가져오기
    async getTop10Boards(): Promise<Board[]> {
        return this.boardRepository.find({order: {
            hearts: 'DESC', // hearts기준 내림차순으로 정렬
            boardId: 'DESC' // hearts가 같은 경우에는 boardId 기준으로 내림차순 정렬(최근게 보이도록 의도함)
        },
        take:10
    });
    }
}