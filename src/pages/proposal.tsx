import { FunctionComponent, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ProposalForm } from '../dto/common.dto';
import axios from 'axios'


const Proposal: FunctionComponent = () => {
    const context = useWeb3React();
    const {
        account,     
    } = context;

    const [userProposal, setUserProposal] = useState<ProposalForm>({ content_url: "", user_key: '', title: '', description: '' })


    const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
        axios.post('http://ec2-13-125-139-216.ap-northeast-2.compute.amazonaws.com/proposal', userProposal).catch(error => console.log(error))

        setUserProposal({
            content_url: ""
            , user_key: account
            , title: "",
            description: ""
        })
    }

    return (
        <div>
            <div>Add Content</div>
            <div>지갑주소: {account}</div>
            <input placeholder='title' value={userProposal.title} onChange={(e) => { setUserProposal({ ...userProposal, title: e.target.value }) }} /><br></br>
            <input placeholder='content_url' value={userProposal.content_url} onChange={(e) => { setUserProposal({ ...userProposal, content_url: e.target.value }) }} /><br></br>
            <input placeholder='description' value={userProposal.description} onChange={(e) => { setUserProposal({ ...userProposal, description: e.target.value }) }} /><br></br>
            <button onClick={onSubmit}>submit</button>
        </div>
    );
};

export default Proposal;
