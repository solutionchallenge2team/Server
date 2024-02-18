import { Repository } from 'typeorm';
import { Reply } from './reply.entity';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { CreateReplyDto } from 'src/auth/dto/cretae-reply-dto';

@CustomRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
    
    async createReply(createReplyDto: CreateReplyDto): Promise<Reply> {
        const { replyId, replyContent } = createReplyDto;
        
        const Reply = this.create({
            replyId,
            replyContent
        })
        
        await this.save(Reply);
        return Reply;
    }
}
