import { ProposalForm } from '../../dto/common.dto'
import * as S from './styles'

interface Props extends ProposalForm {

}

const ProposalElement: React.FC<Props> =
    ({ description, content_url, title, user_key }) => {
        return (
            <S.Container>
                <S.Title>제목 : {title}</S.Title>
                <S.Key>{user_key}</S.Key>
                <S.Description>내용 : {description}</S.Description>
                <S.Url>이미지url : {content_url}</S.Url>
            </S.Container>
        )
    }

export default ProposalElement