## Content
pages/index.tsx : The DApp portal page.  
pages/_app.tsx : The _app file is called during each page initialization.  
const/constants.ts : Contract address, Chain, Destination Smart Wallet Address and Key alias.  
The Destination Smart Wallet Address is hard-code now in constants.ts:
```
export const DESTINATIONWALLET_ADDRESS: string = '0x5474C31B545A8101c980C388a1551A56AD46FB59';
```
components/NFT.tsx : NFT metadata.  
components/NFTGrid.tsx : Loop and display NFTs in a grid.   


## References

To learn more about thirdweb and Next.js, take a look at the following resources:
- [Chainlink Automation Compatible Contract](https://docs.chain.link/chainlink-automation/guides/compatible-contracts) - Learn how to make smart contracts that are compatible with Automation.
- [Chainlink Data Feed](https://docs.chain.link/data-feeds) - Learn how to read price from smart contract.
- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Templates](https://thirdweb.com/templates) - Thirdweb templates.
- [Thirdwe TBA NFT ERC6551 + ERC4337](https://www.youtube.com/watch?v=kZakHQMHs1Q&t=1669s) - Learn how to create a Token Bound Account NFT - ERC6551 + ERC4337.
- [Next.js](https://nextjs.org/) - Learn Next.js.
- [UniswapV3Swap](https://docs.uniswap.org/contracts/v3/overview) - Learn how to swap on Uniswap.
- [Openzeppelin ERC-1155](https://docs.openzeppelin.com/contracts/5.x/erc1155) - Lear how to creat ERC-1155 smart contract.
- [11 Ways To Use Chainlink Functions in Your Decentralized Applications](https://blog.chain.link/ways-to-use-chainlink-functions/#the_graph__leveraging_indexed_data_for_defi_applications)


