import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Board } from "./board.entity";
import { BoardRepository } from "./board.repository";
import { CreateBoardDto } from "../auth/dto/create-board-dto";
import { Reply } from "src/reply/reply.entity";
import { ReplyRepository } from "src/reply/reply.repository";
import { CreateReplyDto } from "src/auth/dto/create-reply-dto";
import { User } from "src/user/user.entity";
import { BoardStatus } from "./board-status.enum";
import { promises } from "dns";

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
        private replyRepository: ReplyRepository
    ) { }

    //VALID한 게시물 전부 가져오기
    async getAllBoards(user: User): Promise<Board[]> {
        return this.boardRepository
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user')
            .leftJoinAndSelect('user.community', 'community')
            .where('board.status = :status', {status: BoardStatus.VALID})
            .andWhere('community.communityId = :communityId', { communityId: user.community.communityId })
            .orderBy('board.boardId', 'DESC')
            .getMany();
    }

    //id를 이용해서 게시물 가져오기
    async getBoardById(boardId: number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { boardId } });

        if (!found) {
            throw new NotFoundException(`Can't find Board with boardId ${boardId}`);
        }
        return found;
    }

    //게시물 생성하기, user 정보 같이 넣어주기 
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    //게시물 삭제하기
    async deleteBoard(boardId: number, user: User): Promise<void> {
        //삭제 권한 추가함.
        const result = await this.boardRepository.delete({boardId, user});

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find board with boardId ${boardId}`);
        }
    }

    //게시물 title, description, location, photos 수정
    async updateBoard(boardId: number, title: string, content: string, location: string, photos: string[], user: User): Promise<Board> {
        const board = await this.boardRepository.findOne({where: {boardId, user}}); //수정 권한 추가

        if (title !== undefined && title !== '') {
            board.title = title;
        }
        if (content !== undefined && content !== '') {
            board.content = content;
        }
        if (location !== undefined && location !== '') {
            board.location = location;
        }
        if (photos !== undefined) {
            board.photos = photos;
        }
        await this.boardRepository.save(board);

        return board;
    }



    //boarId로 Board가져오고, replyRepository에서 newReply 생성해서, Board의 replies 배열에 newReply 추가
    async addBoardReply(boardId: number, createReplyDto: CreateReplyDto): Promise<void> {
        const board = await this.getBoardById(boardId);

        if (!board.replies) {
            board.replies = [];
        }

        await this.replyRepository.createReply(createReplyDto, board);
    }

    //댓글 삭제
    async deleteReply(replyId: number): Promise<void> {
        await this.replyRepository.delete(replyId);
    }

    //id를 이용해서 댓글 가져오기
    async getReplyById(replyId: number): Promise<Reply> {
        const found = await this.replyRepository.findOne({where: {replyId}});

        if(!found) {
            throw new NotFoundException(`Can't find Reply with replyId ${replyId}`);
        }
        return found;
    }

    //id를 이용해서 댓글 수정하기
    async editReply(replyId: number, replyContent: string):Promise<void> {
        const reply = await this.getReplyById(replyId);

        reply.replyContent = replyContent;

        await this.replyRepository.save(reply);
    }

    //좋아요 수 1씩 증가하기(Url이 Patch될 때마다 1씩 증가)
    async increaseHearts(boardId: number): Promise<Board> {
        Logger.verbose(`boardId is ${boardId}`);

        const board = await this.boardRepository.findOne({ where: { boardId } });

        Logger.verbose(`found board ${board}`);

        if (!board) {
            throw new Error(`Board with ID ${boardId} not found`);
        }

        board.hearts = board.hearts + 1;
        await this.boardRepository.save(board);
        return board;
    }

    //좋아요 수 1씩 감소하기(Url이 Patch될 때마다 1씩 감소)
    async decreaseHearts(boardId: number): Promise<Board> {
        const board = await this.boardRepository.findOne({ where: { boardId } });
        if (!board) {
            throw new Error(`Board with ID ${boardId} not found`);
        }

        board.hearts = board.hearts - 1;
        await this.boardRepository.save(board);
        return board;
    }

    // //TOP10만 가져오기
    // async getTop10Boards(user: User): Promise<Board[]> {
    //     return await this.boardRepository.find({
    //         //board.user.community 가 들어온 user의 community 와 같아야 함.
    //         order: {
    //             hearts: 'DESC', // hearts기준 내림차순으로 정렬
    //             boardId: 'DESC' // hearts가 같은 경우에는 boardId 기준으로 내림차순 정렬(최근게 보이도록 의도함)
    //         },
    //         take: 10
    //     });
    // }

    //top10
    async getTop10Boards(user: User): Promise<Board[]>{
        return this.boardRepository
            .createQueryBuilder('board')
            .leftJoin('board.user', 'user')
            .leftJoin('user.community', 'community')
            .where('community.communityId = :communityId', {communityId: user.community.communityId})
            .orderBy('board.hearts', 'DESC')
            .addOrderBy('board.boardId', 'DESC')
            .take(10)
            .getMany();
    }
}