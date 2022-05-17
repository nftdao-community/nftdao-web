import { IsString } from 'class-validator';

export class CreateProposalDto {

  @IsString()
  public description: string;
  @IsString()
  public user_key: string;
  @IsString()
  public content_url: string;
  @IsString()
  public title: string;
  
}
