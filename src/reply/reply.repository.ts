import { Repository } from 'typeorm';
import { Reply } from './reply.entity';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';

@CustomRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
    // async createReply(content: string): Promise<Reply> {
    //     const newReply = new Reply();
    //     newReply.replyId = content;
    //     newReply.replyContent = 
    //     return this.replyRepository.save(newReply);
    // }
}
