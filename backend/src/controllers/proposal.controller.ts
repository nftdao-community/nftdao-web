import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@dtos/users.dto';
import { Proposal } from '@interfaces/proposal.interface';
import proposalService from '@services/proposal.service';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreateProposalDto } from '@/dtos/proposal.dto';

@Controller()
export class ProposalController {
  public proposalService = new proposalService();

  @Get('/proposal')
  @OpenAPI({ summary: 'get all proposals in this season' })
  async test() {
    const findAllProposalsData: Proposal[] = await this.proposalService.findAllProposal();
    return { data: findAllProposalsData, message: 'findAll' };
  }

  @Get('/proposal/:id')
  @OpenAPI({ summary: 'get one proposal by proposal id' })
  async getUserById(@Param('id') proposalId: number) {
    const findOneProposalData: Proposal = await this.proposalService.findProposalById(proposalId);
    return { data: findOneProposalData, message: 'findOne' };
  }

  @Post('/proposal')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateProposalDto, 'body'))
  @OpenAPI({ summary: 'Create a new proposal' })
  async createProposal(@Body() proposalData: CreateProposalDto) {
    const createProposalData: Proposal = await this.proposalService.createProposal(proposalData);
    return { data: createProposalData, message: 'created' };
  }

  @Delete('/proposal/:id')
  @OpenAPI({ summary: 'Delete a proposal' })
  async deleteUser(@Param('id') proposalId: number) {
    const deleteProposalData: Proposal = await this.proposalService.deleteProposal(proposalId);
    return { data: deleteProposalData, message: 'deleted' };
  }

}
