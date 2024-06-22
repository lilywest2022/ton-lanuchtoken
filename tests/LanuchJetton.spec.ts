import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CreateNewJetton, LanuchJetton} from '../wrappers/LanuchJetton';
import {buildOnchainMetadata} from "../utils/jetton-helpers"
import '@ton/test-utils';
import { JettonDefaultWallet } from '../build/Jetton/tact_JettonDefaultWallet';
import { SampleJetton ,Mint} from '../build/LanuchJetton/tact_SampleJetton';
import { after } from 'node:test';

const jettonParams = {
    name:"nmsl",
    description:"nmsl",
    symbol:"nmsl",
    image:"https://avatars.githubusercontent.com/u/115602512?s=96&v=4"
}

describe('LanuchJetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lanuchJetton: SandboxContract<LanuchJetton>;
    let user:SandboxContract<TreasuryContract>;
    let userJettonDefaultWallet:SandboxContract<JettonDefaultWallet>
    
    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        user = await blockchain.treasury('user')
        console.log('Address',deployer.address,user.address)
        let fee = toNano("0.001")

        lanuchJetton = blockchain.openContract(await LanuchJetton.fromInit(deployer.address,BigInt(fee)));
        let beforeBalance = await deployer.getBalance()
        console.log('beforeBalance',beforeBalance)
        const deployResult = await lanuchJetton.send(
            deployer.getSender(),
            {
                value: toNano('10'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lanuchJetton.address,
            deploy: true,
            success: true,
        });
        let deployBalance = await deployer.getBalance()
        console.log('deployBalance',deployBalance)
        let userBalance = await user.getBalance()
        console.log('userBalance',userBalance)
        let content = buildOnchainMetadata(jettonParams)
        let beforehasminted = (await lanuchJetton.getGetLanuchjettonData()).hasminted
        let beforeTestAddress= (await lanuchJetton.getGetLanuchjettonData()).testAddress
        console.log('beforehasminted',beforehasminted,beforeTestAddress)
        
        const CreateNewJetton:CreateNewJetton ={
                        $$type:"CreateNewJetton",
                        owner:user.address,
                        content:content,
                        max_supply:toNano(1000000000000),
                        rate:BigInt(50),
                    }
        const CreateNewJettonResult = await lanuchJetton.send(user.getSender(),{value:toNano('5')},CreateNewJetton)
        let createBalance = await deployer.getBalance()
        console.log('createBalance',createBalance)
        let userCreateBalance = await user.getBalance()
        console.log('userBalance',userCreateBalance)
        let beforeSendTest = (await lanuchJetton.getGetLanuchjettonData()).testAddress
        let afterhasminted = (await lanuchJetton.getGetLanuchjettonData()).hasminted

        console.log('afterhasminted',afterhasminted)
        console.log('beforeSendTransaction',beforeSendTest,afterhasminted)
        expect(CreateNewJettonResult.transactions).toHaveTransaction({
        from:user.address,
        success:true
        })
        let afterSendTransaction = (await lanuchJetton.getGetLanuchjettonData()).testAddress
        console.log('afterSendTransaction',afterSendTransaction)
        let newjetton = blockchain.openContract(await SampleJetton.fromAddress(afterSendTransaction))
        let newjettoninformation = await newjetton.getGetJettonData()
        let userWalletAddress = await newjetton.getGetWalletAddress(user.address)
        let information = await newjetton.getGetSimpData()
        console.log('owner',newjettoninformation.owner,user.address)
        console.log('information',information.total_supply,user.address)
        console.log('lilywest',userWalletAddress)
        // const Mint: Mint = {
        //     $$type: "Mint",
        //     amount: 100n,
        //     receiver: user.address,
        // };
        // const mintResult = await newjetton.send(user.getSender(), { value: toNano("10") }, Mint);
        // expect(mintResult.transactions).toHaveTransaction({
        //     from: user.address,
        //     to: newjetton.address,
        //     success: true,
        // });
        userJettonDefaultWallet = await blockchain.openContract(await JettonDefaultWallet.fromAddress(userWalletAddress))
        let balance = await userJettonDefaultWallet.getGetWalletData()
        console.log('balance',balance.balance)
    });

    it('should deploy', async () => {
    //    console.log('owner',(await lanuchJetton.getGetLanuchjettonData()).owner)
    //    console.log('fee',(await lanuchJetton.getGetLanuchjettonData()).fee)
    //    console.log('testAddress',(await lanuchJetton.getGetLanuchjettonData()).testAddress)
    //    console.log('afterBalance',await deployer.getBalance())
    });
    // let content = buildOnchainMetadata(jettonParams)

//     it("Test:Contract Jetton successfule",async()=>{
//         const CreateNewJetton:CreateNewJetton ={
//             $$type:"CreateNewJetton",
//             owner:user.address,
//             content:content,
//             max_supply:toNano(1000000000000),
//             rate:BigInt(50),
//         }
//     const CreateNewJettonResult = await lanuchJetton.send(user.getSender(),{value:toNano('1')},CreateNewJetton)
//     console.log('aftertestAddress',(await lanuchJetton.getGetLanuchjettonData()).testAddress) 
    
//     const jettonData = await lanuchJetton.getGetLanuchjettonData();
//     const jettonWalletAddress = jettonData.testAddress;
//     console.log('jetton',jettonWalletAddress)
//     const jettonDefaultWaller = blockchain.openContract(await SampleJetton.fromAddress(jettonWalletAddress))
//     const userWalletaddress = await jettonDefaultWaller.getGetWalletAddress(user.address);
//     //user的wallet
//     console.log('jettonDefaultWallet',userWalletaddress)

//     const jettonWalletContract = blockchain.openContract(await JettonDefaultWallet.fromAddress(userWalletaddress));
//     let userWallet =await jettonWalletContract.getGetWalletData()
//     // expect(jettonWalletContract.owner).toE
//     // console.log('jettonBalance',jettonBalance)
//     // expect(CreateNewJettonResult.transactions).toHaveTransaction({
//     //     from:user.address,
//     //     success:true
//     // })
//     // const jettonBalance = await jettonWalletContract.getGetWalletData();
//     // console.log('Jetton Wallet Balance:', jettonBalance);
//     // expect(CreateNewJettonResult.transactions).toHaveTransaction({
//     //     from:user.address,
//     //     to:user.address,
//     // })
//     })
});
