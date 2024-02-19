import { Repository } from 'typeorm';
import { Reply } from './reply.entity';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { CreateReplyDto } from 'src/auth/dto/create-reply-dto';
import { Board } from 'src/boards/board.entity';

@CustomRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
    
    async createReply(createReplyDto: CreateReplyDto, board: Board): Promise<Reply> {
        const { replyContent } = createReplyDto;
        
        const Reply = this.create({
            replyContent,
            board,
        })
        
        await this.save(Reply);
        return Reply;
    }
}
