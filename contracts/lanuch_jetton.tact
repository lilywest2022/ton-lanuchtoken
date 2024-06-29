import "@stdlib/deploy";
import "./jetton";
import "./stonfi";
import "./messages";
struct ContractInformation{
    fee:Int;
    owner:Address;
    testAddress:Address;
    hasminted:Bool;
}
struct CreateNewPoolConfig{
    swapRouterAddress:Address;
    proxyTon:Address;
    tonValueAddMeme:Int as coins;
    tonValueAddPton:Int as coins;
    routerPtonWallet:Address;
}
message Mint {
    amount: Int;
    receiver: Address;
}

message CreateNewJettonMint{
    amount:Int;
    receiver:Address;
}

message CreateNewJetton{
    token_owner:Address;
    content:Cell;
    max_supply:Int;
    rate:Int;
    lanuch_rate:Int;
    isLanuch:Bool;
    config:CreateNewPoolConfig;
}

message SimpData{
    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    rate:Int;
}
// message lanuchCoin{
    
// }

contract LanuchJetton  with Deployable{
    owner:Address;
    fee:Int;
    testAddress:Address;
    hasminted:Bool;
    isLanuch:Bool;
    lanuchJettonAddress:Address;
    this_balance:Int;
    init(owner:Address,fee:Int,isLanuch:Bool){
        self.owner = owner;
        self.fee = fee;
        self.testAddress = newAddress(0, 0);
        self.hasminted = false;
        self.isLanuch = isLanuch;
        self.lanuchJettonAddress = myAddress();
        self.this_balance = 0;
    } 

receive(msg: CreateNewJetton) {
    require(((msg.rate%100) + (msg.lanuch_rate%100))<=100,"supply rate has wrong");
    let ctx: Context = context();
    require(ctx.value > ton("0.2"), "your fee can't afford it");
    let fee: Int = self.fee;
    self.lanuchfee(fee); 
    self.this_balance = ctx.value - fee;
    require(self.this_balance >ton("0.1"),"your fee can't afford it");
    let newJetton: StateInit = initOf SampleJetton(msg.token_owner, msg.content, msg.max_supply, msg.rate,myAddress());
    let newJetton_address: Address = contractAddress(newJetton);
    self.testAddress = contractAddress(newJetton);
    if(msg.rate%100 == 0){
       let createAmount:Int = 0;
    }else{
       let createAmount:Int = msg.max_supply*(msg.rate%100);
    }
    if(msg.rate%100 !=0){
    send(SendParameters{
      to:newJetton_address,
      value:ton("0.1"),
      mode:0,
      bounce:false,
      body:CreateNewJettonMint{
        amount:msg.rate%100 ==0?0:msg.max_supply*(msg.rate%100),
        receiver:ctx.sender,
      }.toCell(),
       code: newJetton.code,
       data: newJetton.data
    });
    }
    let lanuchJettonAmount:Int = msg.max_supply*(msg.lanuch_rate%100)/100;
    // let jettonWalletAddress:Address = newJetton.get_wallet_address(ctx.sender);
    if(msg.isLanuch){
    // self.mint(myAddress(),lanuchJettonAmount,msg.token_owner);
    send(SendParameters{
        to:newJetton_address,
        value:0,
        mode:0,
        bounce:false,
        body:Mint{
          amount:lanuchJettonAmount,
          receiver:myAddress(),
        }.toCell(),
    });
    self.sendTonToPair(msg.config,self.this_balance,1);
    self.sendMemeToPair(msg.config,lanuchJettonAmount,1);
    }
}
//   fun fairLanuch(lanuchJettonAmount:Int,token_owner:Address){

//   }

  fun sendMemeToPair(config:CreateNewPoolConfig,tokenAmount:Int,minLPOut:Int){
    let init:StateInit = initOf JettonDefaultWallet(myAddress(),myAddress());
    let memeJettonWallet:Address = contractAddress(init);
    let c: Cell = StonfiProvideLiquidity{
            token_wallet: config.routerPtonWallet,
            min_lp_out: minLPOut
        }.toCell();
        let forward_cell: Cell = beginCell().storeUint(1, 1).storeRef(c).endCell();
    send(SendParameters{
        to:memeJettonWallet,
        bounce:true,
        value:0,
        mode:SendIgnoreErrors,
        body:TokenTransfer{
            query_id:0,
            amount:tokenAmount,
            sender:config.swapRouterAddress,
            response_destination:myAddress(),
            custom_payload:null,
            forward_ton_amount:ton("0.24"),
            forward_payload:forward_cell.asSlice()
        }.toCell(),
        code:init.code,
        data:init.data,
    });
  }

  fun sendTonToPair(config:CreateNewPoolConfig,tonAmount:Int,min_lp_out:Int){
    let init :StateInit = initOf JettonDefaultWallet(config.swapRouterAddress,myAddress());
    let memeJettonWallet:Address = contractAddress(init);
    let c:Cell = StonfiProvideLiquidity{token_wallet:memeJettonWallet,min_lp_out:min_lp_out}.toCell();
    let forward_cell:Cell = beginCell().storeUint(1,1).storeRef(c).endCell();
    send(SendParameters{
        to:config.routerPtonWallet,
        bounce:false,
        value:0,
        mode:SendRemainingValue |SendIgnoreErrors,
        body:TokenTransfer{
            query_id:0,
            amount:tonAmount,
            sender:config.swapRouterAddress,
            response_destination:null,
            custom_payload:null,
            forward_ton_amount:ton("0.26"),
            forward_payload:forward_cell.asSlice()
        }.toCell()
    });
  }
  fun lanuchfee(fee:Int){
        send(SendParameters{
            to:self.owner,
            value:fee,
            mode:SendIgnoreErrors,
            body:"lanuch fee".asComment()
        });
    }
get fun get_lanuchjetton_data():ContractInformation{
      return ContractInformation{
        fee:self.fee,
        owner:self.owner,
        testAddress:self.testAddress,
        hasminted:self.hasminted,
      };
   }
}


contract SampleJetton with Jetton,Deployable{
    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    rate:Int;
    max_supply: Int as coins; // Extract parameter we set here. The Jetton Standards doesn't have this parameter.
    lock:Bool;
    creator_contract:Address;
    init(owner: Address, content: Cell, max_supply:Int,rate:Int,creator_contract:Address) {
        self.rate = rate % 100;
        self.total_supply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.max_supply = max_supply;
        self.lock = false;
        self.creator_contract = creator_contract;
    }

    receive(msg: Mint) { // 0xfc708bd2
        let ctx: Context = context();
        require(ctx.sender == self.owner || ctx.sender == self.creator_contract, "Not owner");
        require(self.mintable, "Not mintable");
        require(self.total_supply + msg.amount <= self.max_supply, "Max supply exceeded");
        self.mint(msg.receiver, msg.amount, self.owner); // (to, amount, response_destination)
    }

    receive(msg:CreateNewJettonMint){
        let ctx:Context = context();
        require(!self.lock,"The CreateNewJettonMint only call once itme");
        require(self.mintable,"Not mintable");
        require(self.total_supply + msg.amount <= self.max_supply,"Max supply exceeded");
        self.mint(msg.receiver,msg.amount,self.owner);
        self.lock  = true;
    }
    // receive(msg:lanuchCoin){

    // }
    receive("Owner: MintClose") {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.mintable = false;
    }



    get fun get_simp_data():SimpData {
        return SimpData{
            total_supply:self.total_supply,
            owner: self.owner,
            content: self.content,
            mintable: self.mintable,
            rate:self.rate,
        };
    }
} 