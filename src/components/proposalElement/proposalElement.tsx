import { ProposalForm } from '../../dto/common.dto'
import * as S from './styles'
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

interface Props extends ProposalForm {

}
const icons = ['Beats', 'Cloud', 'Logging', 'Kibana'];

const ProposalElement: React.FC<Props> =
    ({ description, content_url, title, user_key }) => {
        return (
            <EuiFlexItem>
                <EuiCard
                    layout="horizontal"
                    title={`제목 : ${title}`}
                    description={
                        `key : ${user_key}` + `\n`
                        + `내용 : ${description}`
                    }
                />
            </EuiFlexItem>
        )
    }

export default ProposalElement