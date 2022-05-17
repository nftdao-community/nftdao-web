import { Model, ModelObject } from 'objection';
import { Proposal } from '@interfaces/proposal.interface';

export class Proposals extends Model implements Proposal {

  proposal_id!: number;
  season!: number;
  description!: string;
  user_key!: string;
  content_url!: string;
  create_at!: string;
  is_accepted!: string;
  title:string;

  static tableName = 'proposals'; // database table name
  static idColumn = 'proposal_id'; // id column name
}

export type ProposalsShape = ModelObject<Proposals>;
