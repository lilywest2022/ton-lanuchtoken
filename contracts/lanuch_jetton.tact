import "@stdlib/deploy";
import "./jetton";

struct ContractInformation{
    fee:Int;
    owner:Address;
    testAddress:Address;
    hasminted:Bool;

}

message Mint {
    amount: Int;
    receiver: Address;
}
message CreateNewJetton{
    owner:Address;
    content:Cell;
    max_supply:Int;
    rate:Int;
}

message SimpData{
    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    rate:Int;
}

message CreateNewJettonWithLanuch{
    owner:Address;
    content:Cell;
    max_supply:Int;
    rate:Int;
}

contract LanuchJetton  with Deployable{
    owner:Address;
    fee:Int;
    testAddress:Address;
    hasminted:Bool;
    init(owner:Address,fee:Int){
        self.owner = owner;
        self.fee = fee;
        self.testAddress = newAddress(0, 0);
        self.hasminted = false;
    }
      
receive(msg: CreateNewJetton) {
    let ctx: Context = context();
    require(ctx.value > ton("0.1"), "your fee can't afford it");
    let fee: Int = self.fee;
    self.lanuchfee(fee); 
    let remainValue: Int = ctx.value - fee;
    let newJetton: StateInit = initOf SampleJetton(ctx.sender, msg.content, msg.max_supply, msg.rate);
    let newJetton_address: Address = contractAddress(newJetton);
    self.testAddress = contractAddress(newJetton);
    self.hasminted = true;
      send(SendParameters{
        to: newJetton_address,
        value: ton("0.1"),
        mode: 0,
        bounce: false,
        body: null,  // 部署新合约时不需要body
        code: newJetton.code,
        data: newJetton.data
    });
    // 给用户mint代币
    send(SendParameters{
        to: newJetton_address,
        value: ton("0.05"),  // 确保这里的值足够支付给新合约的费用
        mode: 1,
        bounce: true,
        body: Mint{
            amount: 100000,
            receiver: ctx.sender
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
        hasminted:self.hasminted

      };
   }
 bounced(msg: bounced<CreateNewJetton>) {
        self.hasminted = false;
    }
}


contract SampleJetton with Jetton,Deployable{
    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    rate:Int;
    max_supply: Int as coins; // Extract parameter we set here. The Jetton Standards doesn't have this parameter.

    init(owner: Address, content: Cell, max_supply:Int,rate:Int) {
        self.rate = rate % 100;
        self.total_supply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.max_supply = max_supply;
    }

    receive(msg: Mint) { // 0xfc708bd2
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        require(self.mintable, "Not mintable");
        require(self.total_supply + msg.amount <= self.max_supply, "Max supply exceeded");
        self.mint(msg.receiver, msg.amount, self.owner); // (to, amount, response_destination)
    }

    receive("Mint: 100") { // Public Minting
        let ctx: Context = context();
        require(self.mintable, "Not mintable");
        require(self.total_supply + 100 <= self.max_supply, "Max supply exceeded");
        self.mint(ctx.sender, 100, self.owner); // 🔴 
    }

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