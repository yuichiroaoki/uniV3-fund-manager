import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  LiquidityExamples__factory,
  LiquidityExamples,
  ERC20Mock,
} from "../typechain";
import { deployContractFromName, getERC20ContractFromAddress } from "../utils";
import { impersonateFundErc20 } from "../utils/token";
import { erc20Address, USDC_WHALE } from "../constants/addresses";

describe("LiquidityExamples", () => {
  let Example: LiquidityExamples;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  let DAI: ERC20Mock;
  let USDC: ERC20Mock;
  let USDT: ERC20Mock;
  let WETH: ERC20Mock;
  let WMATIC: ERC20Mock;

  let fixture: any;

  before(async () => {
    USDC = await getERC20ContractFromAddress(erc20Address.USDC);
    USDT = await getERC20ContractFromAddress(erc20Address.USDT);
    DAI = await getERC20ContractFromAddress(erc20Address.DAI);
    WETH = await getERC20ContractFromAddress(erc20Address.WETH);
    WMATIC = await getERC20ContractFromAddress(erc20Address.WMATIC);

    fixture = async () => {
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
      Example = await deployContractFromName(
        "LiquidityExamples",
        LiquidityExamples__factory
      );
      await Example.deployed();

      await impersonateFundErc20(USDT, USDC_WHALE, owner.address, "1.0", 6);
      await impersonateFundErc20(USDC, USDC_WHALE, owner.address, "1.0", 6);
    };
  });

  beforeEach(async () => {
    await fixture();
  });

  it("mint new position", async () => {
    await USDT.approve(Example.address, ethers.BigNumber.from(2000));
    await USDC.approve(Example.address, ethers.BigNumber.from(2000));
    await Example.mintNewPosition(
      USDC.address,
      USDT.address,
      500,
      ethers.BigNumber.from(1000),
      ethers.BigNumber.from(1000)
    );
  });
});
