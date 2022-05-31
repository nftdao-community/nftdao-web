import { FunctionComponent, useEffect, useState } from 'react';
import { ProposalForm } from '../dto/common.dto';
import axios from 'axios'
import ProposalElement from '../components/proposalElement/proposalElement';


const Collection: FunctionComponent = () => {
    const [proposalList, setProposalList] = useState<ProposalForm[]>([])

    useEffect(() => {
        axios.get('http://ec2-13-125-139-216.ap-northeast-2.compute.amazonaws.com/proposal')
            .then(response => {
                const data = response.data.data
                setProposalList(data);
            })
    }, [])

    return (
        <div>
            <div>Proposal</div>
            {proposalList.map((element, index) => {
                return (
                    <ProposalElement key={index} description={element.description}
                        content_url={element.content_url}
                        user_key={element.user_key}
                        title={element.title} />
                )
            })}

        </div>

    );
};

export default Collection;
