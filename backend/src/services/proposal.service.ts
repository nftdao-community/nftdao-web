
import { CreateProposalDto } from '@dtos/proposal.dto';
import { HttpException } from '@exceptions/HttpException';
import { Proposal } from '@interfaces/proposal.interface';
import { Proposals } from '@models/proposal.model';
import { isEmpty } from '@utils/util';

class UserService {
  public async findAllProposal(): Promise<Proposal[]> {
    const proposals: Proposal[] = await Proposals.query().select().from('proposals');
    return proposals;
  }

  public async findProposalById(proposalId: number): Promise<Proposal> {
    const findProposal: Proposal = await Proposals.query().findById(proposalId);
    if (!findProposal) throw new HttpException(409, "No Data found.");

    return findProposal;
  }


  public async createProposal(proposalData: CreateProposalDto): Promise<Proposal> {
    if (isEmpty(proposalData)) throw new HttpException(400, "It's not a proposal data");

    const findProposal: Proposal = await Proposals.query().select().from('proposals').where('user_key', '=', proposalData.user_key).andWhere('season','=',2).first();
    if (findProposal) throw new HttpException(409, `Your proposal(${proposalData.user_key}) already exists in this season.`);

    const createProposalData: Proposal = await Proposals.query()
      .insert({ ...proposalData, season:1})
      .into('proposals');

    return createProposalData;
  }

  public async deleteProposal(proposalId: number): Promise<Proposal> {
    const findProposal: Proposal = await Proposals.query().findById(proposalId);
    if (!findProposal) throw new HttpException(409, "No Data found.");

    await Proposals.query().delete().where('proposal_id', '=', proposalId).into('proposals');
    return findProposal;
  }

}

export default UserService;
